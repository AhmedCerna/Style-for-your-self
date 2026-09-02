/**
 * Shopify Storefront API Service Layer
 * 
 * This module abstracts all e-commerce operations. It currently uses structured
 * mock data aligned with Shopify's GraphQL Storefront schema (2024-07+), enabling
 * seamless drop-in connection to a live Shopify store by providing:
 * - SHOPIFY_STORE_DOMAIN
 * - SHOPIFY_STOREFRONT_ACCESS_TOKEN
 */

import { Product, Collection, CartItem, Order, FilterState, CategoryType } from '../types';
import { PRODUCTS_DATA, COLLECTIONS_DATA, DISCOUNT_CODES } from '../data/mockData';

export interface ShopifyConfig {
  storeDomain?: string;
  storefrontAccessToken?: string;
  apiVersion?: string;
}

class ShopifyService {
  private config: ShopifyConfig;

  constructor(config: ShopifyConfig = {}) {
    this.config = {
      storeDomain: config.storeDomain || process.env.VITE_SHOPIFY_STORE_DOMAIN,
      storefrontAccessToken: config.storefrontAccessToken || process.env.VITE_SHOPIFY_STOREFRONT_TOKEN,
      apiVersion: '2024-07'
    };
  }

  public isLiveShopifyConfigured(): boolean {
    return Boolean(this.config.storeDomain && this.config.storefrontAccessToken);
  }

  // Fetch all collections
  public async getCollections(): Promise<Collection[]> {
    return COLLECTIONS_DATA;
  }

  // Fetch a collection by handle
  public async getCollectionByHandle(handle: string): Promise<Collection | undefined> {
    return COLLECTIONS_DATA.find(c => c.handle.toLowerCase() === handle.toLowerCase());
  }

  // Fetch products with filtering, search, and sorting
  public async getProducts(filters?: Partial<FilterState>): Promise<Product[]> {
    let result = [...PRODUCTS_DATA];

    if (!filters) return result;

    // Search filter
    if (filters.searchQuery && filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase().trim();
      result = result.filter(p => 
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (filters.category && filters.category !== 'All') {
      if (filters.category === 'New Arrivals') {
        result = result.filter(p => p.isNew);
      } else if (filters.category === 'Sale') {
        result = result.filter(p => p.isOnSale || (p.compareAtPrice && p.compareAtPrice > p.price));
      } else if (filters.category === 'Women') {
        result = result.filter(p => p.gender === 'Women' || p.gender === 'Unisex');
      } else if (filters.category === 'Men') {
        result = result.filter(p => p.gender === 'Men' || p.gender === 'Unisex');
      } else {
        result = result.filter(p => p.category === filters.category);
      }
    }

    // Gender filter
    if (filters.gender && filters.gender !== 'All') {
      result = result.filter(p => p.gender === filters.gender || p.gender === 'Unisex');
    }

    // Sizes filter
    if (filters.sizes && filters.sizes.length > 0) {
      result = result.filter(p => 
        filters.sizes!.some(s => p.availableSizes.includes(s))
      );
    }

    // Colors filter
    if (filters.colors && filters.colors.length > 0) {
      result = result.filter(p => 
        filters.colors!.some(c => p.availableColors.some(ac => ac.name.toLowerCase().includes(c.toLowerCase())))
      );
    }

    // Price filter
    if (filters.minPrice !== undefined) {
      result = result.filter(p => p.price >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined && filters.maxPrice > 0) {
      result = result.filter(p => p.price <= filters.maxPrice!);
    }

    // Sale only
    if (filters.onlySale) {
      result = result.filter(p => p.isOnSale || (p.compareAtPrice && p.compareAtPrice > p.price));
    }

    // New only
    if (filters.onlyNew) {
      result = result.filter(p => p.isNew);
    }

    // Sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price-asc':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'newest':
          result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
        case 'rating':
          result.sort((a, b) => b.rating - a.rating);
          break;
        case 'best-selling':
          result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
          break;
        case 'featured':
        default:
          // Keep curated order
          break;
      }
    }

    return result;
  }

  // Fetch best sellers
  public async getBestSellers(limit: number = 8): Promise<Product[]> {
    return PRODUCTS_DATA.filter(p => p.isBestSeller).slice(0, limit);
  }

  // Fetch new arrivals
  public async getNewArrivals(limit: number = 8): Promise<Product[]> {
    return PRODUCTS_DATA.filter(p => p.isNew).slice(0, limit);
  }

  // Fetch product by ID
  public async getProductById(id: string): Promise<Product | undefined> {
    return PRODUCTS_DATA.find(p => p.id === id);
  }

  // Fetch product by handle
  public async getProductByHandle(handle: string): Promise<Product | undefined> {
    return PRODUCTS_DATA.find(p => p.handle === handle);
  }

  // Related products recommendation
  public async getRelatedProducts(product: Product, limit: number = 4): Promise<Product[]> {
    return PRODUCTS_DATA
      .filter(p => p.id !== product.id && (p.category === product.category || p.gender === product.gender))
      .slice(0, limit);
  }

  // Calculate cart pricing, taxes, shipping, and discounts
  public calculateTotals(items: CartItem[], discountCode: string = '') {
    const subtotal = items.reduce((sum, item) => sum + item.variant.price * item.quantity, 0);
    
    let discountAmount = 0;
    let appliedCode = '';
    const cleanCode = discountCode.trim().toUpperCase();

    if (cleanCode && DISCOUNT_CODES[cleanCode]) {
      appliedCode = cleanCode;
      const { discountPercent } = DISCOUNT_CODES[cleanCode];
      discountAmount = (subtotal * discountPercent) / 100;
    }

    const freeShippingThreshold = 100;
    const isFreeShipping = subtotal >= freeShippingThreshold || appliedCode === 'FREESHIP';
    const shipping = items.length === 0 ? 0 : (isFreeShipping ? 0 : 15);
    
    const taxableAmount = Math.max(0, subtotal - discountAmount);
    // Estimated sales tax (e.g., 8%)
    const tax = items.length === 0 ? 0 : Number((taxableAmount * 0.08).toFixed(2));
    const total = Number((taxableAmount + shipping + tax).toFixed(2));

    return {
      subtotal,
      discountAmount,
      appliedCode,
      shipping,
      isFreeShipping,
      freeShippingThreshold,
      amountToFreeShipping: Math.max(0, freeShippingThreshold - subtotal),
      tax,
      total
    };
  }

  // Mock checkout execution that produces confirmed order
  public async createCheckout(
    items: CartItem[],
    customerDetails: Order['shippingAddress'],
    shippingMethod: string,
    paymentMethod: string,
    discountCode: string = ''
  ): Promise<Order> {
    const totals = this.calculateTotals(items, discountCode);
    const orderNumber = `SFY-${Math.floor(100000 + Math.random() * 900000)}`;
    const trackingNumber = `TRACK-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

    const order: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      items: [...items],
      subtotal: totals.subtotal,
      discount: totals.discountAmount,
      shipping: totals.shipping,
      tax: totals.tax,
      total: totals.total,
      shippingAddress: customerDetails,
      shippingMethod,
      paymentMethod,
      status: 'Confirmed',
      trackingNumber
    };

    // Save order in local history for lookup
    try {
      const existingOrders = JSON.parse(localStorage.getItem('sfy_orders') || '[]');
      existingOrders.unshift(order);
      localStorage.setItem('sfy_orders', JSON.stringify(existingOrders));
    } catch {
      // ignore in environments without localStorage
    }

    return order;
  }

  public getSavedOrders(): Order[] {
    try {
      return JSON.parse(localStorage.getItem('sfy_orders') || '[]');
    } catch {
      return [];
    }
  }
}

export const shopifyService = new ShopifyService();
