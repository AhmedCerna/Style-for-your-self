import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Product, 
  ProductVariant, 
  CartItem, 
  FilterState, 
  ActivePage, 
  CategoryType, 
  Order 
} from '../types';
import { shopifyService } from '../services/shopify';
import { PRODUCTS_DATA } from '../data/mockData';

interface ToastInfo {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'error';
  image?: string;
}

interface ShopContextType {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  selectedCollectionHandle: string | null;
  setSelectedCollectionHandle: (handle: string | null) => void;
  
  // Cart
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, variant: ProductVariant, quantity?: number) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotals: ReturnType<typeof shopifyService.calculateTotals>;
  discountCode: string;
  setDiscountCode: (code: string) => void;
  appliedDiscount: string;
  applyDiscount: (code: string) => boolean;

  // Wishlist
  wishlist: Product[];
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;

  // Search
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  // Checkout & Account Modals
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isAccountOpen: boolean;
  setIsAccountOpen: (open: boolean) => void;
  lastCompletedOrder: Order | null;
  setLastCompletedOrder: (order: Order | null) => void;

  // Shop Filter State
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  setCategoryFilter: (cat: CategoryType) => void;

  // Navigation helpers
  navigateToProduct: (product: Product) => void;
  navigateToCollection: (category: CategoryType) => void;
  navigateToShop: (filterOverride?: Partial<FilterState>) => void;

  // Toast notifications
  toasts: ToastInfo[];
  showToast: (message: string, type?: 'success' | 'info' | 'error', image?: string) => void;
  removeToast: (id: string) => void;
}

const initialFilters: FilterState = {
  searchQuery: '',
  category: 'All',
  gender: 'All',
  sizes: [],
  colors: [],
  minPrice: 0,
  maxPrice: 400,
  onlySale: false,
  onlyNew: false,
  sortBy: 'featured'
};

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activePage, setActivePageState] = useState<ActivePage>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(PRODUCTS_DATA[0]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [selectedCollectionHandle, setSelectedCollectionHandle] = useState<string | null>(null);
  
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('sfy_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('sfy_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [lastCompletedOrder, setLastCompletedOrder] = useState<Order | null>(null);

  const [discountCode, setDiscountCode] = useState('STYLE15');
  const [appliedDiscount, setAppliedDiscount] = useState('STYLE15');

  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  // Save cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem('sfy_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Save wishlist to local storage
  useEffect(() => {
    try {
      localStorage.setItem('sfy_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  // Scroll to top on page transition
  const setActivePage = (page: ActivePage) => {
    setActivePageState(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success', image?: string) => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, message, type, image }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const addToCart = (product: Product, variant: ProductVariant, quantity: number = 1) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.variant.id === variant.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        const newItem: CartItem = {
          id: `${product.id}-${variant.id}-${Date.now()}`,
          product,
          variant,
          quantity
        };
        return [...prev, newItem];
      }
    });

    showToast(
      `Added ${product.title} (${variant.size} / ${variant.color}) to your bag`,
      'success',
      variant.image || product.images[0]
    );
    setIsCartOpen(true);
  };

  const updateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(prev => prev.map(item => item.id === itemId ? { ...item, quantity } : item));
  };

  const removeFromCart = (itemId: string) => {
    const target = cart.find(i => i.id === itemId);
    setCart(prev => prev.filter(item => item.id !== itemId));
    if (target) {
      showToast(`Removed ${target.product.title} from bag`, 'info');
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const cartTotals = shopifyService.calculateTotals(cart, appliedDiscount);

  const applyDiscount = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    const totals = shopifyService.calculateTotals(cart, clean);
    if (totals.appliedCode) {
      setAppliedDiscount(clean);
      showToast(`Coupon "${clean}" applied successfully!`, 'success');
      return true;
    } else {
      showToast(`Code "${clean}" is invalid or expired`, 'error');
      return false;
    }
  };

  const toggleWishlist = (product: Product) => {
    const exists = wishlist.some(p => p.id === product.id);
    if (exists) {
      setWishlist(prev => prev.filter(p => p.id !== product.id));
      showToast(`Removed ${product.title} from wishlist`, 'info');
    } else {
      setWishlist(prev => [...prev, product]);
      showToast(`Saved ${product.title} to your wishlist`, 'success', product.images[0]);
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(p => p.id === productId);
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  const setCategoryFilter = (cat: CategoryType) => {
    setFilters(prev => ({
      ...prev,
      category: cat,
      searchQuery: ''
    }));
  };

  const navigateToProduct = (product: Product) => {
    setSelectedProduct(product);
    setActivePage('product-details');
    setQuickViewProduct(null);
  };

  const navigateToCollection = (category: CategoryType) => {
    setFilters(prev => ({
      ...initialFilters,
      category
    }));
    setActivePage('shop');
  };

  const navigateToShop = (filterOverride?: Partial<FilterState>) => {
    if (filterOverride) {
      setFilters(prev => ({ ...prev, ...filterOverride }));
    }
    setActivePage('shop');
  };

  return (
    <ShopContext.Provider
      value={{
        activePage,
        setActivePage,
        selectedProduct,
        setSelectedProduct,
        quickViewProduct,
        setQuickViewProduct,
        selectedCollectionHandle,
        setSelectedCollectionHandle,
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartTotals,
        discountCode,
        setDiscountCode,
        appliedDiscount,
        applyDiscount,
        wishlist,
        isWishlistOpen,
        setIsWishlistOpen,
        toggleWishlist,
        isInWishlist,
        isSearchOpen,
        setIsSearchOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isAccountOpen,
        setIsAccountOpen,
        lastCompletedOrder,
        setLastCompletedOrder,
        filters,
        setFilters,
        resetFilters,
        setCategoryFilter,
        navigateToProduct,
        navigateToCollection,
        navigateToShop,
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = (): ShopContextType => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
