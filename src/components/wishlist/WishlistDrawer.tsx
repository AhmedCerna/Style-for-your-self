import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const WishlistDrawer: React.FC = () => {
  const { 
    isWishlistOpen, 
    setIsWishlistOpen, 
    wishlist, 
    toggleWishlist, 
    addToCart, 
    navigateToProduct,
    setActivePage 
  } = useShop();

  if (!isWishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
        onClick={() => setIsWishlistOpen(false)} 
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-[#FDFCFB] h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#1A1A1A10] flex items-center justify-between bg-[#FDFCFB] sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-[#1A1A1A] fill-[#1A1A1A]" />
            <h3 className="font-serif text-lg font-normal text-[#1A1A1A]">
              Saved Wishlist ({wishlist.length})
            </h3>
          </div>
          <button
            id="wishlist-close-btn"
            onClick={() => setIsWishlistOpen(false)}
            aria-label="Close wishlist"
            className="p-1.5 text-[#1A1A1A]/70 hover:text-black transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {wishlist.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-14 h-14 bg-[#F5F2EF] border border-[#1A1A1A10] flex items-center justify-center mx-auto text-[#1A1A1A]/40">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif text-lg text-[#1A1A1A] font-normal">Your wishlist is empty</h4>
                <p className="text-xs text-[#8C8279] mt-1 max-w-xs mx-auto font-light">
                  Click the heart icon on any blazer, dress, or jacket to curate your private favorites list.
                </p>
              </div>
              <button
                id="wishlist-empty-shop-btn"
                onClick={() => {
                  setIsWishlistOpen(false);
                  setActivePage('shop');
                }}
                className="px-6 py-2.5 bg-[#1A1A1A] text-white text-[10px] uppercase font-semibold tracking-widest hover:bg-[#333] transition-all cursor-pointer"
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            <div className="divide-y divide-[#1A1A1A10]">
              {wishlist.map((product) => (
                <div key={product.id} className="py-4 first:pt-0 last:pb-0 flex gap-3.5 group">
                  <button
                    onClick={() => {
                      navigateToProduct(product);
                      setIsWishlistOpen(false);
                    }}
                    className="shrink-0 cursor-pointer"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-20 h-24 object-cover border border-[#1A1A1A10] group-hover:opacity-90 transition-opacity"
                    />
                  </button>

                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <button
                          onClick={() => {
                            navigateToProduct(product);
                            setIsWishlistOpen(false);
                          }}
                          className="text-left font-serif text-sm font-normal text-[#1A1A1A] group-hover:underline line-clamp-1 cursor-pointer"
                        >
                          {product.title}
                        </button>
                        <button
                          onClick={() => toggleWishlist(product)}
                          aria-label="Remove from wishlist"
                          className="text-[#1A1A1A]/40 hover:text-rose-600 transition-colors p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-[#8C8279] mt-0.5">
                        <span>{product.category} &bull; {product.gender}</span>
                      </div>

                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="font-serif text-sm font-normal text-[#1A1A1A]">
                          ${product.price}
                        </span>
                        {product.compareAtPrice && product.compareAtPrice > product.price && (
                          <span className="text-[10px] text-[#8C8279] line-through">
                            ${product.compareAtPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-3">
                      <button
                        id={`wishlist-move-to-bag-${product.id}`}
                        onClick={() => {
                          const defaultVariant = product.variants[0] || {
                            id: `${product.id}-default`,
                            title: 'Default',
                            size: product.availableSizes[0] || 'M',
                            color: product.availableColors[0]?.name || 'Standard',
                            colorHex: product.availableColors[0]?.hex || '#000',
                            price: product.price,
                            inventoryQuantity: 10,
                            sku: `SFY-${product.id}`
                          };
                          addToCart(product, defaultVariant, 1);
                        }}
                        className="flex-1 py-2 px-3 bg-[#1A1A1A] text-white text-[10px] uppercase font-semibold tracking-wider hover:bg-[#333] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <ShoppingBag className="w-3 h-3 text-white" />
                        <span>Move to Bag</span>
                      </button>
                      <button
                        onClick={() => {
                          navigateToProduct(product);
                          setIsWishlistOpen(false);
                        }}
                        className="py-2 px-3 border border-[#1A1A1A15] bg-white text-[#1A1A1A] text-[10px] uppercase font-semibold tracking-wider hover:bg-[#F5F2EF] transition-colors cursor-pointer"
                      >
                        View
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
