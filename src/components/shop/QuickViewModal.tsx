import React, { useState } from 'react';
import { X, Star, Heart, ShoppingBag, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const QuickViewModal: React.FC = () => {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    navigateToProduct 
  } = useShop();

  const product = quickViewProduct;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const activeSize = selectedSize || product.availableSizes[0];
  const activeColor = selectedColor || product.availableColors[0]?.name;
  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    const matchedVariant = product.variants.find(
      v => v.size === activeSize && (v.color === activeColor || true)
    ) || product.variants[0];

    addToCart(product, matchedVariant, quantity);
    setQuickViewProduct(null);
  };

  const handleFullDetails = () => {
    navigateToProduct(product);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-3xl bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#E8E2D8] overflow-hidden flex flex-col my-auto animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          id="quickview-close-btn"
          onClick={() => setQuickViewProduct(null)}
          aria-label="Close quick view"
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 text-stone-700 hover:text-black hover:bg-white shadow-md transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left: Product Images */}
          <div className="bg-[#F3ECE2] p-4 flex flex-col justify-between">
            <div className="aspect-3/4 w-full rounded-xl overflow-hidden shadow-xs">
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2 mt-3 justify-center">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-14 h-18 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === idx ? 'border-stone-900 scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Selection Details */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-4">
            <div>
              <div className="text-[11px] uppercase tracking-wider font-semibold text-[#B38F5C]">
                {product.category} &bull; {product.gender}
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#141312] mt-1">
                {product.title}
              </h3>
              {product.subtitle && (
                <p className="text-xs text-stone-500 italic font-serif mt-0.5">
                  {product.subtitle}
                </p>
              )}

              {/* Rating */}
              <div className="flex items-center gap-1.5 mt-2">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-stone-800">{product.rating}</span>
                <span className="text-xs text-stone-400">({product.reviewCount} customer reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2 mt-3">
                <span className="font-serif text-2xl font-bold text-[#141312]">
                  ${product.price}
                </span>
                {product.compareAtPrice && product.compareAtPrice > product.price && (
                  <span className="text-sm text-stone-400 line-through">
                    ${product.compareAtPrice}
                  </span>
                )}
              </div>

              <p className="text-xs text-stone-600 mt-3 line-clamp-3 leading-relaxed">
                {product.description}
              </p>

              {/* Color Selector */}
              <div className="mt-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2 flex items-center justify-between">
                  <span>Color: <strong className="text-stone-900">{activeColor}</strong></span>
                </div>
                <div className="flex gap-2">
                  {product.availableColors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                        activeColor === color.name 
                          ? 'border-stone-900 bg-white ring-1 ring-stone-900 font-semibold' 
                          : 'border-stone-200 bg-[#FAF8F5] text-stone-600'
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full border border-stone-300" style={{ backgroundColor: color.hex }} />
                      <span>{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div className="mt-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2 flex items-center justify-between">
                  <span>Select Size</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.availableSizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`w-11 h-10 rounded-lg border text-xs font-semibold transition-all flex items-center justify-center ${
                        activeSize === sz 
                          ? 'bg-[#141312] text-white border-[#141312]' 
                          : 'bg-white text-stone-800 border-stone-200 hover:border-stone-400'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-[#E8E2D8] space-y-2.5">
              <div className="flex gap-2">
                <button
                  id="quickview-add-to-bag"
                  onClick={handleAddToCart}
                  className="flex-1 py-3 rounded-xl bg-[#141312] text-white text-xs uppercase tracking-widest font-semibold hover:bg-black transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <ShoppingBag className="w-4 h-4 text-[#D8B47E]" />
                  <span>Add to Bag &bull; ${product.price}</span>
                </button>
                <button
                  onClick={() => toggleWishlist(product)}
                  aria-label="Wishlist toggle"
                  className={`p-3 rounded-xl border transition-colors ${
                    isFavorited ? 'bg-rose-50 border-rose-200 text-rose-600' : 'bg-white border-stone-200 text-stone-700'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-600' : ''}`} />
                </button>
              </div>

              <button
                id="quickview-view-full-page-btn"
                onClick={handleFullDetails}
                className="w-full text-center text-xs font-semibold text-stone-700 hover:text-black py-1.5 transition-colors flex items-center justify-center gap-1 group"
              >
                <span>View Complete Product Details & Reviews</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
