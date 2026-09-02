import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useShop();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    orderNumber: '',
    subject: 'Styling & Fit Consultation',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please complete all required fields.', 'error');
      return;
    }

    setSubmitted(true);
    showToast('Your message has been received by our concierge.', 'success');
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] pb-24">
      
      {/* Header Banner */}
      <div className="bg-[#FDFCFB] border-b border-[#1A1A1A10] py-12 sm:py-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-3">
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#8C8279]">
            Client Concierge & Atelier Direct
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#1A1A1A]">
            We Are At Your Service
          </h1>
          <p className="text-xs sm:text-sm text-[#1A1A1A]/70 font-light max-w-xl mx-auto leading-relaxed">
            Whether you need sizing counsel, order tracking updates, or private showroom appointment bookings, our Toronto styling directors are standing by.
          </p>
        </div>
      </div>

      {/* Main Grid: Contact Details & Interactive Form */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Direct Phone Lines, Address, Hours */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary Phone Box */}
            <div className="p-6 bg-[#1A1A1A] text-white space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-white text-[#1A1A1A]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-[#8C8279] font-semibold">
                    Direct Telephone Lines
                  </span>
                  <h3 className="font-serif text-lg font-normal">Call Our Stylists Direct</h3>
                </div>
              </div>

              <p className="text-xs text-white/70 font-light leading-relaxed">
                Connect with our showroom directly for instantaneous size recommendations, stock queries, or urgent dispatch amendments:
              </p>

              <div className="space-y-2 pt-2">
                <a
                  id="contact-phone-primary"
                  href="tel:+14164355850"
                  className="w-full p-3.5 bg-white/5 hover:bg-white/10 border border-white/15 flex items-center justify-between transition-colors group"
                >
                  <div>
                    <div className="text-[9px] text-[#8C8279] uppercase font-semibold tracking-wider">Primary Client Line</div>
                    <div className="font-mono text-sm font-semibold text-white group-hover:text-white">+1 416 435 5850</div>
                  </div>
                  <span className="text-[10px] text-white/70 uppercase tracking-widest group-hover:underline">Direct Call &rarr;</span>
                </a>

                <a
                  id="contact-phone-secondary"
                  href="tel:+14163448541"
                  className="w-full p-3.5 bg-white/5 hover:bg-white/10 border border-white/15 flex items-center justify-between transition-colors group"
                >
                  <div>
                    <div className="text-[9px] text-[#8C8279] uppercase font-semibold tracking-wider">Secondary Atelier Line</div>
                    <div className="font-mono text-sm font-semibold text-white group-hover:text-white">+1 416 344 8541</div>
                  </div>
                  <span className="text-[10px] text-white/70 uppercase tracking-widest group-hover:underline">Direct Call &rarr;</span>
                </a>
              </div>
            </div>

            {/* Email & Showroom Address Cards */}
            <div className="p-6 bg-white border border-[#1A1A1A10] space-y-4">
              <div className="flex items-center gap-3 text-[#1A1A1A]">
                <div className="p-2 bg-[#F5F2EF] text-[#1A1A1A] border border-[#1A1A1A10]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-normal">Written Inquiries</h4>
                  <p className="text-[11px] text-[#8C8279]">Average reply time under 2 business hours</p>
                </div>
              </div>
              <div className="space-y-1.5 text-xs text-[#1A1A1A] font-mono">
                <div>Concierge: <a href="mailto:concierge@styleforyourself.com" className="text-[#1A1A1A] underline">concierge@styleforyourself.com</a></div>
                <div>Private Fitting: <a href="mailto:styling@styleforyourself.com" className="text-[#1A1A1A] underline">styling@styleforyourself.com</a></div>
              </div>
            </div>

            {/* Location & Business Hours */}
            <div className="p-6 bg-white border border-[#1A1A1A10] space-y-4">
              <div className="flex items-center gap-3 text-[#1A1A1A]">
                <div className="p-2 bg-[#F5F2EF] text-[#1A1A1A] border border-[#1A1A1A10]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-normal">Flagship Showroom</h4>
                  <p className="text-[11px] text-[#8C8279]">Yorkville Fashion District</p>
                </div>
              </div>
              <div className="text-xs text-[#1A1A1A]/80 leading-relaxed font-light">
                <strong className="font-normal text-[#1A1A1A]">Style For Yourself Atelier</strong><br />
                180 Bloor Street West, Suite 400<br />
                Toronto, Ontario M5S 2V6, Canada
              </div>

              <div className="pt-2 border-t border-[#1A1A1A10] flex items-start gap-2.5 text-xs text-[#1A1A1A]/70 font-light">
                <Clock className="w-4 h-4 text-[#1A1A1A] shrink-0 mt-0.5" />
                <div className="space-y-0.5 text-[11px]">
                  <div><strong>Monday &ndash; Friday:</strong> 9:00 AM &ndash; 7:00 PM EST</div>
                  <div><strong>Saturday:</strong> 10:00 AM &ndash; 6:00 PM EST</div>
                  <div><strong>Sunday:</strong> By private appointment only</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Contact & Appointment Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 border border-[#1A1A1A10]">
            
            {submitted ? (
              <div className="py-16 text-center space-y-4 animate-in zoom-in-95 duration-200">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto border border-emerald-200">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-2xl font-normal text-[#1A1A1A]">
                  Message Dispatched
                </h3>
                <p className="text-xs sm:text-sm text-[#1A1A1A]/70 max-w-md mx-auto leading-relaxed font-light">
                  Thank you, <strong>{formData.name}</strong>. A member of our styling concierge team will review your inquiry and contact you at <strong>{formData.email}</strong> promptly.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        orderNumber: '',
                        subject: 'Styling & Fit Consultation',
                        message: ''
                      });
                    }}
                    className="px-6 py-2.5 bg-[#1A1A1A] text-white text-[10px] uppercase tracking-widest font-semibold cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#8C8279]">
                    Direct Atelier Dispatch
                  </span>
                  <h3 className="font-serif text-2xl font-normal text-[#1A1A1A] mt-1">
                    Send an Inquiry
                  </h3>
                  <p className="text-xs text-[#8C8279] mt-1 font-light">
                    Please provide your details below and a concierge director will respond within 2 hours.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#1A1A1A] mb-1">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="contact-input-name"
                      type="text"
                      required
                      placeholder="e.g. Charlotte Sterling"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FDFCFB] border border-[#1A1A1A15] text-xs text-[#1A1A1A] focus:outline-hidden focus:border-[#1A1A1A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#1A1A1A] mb-1">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="contact-input-email"
                      type="email"
                      required
                      placeholder="charlotte@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FDFCFB] border border-[#1A1A1A15] text-xs text-[#1A1A1A] focus:outline-hidden focus:border-[#1A1A1A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#1A1A1A] mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      id="contact-input-phone"
                      type="tel"
                      placeholder="+1 (416) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FDFCFB] border border-[#1A1A1A15] text-xs text-[#1A1A1A] focus:outline-hidden focus:border-[#1A1A1A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#1A1A1A] mb-1">
                      Order Reference # (If applicable)
                    </label>
                    <input
                      id="contact-input-order"
                      type="text"
                      placeholder="e.g. SFY-94820"
                      value={formData.orderNumber}
                      onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FDFCFB] border border-[#1A1A1A15] text-xs text-[#1A1A1A] focus:outline-hidden focus:border-[#1A1A1A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#1A1A1A] mb-1">
                    Inquiry Topic
                  </label>
                  <select
                    id="contact-select-subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FDFCFB] border border-[#1A1A1A15] text-xs text-[#1A1A1A] focus:outline-hidden focus:border-[#1A1A1A] cursor-pointer"
                  >
                    <option value="Styling & Fit Consultation">Styling & Fit Consultation</option>
                    <option value="Showroom Fitting Appointment">Private Showroom Appointment (Toronto)</option>
                    <option value="Order Tracking & Expedited Dispatch">Order Tracking & Expedited Dispatch</option>
                    <option value="30-Day Returns & Exchanges">Returns & Exchanges</option>
                    <option value="Press & VIP Wholesale">Press & Wholesale Inquiries</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#1A1A1A] mb-1">
                    Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="contact-textarea-message"
                    required
                    rows={4}
                    placeholder="How may our stylists assist you today? Let us know your garment preferences or appointment requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FDFCFB] border border-[#1A1A1A15] text-xs text-[#1A1A1A] focus:outline-hidden focus:border-[#1A1A1A] font-light"
                  />
                </div>

                <button
                  id="contact-submit-btn"
                  type="submit"
                  className="w-full py-4 bg-[#1A1A1A] text-white text-[10px] uppercase tracking-widest font-semibold hover:bg-[#333333] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 text-white" />
                  <span>Transmit Inquiry to Concierge</span>
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] text-[#8C8279] pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#1A1A1A]" />
                  <span>Your personal contact information is protected under Canadian privacy standards.</span>
                </div>

              </form>
            )}

          </div>

        </div>
      </div>

    </div>
  );
};
