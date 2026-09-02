import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { COLLECTIONS_DATA } from '../../data/mockData';
import { CategoryType } from '../../types';

export const CollectionsPage: React.FC = () => {
  const { navigateToCollection } = useShop();

  const handleCollectionSelect = (title: string) => {
    // Map collection title to CategoryType
    let targetCat: CategoryType = 'All';
    if (title.includes('New Arrivals')) targetCat = 'New Arrivals';
    else if (title.includes('Women')) targetCat = 'Women';
    else if (title.includes('Men')) targetCat = 'Men';
    else if (title.includes('Dresses')) targetCat = 'Dresses';
    else if (title.includes('Tops')) targetCat = 'Tops';
    else if (title.includes('Shirts')) targetCat = 'Shirts';
    else if (title.includes('Pants')) targetCat = 'Pants';
    else if (title.includes('Jackets')) targetCat = 'Jackets';
    else if (title.includes('Accessories')) targetCat = 'Accessories';
    else if (title.includes('Sale')) targetCat = 'Sale';

    navigateToCollection(targetCat);
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] pb-24">
      
      {/* Header Banner */}
      <div className="bg-[#FDFCFB] border-b border-[#1A1A1A10] py-12 sm:py-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#8C8279]">
            Editorial Directories
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#1A1A1A]">
            Signature Collections
          </h1>
          <p className="text-xs sm:text-sm text-[#1A1A1A]/70 max-w-xl mx-auto font-light leading-relaxed">
            Explore our curated seasonal capsules, architectural tailoring edits, and timeless wardrobe foundations.
          </p>
        </div>
      </div>

      {/* Collections Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {COLLECTIONS_DATA.map((col, index) => {
            const isWide = index === 0 || index === 7;
            return (
              <div
                key={col.id}
                id={`collection-card-${col.handle}`}
                onClick={() => handleCollectionSelect(col.title)}
                className={`group relative overflow-hidden cursor-pointer bg-[#F5F2EF] border border-[#1A1A1A10] transition-all duration-500 hover:border-[#1A1A1A40] ${
                  isWide ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                {/* Image */}
                <div className={`relative w-full overflow-hidden ${isWide ? 'aspect-16/9 sm:aspect-21/9' : 'aspect-4/5'}`}>
                  <img
                    src={col.image}
                    alt={col.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-103"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-300 group-hover:from-black/90" />
                </div>

                {/* Card Content Overlay */}
                <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between text-white z-10 pointer-events-none">
                  <div className="flex justify-between items-start">
                    <span className="px-3 py-1 text-[9px] uppercase font-bold tracking-widest bg-white/20 backdrop-blur-md border border-white/30 text-white">
                      {col.itemCount} Garments
                    </span>
                    {col.featured && (
                      <span className="px-3 py-1 text-[9px] uppercase font-bold tracking-widest bg-[#1A1A1A] text-white">
                        Curated Edit
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-[0.25em] font-medium text-white/80">
                      {col.subtitle}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-white group-hover:text-[#FAF8F5] transition-colors">
                      {col.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/80 line-clamp-2 max-w-md font-light leading-relaxed">
                      {col.description}
                    </p>
                    
                    <div className="pt-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-white group-hover:underline transition-colors">
                      <span>Explore Collection</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
