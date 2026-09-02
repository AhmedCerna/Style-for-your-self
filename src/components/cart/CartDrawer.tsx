import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Truck, 
  Tag, 
  Sparkles, 
  Check,
  ShieldCheck
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    cartTotals,
    discountCode,
    setDiscountCode,
    applyDiscount,
    appliedDiscount,
    setIsCheckoutOpen,
    navigateToProduct,
    setActivePage
  } = useShop();

  const [couponInput, setCouponInput] = useState(appliedDiscount || '');
  const [couponError, setCouponError] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const success = applyDiscount(couponInput);
    if (!success) {
      setCouponError('Invalid promo code. Try "STYLE15" or "FREESHIP".');
    } else {
      setCouponError('');
    }
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const progressPercent = Math.min(100, (cartTotals.subtotal / cartTotals.freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
        onClick={() => setIsCartOpen(false)} 
      />

      {/* Slide-in Drawer */}
      <div className="relative w-full max-w-md bg-[#FDFCFB] h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-[#1A1A1A10] flex items-center justify-between bg-[#FDFCFB] sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-[#1A1A1A]" />
            <h3 className="font-serif text-lg font-normal text-[#1A1A1A]">
              Shopping Bag ({cart.reduce((t, i) => t + i.quantity, 0)})
            </h3>
          </div>
          <button
            id="cart-drawer-close-btn"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close shopping bag"
            className="p-1.5 text-[#1A1A1A]/70 hover:text-black transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="p-3.5 bg-[#F5F2EF] border-b border-[#1A1A1A10] text-xs text-[#1A1A1A]/80 font-light">
          <div className="flex items-center justify-between mb-1.5 font-medium">
            <div className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-[#1A1A1A]" />
              {cartTotals.isFreeShipping ? (
                <span className="text-emerald-800 font-medium flex items-center gap-1 text-[11px]">
                  <Check className="w-3 h-3" /> Complimentary Express Delivery Unlocked
                </span>
              ) : (
                <span className="text-[11px]">
                  Add <strong className="text-[#1A1A1A] font-semibold">${cartTotals.amountToFreeShipping.toFixed(2)}</strong> for Free Delivery
                </span>
              )}
            </div>
            <span className="text-[10px] font-mono text-[#8C8279]">
              {Math.round(progressPercent)}%
            </span>
          </div>
          <div className="w-full h-1 bg-[#1A1A1A10] overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${
                cartTotals.isFreeShipping ? 'bg-emerald-700' : 'bg-[#1A1A1A]'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-14 h-14 bg-[#F5F2EF] border border-[#1A1A1A10] flex items-center justify-center mx-auto text-[#1A1A1A]/40">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif text-lg text-[#1A1A1A] font-normal">Your bag is empty</h4>
                <p className="text-xs text-[#8C8279] mt-1 max-w-xs mx-auto font-light">
                  Explore our modern tailoring, silk dresses, and luxury knitwear to start your collection.
                </p>
              </div>
              <button
                id="cart-empty-shop-now-btn"
                onClick={() => {
                  setIsCartOpen(false);
                  setActivePage('shop');
                }}
                className="px-6 py-2.5 bg-[#1A1A1A] text-white text-[10px] uppercase font-semibold tracking-widest hover:bg-[#333] transition-all cursor-pointer"
              >
                Explore Shop
              </button>
            </div>
          ) : (
            <div className="divide-y divide-[#1A1A1A10]">
              {cart.map((item) => (
                <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex gap-3.5 group">
                  {/* Item Image */}
                  <button
                    onClick={() => {
                      navigateToProduct(item.product);
                      setIsCartOpen(false);
                    }}
                    className="shrink-0 cursor-pointer"
                  >
                    <img
                      src={item.variant.image || item.product.images[0]}
                      alt={item.product.title}
                      className="w-20 h-24 object-cover border border-[#1A1A1A10] group-hover:opacity-90 transition-opacity"
                    />
                  </button>

                  {/* Item Details */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <button
                          onClick={() => {
                            navigateToProduct(item.product);
                            setIsCartOpen(false);
                          }}
                          className="text-left font-serif text-sm font-normal text-[#1A1A1A] group-hover:underline line-clamp-1 cursor-pointer"
                        >
                          {item.product.title}
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          aria-label="Remove item"
                          className="text-[#1A1A1A]/40 hover:text-rose-600 transition-colors p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-[#8C8279] mt-0.5 flex items-center gap-2">
                        <span>Size: <strong className="text-[#1A1A1A] font-medium">{item.variant.size}</strong></span>
                        <span>&bull;</span>
                        <span>Color: <strong className="text-[#1A1A1A] font-medium">{item.variant.color}</strong></span>
                      </div>
                    </div>

                    {/* Pricing & Quantity Controls */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-[#1A1A1A15] bg-white">
                        <button
                          id={`cart-qty-dec-${item.id}`}
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                          className="p-1.5 text-[#1A1A1A] hover:bg-[#F5F2EF] transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs font-mono font-medium text-[#1A1A1A]">
                          {item.quantity}
                        </span>
                        <button
                          id={`cart-qty-inc-${item.id}`}
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                          className="p-1.5 text-[#1A1A1A] hover:bg-[#F5F2EF] transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-serif text-sm font-normal text-[#1A1A1A]">
                          ${(item.variant.price * item.quantity).toFixed(2)}
                        </span>
                        {item.variant.compareAtPrice && item.variant.compareAtPrice > item.variant.price && (
                          <div className="text-[10px] text-[#8C8279] line-through">
                            ${(item.variant.compareAtPrice * item.quantity).toFixed(2)}
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer / Checkout Summary */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-[#1A1A1A10] bg-white space-y-3 sticky bottom-0">
            
            {/* Promo Code Input */}
            <form onSubmit={handleApplyCoupon} className="space-y-1">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3 h-3 text-[#8C8279] absolute left-3 top-3" />
                  <input
                    id="cart-coupon-input"
                    type="text"
                    placeholder="Discount code (e.g. STYLE15)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 bg-[#FDFCFB] border border-[#1A1A1A15] text-xs uppercase font-mono tracking-wider focus:outline-hidden focus:border-[#1A1A1A]"
                  />
                </div>
                <button
                  id="cart-coupon-apply-btn"
                  type="submit"
                  className="px-4 py-2 bg-[#1A1A1A] text-white text-[10px] uppercase font-semibold tracking-wider hover:bg-[#333] transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </div>
              {appliedDiscount && (
                <div className="text-[11px] text-emerald-800 flex items-center justify-between font-medium pt-0.5">
                  <span>Code "{appliedDiscount}" active</span>
                  <span className="text-[#8C8279] cursor-pointer hover:underline" onClick={() => applyDiscount('')}>Remove</span>
                </div>
              )}
              {couponError && (
                <p className="text-[11px] text-rose-600">{couponError}</p>
              )}
            </form>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-[#1A1A1A]/70 pt-2 border-t border-[#1A1A1A10] font-light">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono font-medium text-[#1A1A1A]">${cartTotals.subtotal.toFixed(2)}</span>
              </div>
              {cartTotals.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-800 font-medium">
                  <span>Promotion Savings ({appliedDiscount})</span>
                  <span className="font-mono">-${cartTotals.discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-mono font-medium text-[#1A1A1A]">
                  {cartTotals.isFreeShipping ? 'FREE' : `$${cartTotals.shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax (8%)</span>
                <span className="font-mono font-medium text-[#1A1A1A]">${cartTotals.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-normal text-[#1A1A1A] pt-2 border-t border-[#1A1A1A10]">
                <span className="font-medium">Total</span>
                <span className="font-serif text-base font-normal text-[#1A1A1A]">${cartTotals.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              id="cart-checkout-proceed-btn"
              onClick={handleProceedCheckout}
              className="w-full py-3.5 bg-[#1A1A1A] text-white text-[10px] uppercase tracking-widest font-semibold hover:bg-[#333] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-[#8C8279] pt-1 font-light">
              <ShieldCheck className="w-3.5 h-3.5 text-[#1A1A1A]" />
              <span>Shopify-grade encrypted checkout &bull; 30-day returns</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
