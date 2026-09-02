import React, { useState, useEffect, useMemo } from 'react';
import { 
  Filter, 
  SlidersHorizontal, 
  Search, 
  X, 
  ChevronDown, 
  Grid3X3, 
  Grid2X2, 
  RotateCcw, 
  Sparkles,
  Check
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { ProductCard } from './ProductCard';
import { shopifyService } from '../../services/shopify';
import { Product, CategoryType, GenderType } from '../../types';

const CATEGORIES: CategoryType[] = [
  'All',
  'New Arrivals',
  'Women',
  'Men',
  'Dresses',
  'Tops',
  'Shirts',
  'Pants',
  'Jackets',
  'Accessories',
  'Sale'
];

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '30', '32', '34', '36', 'One Size'];

const COLORS = [
  { name: 'Black', hex: '#161616' },
  { name: 'Oatmeal / Taupe', hex: '#C9BCAC' },
  { name: 'Camel / Tan', hex: '#A88056' },
  { name: 'White / Ecru', hex: '#F5F5F0' },
  { name: 'Navy / Blue', hex: '#1E2D4A' },
  { name: 'Sage / Olive', hex: '#637061' },
  { name: 'Terracotta', hex: '#A85A44' }
];

export const ShopPage: React.FC = () => {
  const { filters, setFilters, resetFilters } = useShop();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [gridCols, setGridCols] = useState<'3' | '4' | '2'>('4');

  // Load products based on filter changes
  useEffect(() => {
    setLoading(true);
    shopifyService.getProducts(filters).then((res) => {
      setProducts(res);
      setLoading(false);
    });
  }, [filters]);

  const handleCategorySelect = (cat: CategoryType) => {
    setFilters(prev => ({ ...prev, category: cat }));
  };

  const handleGenderSelect = (gen: GenderType | 'All') => {
    setFilters(prev => ({ ...prev, gender: gen }));
  };

  const toggleSize = (size: string) => {
    setFilters(prev => {
      const exists = prev.sizes.includes(size);
      const newSizes = exists ? prev.sizes.filter(s => s !== size) : [...prev.sizes, size];
      return { ...prev, sizes: newSizes };
    });
  };

  const toggleColor = (colorName: string) => {
    setFilters(prev => {
      const exists = prev.colors.includes(colorName);
      const newColors = exists ? prev.colors.filter(c => c !== colorName) : [...prev.colors, colorName];
      return { ...prev, colors: newColors };
    });
  };

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.category !== 'All') count++;
    if (filters.gender !== 'All') count++;
    if (filters.sizes.length > 0) count += filters.sizes.length;
    if (filters.colors.length > 0) count += filters.colors.length;
    if (filters.maxPrice < 400) count++;
    if (filters.onlySale) count++;
    if (filters.onlyNew) count++;
    if (filters.searchQuery) count++;
    return count;
  }, [filters]);

  return (
    <div className="min-h-screen bg-[#FDFCFB] pb-24">
      
      {/* Header Banner & Breadcrumbs */}
      <div className="bg-[#FDFCFB] border-b border-[#1A1A1A10] py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center space-y-3">
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#8C8279]">
            Ready-To-Wear Index
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1A1A1A] tracking-tight">
            {filters.category === 'All' ? 'Complete Collection' : filters.category}
          </h1>
          <p className="text-xs sm:text-sm text-[#1A1A1A]/70 max-w-xl mx-auto font-light leading-relaxed">
            Discover tailored silhouettes, virgin wool overcoats, pure mulberry silks, and minimalist daily wardrobe essentials.
          </p>
        </div>
      </div>

      {/* Horizontal Category Tab Bar */}
      <div className="border-b border-[#1A1A1A10] bg-[#FDFCFB] sticky top-20 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                id={`shop-pill-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => handleCategorySelect(cat)}
                className={`px-4 py-2 text-[11px] uppercase tracking-widest whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                  filters.category === cat
                    ? 'bg-[#1A1A1A] text-white font-medium shadow-xs'
                    : 'bg-[#F5F2EF] text-[#1A1A1A] hover:bg-[#EBE7E2] border border-[#1A1A1A10]'
                }`}
              >
                {cat}
                {cat === 'Sale' && (
                  <span className="ml-1.5 px-1 py-0.2 bg-rose-600 text-white text-[8px] font-bold">
                    40%
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Controls Bar: Search, Filters Trigger, Count, Sorting, View density */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-6 border-b border-[#1A1A1A10]">
          
          {/* Left: Filter Toggle & Search */}
          <div className="flex items-center gap-3">
            <button
              id="shop-toggle-filters-btn"
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#1A1A1A15] text-[10px] font-semibold uppercase tracking-widest text-[#1A1A1A] hover:bg-[#F5F2EF] transition-colors shadow-2xs cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#1A1A1A]" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="w-4 h-4 bg-[#1A1A1A] text-white text-[9px] flex items-center justify-center font-bold">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Quick in-shop search input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 text-[#8C8279] absolute left-3 top-3" />
              <input
                id="shop-search-input"
                type="text"
                placeholder="SEARCH CATALOGUE..."
                value={filters.searchQuery}
                onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                className="w-full pl-9 pr-8 py-2 bg-white border border-[#1A1A1A15] text-[11px] text-[#1A1A1A] placeholder-[#8C8279] uppercase tracking-wider focus:outline-hidden focus:border-[#1A1A1A]"
              />
              {filters.searchQuery && (
                <button
                  onClick={() => setFilters(prev => ({ ...prev, searchQuery: '' }))}
                  className="absolute right-2.5 top-2.5 text-[#8C8279] hover:text-[#1A1A1A] p-0.5 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Right: Product Count, Density Switcher, and Sort Dropdown */}
          <div className="flex items-center justify-between sm:justify-end gap-3 text-xs">
            <span className="text-[#8C8279] text-[11px] font-light hidden md:inline">
              Showing <strong className="font-normal text-[#1A1A1A]">{products.length}</strong> garments
            </span>

            {/* Grid Density View Switcher (Desktop) */}
            <div className="hidden lg:flex items-center bg-white border border-[#1A1A1A15] p-1 gap-1">
              <button
                onClick={() => setGridCols('3')}
                aria-label="3 column layout"
                className={`p-1.5 transition-colors cursor-pointer ${gridCols === '3' ? 'bg-[#1A1A1A] text-white' : 'text-[#8C8279] hover:text-[#1A1A1A]'}`}
              >
                <Grid3X3 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setGridCols('4')}
                aria-label="4 column layout"
                className={`p-1.5 transition-colors cursor-pointer ${gridCols === '4' ? 'bg-[#1A1A1A] text-white' : 'text-[#8C8279] hover:text-[#1A1A1A]'}`}
              >
                <Grid2X2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="relative flex items-center">
              <select
                id="shop-sort-select"
                value={filters.sortBy}
                onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                className="appearance-none bg-white border border-[#1A1A1A15] px-4 py-2.5 pr-8 text-[10px] font-semibold uppercase tracking-widest text-[#1A1A1A] focus:outline-hidden focus:border-[#1A1A1A] cursor-pointer shadow-2xs"
              >
                <option value="featured">Sort: Curated Editorial</option>
                <option value="best-selling">Sort: Top Sellers</option>
                <option value="newest">Sort: Newest First</option>
                <option value="price-asc">Sort: Price: Low to High</option>
                <option value="price-desc">Sort: Price: High to Low</option>
                <option value="rating">Sort: Highest Rated</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#8C8279] absolute right-2.5 pointer-events-none" />
            </div>

          </div>

        </div>

        {/* Active Filter Chips */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-4">
            <span className="text-[11px] text-[#8C8279] font-light">Active filters:</span>
            
            {filters.category !== 'All' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F5F2EF] text-[#1A1A1A] text-[10px] uppercase tracking-wider border border-[#1A1A1A10]">
                Category: {filters.category}
                <button onClick={() => setFilters(prev => ({ ...prev, category: 'All' }))} className="cursor-pointer"><X className="w-3 h-3" /></button>
              </span>
            )}

            {filters.gender !== 'All' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F5F2EF] text-[#1A1A1A] text-[10px] uppercase tracking-wider border border-[#1A1A1A10]">
                Gender: {filters.gender}
                <button onClick={() => setFilters(prev => ({ ...prev, gender: 'All' }))} className="cursor-pointer"><X className="w-3 h-3" /></button>
              </span>
            )}

            {filters.sizes.map((sz) => (
              <span key={sz} className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F5F2EF] text-[#1A1A1A] text-[10px] uppercase tracking-wider border border-[#1A1A1A10]">
                Size: {sz}
                <button onClick={() => toggleSize(sz)} className="cursor-pointer"><X className="w-3 h-3" /></button>
              </span>
            ))}

            {filters.colors.map((col) => (
              <span key={col} className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F5F2EF] text-[#1A1A1A] text-[10px] uppercase tracking-wider border border-[#1A1A1A10]">
                Color: {col}
                <button onClick={() => toggleColor(col)} className="cursor-pointer"><X className="w-3 h-3" /></button>
              </span>
            ))}

            {filters.maxPrice < 400 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F5F2EF] text-[#1A1A1A] text-[10px] uppercase tracking-wider border border-[#1A1A1A10]">
                Under ${filters.maxPrice}
                <button onClick={() => setFilters(prev => ({ ...prev, maxPrice: 400 }))} className="cursor-pointer"><X className="w-3 h-3" /></button>
              </span>
            )}

            {filters.searchQuery && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F5F2EF] text-[#1A1A1A] text-[10px] uppercase tracking-wider border border-[#1A1A1A10]">
                "{filters.searchQuery}"
                <button onClick={() => setFilters(prev => ({ ...prev, searchQuery: '' }))} className="cursor-pointer"><X className="w-3 h-3" /></button>
              </span>
            )}

            <button
              id="shop-clear-all-filters-btn"
              onClick={resetFilters}
              className="text-[10px] text-[#1A1A1A] hover:underline uppercase tracking-widest font-semibold flex items-center gap-1 ml-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset All</span>
            </button>
          </div>
        )}

        {/* Layout Grid: Optional Filter Sidebar + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
          
          {/* Desktop Filter Sidebar (Toggled) */}
          {isMobileFilterOpen && (
            <div className="lg:col-span-3 bg-white p-6 border border-[#1A1A1A10] space-y-6 h-fit animate-in fade-in slide-in-from-left duration-200">
              
              <div className="flex items-center justify-between pb-3 border-b border-[#1A1A1A10]">
                <h3 className="font-serif text-sm font-normal uppercase tracking-wider text-[#1A1A1A] flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5 text-[#1A1A1A]" />
                  <span>Refine By</span>
                </h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="text-[#8C8279] hover:text-[#1A1A1A] p-1 text-xs cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Department / Gender */}
              <div>
                <h4 className="text-[10px] uppercase font-semibold tracking-widest text-[#1A1A1A] mb-2.5">
                  Department
                </h4>
                <div className="grid grid-cols-3 gap-1.5 text-xs">
                  {(['All', 'Women', 'Men'] as (GenderType | 'All')[]).map((gen) => (
                    <button
                      key={gen}
                      onClick={() => handleGenderSelect(gen)}
                      className={`py-2 text-[10px] uppercase tracking-wider border text-center transition-colors cursor-pointer ${
                        filters.gender === gen
                          ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] font-semibold'
                          : 'bg-[#F5F2EF] text-[#1A1A1A] border-[#1A1A1A10] hover:bg-[#EBE7E2]'
                      }`}
                    >
                      {gen}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Slider */}
              <div>
                <div className="flex justify-between text-[10px] font-semibold uppercase tracking-widest text-[#1A1A1A] mb-2">
                  <span>Price Range</span>
                  <span className="font-serif italic font-normal text-sm">${filters.minPrice} – ${filters.maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="400"
                  step="10"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
                  className="w-full accent-[#1A1A1A] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#8C8279] mt-1 font-serif italic">
                  <span>$40</span>
                  <span>$400+</span>
                </div>
              </div>

              {/* Sizes Filter */}
              <div>
                <h4 className="text-[10px] uppercase font-semibold tracking-widest text-[#1A1A1A] mb-2.5">
                  Sizes
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {SIZES.map((sz) => {
                    const isSelected = filters.sizes.includes(sz);
                    return (
                      <button
                        key={sz}
                        onClick={() => toggleSize(sz)}
                        className={`px-3 py-1.5 border text-[10px] font-semibold uppercase transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                            : 'bg-white text-[#1A1A1A] border-[#1A1A1A15] hover:border-[#1A1A1A]'
                        }`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Colors Filter */}
              <div>
                <h4 className="text-[10px] uppercase font-semibold tracking-widest text-[#1A1A1A] mb-2.5">
                  Palette
                </h4>
                <div className="space-y-1.5">
                  {COLORS.map((col) => {
                    const isSelected = filters.colors.includes(col.name);
                    return (
                      <button
                        key={col.name}
                        onClick={() => toggleColor(col.name)}
                        className={`w-full flex items-center justify-between px-3 py-2 border text-[10px] uppercase tracking-wider transition-colors cursor-pointer ${
                          isSelected ? 'bg-[#F5F2EF] border-[#1A1A1A] text-[#1A1A1A] font-semibold' : 'bg-white border-[#1A1A1A10] text-[#1A1A1A]/80 hover:bg-[#FAF8F5]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full border border-stone-300" style={{ backgroundColor: col.hex }} />
                          <span>{col.name}</span>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#1A1A1A]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Special Toggles */}
              <div className="pt-3 border-t border-[#1A1A1A10] space-y-2">
                <label className="flex items-center gap-2 text-[11px] text-[#1A1A1A] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.onlySale}
                    onChange={(e) => setFilters(prev => ({ ...prev, onlySale: e.target.checked }))}
                    className="rounded-xs text-[#1A1A1A] focus:ring-0"
                  />
                  <span>Sale archive garments only</span>
                </label>
                <label className="flex items-center gap-2 text-[11px] text-[#1A1A1A] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.onlyNew}
                    onChange={(e) => setFilters(prev => ({ ...prev, onlyNew: e.target.checked }))}
                    className="rounded-xs text-[#1A1A1A] focus:ring-0"
                  />
                  <span>New arrivals only</span>
                </label>
              </div>

            </div>
          )}

          {/* Product Grid Area */}
          <div className={isMobileFilterOpen ? 'lg:col-span-9' : 'lg:col-span-12'}>
            
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="space-y-3">
                    <div className="aspect-3/4 bg-[#F5F2EF]" />
                    <div className="h-4 bg-[#F5F2EF] w-3/4" />
                    <div className="h-3 bg-[#F5F2EF] w-1/2" />
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-24 bg-white border border-[#1A1A1A10] p-8 space-y-4">
                <div className="w-12 h-12 bg-[#F5F2EF] flex items-center justify-center mx-auto text-[#8C8279]">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-normal text-[#1A1A1A]">
                  No matching garments found
                </h3>
                <p className="text-xs text-[#8C8279] max-w-sm mx-auto font-light">
                  Try clearing some filter tags or search terms to explore our broader fashion catalog.
                </p>
                <button
                  id="shop-reset-empty-btn"
                  onClick={resetFilters}
                  className="px-6 py-2.5 bg-[#1A1A1A] text-white text-[10px] font-semibold uppercase tracking-widest hover:bg-[#333333] transition-all cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className={`grid grid-cols-2 ${
                isMobileFilterOpen 
                  ? 'md:grid-cols-3' 
                  : gridCols === '3' 
                    ? 'md:grid-cols-3' 
                    : 'md:grid-cols-3 lg:grid-cols-4'
              } gap-4 sm:gap-6 lg:gap-8`}>
                {products.map((prod, idx) => (
                  <ProductCard key={prod.id} product={prod} priority={idx < 4} />
                ))}
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
