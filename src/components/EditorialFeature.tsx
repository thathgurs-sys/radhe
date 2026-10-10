import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, Sparkles, Award, Shield, CheckCircle } from 'lucide-react';
import bridalImage from '../assets/images/collection_bridal_luxury_1791612742370.jpg';
import sapphireImage from '../assets/images/sapphire_drop_earrings_1791612755801.jpg';

export const EditorialFeature: React.FC = () => {
  const { setCurrentView, setSelectedCategorySlug } = useStore();

  const handleNavigate = (cat: string) => {
    setSelectedCategorySlug(cat);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="bg-[#FAF8F4] py-16 md:py-24 border-b border-[#E8E1D7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Two-Column Editorial Banner matching Reference Image */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          
          {/* Panel 1: New Products (Heritage Bridal & High-Jewelry) */}
          <div
            onClick={() => handleNavigate('necklaces')}
            className="group relative bg-[#1A1817] text-white overflow-hidden cursor-pointer shadow-lg min-h-[380px] sm:min-h-[440px] flex flex-col justify-end p-8 sm:p-12"
          >
            {/* Background Image */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={bridalImage}
                alt="New Heritage Jewelry"
                className="w-full h-full object-cover object-top opacity-70 group-hover:scale-105 group-hover:opacity-85 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            </div>

            {/* Editorial Content */}
            <div className="relative z-10">
              <span className="text-[10px] uppercase tracking-[0.28em] text-[#D8C59B] block mb-2 font-sans font-semibold">
                Heritage & Bridal
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-white mb-3">
                New Products
              </h3>
              <p className="text-stone-300 text-xs sm:text-sm font-sans max-w-sm mb-6 leading-relaxed">
                Regal emerald neckpieces and uncut diamond polki sets crafted for celebrations of a lifetime.
              </p>
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#B89B5E] group-hover:text-white transition-colors font-medium">
                <span>Explore Bridal Haute Joaillerie</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          </div>

          {/* Panel 2: Special Products (Royal Gemstones & Modern Solitaires) */}
          <div
            onClick={() => handleNavigate('earrings')}
            className="group relative bg-[#EFE9DF] text-[#111111] overflow-hidden cursor-pointer shadow-lg min-h-[380px] sm:min-h-[440px] flex flex-col justify-end p-8 sm:p-12 border border-[#E8E1D7]"
          >
            {/* Background Image */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={sapphireImage}
                alt="Special High Jewelry Products"
                className="w-full h-full object-cover object-center opacity-85 group-hover:scale-105 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F4] via-[#FAF8F4]/60 to-transparent" />
            </div>

            {/* Editorial Content */}
            <div className="relative z-10">
              <span className="text-[10px] uppercase tracking-[0.28em] text-[#B89B5E] block mb-2 font-sans font-semibold">
                Limited Editions
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#111111] mb-3">
                Special Products
              </h3>
              <p className="text-[#77716A] text-xs sm:text-sm font-sans max-w-sm mb-6 leading-relaxed">
                Hand-selected Ceylon sapphires set in platinum and 18K yellow gold, certified for supreme optical brilliance.
              </p>
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#111111] group-hover:text-[#B89B5E] transition-colors font-medium">
                <span>View Special Vault</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          </div>

        </div>

        {/* Brand Hallmarks / Artisanal Badges matching Reference Image */}
        <div className="mt-16 pt-12 border-t border-[#E8E1D7] grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center">
            <Award className="w-6 h-6 text-[#B89B5E] mb-2" />
            <h4 className="font-serif text-base text-[#111111]">Handmade Heritage</h4>
            <p className="text-[10px] text-[#77716A] uppercase tracking-wider font-sans mt-0.5">Est. 2012 · Master Guild</p>
          </div>
          <div className="flex flex-col items-center">
            <Sparkles className="w-6 h-6 text-[#B89B5E] mb-2" />
            <h4 className="font-serif text-base text-[#111111]">Natural Gemstones</h4>
            <p className="text-[10px] text-[#77716A] uppercase tracking-wider font-sans mt-0.5">Ethically Sourced & Mined</p>
          </div>
          <div className="flex flex-col items-center">
            <Shield className="w-6 h-6 text-[#B89B5E] mb-2" />
            <h4 className="font-serif text-base text-[#111111]">Hallmark Guaranteed</h4>
            <p className="text-[10px] text-[#77716A] uppercase tracking-wider font-sans mt-0.5">BIS 916 & 750 Pure Gold</p>
          </div>
          <div className="flex flex-col items-center">
            <CheckCircle className="w-6 h-6 text-[#B89B5E] mb-2" />
            <h4 className="font-serif text-base text-[#111111]">Bespoke Sizing</h4>
            <p className="text-[10px] text-[#77716A] uppercase tracking-wider font-sans mt-0.5">Complimentary Adjustments</p>
          </div>
        </div>

      </div>
    </section>
  );
};
