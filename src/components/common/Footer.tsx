import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  ArrowRight, 
  ShieldCheck, 
  RotateCcw, 
  Truck, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { CategoryType } from '../../types';

export const Footer: React.FC = () => {
  const { setActivePage, navigateToCollection, showToast } = useShop();
  const [emailInput, setEmailInput] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    setIsSubscribed(true);
    showToast('Welcome to the Style For Yourself Atelier! Use code STYLE15 for 15% off your first order.', 'success');
  };

  const handleShopCategory = (cat: CategoryType) => {
    navigateToCollection(cat);
  };

  return (
    <footer className="bg-[#1A1A1A] text-[#FDFCFB] pt-16 pb-12 border-t border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Brand Value Pillars Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/5 border border-white/10 text-white shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-normal text-white uppercase tracking-wider">
                Complimentary Express
              </h4>
              <p className="text-xs text-white/60 mt-0.5 font-light">
                On all orders over $100. Dispatched in signature editorial boxing.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/5 border border-white/10 text-white shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-normal text-white uppercase tracking-wider">
                30-Day Effortless Returns
              </h4>
              <p className="text-xs text-white/60 mt-0.5 font-light">
                Complimentary prepaid return labels included in each dispatch.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/5 border border-white/10 text-white shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-normal text-white uppercase tracking-wider">
                Ethical Luxury Materials
              </h4>
              <p className="text-xs text-white/60 mt-0.5 font-light">
                Sustainably certified virgin wools, mulberry silks, and Japanese poplin.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12 border-b border-white/10">
          
          {/* Column 1: Brand & Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <span className="font-serif text-2xl tracking-tight font-normal text-white uppercase">
                Style For Yourself
              </span>
              <p className="text-[10px] tracking-[0.3em] text-[#8C8279] uppercase font-medium mt-1">
                Define Your Style. Wear Confidence.
              </p>
            </div>

            <p className="text-xs text-white/60 leading-relaxed max-w-sm font-light">
              We design timeless silhouettes that blend haute couture precision with modern everyday wearability. Dedicated to premium natural fabrics and accessible luxury.
            </p>

            {/* Clickable Direct Phone Numbers */}
            <div className="pt-2 space-y-2">
              <div className="text-[10px] font-semibold text-white/70 uppercase tracking-widest flex items-center gap-2">
                <Phone className="w-3 h-3 text-[#D8B47E]" />
                <span>Atelier Concierge Lines:</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-2.5">
                <a
                  id="footer-call-1"
                  href="tel:+14164355850"
                  className="inline-flex items-center gap-2 px-3.5 py-2 bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-white transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span className="font-mono text-white font-semibold">+1 416 435 5850</span>
                </a>
                <a
                  id="footer-call-2"
                  href="tel:+14163448541"
                  className="inline-flex items-center gap-2 px-3.5 py-2 bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-white transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span className="font-mono text-white font-semibold">+1 416 344 8541</span>
                </a>
              </div>
            </div>

            <div className="text-xs text-white/50 flex items-center gap-2 pt-1 font-light">
              <MapPin className="w-3.5 h-3.5 text-white/60 shrink-0" />
              <span>Flagship Showroom: Yorkville Fashion District, Toronto, ON</span>
            </div>
          </div>

          {/* Column 2: Shop Directory */}
          <div className="space-y-3">
            <h4 className="text-[10px] uppercase tracking-[0.25em] font-semibold text-white">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-white/60 font-light">
              <li>
                <button 
                  id="footer-shop-new"
                  onClick={() => handleShopCategory('New Arrivals')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  New Arrivals
                </button>
              </li>
              <li>
                <button 
                  id="footer-shop-women"
                  onClick={() => handleShopCategory('Women')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Women's Wardrobe
                </button>
              </li>
              <li>
                <button 
                  id="footer-shop-men"
                  onClick={() => handleShopCategory('Men')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Men's Sartorial
                </button>
              </li>
              <li>
                <button 
                  id="footer-shop-dresses"
                  onClick={() => handleShopCategory('Dresses')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Silk & Dresses
                </button>
              </li>
              <li>
                <button 
                  id="footer-shop-jackets"
                  onClick={() => handleShopCategory('Jackets')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Coats & Blazers
                </button>
              </li>
              <li>
                <button 
                  id="footer-shop-pants"
                  onClick={() => handleShopCategory('Pants')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Tailored Trousers
                </button>
              </li>
              <li>
                <button 
                  id="footer-shop-sale"
                  onClick={() => handleShopCategory('Sale')} 
                  className="hover:text-rose-300 text-rose-300 transition-colors cursor-pointer"
                >
                  Archival Sale (Up to 40% Off)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div className="space-y-3">
            <h4 className="text-[10px] uppercase tracking-[0.25em] font-semibold text-white">
              Concierge Care
            </h4>
            <ul className="space-y-2 text-xs text-white/60 font-light">
              <li>
                <button 
                  id="footer-link-contact"
                  onClick={() => setActivePage('contact')} 
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Contact Atelier
                </button>
              </li>
              <li>
                <button 
                  id="footer-link-about"
                  onClick={() => setActivePage('about')} 
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Atelier Heritage
                </button>
              </li>
              <li>
                <button 
                  id="footer-link-collections"
                  onClick={() => setActivePage('collections')} 
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Curated Capsules
                </button>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition-colors">
                  Size & Drape Guide
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition-colors">
                  Express Delivery
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition-colors">
                  Returns & Exchanges
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Signup */}
          <div className="space-y-3">
            <h4 className="text-[10px] uppercase tracking-[0.25em] font-semibold text-white">
              Inner Circle
            </h4>
            <p className="text-xs text-white/60 leading-relaxed font-light">
              Subscribe to receive private seasonal trunk show invitations and receive 15% off with code STYLE15.
            </p>

            {isSubscribed ? (
              <div className="p-3 bg-white/10 border border-white/20 text-xs text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>Subscribed! Check code: <strong>STYLE15</strong></span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <div className="relative">
                  <input
                    id="footer-newsletter-email"
                    type="email"
                    placeholder="ENTER YOUR EMAIL..."
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white/10 border border-white/20 text-xs text-white placeholder-white/40 focus:outline-hidden focus:border-white transition-colors pr-10 uppercase tracking-wider text-[10px]"
                    required
                  />
                  <button
                    id="footer-newsletter-submit"
                    type="submit"
                    aria-label="Subscribe to newsletter"
                    className="absolute right-1 top-1 bottom-1 px-3 bg-white text-[#1A1A1A] hover:bg-[#F5F2EF] font-semibold text-xs transition-colors flex items-center justify-center cursor-pointer"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[9px] text-white/40 uppercase tracking-wider">
                  By joining you agree to our Privacy Policy.
                </p>
              </form>
            )}

            <div className="pt-2">
              <div className="text-[9px] uppercase tracking-[0.3em] text-white/60 mb-2 font-medium">
                Connect
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <span className="p-2 bg-white/5 border border-white/10 hover:bg-white hover:text-[#1A1A1A] cursor-pointer transition-colors">
                  <Instagram className="w-3.5 h-3.5" />
                </span>
                <span className="px-2.5 py-1.5 bg-white/5 border border-white/10 hover:bg-white hover:text-[#1A1A1A] cursor-pointer transition-colors text-[10px] uppercase font-semibold">
                  Pinterest
                </span>
                <span className="px-2.5 py-1.5 bg-white/5 border border-white/10 hover:bg-white hover:text-[#1A1A1A] cursor-pointer transition-colors text-[10px] uppercase font-semibold font-serif italic">
                  Vogue
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40 font-light">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2">
            <span>&copy; {new Date().getFullYear()} Style For Yourself Atelier. All Rights Reserved.</span>
            <span className="hidden sm:inline text-white/20">|</span>
            <span className="text-[#D8B47E] font-medium tracking-wide">Bariga Digital Design</span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-white/50 text-[11px]">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span>&bull;</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            <span>&bull;</span>
            <span className="hover:text-white cursor-pointer transition-colors">Shipping Policy</span>
            <span>&bull;</span>
            <span className="hover:text-white cursor-pointer transition-colors">Return Policy</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
