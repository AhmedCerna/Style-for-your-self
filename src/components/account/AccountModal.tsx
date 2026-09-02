import React, { useState } from 'react';
import { X, User, Package, MapPin, Phone, ShieldCheck, Clock, ExternalLink } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { shopifyService } from '../../services/shopify';
import { Order } from '../../types';

export const AccountModal: React.FC = () => {
  const { isAccountOpen, setIsAccountOpen, setActivePage } = useShop();
  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'concierge'>('orders');
  
  const savedOrders: Order[] = shopifyService.getSavedOrders();

  if (!isAccountOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#FDFCFB] shadow-2xl border border-[#1A1A1A15] overflow-hidden flex flex-col my-auto max-h-[85vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#1A1A1A10] bg-[#FDFCFB] flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#F5F2EF] text-[#1A1A1A]">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-normal text-[#1A1A1A]">Client Portal</h3>
              <p className="text-[11px] text-[#8C8279] uppercase tracking-wider">Sophia Montgomery &bull; VIP Atelier Member</p>
            </div>
          </div>
          <button
            id="account-modal-close"
            onClick={() => setIsAccountOpen(false)}
            aria-label="Close client portal"
            className="p-1.5 text-[#1A1A1A]/60 hover:text-black transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#1A1A1A10] bg-[#F5F2EF] text-[10px] font-semibold uppercase tracking-widest text-[#1A1A1A]/60">
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 py-3 text-center transition-colors border-b-2 cursor-pointer ${
              activeTab === 'orders' ? 'border-[#1A1A1A] text-[#1A1A1A] bg-[#FDFCFB]' : 'border-transparent hover:text-black'
            }`}
          >
            Order History ({savedOrders.length})
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-3 text-center transition-colors border-b-2 cursor-pointer ${
              activeTab === 'profile' ? 'border-[#1A1A1A] text-[#1A1A1A] bg-[#FDFCFB]' : 'border-transparent hover:text-black'
            }`}
          >
            Saved Details
          </button>
          <button
            onClick={() => setActiveTab('concierge')}
            className={`flex-1 py-3 text-center transition-colors border-b-2 cursor-pointer ${
              activeTab === 'concierge' ? 'border-[#1A1A1A] text-[#1A1A1A] bg-[#FDFCFB]' : 'border-transparent hover:text-black'
            }`}
          >
            VIP Concierge
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {savedOrders.length === 0 ? (
                <div className="text-center py-12 text-[#8C8279] space-y-3 font-light">
                  <Package className="w-8 h-8 mx-auto text-[#1A1A1A]/40" />
                  <p className="font-serif text-base text-[#1A1A1A] font-normal">No previous orders on this device</p>
                  <p className="text-xs">Once you place an order, full tracking and delivery receipts will appear here.</p>
                  <button
                    onClick={() => {
                      setIsAccountOpen(false);
                      setActivePage('shop');
                    }}
                    className="px-6 py-2.5 bg-[#1A1A1A] text-white text-[10px] uppercase font-semibold tracking-widest hover:bg-[#333] transition-colors cursor-pointer"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {savedOrders.map((ord) => (
                    <div key={ord.id} className="p-4 bg-white border border-[#1A1A1A10] space-y-2 text-xs">
                      <div className="flex items-center justify-between font-medium">
                        <span className="font-mono font-semibold text-[#1A1A1A]">{ord.orderNumber}</span>
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 text-[10px] font-bold uppercase tracking-wider">
                          {ord.status}
                        </span>
                      </div>
                      <div className="text-[#8C8279] flex justify-between font-light">
                        <span>Placed on {ord.date}</span>
                        <span className="font-mono text-[#1A1A1A] font-semibold">${ord.total.toFixed(2)}</span>
                      </div>
                      <div className="pt-2 border-t border-[#1A1A1A0A] flex items-center justify-between text-[11px] text-[#8C8279]">
                        <span>Tracking: <strong className="text-[#1A1A1A] font-mono">{ord.trackingNumber}</strong></span>
                        <span>{ord.items.length} item(s)</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 bg-white border border-[#1A1A1A10] space-y-2">
                <div className="font-serif text-sm font-normal text-[#1A1A1A] flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#1A1A1A]" />
                  <span>Default Shipping Address</span>
                </div>
                <div className="text-[#1A1A1A]/80 leading-relaxed font-light">
                  Sophia Montgomery<br />
                  180 Bloor Street West, Suite 400<br />
                  Toronto, Ontario M5S 2V6, Canada<br />
                  Phone: +1 (416) 555-0192
                </div>
              </div>

              <div className="p-4 bg-white border border-[#1A1A1A10] space-y-2">
                <div className="font-serif text-sm font-normal text-[#1A1A1A]">
                  Sizing Preferences
                </div>
                <div className="grid grid-cols-2 gap-2 text-[#8C8279] font-light">
                  <div className="p-2.5 bg-[#F5F2EF] border border-[#1A1A1A10]">
                    Tops & Jackets: <strong className="text-[#1A1A1A] font-medium">Size S / M</strong>
                  </div>
                  <div className="p-2.5 bg-[#F5F2EF] border border-[#1A1A1A10]">
                    Trousers: <strong className="text-[#1A1A1A] font-medium">Waist 28 / S</strong>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'concierge' && (
            <div className="space-y-3 text-xs font-light">
              <p className="text-[#1A1A1A]/70">
                As a valued client, you have priority telephone access to our personal styling directors in Toronto.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                <a
                  href="tel:+14164355850"
                  className="p-3 bg-white border border-[#1A1A1A10] hover:bg-[#F5F2EF] transition-colors flex items-center gap-3 text-[#1A1A1A]"
                >
                  <Phone className="w-4 h-4 text-[#1A1A1A]" />
                  <div>
                    <div className="text-[9px] text-[#8C8279] uppercase tracking-wider font-semibold">Primary Concierge</div>
                    <div className="font-mono text-xs font-semibold">+1 416 435 5850</div>
                  </div>
                </a>
                <a
                  href="tel:+14163448541"
                  className="p-3 bg-white border border-[#1A1A1A10] hover:bg-[#F5F2EF] transition-colors flex items-center gap-3 text-[#1A1A1A]"
                >
                  <Phone className="w-4 h-4 text-[#1A1A1A]" />
                  <div>
                    <div className="text-[9px] text-[#8C8279] uppercase tracking-wider font-semibold">Secondary Concierge</div>
                    <div className="font-mono text-xs font-semibold">+1 416 344 8541</div>
                  </div>
                </a>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
