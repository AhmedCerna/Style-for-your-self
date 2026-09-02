import React, { useState, useEffect } from 'react';
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  Ruler, 
  ChevronDown, 
  ChevronRight, 
  Phone, 
  Sparkles, 
  Check, 
  Plus, 
  Minus,
  MessageSquare,
  ThumbsUp
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { SizeGuideModal } from './SizeGuideModal';
import { ProductCard } from '../shop/ProductCard';
import { shopifyService } from '../../services/shopify';
import { REVIEWS_DATA } from '../../data/mockData';
import { Product, Review, CategoryType } from '../../types';

export const ProductDetailsPage: React.FC = () => {
  const { 
    selectedProduct, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setIsCheckoutOpen,
    setActivePage,
    navigateToCollection,
    showToast
  } = useShop();

  const product = selectedProduct;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string | null>('details');
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>(REVIEWS_DATA);
  const [showReviewForm, setShowReviewForm] = useState(false);

  // New Review Form State
  const [newReview, setNewReview] = useState({
    author: '',
    rating: 5,
    title: '',
    comment: '',
    sizePurchased: 'Size M',
    fitFeedback: 'True to Size' as const
  });

  useEffect(() => {
    if (product) {
      setActiveImageIndex(0);
      setSelectedSize(product.availableSizes[0] || 'M');
      setSelectedColorIndex(0);
      setQuantity(1);

      shopifyService.getRelatedProducts(product, 4).then(setRelatedProducts);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-serif text-2xl text-stone-800">No product selected</h2>
        <button
          onClick={() => setActivePage('shop')}
          className="mt-4 px-6 py-2.5 rounded-full bg-[#141312] text-white text-xs uppercase tracking-widest font-semibold"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const activeColor = product.availableColors[selectedColorIndex] || product.availableColors[0];
  const isFavorited = isInWishlist(product.id);

  const selectedVariant = product.variants.find(
    v => v.size === selectedSize && (v.color === activeColor?.name || true)
  ) || product.variants[0];

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedVariant, quantity);
    setIsCheckoutOpen(true);
  };

  const toggleAccordion = (section: string) => {
    setActiveAccordion(prev => prev === section ? null : section);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.author || !newReview.comment) {
      showToast('Please fill out all review fields', 'error');
      return;
    }

    const createdReview: Review = {
      id: `rev-${Date.now()}`,
      author: newReview.author,
      rating: newReview.rating,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      title: newReview.title || 'Exceptional Quality',
      comment: newReview.comment,
      verified: true,
      fitFeedback: newReview.fitFeedback,
      sizePurchased: `${newReview.sizePurchased} in ${activeColor?.name || 'Standard'}`,
      helpfulCount: 1
    };

    setReviews(prev => [createdReview, ...prev]);
    setShowReviewForm(false);
    showToast('Thank you! Your verified review has been published.', 'success');
  };

  const discountPercent = product.compareAtPrice && product.compareAtPrice > product.price
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-[#FDFCFB] pb-24">
      
      {/* Breadcrumb Navigation */}
      <div className="border-b border-[#1A1A1A10] bg-[#FDFCFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-4 flex items-center gap-2 text-[11px] text-[#8C8279] overflow-x-auto whitespace-nowrap uppercase tracking-wider">
          <button onClick={() => setActivePage('home')} className="hover:text-[#1A1A1A] cursor-pointer">Home</button>
          <span>/</span>
          <button onClick={() => setActivePage('shop')} className="hover:text-[#1A1A1A] cursor-pointer">Catalog</button>
          <span>/</span>
          <button onClick={() => navigateToCollection(product.category)} className="hover:text-[#1A1A1A] font-semibold text-[#1A1A1A] cursor-pointer">
            {product.category}
          </button>
          <span>/</span>
          <span className="text-[#8C8279] truncate max-w-xs">{product.title}</span>
        </div>
      </div>

      {/* Main Product Display Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-8 lg:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
          
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Main Stage Image */}
            <div className="relative aspect-3/4 w-full bg-[#F5F2EF] border border-[#1A1A1A10] group">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-102"
              />

              {/* Floating Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                {discountPercent > 0 && (
                  <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest bg-[#1A1A1A] text-white">
                    -{discountPercent}% OFF
                  </span>
                )}
                {product.isNew && (
                  <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest bg-white text-[#1A1A1A] border border-[#1A1A1A20]">
                    New Season
                  </span>
                )}
              </div>

              {/* Floating Wishlist Button */}
              <button
                id="product-detail-wishlist-toggle"
                onClick={() => toggleWishlist(product)}
                aria-label="Wishlist toggle"
                className={`absolute top-4 right-4 p-3 backdrop-blur-md transition-all shadow-xs cursor-pointer ${
                  isFavorited 
                    ? 'bg-white text-rose-600' 
                    : 'bg-white/90 text-[#1A1A1A] hover:bg-white'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-600' : ''}`} />
              </button>
            </div>

            {/* Thumbnail Strip */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    id={`thumb-btn-${idx}`}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 sm:w-24 aspect-3/4 border transition-all shrink-0 cursor-pointer ${
                      activeImageIndex === idx 
                        ? 'border-[#1A1A1A] ring-1 ring-[#1A1A1A]' 
                        : 'border-[#1A1A1A15] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Atelier Direct Phone Consultation Banner */}
            <div className="p-4 bg-[#F5F2EF] border border-[#1A1A1A10] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3 text-[#1A1A1A]">
                <div className="p-2 bg-[#1A1A1A] text-white">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-serif font-normal text-[#1A1A1A] text-sm">Need personal drape or sizing consultation?</div>
                  <div className="text-[11px] text-[#8C8279]">Connect with our Atelier stylist specialists directly:</div>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <a
                  id="product-call-link-1"
                  href="tel:+14164355850"
                  className="px-3 py-2 bg-white hover:bg-[#FDFCFB] border border-[#1A1A1A15] font-mono text-[11px] font-semibold text-[#1A1A1A] transition-colors"
                >
                  +1 416 435 5850
                </a>
                <a
                  id="product-call-link-2"
                  href="tel:+14163448541"
                  className="px-3 py-2 bg-white hover:bg-[#FDFCFB] border border-[#1A1A1A15] font-mono text-[11px] font-semibold text-[#1A1A1A] transition-colors"
                >
                  +1 416 344 8541
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Purchasing & Specifications */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Header / Titles */}
            <div className="space-y-2 border-b border-[#1A1A1A10] pb-6">
              <div className="flex items-center justify-between text-xs">
                <span className="uppercase tracking-[0.25em] font-semibold text-[#8C8279] text-[10px]">
                  {product.category} &bull; {product.gender}
                </span>
                <span className="font-mono text-[#8C8279] text-[10px]">
                  SKU: {selectedVariant.sku}
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#1A1A1A] tracking-tight">
                {product.title}
              </h1>

              {product.subtitle && (
                <p className="font-serif italic text-sm text-[#8C8279]">
                  {product.subtitle}
                </p>
              )}

              {/* Reviews rating */}
              <div className="flex items-center gap-2 pt-1">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-[#1A1A1A]">{product.rating}</span>
                <span className="text-[11px] text-[#8C8279]">&bull; {reviews.length} Client Reviews</span>
              </div>

              {/* Price block */}
              <div className="flex items-baseline gap-3 pt-2">
                <span className="font-serif text-3xl font-normal italic text-[#1A1A1A]">
                  ${product.price}.00
                </span>
                {product.compareAtPrice && product.compareAtPrice > product.price && (
                  <>
                    <span className="text-base text-[#8C8279] line-through font-serif italic">
                      ${product.compareAtPrice}.00
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 bg-[#1A1A1A] text-white">
                      Save ${(product.compareAtPrice - product.price).toFixed(2)}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Description Short */}
            <p className="text-xs sm:text-sm text-[#1A1A1A]/80 leading-relaxed font-light">
              {product.description}
            </p>

            {/* Color Swatches Selection */}
            {product.availableColors && product.availableColors.length > 0 && (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[11px] uppercase tracking-widest font-semibold text-[#1A1A1A]">
                    Shade: <strong className="font-serif font-normal italic ml-1">{activeColor?.name}</strong>
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.availableColors.map((color, idx) => (
                    <button
                      key={color.name}
                      id={`product-color-${idx}`}
                      onClick={() => setSelectedColorIndex(idx)}
                      className={`flex items-center gap-2 px-3.5 py-2 border text-[11px] transition-all cursor-pointer ${
                        selectedColorIndex === idx
                          ? 'border-[#1A1A1A] bg-[#F5F2EF] text-[#1A1A1A] font-semibold'
                          : 'border-[#1A1A1A15] bg-white text-[#1A1A1A]/70 hover:bg-[#FAF8F5]'
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full border border-stone-300" style={{ backgroundColor: color.hex }} />
                      <span>{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector + Size Guide Modal Trigger */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[11px] uppercase tracking-widest font-semibold text-[#1A1A1A]">
                  Select Size
                </span>
                <button
                  id="product-open-size-guide"
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-[11px] text-[#1A1A1A] underline uppercase tracking-wider font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size & Drape Guide</span>
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {product.availableSizes.map((sz) => (
                  <button
                    key={sz}
                    id={`product-size-btn-${sz}`}
                    onClick={() => setSelectedSize(sz)}
                    className={`py-3 border text-xs uppercase font-semibold transition-all text-center cursor-pointer ${
                      selectedSize === sz
                        ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                        : 'bg-white text-[#1A1A1A] border-[#1A1A1A15] hover:border-[#1A1A1A]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector + Inventory Indicator */}
            <div className="flex items-center gap-4 pt-1">
              <div className="flex items-center border border-[#1A1A1A15] bg-white overflow-hidden p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                  className="p-2 text-[#1A1A1A] hover:bg-[#F5F2EF] transition-colors cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 text-xs font-mono font-bold text-[#1A1A1A]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                  className="p-2 text-[#1A1A1A] hover:bg-[#F5F2EF] transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#8C8279]">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>In Stock &bull; Ready for Atelier Dispatch</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                id="product-add-to-bag-main"
                onClick={handleAddToCart}
                className="w-full py-4 bg-[#1A1A1A] text-white text-[11px] uppercase tracking-widest font-semibold hover:bg-[#333333] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-white" />
                <span>Add to Shopping Bag &bull; ${(product.price * quantity).toFixed(2)}</span>
              </button>

              <button
                id="product-buy-now-main"
                onClick={handleBuyNow}
                className="w-full py-3.5 bg-white border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white text-[11px] uppercase tracking-widest font-semibold transition-all cursor-pointer"
              >
                Instant Checkout
              </button>
            </div>

            {/* Value Highlights */}
            <div className="grid grid-cols-2 gap-3 pt-3 text-xs text-[#1A1A1A]/80">
              <div className="flex items-center gap-2 p-3 bg-white border border-[#1A1A1A10]">
                <Truck className="w-4 h-4 text-[#1A1A1A] shrink-0" />
                <span className="text-[11px]">Complimentary express delivery over $100</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-white border border-[#1A1A1A10]">
                <RotateCcw className="w-4 h-4 text-[#1A1A1A] shrink-0" />
                <span className="text-[11px]">30-day effortless returns included</span>
              </div>
            </div>

            {/* Expandable Accordions */}
            <div className="divide-y divide-[#1A1A1A10] border-y border-[#1A1A1A10] pt-2">
              
              {/* Accordion 1: Details & Fit */}
              <div>
                <button
                  onClick={() => toggleAccordion('details')}
                  className="w-full py-3.5 flex items-center justify-between text-left text-xs uppercase font-semibold tracking-widest text-[#1A1A1A] cursor-pointer"
                >
                  <span>Tailoring & Fit Details</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${activeAccordion === 'details' ? 'rotate-180' : ''}`} />
                </button>
                {activeAccordion === 'details' && (
                  <div className="pb-4 text-xs text-[#1A1A1A]/70 space-y-2 animate-in fade-in duration-200 font-light">
                    <p className="font-medium text-[#1A1A1A]">{product.fit}</p>
                    <ul className="list-disc pl-4 space-y-1">
                      {product.details.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Accordion 2: Materials & Sustainability */}
              <div>
                <button
                  onClick={() => toggleAccordion('materials')}
                  className="w-full py-3.5 flex items-center justify-between text-left text-xs uppercase font-semibold tracking-widest text-[#1A1A1A] cursor-pointer"
                >
                  <span>Materials & Origins</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${activeAccordion === 'materials' ? 'rotate-180' : ''}`} />
                </button>
                {activeAccordion === 'materials' && (
                  <div className="pb-4 text-xs text-[#1A1A1A]/70 space-y-2 animate-in fade-in duration-200 font-light">
                    <p><strong>Composition:</strong> {product.materials}</p>
                    <p>Ethically certified under Global Organic Textile Standards (GOTS) and OEKO-TEX® 100.</p>
                  </div>
                )}
              </div>

              {/* Accordion 3: Care Instructions */}
              <div>
                <button
                  onClick={() => toggleAccordion('care')}
                  className="w-full py-3.5 flex items-center justify-between text-left text-xs uppercase font-semibold tracking-widest text-[#1A1A1A] cursor-pointer"
                >
                  <span>Garment Maintenance</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${activeAccordion === 'care' ? 'rotate-180' : ''}`} />
                </button>
                {activeAccordion === 'care' && (
                  <div className="pb-4 text-xs text-[#1A1A1A]/70 space-y-1.5 animate-in fade-in duration-200 font-light">
                    {product.care.map((c, i) => (
                      <p key={i}>&bull; {c}</p>
                    ))}
                  </div>
                )}
              </div>

              {/* Accordion 4: Shipping & Returns */}
              <div>
                <button
                  onClick={() => toggleAccordion('shipping')}
                  className="w-full py-3.5 flex items-center justify-between text-left text-xs uppercase font-semibold tracking-widest text-[#1A1A1A] cursor-pointer"
                >
                  <span>Shipping & Returns</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${activeAccordion === 'shipping' ? 'rotate-180' : ''}`} />
                </button>
                {activeAccordion === 'shipping' && (
                  <div className="pb-4 text-xs text-[#1A1A1A]/70 space-y-2 animate-in fade-in duration-200 font-light">
                    <p>
                      <strong>Domestic & International Express:</strong> Orders placed before 2 PM EST are dispatched same-day from our flagship facility in Toronto.
                    </p>
                    <p>
                      <strong>Returns:</strong> We provide complimentary pre-printed return labels in every package. Return within 30 days for a full refund or exchange.
                    </p>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>

        {/* Customer Reviews Section */}
        <div className="mt-20 pt-12 border-t border-[#1A1A1A10]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#1A1A1A10]">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#8C8279]">
                Verified Client Impressions
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1A1A1A] mt-1">
                Customer Ratings & Feedback
              </h2>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <span className="font-serif text-lg font-normal italic text-[#1A1A1A]">{product.rating} / 5.0</span>
                <span className="text-xs text-[#8C8279]">({reviews.length} verified reviews)</span>
              </div>
            </div>

            <button
              id="product-write-review-btn"
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="px-6 py-3 bg-[#1A1A1A] text-white text-[10px] uppercase tracking-widest font-semibold hover:bg-[#333333] transition-colors cursor-pointer"
            >
              {showReviewForm ? 'Cancel Review' : 'Write a Review'}
            </button>
          </div>

          {/* Interactive Review Form */}
          {showReviewForm && (
            <form onSubmit={handleReviewSubmit} className="my-8 p-6 bg-white border border-[#1A1A1A10] space-y-4 max-w-2xl animate-in fade-in duration-200">
              <h3 className="font-serif text-lg font-normal text-[#1A1A1A]">Share Your Garment Experience</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#1A1A1A] mb-1 text-[10px]">Your Name</label>
                  <input
                    type="text"
                    required
                    value={newReview.author}
                    onChange={(e) => setNewReview(prev => ({ ...prev, author: e.target.value }))}
                    className="w-full px-3.5 py-2 bg-[#FDFCFB] border border-[#1A1A1A15] text-xs"
                    placeholder="e.g. Eleanor Vance"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#1A1A1A] mb-1 text-[10px]">Rating</label>
                  <select
                    value={newReview.rating}
                    onChange={(e) => setNewReview(prev => ({ ...prev, rating: Number(e.target.value) }))}
                    className="w-full px-3.5 py-2 bg-[#FDFCFB] border border-[#1A1A1A15] text-xs cursor-pointer"
                  >
                    <option value={5}>5 Stars - Impeccable</option>
                    <option value={4}>4 Stars - Great Quality</option>
                    <option value={3}>3 Stars - Good</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#1A1A1A] mb-1">Headline</label>
                <input
                  type="text"
                  value={newReview.title}
                  onChange={(e) => setNewReview(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3.5 py-2 bg-[#FDFCFB] border border-[#1A1A1A15] text-xs"
                  placeholder="e.g. Impeccable tailoring and silky drape"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#1A1A1A] mb-1">Feedback & Fit Notes</label>
                <textarea
                  required
                  rows={3}
                  value={newReview.comment}
                  onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                  className="w-full px-3.5 py-2 bg-[#FDFCFB] border border-[#1A1A1A15] text-xs font-light"
                  placeholder="Describe the fabric quality, stitching, and feel..."
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 bg-[#1A1A1A] text-white text-[10px] uppercase tracking-widest font-semibold hover:bg-[#333333] transition-colors cursor-pointer"
              >
                Publish Review
              </button>
            </form>
          )}

          {/* Reviews List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
            {reviews.map((rev) => (
              <div key={rev.id} className="p-6 bg-white border border-[#1A1A1A10] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                    ))}
                  </div>
                  <span className="text-[10px] text-[#8C8279] font-mono">{rev.date}</span>
                </div>

                <h4 className="font-serif text-base font-normal text-[#1A1A1A]">{rev.title}</h4>

                <p className="text-xs text-[#1A1A1A]/70 leading-relaxed font-light">{rev.comment}</p>

                <div className="pt-2 border-t border-[#1A1A1A10] flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-1.5 text-[#1A1A1A] font-medium">
                    <span>{rev.author}</span>
                    {rev.verified && (
                      <span className="inline-flex items-center text-[9px] text-emerald-800 bg-emerald-50 px-1.5 py-0.5">
                        Verified Order
                      </span>
                    )}
                  </div>
                  <span className="text-[#8C8279] text-[10px]">{rev.sizePurchased}</span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Complete The Look / Related Products Carousel */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-[#1A1A1A10]">
            <div className="text-center space-y-2 mb-10">
              <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#8C8279]">
                Stylist Recommendations
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1A1A1A]">
                Complete The Capsule Look
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        category={product.category}
      />

    </div>
  );
};
