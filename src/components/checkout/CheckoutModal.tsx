import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  CreditCard, 
  Truck, 
  CheckCircle2, 
  Lock, 
  ShoppingBag, 
  ArrowLeft, 
  ArrowRight,
  Sparkles,
  Printer
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { shopifyService } from '../../services/shopify';
import { Order } from '../../types';

export const CheckoutModal: React.FC = () => {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    clearCart, 
    cartTotals, 
    appliedDiscount, 
    lastCompletedOrder, 
    setLastCompletedOrder,
    setActivePage
  } = useShop();

  const [step, setStep] = useState<'info' | 'shipping' | 'payment' | 'confirmation'>('info');
  const [isProcessing, setIsProcessing] = useState(false);

  // Form Fields
  const [formData, setFormData] = useState({
    email: 'client@example.com',
    fullName: 'Sophia Montgomery',
    phone: '+1 416 555 0192',
    address: '180 Bloor Street West, Suite 400',
    city: 'Toronto',
    province: 'Ontario',
    postalCode: 'M5S 2V6',
    country: 'Canada'
  });

  const [shippingSpeed, setShippingSpeed] = useState<'standard' | 'express' | 'priority'>('express');
  const [paymentType, setPaymentType] = useState<'card' | 'shoppay' | 'applepay'>('card');
  const [cardData, setCardData] = useState({
    number: '•••• •••• •••• 4242',
    exp: '12/28',
    cvv: '888',
    name: 'Sophia Montgomery'
  });

  if (!isCheckoutOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCompleteOrder = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing latency
    setTimeout(async () => {
      const order = await shopifyService.createCheckout(
        cart,
        formData,
        shippingSpeed === 'priority' ? 'Next-Day Atelier VIP ($25.00)' : cartTotals.isFreeShipping ? 'Complimentary Express (Free)' : 'Standard Tracked ($15.00)',
        paymentType === 'card' ? 'Credit Card (•••• 4242)' : paymentType === 'shoppay' ? 'Shop Pay Express' : 'Apple Pay',
        appliedDiscount
      );

      setLastCompletedOrder(order);
      clearCart();
      setIsProcessing(false);
      setStep('confirmation');
    }, 1200);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    if (step === 'confirmation') {
      setStep('info');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-4xl bg-[#FDFCFB] shadow-2xl border border-[#1A1A1A10] overflow-hidden flex flex-col my-auto max-h-[92vh]">
        
        {/* Modal Top Header */}
        <div className="px-6 py-4 border-b border-[#1A1A1A10] bg-[#FDFCFB] flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <span className="font-serif text-lg tracking-widest uppercase font-normal text-[#1A1A1A]">
              STYLE FOR YOURSELF
            </span>
            <span className="hidden sm:inline-block text-[10px] uppercase tracking-widest px-2 py-0.5 border border-[#1A1A1A15] text-[#8C8279]">
              Secure Checkout
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-xs text-emerald-800 font-normal mr-2">
              <Lock className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px]">256-Bit SSL Encrypted</span>
            </div>
            <button
              id="checkout-modal-close"
              onClick={handleClose}
              className="p-1.5 text-[#1A1A1A]/60 hover:text-black transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Step Indicator (if not confirmation) */}
        {step !== 'confirmation' && (
          <div className="bg-[#F5F2EF] border-b border-[#1A1A1A10] px-6 py-3 flex items-center justify-center gap-3 sm:gap-8 text-xs font-light text-[#1A1A1A]/70">
            <button 
              onClick={() => setStep('info')} 
              className={`flex items-center gap-2 cursor-pointer ${step === 'info' ? 'text-[#1A1A1A] font-medium' : ''}`}
            >
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${step === 'info' ? 'bg-[#1A1A1A] text-white font-medium' : 'bg-[#1A1A1A15] text-[#1A1A1A]'}`}>1</span>
              <span className="tracking-wider uppercase text-[11px]">Information</span>
            </button>
            <span className="text-[#1A1A1A]/20">&rarr;</span>
            <button 
              onClick={() => setStep('shipping')} 
              className={`flex items-center gap-2 cursor-pointer ${step === 'shipping' ? 'text-[#1A1A1A] font-medium' : ''}`}
            >
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${step === 'shipping' ? 'bg-[#1A1A1A] text-white font-medium' : 'bg-[#1A1A1A15] text-[#1A1A1A]'}`}>2</span>
              <span className="tracking-wider uppercase text-[11px]">Shipping</span>
            </button>
            <span className="text-[#1A1A1A]/20">&rarr;</span>
            <button 
              onClick={() => setStep('payment')} 
              className={`flex items-center gap-2 cursor-pointer ${step === 'payment' ? 'text-[#1A1A1A] font-medium' : ''}`}
            >
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${step === 'payment' ? 'bg-[#1A1A1A] text-white font-medium' : 'bg-[#1A1A1A15] text-[#1A1A1A]'}`}>3</span>
              <span className="tracking-wider uppercase text-[11px]">Payment</span>
            </button>
          </div>
        )}

        {/* Main Checkout Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Form Steps or Confirmation */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* STEP 1: INFORMATION */}
            {step === 'info' && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-[#1A1A1A10] pb-3">
                  <h3 className="font-serif text-lg font-normal text-[#1A1A1A]">Contact & Shipping Information</h3>
                  <span className="text-[11px] text-[#8C8279] font-light">Fast Guest Checkout</span>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-widest text-[#8C8279] mb-1">Email Address</label>
                    <input
                      id="checkout-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#1A1A1A15] text-xs text-[#1A1A1A] focus:outline-hidden focus:border-[#1A1A1A]"
                      placeholder="you@domain.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-widest text-[#8C8279] mb-1">Full Name</label>
                    <input
                      id="checkout-name"
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#1A1A1A15] text-xs text-[#1A1A1A] focus:outline-hidden focus:border-[#1A1A1A]"
                      placeholder="Jane Doe"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-widest text-[#8C8279] mb-1">Phone (for delivery notification)</label>
                    <input
                      id="checkout-phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#1A1A1A15] text-xs text-[#1A1A1A] focus:outline-hidden focus:border-[#1A1A1A]"
                      placeholder="+1 416 000 0000"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-widest text-[#8C8279] mb-1">Street Address</label>
                    <input
                      id="checkout-address"
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#1A1A1A15] text-xs text-[#1A1A1A] focus:outline-hidden focus:border-[#1A1A1A]"
                      placeholder="Street name & number, Suite / Apt"
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] font-semibold uppercase tracking-widest text-[#8C8279] mb-1">City</label>
                      <input
                        id="checkout-city"
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 bg-white border border-[#1A1A1A15] text-xs text-[#1A1A1A] focus:outline-hidden focus:border-[#1A1A1A]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold uppercase tracking-widest text-[#8C8279] mb-1">Province / State</label>
                      <input
                        id="checkout-province"
                        type="text"
                        name="province"
                        value={formData.province}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 bg-white border border-[#1A1A1A15] text-xs text-[#1A1A1A] focus:outline-hidden focus:border-[#1A1A1A]"
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-[10px] font-semibold uppercase tracking-widest text-[#8C8279] mb-1">Postal Code</label>
                      <input
                        id="checkout-postal"
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 bg-white border border-[#1A1A1A15] text-xs text-[#1A1A1A] focus:outline-hidden focus:border-[#1A1A1A]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-widest text-[#8C8279] mb-1">Country</label>
                    <select
                      id="checkout-country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#1A1A1A15] text-xs text-[#1A1A1A] focus:outline-hidden focus:border-[#1A1A1A]"
                    >
                      <option value="Canada">Canada</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                      <option value="European Union">European Union</option>
                    </select>
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    id="checkout-to-shipping-btn"
                    onClick={() => setStep('shipping')}
                    className="w-full py-3.5 bg-[#1A1A1A] text-white text-[10px] uppercase tracking-widest font-semibold hover:bg-[#333] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Continue to Shipping Method</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: SHIPPING */}
            {step === 'shipping' && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="p-3.5 bg-white border border-[#1A1A1A10] text-xs space-y-1.5 text-[#1A1A1A]/80 font-light">
                  <div className="flex justify-between items-center">
                    <span className="text-[#8C8279]">Deliver to:</span>
                    <span className="font-medium text-[#1A1A1A] truncate max-w-xs">{formData.address}, {formData.city}</span>
                    <button onClick={() => setStep('info')} className="text-[#1A1A1A] underline text-xs cursor-pointer">Change</button>
                  </div>
                </div>

                <h3 className="font-serif text-lg font-normal text-[#1A1A1A]">Select Shipping Method</h3>

                <div className="space-y-2.5">
                  <label 
                    className={`flex items-center justify-between p-4 border cursor-pointer transition-colors bg-white ${
                      shippingSpeed === 'express' ? 'border-[#1A1A1A]' : 'border-[#1A1A1A15]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input 
                        type="radio" 
                        name="shippingSpeed" 
                        checked={shippingSpeed === 'express'} 
                        onChange={() => setShippingSpeed('express')}
                        className="accent-[#1A1A1A]"
                      />
                      <div>
                        <div className="font-medium text-xs text-[#1A1A1A]">
                          Complimentary Express Delivery (2–3 business days)
                        </div>
                        <div className="text-[11px] text-[#8C8279] font-light">
                          Tracked express service with signature on delivery.
                        </div>
                      </div>
                    </div>
                    <span className="font-mono font-medium text-xs text-[#1A1A1A]">
                      {cartTotals.isFreeShipping ? 'FREE' : '$15.00'}
                    </span>
                  </label>

                  <label 
                    className={`flex items-center justify-between p-4 border cursor-pointer transition-colors bg-white ${
                      shippingSpeed === 'priority' ? 'border-[#1A1A1A]' : 'border-[#1A1A1A15]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input 
                        type="radio" 
                        name="shippingSpeed" 
                        checked={shippingSpeed === 'priority'} 
                        onChange={() => setShippingSpeed('priority')}
                        className="accent-[#1A1A1A]"
                      />
                      <div>
                        <div className="font-medium text-xs text-[#1A1A1A]">
                          Priority Courier (Next business day)
                        </div>
                        <div className="text-[11px] text-[#8C8279] font-light">
                          Priority dispatch from Toronto showroom before 2PM.
                        </div>
                      </div>
                    </div>
                    <span className="font-mono font-medium text-xs text-[#1A1A1A]">$25.00</span>
                  </label>
                </div>

                <div className="pt-3 flex gap-3">
                  <button
                    onClick={() => setStep('info')}
                    className="px-4 py-3 border border-[#1A1A1A15] bg-white text-xs text-[#1A1A1A] hover:bg-[#F5F2EF] transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                  <button
                    id="checkout-to-payment-btn"
                    onClick={() => setStep('payment')}
                    className="flex-1 py-3.5 bg-[#1A1A1A] text-white text-[10px] uppercase tracking-widest font-semibold hover:bg-[#333] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Continue to Payment</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: PAYMENT */}
            {step === 'payment' && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <h3 className="font-serif text-lg font-normal text-[#1A1A1A]">Payment Information</h3>
                <p className="text-xs text-[#8C8279] font-light">All transactions are encrypted and processed securely.</p>

                {/* Payment Option Tabs */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentType('card')}
                    className={`p-3 border text-xs font-medium flex flex-col items-center gap-1.5 transition-colors cursor-pointer ${
                      paymentType === 'card' ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'bg-white text-[#1A1A1A] border-[#1A1A1A15]'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span className="text-[11px] uppercase tracking-wider">Credit Card</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentType('shoppay')}
                    className={`p-3 border text-xs font-medium flex flex-col items-center gap-1.5 transition-colors cursor-pointer ${
                      paymentType === 'shoppay' ? 'bg-[#5A31F4] text-white border-[#5A31F4]' : 'bg-white text-[#1A1A1A] border-[#1A1A1A15]'
                    }`}
                  >
                    <span className="font-bold text-xs">Shop Pay</span>
                    <span className="text-[10px]">1-Tap Express</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentType('applepay')}
                    className={`p-3 border text-xs font-medium flex flex-col items-center gap-1.5 transition-colors cursor-pointer ${
                      paymentType === 'applepay' ? 'bg-black text-white border-black' : 'bg-white text-[#1A1A1A] border-[#1A1A1A15]'
                    }`}
                  >
                    <span className="font-bold text-xs"> Pay</span>
                    <span className="text-[10px]">Apple Pay</span>
                  </button>
                </div>

                {/* Card input mockup */}
                {paymentType === 'card' && (
                  <div className="p-4 bg-white border border-[#1A1A1A15] space-y-3">
                    <div>
                      <label className="block text-[10px] font-semibold uppercase tracking-widest text-[#8C8279] mb-1">Card Number</label>
                      <input
                        type="text"
                        value={cardData.number}
                        onChange={(e) => setCardData(prev => ({ ...prev, number: e.target.value }))}
                        className="w-full px-3.5 py-2 bg-[#FDFCFB] border border-[#1A1A1A15] text-xs font-mono text-[#1A1A1A] focus:outline-hidden focus:border-[#1A1A1A]"
                        placeholder="4532 •••• •••• ••••"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-semibold uppercase tracking-widest text-[#8C8279] mb-1">Expiry Date</label>
                        <input
                          type="text"
                          value={cardData.exp}
                          onChange={(e) => setCardData(prev => ({ ...prev, exp: e.target.value }))}
                          className="w-full px-3.5 py-2 bg-[#FDFCFB] border border-[#1A1A1A15] text-xs font-mono text-[#1A1A1A] focus:outline-hidden focus:border-[#1A1A1A]"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold uppercase tracking-widest text-[#8C8279] mb-1">Security Code (CVV)</label>
                        <input
                          type="text"
                          value={cardData.cvv}
                          onChange={(e) => setCardData(prev => ({ ...prev, cvv: e.target.value }))}
                          className="w-full px-3.5 py-2 bg-[#FDFCFB] border border-[#1A1A1A15] text-xs font-mono text-[#1A1A1A] focus:outline-hidden focus:border-[#1A1A1A]"
                          placeholder="CVC"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-3 flex gap-3">
                  <button
                    onClick={() => setStep('shipping')}
                    className="px-4 py-3 border border-[#1A1A1A15] bg-white text-xs text-[#1A1A1A] hover:bg-[#F5F2EF] transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                  <button
                    id="checkout-pay-btn"
                    onClick={handleCompleteOrder}
                    disabled={isProcessing}
                    className="flex-1 py-3.5 bg-[#1A1A1A] text-white text-[10px] uppercase tracking-widest font-semibold hover:bg-[#333] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {isProcessing ? (
                      <span className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                        Processing Secure Order...
                      </span>
                    ) : (
                      <>
                        <Lock className="w-3.5 h-3.5 text-white" />
                        <span>Pay ${cartTotals.total.toFixed(2)} & Place Order</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: CONFIRMATION RECEIPT */}
            {step === 'confirmation' && lastCompletedOrder && (
              <div className="space-y-6 animate-in zoom-in-95 duration-300">
                <div className="text-center py-6 bg-[#F5F2EF] border border-[#1A1A1A10] p-6 space-y-2">
                  <div className="w-10 h-10 bg-[#1A1A1A] text-white flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-2xl font-normal text-[#1A1A1A]">
                    Order Confirmed
                  </h3>
                  <p className="text-xs text-[#8C8279] max-w-md mx-auto font-light">
                    Your order has been placed. A confirmation receipt has been sent to <strong>{lastCompletedOrder.shippingAddress.email}</strong>.
                  </p>
                </div>

                <div className="p-5 bg-white border border-[#1A1A1A10] space-y-4 text-xs font-light">
                  <div className="flex items-center justify-between pb-3 border-b border-[#1A1A1A10]">
                    <div>
                      <span className="text-[#8C8279] text-[11px]">Order Reference</span>
                      <div className="font-mono font-medium text-sm text-[#1A1A1A]">{lastCompletedOrder.orderNumber}</div>
                    </div>
                    <div className="text-right">
                      <span className="text-[#8C8279] text-[11px]">Tracking Number</span>
                      <div className="font-mono font-medium text-xs text-[#1A1A1A]">{lastCompletedOrder.trackingNumber}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[#8C8279] text-[11px] block mb-1">Delivering To</span>
                      <div className="font-medium text-[#1A1A1A]">{lastCompletedOrder.shippingAddress.fullName}</div>
                      <div className="text-[#1A1A1A]/70">{lastCompletedOrder.shippingAddress.address}</div>
                      <div className="text-[#1A1A1A]/70">{lastCompletedOrder.shippingAddress.city}, {lastCompletedOrder.shippingAddress.postalCode}</div>
                    </div>
                    <div>
                      <span className="text-[#8C8279] text-[11px] block mb-1">Shipping Speed</span>
                      <div className="font-medium text-[#1A1A1A]">{lastCompletedOrder.shippingMethod}</div>
                      <div className="text-[#8C8279] mt-1">Payment: {lastCompletedOrder.paymentMethod}</div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#1A1A1A10] space-y-2">
                    <span className="text-[#8C8279] text-[10px] uppercase tracking-widest font-medium block">Items Purchased</span>
                    {lastCompletedOrder.items.map((it) => (
                      <div key={it.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img src={it.variant.image || it.product.images[0]} alt="" className="w-8 h-10 object-cover border border-[#1A1A1A10]" />
                          <div>
                            <div className="font-normal text-[#1A1A1A]">{it.product.title} &times; {it.quantity}</div>
                            <div className="text-[10px] text-[#8C8279]">{it.variant.size} / {it.variant.color}</div>
                          </div>
                        </div>
                        <span className="font-mono font-medium text-[#1A1A1A]">${(it.variant.price * it.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-[#1A1A1A10] flex justify-between text-sm text-[#1A1A1A]">
                    <span className="font-medium">Total Paid</span>
                    <span className="font-serif text-base font-normal">${lastCompletedOrder.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-3 border border-[#1A1A1A15] bg-white text-xs text-[#1A1A1A] hover:bg-[#F5F2EF] transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Receipt</span>
                  </button>
                  <button
                    id="checkout-back-to-store-btn"
                    onClick={() => {
                      setIsCheckoutOpen(false);
                      setActivePage('shop');
                    }}
                    className="flex-1 py-3 bg-[#1A1A1A] text-white text-[10px] uppercase tracking-widest font-semibold hover:bg-[#333] transition-all cursor-pointer"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Order Summary Sidebar */}
          <div className="lg:col-span-5 bg-white p-5 sm:p-6 border border-[#1A1A1A10] h-fit space-y-4">
            <h4 className="font-serif text-base font-normal text-[#1A1A1A]">
              Order Summary ({cart.reduce((t, i) => t + i.quantity, 0)})
            </h4>

            {/* Product list preview */}
            <div className="max-h-60 overflow-y-auto divide-y divide-[#1A1A1A10] pr-1">
              {cart.map((item) => (
                <div key={item.id} className="py-2.5 flex items-center gap-3">
                  <img
                    src={item.variant.image || item.product.images[0]}
                    alt={item.product.title}
                    className="w-12 h-14 object-cover border border-[#1A1A1A10] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-normal text-[#1A1A1A] truncate">{item.product.title}</h5>
                    <div className="text-[11px] text-[#8C8279] font-light">
                      {item.variant.size} &bull; {item.variant.color} &bull; Qty: {item.quantity}
                    </div>
                  </div>
                  <span className="font-mono text-xs font-medium text-[#1A1A1A]">
                    ${(item.variant.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2 text-xs text-[#1A1A1A]/70 pt-3 border-t border-[#1A1A1A10] font-light">
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
                <span>Estimated Sales Tax</span>
                <span className="font-mono font-medium text-[#1A1A1A]">${cartTotals.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-normal text-[#1A1A1A] pt-2 border-t border-[#1A1A1A10]">
                <span className="font-medium">Total Due</span>
                <span className="font-serif text-base font-normal text-[#1A1A1A]">${cartTotals.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Security Guarantee */}
            <div className="pt-2 text-[11px] text-[#8C8279] space-y-1.5 font-light">
              <div className="flex items-center gap-2 text-[#1A1A1A] font-normal">
                <ShieldCheck className="w-4 h-4 text-[#1A1A1A]" />
                <span>Shopify Certified Merchant Protection</span>
              </div>
              <p>
                Need to amend your order before dispatch? Call our concierge at <a href="tel:+14164355850" className="underline font-mono text-[#1A1A1A]">+1 416 435 5850</a>.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
