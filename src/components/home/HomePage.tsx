import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Gem, 
  Instagram, 
  Phone
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { ProductCard } from '../shop/ProductCard';
import { shopifyService } from '../../services/shopify';
import { PRESS_MENTIONS, INSTAGRAM_FEED } from '../../data/mockData';
import { Product } from '../../types';

export const HomePage: React.FC = () => {
  const { setActivePage, navigateToCollection, showToast } = useShop();
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [quickHeroEmail, setQuickHeroEmail] = useState('');

  useEffect(() => {
    shopifyService.getBestSellers().then(setBestSellers);
    shopifyService.getNewArrivals().then(setNewArrivals);
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent, email: string, setEmail: (val: string) => void) => {
    e.preventDefault();
    if (!email) return;
    showToast(`VIP invitation sent to ${email}! Welcome code: STYLE15`, 'success');
    setEmail('');
  };

  const topSellerProduct = bestSellers[0];

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#1A1A1A]">
      
      {/* 1. SIGNATURE EDITORIAL HERO GRID */}
      <section className="border-b border-[#1A1A1A10]">
        <div className="max-w-[1500px] mx-auto p-4 sm:p-6 lg:p-8">
          
          {/* Desktop Asymmetric Editorial Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Column 1: Editorial Visual Spotlight / Limited Edition */}
            <div className="lg:col-span-4 relative min-h-[460px] lg:min-h-[640px] rounded-xs overflow-hidden flex flex-col justify-end p-8 sm:p-10 text-white group cursor-pointer"
                 onClick={() => navigateToCollection('New Arrivals')}>
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-105"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1200")' }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
              
              <div className="relative z-10 space-y-3">
                <span className="text-[10px] uppercase tracking-[0.35em] font-semibold text-white/80 block">
                  Limited Edition
                </span>
                <h2 className="font-serif text-4xl sm:text-5xl leading-none italic font-normal text-white">
                  Velvet <br />Silence
                </h2>
                <p className="text-xs text-white/70 font-light max-w-xs">
                  Sculptural bias-cut garments and brushed virgin wool tailored for quiet authority.
                </p>
                <div className="pt-3">
                  <button 
                    id="hero-view-collection-btn"
                    className="border border-white text-white px-8 py-3 text-[10px] uppercase tracking-widest font-semibold hover:bg-white hover:text-black transition-colors"
                  >
                    View Collection
                  </button>
                </div>
              </div>
            </div>

            {/* Column 2: Main Brand Typography & Category Previews */}
            <div className="lg:col-span-5 flex flex-col justify-between py-4 lg:px-6">
              
              <div className="my-auto py-6 space-y-6">
                <div className="inline-flex items-center gap-2">
                  <span className="text-[11px] uppercase tracking-[0.4em] block text-[#8C8279] font-medium">
                    Atelier &bull; 2026 Collection
                  </span>
                </div>

                <h1 className="font-serif text-5xl sm:text-6xl lg:text-[68px] leading-[0.95] font-normal text-[#1A1A1A]">
                  Define Your <br />
                  Style. Wear <br />
                  <span className="italic font-normal">Confidence.</span>
                </h1>

                <p className="text-sm leading-relaxed text-[#1A1A1A]/70 max-w-[420px] font-light">
                  Experience curated luxury designed for the modern individual. Our pieces blend timeless elegance with contemporary edge, ensuring you stand out with quiet confidence.
                </p>

                <div className="flex flex-wrap gap-4 pt-2">
                  <button
                    id="hero-shop-btn"
                    onClick={() => setActivePage('shop')}
                    className="bg-[#1A1A1A] text-white px-9 py-4 text-[11px] uppercase tracking-widest font-semibold rounded-full hover:bg-[#333333] transition-all cursor-pointer shadow-xs active:scale-98"
                  >
                    Shop The Store
                  </button>
                  <button
                    id="hero-contact-btn"
                    onClick={() => setActivePage('contact')}
                    className="border border-[#1A1A1A] text-[#1A1A1A] px-9 py-4 text-[11px] uppercase tracking-widest font-semibold rounded-full hover:bg-[#1A1A1A] hover:text-white transition-all cursor-pointer active:scale-98"
                  >
                    Contact Atelier
                  </button>
                </div>

                <div className="pt-2 flex items-center gap-3 text-[11px] text-[#8C8279] tracking-wider uppercase">
                  <span>Showroom Concierge:</span>
                  <a href="tel:+14164355850" className="text-[#1A1A1A] font-mono font-bold hover:underline">
                    +1 416 435 5850
                  </a>
                </div>
              </div>

              {/* Bottom Row Category Highlights */}
              <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-[#1A1A1A10]">
                <div 
                  onClick={() => navigateToCollection('Dresses')}
                  className="border border-[#1A1A1A10] p-5 sm:p-6 flex flex-col justify-between hover:bg-[#F5F2EF] cursor-pointer transition-colors group"
                >
                  <span className="text-[10px] font-semibold text-[#8C8279] uppercase tracking-widest group-hover:text-[#1A1A1A]">
                    Category 01
                  </span>
                  <span className="font-serif text-2xl text-[#1A1A1A] mt-2">Dresses & Silk</span>
                </div>

                <div 
                  onClick={() => navigateToCollection('Jackets')}
                  className="border border-[#1A1A1A10] p-5 sm:p-6 flex flex-col justify-between hover:bg-[#F5F2EF] cursor-pointer transition-colors group"
                >
                  <span className="text-[10px] font-semibold text-[#8C8279] uppercase tracking-widest group-hover:text-[#1A1A1A]">
                    Category 02
                  </span>
                  <span className="font-serif text-2xl text-[#1A1A1A] mt-2">Outerwear & Coats</span>
                </div>
              </div>

            </div>

            {/* Column 3: Top Seller Preview & Inner Circle Newsletter */}
            <div className="lg:col-span-3 flex flex-col gap-6">
              
              {/* Top Seller Card */}
              <div 
                onClick={() => topSellerProduct && setActivePage('shop')}
                className="flex-1 bg-[#F5F2EF] p-6 flex flex-col justify-between border border-[#1A1A1A0A] hover:border-[#1A1A1A20] transition-all cursor-pointer group"
              >
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]">
                    Top Seller
                  </span>
                  <span className="font-serif italic text-base text-[#1A1A1A]">
                    ${topSellerProduct?.price || 189}.00
                  </span>
                </div>

                <div 
                  className="h-44 sm:h-52 w-full bg-cover bg-center my-4 overflow-hidden rounded-xs"
                  style={{ backgroundImage: `url("${topSellerProduct?.images[0] || 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=600'}")` }}
                />

                <div>
                  <h3 className="text-sm font-semibold text-[#1A1A1A] group-hover:underline">
                    {topSellerProduct?.title || 'Asymmetric Silk Top'}
                  </h3>
                  <p className="text-[10px] text-[#8C8279] uppercase tracking-wider mt-0.5">
                    {topSellerProduct?.availableColors.length || 4} Atelier Colorways
                  </p>
                </div>
              </div>

              {/* Newsletter Block */}
              <div className="bg-[#1A1A1A] text-white p-6 sm:p-7 flex flex-col justify-center text-center">
                <h4 className="font-serif text-2xl italic mb-1 text-white">Newsletter</h4>
                <p className="text-[10px] text-white/60 uppercase tracking-widest mb-5">
                  Join the inner circle
                </p>
                <form onSubmit={(e) => handleNewsletterSubmit(e, quickHeroEmail, setQuickHeroEmail)}>
                  <input
                    type="email"
                    required
                    placeholder="EMAIL ADDRESS"
                    value={quickHeroEmail}
                    onChange={(e) => setQuickHeroEmail(e.target.value)}
                    className="w-full bg-transparent border-b border-white/30 py-2 text-[10px] uppercase tracking-widest text-center mb-4 focus:outline-hidden focus:border-white text-white placeholder-white/40"
                  />
                  <button 
                    type="submit"
                    className="text-[10px] font-bold tracking-[0.25em] uppercase text-white hover:text-[#D8B47E] transition-colors cursor-pointer"
                  >
                    Subscribe &rarr;
                  </button>
                </form>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 2. EDITORIAL VALUE PROPOSITIONS BAR */}
      <section className="border-b border-[#1A1A1A10] bg-[#F5F2EF] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 text-[#1A1A1A]">
          
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-white border border-[#1A1A1A10] text-[#1A1A1A] shrink-0">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-wider font-bold text-[#1A1A1A]">Complimentary Express</h4>
              <p className="text-[11px] text-[#8C8279]">Free delivery on orders over $100</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-white border border-[#1A1A1A10] text-[#1A1A1A] shrink-0">
              <Gem className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-wider font-bold text-[#1A1A1A]">Artisanal Fabrics</h4>
              <p className="text-[11px] text-[#8C8279]">Ethical cashmere, linen & mulberry silk</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-white border border-[#1A1A1A10] text-[#1A1A1A] shrink-0">
              <RotateCcw className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-wider font-bold text-[#1A1A1A]">30-Day Returns</h4>
              <p className="text-[11px] text-[#8C8279]">Pre-paid labels in every dispatch</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-white border border-[#1A1A1A10] text-[#1A1A1A] shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-wider font-bold text-[#1A1A1A]">Concierge Care</h4>
              <p className="text-[11px] text-[#8C8279]">Stylist line +1 416 435 5850</p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. SIGNATURE WARDROBE PILLARS */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 pb-4 border-b border-[#1A1A1A10]">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#8C8279]">
              Curated Capsules
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1A1A1A] mt-1">
              Wardrobe Pillars
            </h2>
          </div>
          <button
            id="home-view-all-collections"
            onClick={() => setActivePage('collections')}
            className="text-[11px] font-semibold uppercase tracking-widest text-[#1A1A1A] hover:opacity-60 flex items-center gap-1.5 transition-opacity cursor-pointer"
          >
            <span>View All Collections</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Women */}
          <div
            onClick={() => navigateToCollection('Women')}
            className="group relative h-[460px] overflow-hidden cursor-pointer border border-[#1A1A1A10] bg-[#F5F2EF]"
          >
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80"
              alt="Women's Collection"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 p-6 text-white space-y-1.5">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/70 font-semibold">Capsule 01</span>
              <h3 className="font-serif text-3xl font-normal italic">Women's Tailoring</h3>
              <p className="text-xs text-white/70 font-light">Silk blouses, bias slip dresses & structured blazers</p>
              <div className="pt-2 text-[10px] font-semibold uppercase tracking-widest text-white underline underline-offset-4">
                Explore Collection &rarr;
              </div>
            </div>
          </div>

          {/* Card 2: Men */}
          <div
            onClick={() => navigateToCollection('Men')}
            className="group relative h-[460px] overflow-hidden cursor-pointer border border-[#1A1A1A10] bg-[#F5F2EF]"
          >
            <img
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80"
              alt="Men's Collection"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 p-6 text-white space-y-1.5">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/70 font-semibold">Capsule 02</span>
              <h3 className="font-serif text-3xl font-normal italic">Men's Sartorial</h3>
              <p className="text-xs text-white/70 font-light">Double-breasted blazers, poplin shirts & wool trousers</p>
              <div className="pt-2 text-[10px] font-semibold uppercase tracking-widest text-white underline underline-offset-4">
                Explore Collection &rarr;
              </div>
            </div>
          </div>

          {/* Card 3: Coats */}
          <div
            onClick={() => navigateToCollection('Jackets')}
            className="group relative h-[460px] overflow-hidden cursor-pointer border border-[#1A1A1A10] bg-[#F5F2EF]"
          >
            <img
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=80"
              alt="Outerwear Collection"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 p-6 text-white space-y-1.5">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/70 font-semibold">Capsule 03</span>
              <h3 className="font-serif text-3xl font-normal italic">Outerwear & Coats</h3>
              <p className="text-xs text-white/70 font-light">Double-faced cashmere, storm coats & trench outerwear</p>
              <div className="pt-2 text-[10px] font-semibold uppercase tracking-widest text-white underline underline-offset-4">
                Explore Collection &rarr;
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BEST SELLERS SECTION */}
      <section className="py-16 sm:py-24 bg-[#F5F2EF] border-y border-[#1A1A1A10] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#8C8279]">
              Client Favorites
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-normal text-[#1A1A1A]">
              The Best Sellers
            </h2>
            <p className="text-xs sm:text-sm text-[#1A1A1A]/70 font-light">
              Enduring silhouettes rigorously acclaimed for drape, material weight, and versatile presence.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {bestSellers.slice(0, 4).map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              id="home-view-all-bestsellers"
              onClick={() => setActivePage('shop')}
              className="px-10 py-4 rounded-full bg-[#1A1A1A] text-white text-[11px] uppercase tracking-widest font-semibold hover:bg-[#333333] transition-all cursor-pointer"
            >
              Shop All Bestsellers
            </button>
          </div>
        </div>
      </section>

      {/* 5. EDITORIAL LOOKBOOK BANNER */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative overflow-hidden bg-[#1A1A1A] text-white grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
          
          <div className="lg:col-span-6 p-8 sm:p-14 lg:p-16 flex flex-col justify-between space-y-6 z-10">
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.35em] font-semibold text-white/60">
                Atelier Manifesto
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl font-normal leading-tight">
                Crafted to Outlast <br />
                <span className="italic font-normal">Fleeting Trends.</span>
              </h2>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed max-w-md">
                Every seam is finished with French craftsmanship. We source ethically certified virgin wool from Northern Italy and mulberry silk from traditional looms to ensure every garment feels as luxurious on year ten as on day one.
              </p>
            </div>

            <div className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4 text-xs border-t border-white/20 pt-4">
                <div>
                  <div className="font-serif text-3xl font-normal text-white">100%</div>
                  <div className="text-white/60 text-[10px] uppercase tracking-wider">Ethical Silk & Wool</div>
                </div>
                <div>
                  <div className="font-serif text-3xl font-normal text-white">0%</div>
                  <div className="text-white/60 text-[10px] uppercase tracking-wider">Disposable Waste</div>
                </div>
              </div>

              <button
                id="home-editorial-about-btn"
                onClick={() => setActivePage('about')}
                className="px-8 py-3.5 rounded-full bg-white text-[#1A1A1A] text-[11px] uppercase tracking-widest font-semibold hover:bg-[#F5F2EF] transition-all cursor-pointer"
              >
                Read Atelier Manifesto
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 relative min-h-[300px] lg:min-h-full">
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80"
              alt="Editorial Atelier"
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </section>

      {/* 6. NEW ARRIVALS GRID */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#1A1A1A10]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 pb-4 border-b border-[#1A1A1A10]">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#8C8279]">
              Latest Additions
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1A1A1A] mt-1">
              New Arrivals This Week
            </h2>
          </div>
          <button
            id="home-view-all-new"
            onClick={() => navigateToCollection('New Arrivals')}
            className="text-[11px] font-semibold uppercase tracking-widest text-[#1A1A1A] hover:opacity-60 flex items-center gap-1.5 transition-opacity cursor-pointer"
          >
            <span>View All New Arrivals</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {newArrivals.slice(0, 4).map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* 7. PRESS & REVIEWS */}
      <section className="py-16 sm:py-20 bg-[#F5F2EF] border-y border-[#1A1A1A10] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-1">
            <span className="text-[10px] uppercase tracking-[0.35em] font-semibold text-[#8C8279]">
              Editorial Acclaim
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-normal text-[#1A1A1A]">
              As Featured In
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRESS_MENTIONS.map((item, idx) => (
              <div key={idx} className="p-8 bg-white border border-[#1A1A1A10] space-y-3">
                <div className="text-xs font-bold text-[#1A1A1A] tracking-[0.2em] uppercase font-sans">
                  {item.outlet}
                </div>
                <p className="text-sm text-[#1A1A1A]/80 italic font-serif leading-relaxed">
                  "{item.quote}"
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. INSTAGRAM FEED */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-2 mb-12">
          <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-semibold text-[#8C8279]">
            <Instagram className="w-3.5 h-3.5 text-[#1A1A1A]" />
            <span>@StyleForYourself</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1A1A1A]">
            Worn By You &bull; #StyleForYourself
          </h2>
          <p className="text-xs text-[#8C8279]">
            Tag us in your sartorial captures for private seasonal showroom invitations.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {INSTAGRAM_FEED.map((post) => (
            <div
              key={post.id}
              className="group relative aspect-square overflow-hidden bg-stone-200 cursor-pointer border border-[#1A1A1A10]"
              onClick={() => setActivePage('shop')}
            >
              <img
                src={post.image}
                alt="Instagram look"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 text-center text-white">
                <div className="space-y-1">
                  <Instagram className="w-5 h-5 mx-auto text-white" />
                  <p className="text-xs font-semibold">{post.handle}</p>
                  <p className="text-[10px] text-white/80 line-clamp-2">{post.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. VIP CONCIERGE NEWSLETTER */}
      <section className="bg-[#1A1A1A] text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <span className="text-[10px] uppercase tracking-[0.35em] font-semibold text-white/60">
            Private Client Register
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-normal">
            Receive $50 Toward Your First Order
          </h2>
          <p className="text-xs sm:text-sm text-white/70 font-light max-w-xl mx-auto leading-relaxed">
            Subscribe to receive private seasonal sale access, made-to-measure styling guides, and first dispatch on limited capsules.
          </p>

          <form onSubmit={(e) => handleNewsletterSubmit(e, newsletterEmail, setNewsletterEmail)} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              id="home-newsletter-email"
              type="email"
              placeholder="ENTER YOUR EMAIL..."
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="flex-1 px-5 py-3.5 bg-white/10 border border-white/20 text-xs text-white placeholder-white/40 focus:outline-hidden focus:border-white uppercase tracking-wider"
            />
            <button
              id="home-newsletter-submit-btn"
              type="submit"
              className="px-8 py-3.5 bg-white text-[#1A1A1A] text-[11px] uppercase tracking-widest font-semibold hover:bg-[#F5F2EF] transition-all cursor-pointer"
            >
              Join Register
            </button>
          </form>
        </div>
      </section>

    </div>
  );
};
