import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, TrendingUp, Sparkles } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS_DATA } from '../../data/mockData';
import { Product, CategoryType } from '../../types';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, navigateToProduct, navigateToCollection } = useShop();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    const matches = PRODUCTS_DATA.filter(p => 
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    );
    setResults(matches);
  }, [query]);

  if (!isSearchOpen) return null;

  const popularTrends = [
    'Double-Breasted Blazer',
    'Silk Maxi Dress',
    'Pure Cashmere',
    'Pleated Trouser',
    'Tote Bag',
    'Linen Dress'
  ];

  const handleProductSelect = (product: Product) => {
    navigateToProduct(product);
    setIsSearchOpen(false);
  };

  const handleQuickCategory = (cat: CategoryType) => {
    navigateToCollection(cat);
    setIsSearchOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity" 
        onClick={() => setIsSearchOpen(false)} 
      />

      {/* Search Window */}
      <div className="relative w-full max-w-2xl bg-[#FDFCFB] shadow-2xl border border-[#1A1A1A15] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-[#1A1A1A10] flex items-center gap-3 bg-[#FDFCFB]">
          <Search className="w-4 h-4 text-[#8C8279] shrink-0" />
          <input
            ref={inputRef}
            id="search-modal-input"
            type="text"
            placeholder="Search tailored blazers, silk dresses, cashmere, trousers..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-sm sm:text-base bg-transparent border-none text-[#1A1A1A] placeholder-[#8C8279] focus:outline-hidden font-light"
          />
          {query && (
            <button
              id="search-modal-clear"
              onClick={() => setQuery('')}
              className="text-[#8C8279] hover:text-[#1A1A1A] p-1 text-[11px] uppercase tracking-wider cursor-pointer"
            >
              Clear
            </button>
          )}
          <button
            id="search-modal-close"
            onClick={() => setIsSearchOpen(false)}
            aria-label="Close search dialog"
            className="p-1.5 text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Query Results */}
          {query.trim() !== '' ? (
            <div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-[#8C8279] font-semibold mb-3 flex items-center justify-between">
                <span>Search Results ({results.length})</span>
                {results.length > 0 && <span className="text-[#8C8279] text-[10px]">Click to view details</span>}
              </div>

              {results.length === 0 ? (
                <div className="text-center py-10 text-[#8C8279] space-y-2 font-light">
                  <p className="font-serif text-lg text-[#1A1A1A] font-normal">No items matched "{query}"</p>
                  <p className="text-xs">Try searching for keywords like "blazer", "silk", "wool", or browse our collections below.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {results.map((product) => (
                    <button
                      key={product.id}
                      id={`search-result-${product.id}`}
                      onClick={() => handleProductSelect(product)}
                      className="flex items-center gap-3 p-2.5 bg-white hover:bg-[#F5F2EF] border border-[#1A1A1A10] text-left transition-colors group cursor-pointer"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-14 h-18 object-cover border border-[#1A1A1A10] shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-[9px] uppercase font-semibold tracking-widest text-[#8C8279]">
                          {product.category}
                        </div>
                        <h4 className="text-xs font-normal font-serif text-[#1A1A1A] truncate group-hover:underline mt-0.5">
                          {product.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="font-serif text-xs font-normal text-[#1A1A1A]">
                            ${product.price}
                          </span>
                          {product.compareAtPrice && product.compareAtPrice > product.price && (
                            <span className="text-[10px] text-[#8C8279] line-through">
                              ${product.compareAtPrice}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Popular Trending Searches & Suggestions */
            <div className="space-y-5">
              <div>
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#8C8279] font-semibold mb-3">
                  <TrendingUp className="w-3.5 h-3.5 text-[#1A1A1A]" />
                  <span>Trending Search Inquiries</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {popularTrends.map((trend) => (
                    <button
                      key={trend}
                      id={`trend-${trend.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={() => setQuery(trend)}
                      className="px-3.5 py-1.5 bg-white hover:bg-[#F5F2EF] border border-[#1A1A1A10] text-xs text-[#1A1A1A] font-light transition-colors cursor-pointer"
                    >
                      {trend}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-[#1A1A1A10]">
                <div className="text-[10px] uppercase tracking-[0.25em] text-[#8C8279] font-semibold mb-3">
                  Quick Category Shortcuts
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['New Arrivals', 'Women', 'Men', 'Dresses', 'Jackets', 'Pants', 'Tops', 'Sale'] as CategoryType[]).map((cat) => (
                    <button
                      key={cat}
                      id={`search-shortcut-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={() => handleQuickCategory(cat)}
                      className="p-2.5 bg-white hover:bg-[#F5F2EF] border border-[#1A1A1A10] text-xs font-light text-[#1A1A1A] text-center transition-colors cursor-pointer"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
