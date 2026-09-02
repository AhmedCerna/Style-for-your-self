import React, { useState } from 'react';
import { Phone, MessageSquare, X, Mail, Clock, ChevronUp } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const FloatingContactButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setActivePage } = useShop();

  return (
    <aside aria-label="Quick Contact & Concierge" className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
      {/* Expanded Quick Contact Panel */}
      {isOpen && (
        <div className="mb-4 w-80 bg-[#FDFCFB] shadow-2xl border border-[#1A1A1A15] p-5 text-[#1A1A1A] animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          <div className="flex items-center justify-between pb-3 border-b border-[#1A1A1A10]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="font-serif text-base font-normal tracking-wide text-[#1A1A1A]">
                Atelier Concierge
              </span>
            </div>
            <button
              id="floating-contact-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close concierge menu"
              className="text-[#8C8279] hover:text-[#1A1A1A] p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-[#1A1A1A]/70 my-3 leading-relaxed font-light">
            Need styling advice, custom sizing assistance, or order tracking? Connect with our dedicated fashion specialists immediately:
          </p>

          {/* Clickable Phone Numbers with tel: links */}
          <div className="space-y-2 mb-4">
            <a
              id="floating-call-btn-1"
              href="tel:+14164355850"
              className="flex items-center justify-between px-3.5 py-2.5 bg-[#F5F2EF] hover:bg-[#1A1A1A] hover:text-white border border-[#1A1A1A10] text-xs font-medium text-[#1A1A1A] transition-colors group"
            >
              <div className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-[#1A1A1A] group-hover:text-white" />
                <span>Direct Line 1</span>
              </div>
              <span className="font-mono font-semibold">+1 416 435 5850</span>
            </a>

            <a
              id="floating-call-btn-2"
              href="tel:+14163448541"
              className="flex items-center justify-between px-3.5 py-2.5 bg-[#F5F2EF] hover:bg-[#1A1A1A] hover:text-white border border-[#1A1A1A10] text-xs font-medium text-[#1A1A1A] transition-colors group"
            >
              <div className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-[#1A1A1A] group-hover:text-white" />
                <span>Direct Line 2</span>
              </div>
              <span className="font-mono font-semibold">+1 416 344 8541</span>
            </a>
          </div>

          {/* Direct Message / Full Form Navigation */}
          <button
            id="floating-open-contact-page-btn"
            onClick={() => {
              setActivePage('contact');
              setIsOpen(false);
            }}
            className="w-full py-3 bg-[#1A1A1A] text-white text-[10px] font-semibold tracking-widest uppercase hover:bg-[#333333] transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5 text-white" />
            <span>Open Contact Form</span>
          </button>

          <div className="mt-3 pt-2 border-t border-[#1A1A1A10] flex items-center justify-center gap-1.5 text-[10px] text-[#8C8279]">
            <Clock className="w-3 h-3 text-[#8C8279]" />
            <span>Mon–Sun 9am – 8pm EST</span>
          </div>

        </div>
      )}

      {/* Main Floating Trigger Button (Signature White Circle with Black Border) */}
      <button
        id="floating-contact-trigger-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Contact client concierge or call direct"
        className="w-14 h-14 bg-white border border-[#1A1A1A] rounded-full flex items-center justify-center shadow-lg hover:bg-[#1A1A1A] hover:text-white text-[#1A1A1A] transition-all transform hover:scale-105 group active:scale-95 cursor-pointer"
      >
        <div className="relative">
          <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500" />
        </div>
      </button>
    </aside>
  );
};
