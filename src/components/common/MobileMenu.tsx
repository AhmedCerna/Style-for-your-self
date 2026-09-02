import React from 'react';
import { 
  X, 
  Phone, 
  ChevronRight, 
  Heart, 
  User, 
  ShoppingBag, 
  Search, 
  Sparkles, 
  Clock, 
  MapPin 
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { CategoryType } from '../../types';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORIES_LIST: { name: string; category: CategoryType; tag?: string }[] = [
  { name: 'New Arrivals', category: 'New Arrivals', tag: 'New' },
  { name: 'Women', category: 'Women' },
  { name: 'Men', category: 'Men' },
  { name: 'Dresses', category: 'Dresses' },
  { name: 'Tops & Knits', category: 'Tops' },
  { name: 'Shirts', category: 'Shirts' },
  { name: 'Tailored Pants', category: 'Pants' },
  { name: 'Jackets & Coats', category: 'Jackets' },
  { name: 'Accessories', category: 'Accessories' },
  { name: 'Archival Sale', category: 'Sale', tag: 'Up to 40% Off' }
];

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { 
    setActivePage, 
    navigateToCollection, 
    navigateToShop, 
    setIsSearchOpen, 
    setIsWishlistOpen, 
    setIsAccountOpen, 
    setIsCartOpen,
    wishlist,
    cartCount 
  } = useShop();

  if (!isOpen) return null;

  const handleNav = (page: 'home' | 'shop' | 'collections' | 'about' | 'contact') => {
    setActivePage(page);
    onClose();
  };

  const handleCategoryClick = (category: CategoryType) => {
    navigateToCollection(category);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
        onClick={onClose} 
      />

      {/* Drawer */}
      <div className="relative w-full max-w-sm bg-[#FDFCFB] h-full shadow-2xl flex flex-col z-10 overflow-y-auto animate-in slide-in-from-left duration-300 border-r border-[#1A1A1A10]">
        
        {/* Header */}
        <div className="p-4 border-b border-[#1A1A1A10] flex items-center justify-between bg-[#FDFCFB] sticky top-0 z-20">
          <div>
            <span className="font-serif text-lg tracking-wider font-normal text-[#1A1A1A]">
              STYLE FOR YOURSELF
            </span>
            <p className="text-[9px] tracking-widest text-[#8C8279] uppercase font-medium">
              Atelier &bull; Toronto
            </p>
          </div>
          <button
            id="mobile-menu-close-btn"
            onClick={onClose}
            aria-label="Close mobile navigation"
            className="p-1.5 text-[#1A1A1A]/70 hover:text-black transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Actions Bar */}
        <div className="grid grid-cols-3 divide-x divide-[#1A1A1A10] border-b border-[#1A1A1A10] bg-[#F5F2EF] text-[10px] text-[#1A1A1A] font-semibold uppercase tracking-wider">
          <button
            id="mobile-nav-search-btn"
            onClick={() => { onClose(); setIsSearchOpen(true); }}
            className="py-3 flex flex-col items-center gap-1 hover:text-black hover:bg-[#FAF8F5] cursor-pointer"
          >
            <Search className="w-4 h-4 text-[#1A1A1A]" />
            <span>Search</span>
          </button>
          <button
            id="mobile-nav-wishlist-btn"
            onClick={() => { onClose(); setIsWishlistOpen(true); }}
            className="py-3 flex flex-col items-center gap-1 hover:text-black hover:bg-[#FAF8F5] relative cursor-pointer"
          >
            <Heart className="w-4 h-4 text-[#1A1A1A]" />
            <span>Wishlist</span>
            {wishlist.length > 0 && (
              <span className="absolute top-2 right-6 bg-[#1A1A1A] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {wishlist.length}
              </span>
            )}
          </button>
          <button
            id="mobile-nav-account-btn"
            onClick={() => { onClose(); setIsAccountOpen(true); }}
            className="py-3 flex flex-col items-center gap-1 hover:text-black hover:bg-[#FAF8F5] cursor-pointer"
          >
            <User className="w-4 h-4 text-[#1A1A1A]" />
            <span>Account</span>
          </button>
        </div>

        {/* Clickable Call Support Direct Buttons */}
        <div className="p-4 bg-[#1A1A1A] text-white space-y-2">
          <div className="flex items-center gap-2 text-[10px] font-semibold text-white/70 tracking-widest uppercase">
            <Phone className="w-3 h-3 text-[#D8B47E]" />
            <span>Atelier Concierge Direct</span>
          </div>
          <div className="grid grid-cols-1 gap-2 pt-1">
            <a
              id="mobile-call-1"
              href="tel:+14164355850"
              className="flex items-center justify-between px-3 py-2.5 bg-white/10 hover:bg-white/20 border border-white/15 text-xs text-white transition-colors font-light"
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Line 1</span>
              </div>
              <span className="font-mono text-white font-semibold">+1 416 435 5850</span>
            </a>
            <a
              id="mobile-call-2"
              href="tel:+14163448541"
              className="flex items-center justify-between px-3 py-2.5 bg-white/10 hover:bg-white/20 border border-white/15 text-xs text-white transition-colors font-light"
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Line 2</span>
              </div>
              <span className="font-mono text-white font-semibold">+1 416 344 8541</span>
            </a>
          </div>
        </div>

        {/* Primary Page Navigation */}
        <div className="p-4 space-y-1">
          <div className="text-[10px] uppercase tracking-widest text-[#8C8279] font-semibold mb-2 px-2">
            Navigation
          </div>
          <button
            id="mobile-menu-home-btn"
            onClick={() => handleNav('home')}
            className="w-full text-left px-3 py-2.5 text-[#1A1A1A] hover:bg-[#F5F2EF] text-xs font-semibold uppercase tracking-wider flex items-center justify-between transition-colors cursor-pointer"
          >
            <span>Home</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#8C8279]" />
          </button>
          <button
            id="mobile-menu-shop-all-btn"
            onClick={() => handleNav('shop')}
            className="w-full text-left px-3 py-2.5 text-[#1A1A1A] hover:bg-[#F5F2EF] text-xs font-semibold uppercase tracking-wider flex items-center justify-between transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span>Shop Store</span>
              <span className="px-1.5 py-0.5 text-[8px] bg-[#1A1A1A] text-white font-bold uppercase tracking-wider">
                Full Catalog
              </span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-[#8C8279]" />
          </button>
          <button
            id="mobile-menu-collections-btn"
            onClick={() => handleNav('collections')}
            className="w-full text-left px-3 py-2.5 text-[#1A1A1A] hover:bg-[#F5F2EF] text-xs font-semibold uppercase tracking-wider flex items-center justify-between transition-colors cursor-pointer"
          >
            <span>Collections Directory</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#8C8279]" />
          </button>
          <button
            id="mobile-menu-about-btn"
            onClick={() => handleNav('about')}
            className="w-full text-left px-3 py-2.5 text-[#1A1A1A] hover:bg-[#F5F2EF] text-xs font-semibold uppercase tracking-wider flex items-center justify-between transition-colors cursor-pointer"
          >
            <span>About Style For Yourself</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#8C8279]" />
          </button>
          <button
            id="mobile-menu-contact-btn"
            onClick={() => handleNav('contact')}
            className="w-full text-left px-3 py-2.5 text-[#1A1A1A] hover:bg-[#F5F2EF] text-xs font-semibold uppercase tracking-wider flex items-center justify-between transition-colors cursor-pointer"
          >
            <span>Contact & Showroom</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#8C8279]" />
          </button>
        </div>

        {/* Fashion Categories Section */}
        <div className="p-4 border-t border-[#1A1A1A10] space-y-1">
          <div className="text-[10px] uppercase tracking-widest text-[#8C8279] font-semibold mb-2 px-2">
            Capsules & Categories
          </div>
          {CATEGORIES_LIST.map((item) => (
            <button
              key={item.category}
              id={`mobile-cat-${item.category.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => handleCategoryClick(item.category)}
              className="w-full text-left px-3 py-2 text-[#1A1A1A]/80 hover:text-black hover:bg-[#F5F2EF] text-xs flex items-center justify-between transition-colors cursor-pointer"
            >
              <span>{item.name}</span>
              <div className="flex items-center gap-2">
                {item.tag && (
                  <span className={`text-[8px] px-1.5 py-0.5 font-bold uppercase tracking-wider ${
                    item.tag.includes('Sale') 
                      ? 'bg-rose-50 text-rose-800' 
                      : 'bg-[#1A1A1A] text-white'
                  }`}>
                    {item.tag}
                  </span>
                )}
                <ChevronRight className="w-3 h-3 text-[#8C8279]" />
              </div>
            </button>
          ))}
        </div>

        {/* Footer info in menu */}
        <div className="mt-auto p-4 bg-[#F5F2EF] border-t border-[#1A1A1A10] text-[11px] text-[#8C8279] space-y-2 font-light">
          <div className="flex items-center gap-2 text-[#1A1A1A]">
            <Clock className="w-3 h-3 text-[#8C8279]" />
            <span>Mon–Fri: 9am – 8pm EST | Sat–Sun: 10am – 6pm</span>
          </div>
          <div className="flex items-center gap-2 text-[#1A1A1A]">
            <MapPin className="w-3 h-3 text-[#8C8279]" />
            <span>Yorkville Fashion District, Toronto, ON</span>
          </div>
          <p className="text-[10px] text-[#8C8279] pt-2 border-t border-[#1A1A1A10]">
            &copy; 2026 Style For Yourself Atelier.
          </p>
        </div>

      </div>
    </div>
  );
};
