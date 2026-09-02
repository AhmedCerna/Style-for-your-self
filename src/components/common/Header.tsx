import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  Search, 
  Heart, 
  User, 
  ShoppingBag, 
  Phone,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { MobileMenu } from './MobileMenu';
import { CategoryType } from '../../types';

export const Header: React.FC = () => {
  const { 
    activePage, 
    setActivePage, 
    navigateToCollection,
    cartCount, 
    setIsCartOpen, 
    wishlist, 
    setIsWishlistOpen,
    setIsSearchOpen,
    setIsAccountOpen
  } = useShop();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', page: 'home' as const },
    { label: 'Shop', page: 'shop' as const, hasDropdown: true },
    { label: 'Collections', page: 'collections' as const },
    { label: 'About', page: 'about' as const },
    { label: 'Contact', page: 'contact' as const }
  ];

  const quickCategories: { label: string; category: CategoryType }[] = [
    { label: 'New Arrivals', category: 'New Arrivals' },
    { label: 'Women’s Collection', category: 'Women' },
    { label: 'Men’s Collection', category: 'Men' },
    { label: 'Dresses & Gowns', category: 'Dresses' },
    { label: 'Tailored Jackets', category: 'Jackets' },
    { label: 'Fine Knits & Tops', category: 'Tops' },
    { label: 'Pleated Pants', category: 'Pants' },
    { label: 'Leather Accessories', category: 'Accessories' },
    { label: 'Archival Sale', category: 'Sale' }
  ];

  return (
    <header className={`sticky top-0 z-30 transition-all duration-300 ${
      isScrolled 
        ? 'bg-[#FDFCFB]/95 backdrop-blur-md shadow-2xs border-b border-[#1A1A1A10]' 
        : 'bg-[#FDFCFB] border-b border-[#1A1A1A10]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-18 sm:h-20">
          
          {/* Mobile: Hamburger Menu Button */}
          <div className="flex items-center lg:hidden gap-1">
            <button
              id="header-mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open mobile navigation menu"
              className="p-2 -ml-2 text-[#1A1A1A] hover:opacity-70 rounded-lg transition-opacity focus:outline-hidden"
            >
              <Menu className="w-5 h-5" />
            </button>
            <button
              id="header-mobile-search-btn"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Open search"
              className="p-2 text-[#1A1A1A] hover:opacity-70 rounded-lg transition-opacity"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* Left/Desktop: Main Brand Title and Navigation Links */}
          <div className="flex items-center gap-8 lg:gap-10">
            <button
              id="header-brand-logo"
              onClick={() => setActivePage('home')}
              className="flex flex-col text-left group cursor-pointer"
            >
              <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#1A1A1A] uppercase group-hover:opacity-80 transition-opacity">
                Style For Yourself
              </span>
              <span className="text-[9px] tracking-[0.3em] text-[#8C8279] uppercase font-medium">
                Atelier &bull; Toronto
              </span>
            </button>

            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <div 
                  key={link.page} 
                  className="relative"
                  onMouseEnter={() => link.hasDropdown && setIsShopDropdownOpen(true)}
                  onMouseLeave={() => link.hasDropdown && setIsShopDropdownOpen(false)}
                >
                  <button
                    id={`nav-link-${link.page}`}
                    onClick={() => setActivePage(link.page)}
                    className={`text-[11px] uppercase tracking-widest font-semibold transition-all relative py-2 flex items-center gap-1 ${
                      activePage === link.page 
                        ? 'text-[#1A1A1A] opacity-100' 
                        : 'text-[#1A1A1A] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.hasDropdown && (
                      <ChevronDown className="w-3 h-3 opacity-60" />
                    )}
                    {activePage === link.page && (
                      <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#1A1A1A]" />
                    )}
                  </button>

                  {/* Dropdown Menu for Shop */}
                  {link.hasDropdown && isShopDropdownOpen && (
                    <div 
                      className="absolute top-full left-0 w-64 bg-[#FDFCFB] rounded-none shadow-xl border border-[#1A1A1A15] py-3 z-50 animate-in fade-in zoom-in-95 duration-150"
                    >
                      <div className="px-4 pb-2 mb-1 border-b border-[#1A1A1A0A] flex items-center justify-between text-[10px] font-semibold uppercase tracking-widest text-[#8C8279]">
                        <span>Curated Capsules</span>
                        <span className="text-[#1A1A1A] text-[9px] tracking-wider">All &rarr;</span>
                      </div>
                      {quickCategories.map((qc) => (
                        <button
                          key={qc.category}
                          id={`dropdown-cat-${qc.category.toLowerCase().replace(/\s+/g, '-')}`}
                          onClick={() => {
                            navigateToCollection(qc.category);
                            setIsShopDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-[11px] uppercase tracking-wider text-[#1A1A1A]/80 hover:text-[#1A1A1A] hover:bg-[#F5F2EF] transition-colors flex items-center justify-between"
                        >
                          <span>{qc.label}</span>
                          {qc.category === 'Sale' && (
                            <span className="text-[8px] px-1.5 py-0.5 uppercase tracking-wider bg-rose-50 text-rose-800 font-bold">
                              Sale
                            </span>
                          )}
                          {qc.category === 'New Arrivals' && (
                            <span className="text-[8px] px-1.5 py-0.5 uppercase tracking-wider bg-[#1A1A1A] text-white font-bold">
                              New
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Right Action Icons (Search, Wishlist, Account, Cart, Direct Call) */}
          <div className="flex items-center gap-3 sm:gap-5">
            
            {/* Desktop Direct Phone Quick Access */}
            <div className="hidden xl:flex items-center gap-2 pr-4 border-r border-[#1A1A1A10] text-[11px] uppercase tracking-wider text-[#8C8279]">
              <Phone className="w-3 h-3 text-[#1A1A1A]" />
              <span>Direct:</span>
              <a 
                id="header-phone-quick-1"
                href="tel:+14164355850" 
                className="font-mono text-[#1A1A1A] hover:underline transition-colors font-semibold"
              >
                +1 416 435 5850
              </a>
            </div>

            {/* Desktop Search Trigger */}
            <button
              id="header-desktop-search-btn"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search products"
              className="text-[11px] uppercase tracking-widest font-semibold opacity-60 hover:opacity-100 text-[#1A1A1A] hidden sm:flex items-center gap-1.5 transition-opacity"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search</span>
            </button>

            {/* Account Trigger */}
            <button
              id="header-account-btn"
              onClick={() => setIsAccountOpen(true)}
              aria-label="Customer account and order tracking"
              className="text-[11px] uppercase tracking-widest font-semibold opacity-60 hover:opacity-100 text-[#1A1A1A] hidden sm:flex items-center gap-1.5 transition-opacity"
            >
              <User className="w-3.5 h-3.5" />
              <span>Account</span>
            </button>

            {/* Wishlist Trigger with Badge */}
            <button
              id="header-wishlist-btn"
              onClick={() => setIsWishlistOpen(true)}
              aria-label="View saved wishlist items"
              className="text-[11px] uppercase tracking-widest font-semibold opacity-60 hover:opacity-100 text-[#1A1A1A] flex items-center gap-1.5 transition-opacity relative"
            >
              <Heart className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Saved</span>
              {wishlist.length > 0 && (
                <span className="bg-[#1A1A1A] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button with Editorial Aesthetic */}
            <button
              id="header-cart-btn"
              onClick={() => setIsCartOpen(true)}
              aria-label="View shopping cart"
              className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#1A1A1A] text-white hover:bg-[#333333] transition-all text-[11px] uppercase tracking-widest font-semibold active:scale-95"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-white" />
              <span>Cart ({cartCount})</span>
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer Modal */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
};
