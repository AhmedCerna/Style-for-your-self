import React from 'react';
import { Sparkles, Gem, ShieldCheck, Heart, ArrowRight, Phone, MapPin } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const AboutPage: React.FC = () => {
  const { setActivePage } = useShop();

  return (
    <div className="min-h-screen bg-[#FDFCFB] pb-24">
      
      {/* Editorial Hero Banner */}
      <section className="relative min-h-[50vh] sm:min-h-[55vh] flex items-center justify-center bg-[#1A1A1A] text-white px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1800&q=80"
            alt="Style For Yourself Studio"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#1A1A1A] via-black/30 to-transparent" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto space-y-4 py-16">
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#8C8279]">
            Our Origin & Ethos
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight">
            Dressing For One's Own Conviction.
          </h1>
          <p className="text-xs sm:text-sm text-white/70 font-light max-w-xl mx-auto leading-relaxed">
            Founded on the principle that true luxury isn't about conforming to seasonal trends—it is about honoring personal individuality through uncompromising craftsmanship.
          </p>
        </div>
      </section>

      {/* Main Story Grid */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 space-y-20">
        
        {/* Section 1: The Brand Origin */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#8C8279]">
              The Manifesto
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1A1A1A] leading-snug">
              Why We Named It <br />
              <span className="italic font-normal">“Style For Yourself”</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#1A1A1A]/70 leading-relaxed font-light">
              In a fashion landscape dominated by fleeting micro-trends and disposable garments, we set out to build an alternative: garments that command respect through weight, texture, proportion, and tailoring.
            </p>
            <p className="text-xs sm:text-sm text-[#1A1A1A]/70 leading-relaxed font-light">
              When you put on a piece from our atelier, you aren't dressing for external validation—you are dressing to articulate your own poise and quiet confidence.
            </p>
          </div>
          <div className="aspect-4/5 overflow-hidden border border-[#1A1A1A10]">
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80"
              alt="Atelier Craft"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Section 2: Craftsmanship Pillars */}
        <div className="bg-[#F5F2EF] p-8 sm:p-12 border border-[#1A1A1A10] space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#8C8279]">
              Zero Compromises
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#1A1A1A]">
              Four Pillars of Our Atelier
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 bg-white border border-[#1A1A1A10] space-y-2.5">
              <div className="w-9 h-9 bg-[#FDFCFB] flex items-center justify-center text-[#1A1A1A] border border-[#1A1A1A10]">
                <Gem className="w-4 h-4" />
              </div>
              <h4 className="font-serif text-base font-normal text-[#1A1A1A]">Ethical Sourcing</h4>
              <p className="text-xs text-[#1A1A1A]/70 leading-relaxed font-light">
                We partner exclusively with multi-generational wool mills in Biella, Italy, and organic silk weavers using OEKO-TEX® certified natural dyes.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#1A1A1A10] space-y-2.5">
              <div className="w-9 h-9 bg-[#FDFCFB] flex items-center justify-center text-[#1A1A1A] border border-[#1A1A1A10]">
                <Sparkles className="w-4 h-4" />
              </div>
              <h4 className="font-serif text-base font-normal text-[#1A1A1A]">Architectural Precision</h4>
              <p className="text-xs text-[#1A1A1A]/70 leading-relaxed font-light">
                Every pattern undergoes over 40 hours of draping and fit testing across diverse body silhouettes to guarantee effortless posture support.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#1A1A1A10] space-y-2.5">
              <div className="w-9 h-9 bg-[#FDFCFB] flex items-center justify-center text-[#1A1A1A] border border-[#1A1A1A10]">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="font-serif text-base font-normal text-[#1A1A1A]">Enduring Longevity</h4>
              <p className="text-xs text-[#1A1A1A]/70 leading-relaxed font-light">
                Reinforced horn buttons, French-seamed linings, and double-brushed hems designed to maintain structural beauty for decades.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#1A1A1A10] space-y-2.5">
              <div className="w-9 h-9 bg-[#FDFCFB] flex items-center justify-center text-[#1A1A1A] border border-[#1A1A1A10]">
                <Heart className="w-4 h-4" />
              </div>
              <h4 className="font-serif text-base font-normal text-[#1A1A1A]">Direct Atelier Care</h4>
              <p className="text-xs text-[#1A1A1A]/70 leading-relaxed font-light">
                Our clients enjoy dedicated telephone styling lines and lifetime complimentary garment care advice directly from our Toronto showroom.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Flagship Showroom & Contact CTA */}
        <div className="bg-[#1A1A1A] text-white p-8 sm:p-14 text-center space-y-6">
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#8C8279]">
            Private Showroom
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl font-normal">
            Visit Us in Yorkville, Toronto
          </h3>
          <p className="text-xs sm:text-sm text-white/70 font-light max-w-lg mx-auto leading-relaxed">
            Experience our full ready-to-wear catalog in person, touch the fabrics, and receive complimentary bespoke fitting consultations.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setActivePage('shop')}
              className="px-8 py-3.5 bg-white text-[#1A1A1A] text-[10px] uppercase tracking-widest font-semibold hover:bg-[#F5F2EF] transition-all cursor-pointer"
            >
              Shop The Ready-To-Wear
            </button>
            <button
              onClick={() => setActivePage('contact')}
              className="px-8 py-3.5 bg-transparent border border-white/30 text-white text-[10px] uppercase tracking-widest font-semibold hover:bg-white/10 transition-all cursor-pointer"
            >
              Book an Appointment
            </button>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-stone-400">
            <span className="flex items-center gap-1.5 text-[11px]">
              <MapPin className="w-3.5 h-3.5 text-white/70" />
              <span>180 Bloor Street West, Suite 400, Toronto ON</span>
            </span>
            <span className="flex items-center gap-1.5 font-mono text-[11px]">
              <Phone className="w-3.5 h-3.5 text-white/70" />
              <a href="tel:+14164355850" className="hover:text-white">+1 416 435 5850</a>
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};
