export type CategoryType = 
  | 'All'
  | 'New Arrivals'
  | 'Women'
  | 'Men'
  | 'Dresses'
  | 'Tops'
  | 'Shirts'
  | 'Pants'
  | 'Jackets'
  | 'Accessories'
  | 'Sale';

export type GenderType = 'Women' | 'Men' | 'Unisex';

export interface ProductVariant {
  id: string;
  title: string;
  size: string;
  color: string;
  colorHex: string;
  price: number;
  compareAtPrice?: number;
  inventoryQuantity: number;
  sku: string;
  image?: string;
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  subtitle?: string;
  description: string;
  details: string[];
  materials: string;
  care: string[];
  fit: string;
  price: number;
  compareAtPrice?: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  isOnSale?: boolean;
  category: CategoryType;
  gender: GenderType;
  rating: number;
  reviewCount: number;
  images: string[];
  variants: ProductVariant[];
  availableSizes: string[];
  availableColors: { name: string; hex: string }[];
  tags: string[];
  createdAt: string;
}

export interface Collection {
  id: string;
  handle: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  itemCount: number;
  featured?: boolean;
}

export interface CartItem {
  id: string;
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  fitFeedback: 'Runs Small' | 'True to Size' | 'Runs Large';
  sizePurchased: string;
  helpfulCount: number;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  location: string;
  verified: boolean;
  image: string;
  productName?: string;
}

export interface LookbookItem {
  id: string;
  image: string;
  handle: string;
  caption: string;
  productId: string;
  productName: string;
  price: number;
}

export interface FilterState {
  searchQuery: string;
  category: CategoryType;
  gender: GenderType | 'All';
  sizes: string[];
  colors: string[];
  minPrice: number;
  maxPrice: number;
  onlySale: boolean;
  onlyNew: boolean;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'rating' | 'best-selling';
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
  };
  shippingMethod: string;
  paymentMethod: string;
  status: 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered';
  trackingNumber: string;
}

export type ActivePage = 'home' | 'shop' | 'collections' | 'product-details' | 'about' | 'contact';
