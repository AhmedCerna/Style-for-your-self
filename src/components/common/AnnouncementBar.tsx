import React, { useState } from 'react';
import { Phone, Sparkles, X, ChevronRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { navigateToShop, setActivePage } = useShop();

  if (!isVisible) return null;

  return (
    <aside aria-label="Special Offers" className="bg-[#1A1A1A] text-[#FDFCFB] text-[10px] sm:text-[11px] uppercase tracking-widest py-2.5 px-4 border-b border-[#1A1A1A] relative z-40 transition-all font-sans">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        
        {/* Left: Direct Clickable Call Links */}
        <div className="flex items-center gap-3 text-white/70">
          <span className="flex items-center gap-1 font-semibold text-white">
            <Phone className="w-3 h-3 text-[#D8B47E]" />
            Atelier:
          </span>
          <a 
            id="announcement-call-1"
            href="tel:+14164355850" 
            className="hover:text-white underline underline-offset-2 transition-colors font-mono font-bold"
          >
            +1 416 435 5850
          </a>
          <span className="opacity-40">/</span>
          <a 
            id="announcement-call-2"
            href="tel:+14163448541" 
            className="hover:text-white underline underline-offset-2 transition-colors font-mono font-bold"
          >
            +1 416 344 8541
          </a>
        </div>

        {/* Center: Promo Offer */}
        <div className="flex items-center justify-center gap-2">
          <span className="font-light tracking-[0.15em] text-white/90">
            Complimentary Express Delivery &bull; Privilege Code <strong className="font-semibold text-white tracking-widest bg-white/10 px-1.5 py-0.5 rounded">STYLE15</strong>
          </span>
        </div>

        {/* Right: Quick Links & Close */}
        <div className="hidden lg:flex items-center gap-4 text-white/70">
          <button 
            id="announcement-concierge-btn"
            onClick={() => setActivePage('contact')} 
            className="hover:text-white transition-colors flex items-center gap-1 group font-semibold"
          >
            Concierge
            <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </button>
          <button 
            id="announcement-close-btn"
            onClick={() => setIsVisible(false)}
            aria-label="Dismiss banner"
            className="text-white/60 hover:text-white p-0.5 rounded transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </aside>
  );
};
