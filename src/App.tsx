import React, { useEffect } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { AnnouncementBar } from './components/common/AnnouncementBar';
import { Header } from './components/common/Header';
import { MobileMenu } from './components/common/MobileMenu';
import { Footer } from './components/common/Footer';
import { FloatingContactButton } from './components/common/FloatingContactButton';
import { SearchModal } from './components/common/SearchModal';
import { ToastContainer } from './components/common/ToastContainer';
import { CartDrawer } from './components/cart/CartDrawer';
import { WishlistDrawer } from './components/wishlist/WishlistDrawer';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { AccountModal } from './components/account/AccountModal';
import { QuickViewModal } from './components/shop/QuickViewModal';

import { HomePage } from './components/home/HomePage';
import { ShopPage } from './components/shop/ShopPage';
import { CollectionsPage } from './components/collections/CollectionsPage';
import { ProductDetailsPage } from './components/product/ProductDetailsPage';
import { AboutPage } from './components/about/AboutPage';
import { ContactPage } from './components/contact/ContactPage';

const AppContent: React.FC = () => {
  const { activePage } = useShop();

  // Scroll to top upon page navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFCFB] text-[#1A1A1A] selection:bg-[#1A1A1A] selection:text-white font-sans antialiased">
      {/* Top Promotional & Direct Contact Bar */}
      <AnnouncementBar />

      {/* Main Sticky Luxury Header */}
      <Header />

      {/* Full-Screen Mobile Drawer */}
      <MobileMenu />

      {/* Main Dynamic Viewport */}
      <main className="flex-1">
        {activePage === 'home' && <HomePage />}
        {activePage === 'shop' && <ShopPage />}
        {activePage === 'collections' && <CollectionsPage />}
        {activePage === 'product-details' && <ProductDetailsPage />}
        {activePage === 'about' && <AboutPage />}
        {activePage === 'contact' && <ContactPage />}
      </main>

      {/* Comprehensive E-Commerce Footer */}
      <Footer />

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <WishlistDrawer />
      <SearchModal />
      <CheckoutModal />
      <AccountModal />
      <QuickViewModal />
      <ToastContainer />

      {/* Persistent Mobile-First Click-to-Call Contact Widget */}
      <FloatingContactButton />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}
