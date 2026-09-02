import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { Product } from '../../types';
import { useShop } from '../../context/ShopContext';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, priority = false }) => {
  const { 
    navigateToProduct, 
    toggleWishlist, 
    isInWishlist, 
    addToCart, 
    setQuickViewProduct 
  } = useShop();

  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.availableSizes[0] || 'M');
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [showQuickSizes, setShowQuickSizes] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const currentImage = (isHovered && product.images[1]) ? product.images[1] : product.images[0];
  const activeColor = product.availableColors[selectedColorIndex] || product.availableColors[0];

  const handleQuickAdd = (e: React.MouseEvent, size: string) => {
    e.stopPropagation();
    const targetVariant = product.variants.find(
      v => v.size === size && (v.color === activeColor?.name || true)
    ) || product.variants[0];

    addToCart(product, targetVariant, 1);
    setShowQuickSizes(false);
  };

  const discountPercent = product.compareAtPrice && product.compareAtPrice > product.price
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  return (
    <div 
      id={`product-card-${product.id}`}
      className="group relative flex flex-col transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowQuickSizes(false);
      }}
    >
      {/* Product Image Container */}
      <div 
        className="relative aspect-3/4 w-full bg-[#F5F2EF] overflow-hidden rounded-xs cursor-pointer border border-[#1A1A1A10]"
        onClick={() => navigateToProduct(product)}
      >
        <img
          src={currentImage}
          alt={product.title}
          loading={priority ? 'eager' : 'lazy'}
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Badges (Sale, New, Bestseller) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {discountPercent > 0 && (
            <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest bg-[#1A1A1A] text-white">
              -{discountPercent}% OFF
            </span>
          )}
          {product.isNew && (
            <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest bg-[#1A1A1A] text-white">
              New In
            </span>
          )}
          {product.isBestSeller && !product.isNew && (
            <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest bg-white text-[#1A1A1A] border border-[#1A1A1A20]">
              Top Seller
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          id={`wishlist-toggle-${product.id}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all z-10 ${
            isFavorited 
              ? 'bg-white text-rose-600 shadow-md' 
              : 'bg-white/90 text-[#1A1A1A] hover:bg-white shadow-xs'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-rose-600' : ''}`} />
        </button>

        {/* Quick View Button (Desktop Hover) */}
        <button
          id={`quick-view-btn-${product.id}`}
          onClick={(e) => {
            e.stopPropagation();
            setQuickViewProduct(product);
          }}
          aria-label="Quick view product details"
          className="absolute bottom-14 left-3 right-3 hidden lg:flex items-center justify-center gap-1.5 py-2.5 bg-white text-[#1A1A1A] text-[10px] font-semibold uppercase tracking-widest shadow-md opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 hover:bg-[#F5F2EF]"
        >
          <Eye className="w-3 h-3 text-[#1A1A1A]" />
          <span>Quick View</span>
        </button>

        {/* Quick Size Selection Slider / Add to Bag */}
        <div className="absolute bottom-3 left-3 right-3 z-10">
          {showQuickSizes ? (
            <div 
              className="p-2.5 bg-white shadow-xl border border-[#1A1A1A15] animate-in fade-in zoom-in-95 duration-150"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-[9px] uppercase font-semibold text-[#8C8279] mb-1.5 text-center tracking-widest">
                Select Size to Add
              </div>
              <div className="flex flex-wrap gap-1 justify-center">
                {product.availableSizes.map((sz) => (
                  <button
                    key={sz}
                    id={`quick-size-btn-${product.id}-${sz}`}
                    onClick={(e) => handleQuickAdd(e, sz)}
                    className="px-2 py-1 bg-[#F5F2EF] hover:bg-[#1A1A1A] hover:text-white border border-[#1A1A1A10] text-[10px] font-semibold text-[#1A1A1A] transition-colors"
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <button
              id={`quick-add-trigger-${product.id}`}
              onClick={(e) => {
                e.stopPropagation();
                if (product.availableSizes.length === 1) {
                  handleQuickAdd(e, product.availableSizes[0]);
                } else {
                  setShowQuickSizes(true);
                }
              }}
              className="w-full py-2.5 px-3 bg-[#1A1A1A] hover:bg-[#333333] text-white text-[10px] font-semibold uppercase tracking-widest shadow-xs flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer"
            >
              <ShoppingBag className="w-3 h-3 text-white" />
              <span>+ Quick Add</span>
            </button>
          )}
        </div>

      </div>

      {/* Product Information */}
      <div className="mt-3 flex flex-col gap-1">
        {/* Category & Rating */}
        <div className="flex items-center justify-between text-[10px] text-[#8C8279]">
          <span className="uppercase tracking-widest font-semibold text-[#8C8279]">
            {product.category}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
            <span className="font-semibold text-[#1A1A1A]">{product.rating}</span>
            <span className="text-[#8C8279]">({product.reviewCount})</span>
          </div>
        </div>

        {/* Title */}
        <button
          id={`product-title-${product.id}`}
          onClick={() => navigateToProduct(product)}
          className="text-left font-serif text-sm sm:text-base font-normal text-[#1A1A1A] hover:underline line-clamp-1 transition-colors cursor-pointer"
        >
          {product.title}
        </button>

        {/* Subtitle / Fabric info */}
        {product.subtitle && (
          <p className="text-[11px] text-[#8C8279] line-clamp-1 italic font-serif">
            {product.subtitle}
          </p>
        )}

        {/* Pricing */}
        <div className="flex items-baseline gap-2 mt-0.5">
          <span className="font-serif text-sm sm:text-base italic font-normal text-[#1A1A1A]">
            ${product.price}.00
          </span>
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="text-[11px] text-[#8C8279] line-through font-serif italic">
              ${product.compareAtPrice}.00
            </span>
          )}
        </div>

        {/* Color Swatches Preview */}
        {product.availableColors && product.availableColors.length > 0 && (
          <div className="flex items-center gap-1.5 mt-1">
            {product.availableColors.map((col, idx) => (
              <button
                key={col.name}
                id={`swatch-${product.id}-${idx}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColorIndex(idx);
                }}
                aria-label={`Color: ${col.name}`}
                title={col.name}
                className={`w-3 h-3 rounded-full border transition-all ${
                  selectedColorIndex === idx ? 'ring-1 ring-[#1A1A1A] ring-offset-1 scale-110' : 'border-stone-300'
                }`}
                style={{ backgroundColor: col.hex }}
              />
            ))}
            <span className="text-[9px] text-[#8C8279] uppercase tracking-wider ml-1">
              {product.availableColors.length} colors
            </span>
          </div>
        )}

      </div>
    </div>
  );
};
