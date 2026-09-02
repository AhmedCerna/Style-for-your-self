import React, { useState } from 'react';
import { X, Ruler, Sparkles, Check } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose, category }) => {
  const [unit, setUnit] = useState<'in' | 'cm'>('in');

  if (!isOpen) return null;

  const measurements = [
    { size: 'XS', bustIn: '32 - 33', bustCm: '81 - 84', waistIn: '24 - 25', waistCm: '61 - 64', hipIn: '34 - 35', hipCm: '86 - 89' },
    { size: 'S', bustIn: '34 - 35', bustCm: '86 - 89', waistIn: '26 - 27', waistCm: '66 - 69', hipIn: '36 - 37', hipCm: '91 - 94' },
    { size: 'M', bustIn: '36 - 37', bustCm: '91 - 94', waistIn: '28 - 29', waistCm: '71 - 74', hipIn: '38 - 39', hipCm: '96 - 99' },
    { size: 'L', bustIn: '38 - 40', bustCm: '97 - 102', waistIn: '30 - 32', waistCm: '76 - 81', hipIn: '40 - 42', hipCm: '102 - 107' },
    { size: 'XL', bustIn: '41 - 43', bustCm: '104 - 109', waistIn: '33 - 35', waistCm: '84 - 89', hipIn: '43 - 45', hipCm: '109 - 114' },
    { size: 'XXL', bustIn: '44 - 46', bustCm: '112 - 117', waistIn: '36 - 38', waistCm: '91 - 97', hipIn: '46 - 48', hipCm: '117 - 122' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-[#FDFCFB] shadow-2xl border border-[#1A1A1A15] overflow-hidden p-6 sm:p-8 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1A1A1A10]">
          <div className="flex items-center gap-2.5">
            <Ruler className="w-4 h-4 text-[#1A1A1A]" />
            <h3 className="font-serif text-xl font-normal text-[#1A1A1A]">
              Atelier Size & Measurement Guide
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close size guide"
            className="p-1 text-[#1A1A1A]/60 hover:text-black transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Unit Toggle */}
        <div className="my-4 flex items-center justify-between">
          <p className="text-xs text-[#1A1A1A]/70 font-light">
            Measurements refer to body dimensions, not garment dimensions.
          </p>
          <div className="flex bg-[#F5F2EF] p-1 border border-[#1A1A1A10] text-xs font-medium">
            <button
              onClick={() => setUnit('in')}
              className={`px-3 py-1 text-[10px] uppercase tracking-wider transition-colors cursor-pointer ${unit === 'in' ? 'bg-[#1A1A1A] text-white shadow-2xs' : 'text-[#1A1A1A]/70'}`}
            >
              Inches (in)
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 text-[10px] uppercase tracking-wider transition-colors cursor-pointer ${unit === 'cm' ? 'bg-[#1A1A1A] text-white shadow-2xs' : 'text-[#1A1A1A]/70'}`}
            >
              Centimeters (cm)
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-[#1A1A1A10] bg-white">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#F5F2EF] text-[#1A1A1A] uppercase font-semibold text-[10px] tracking-wider border-b border-[#1A1A1A10]">
              <tr>
                <th className="py-3 px-4">Size</th>
                <th className="py-3 px-4">Bust / Chest</th>
                <th className="py-3 px-4">Natural Waist</th>
                <th className="py-3 px-4">Hip</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A1A1A10]">
              {measurements.map((m) => (
                <tr key={m.size} className="hover:bg-[#FDFCFB] transition-colors">
                  <td className="py-3 px-4 font-semibold text-[#1A1A1A]">{m.size}</td>
                  <td className="py-3 px-4 font-mono text-[#1A1A1A]/80">{unit === 'in' ? `${m.bustIn}"` : `${m.bustCm} cm`}</td>
                  <td className="py-3 px-4 font-mono text-[#1A1A1A]/80">{unit === 'in' ? `${m.waistIn}"` : `${m.waistCm} cm`}</td>
                  <td className="py-3 px-4 font-mono text-[#1A1A1A]/80">{unit === 'in' ? `${m.hipIn}"` : `${m.hipCm} cm`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Fit Recommendation Note */}
        <div className="mt-5 p-4 bg-[#F5F2EF] border border-[#1A1A1A10] text-xs space-y-1.5 text-[#1A1A1A]/80 font-light">
          <div className="font-medium text-[#1A1A1A] flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#1A1A1A]" />
            <span>Between Sizes or Need Bespoke Fitting Advice?</span>
          </div>
          <p className="leading-relaxed">
            Our atelier silhouettes are cut for a tailored contemporary drape. If you prefer a relaxed or layered aesthetic, choose one size larger. For instant sizing support, call our stylists directly at <a href="tel:+14164355850" className="font-mono font-semibold text-[#1A1A1A] underline">+1 416 435 5850</a>.
          </p>
        </div>

      </div>
    </div>
  );
};
