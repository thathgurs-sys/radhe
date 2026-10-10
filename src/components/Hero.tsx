import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, Sparkles } from 'lucide-react';
import heroImage from '../assets/images/hero_diamond_pendant_1791612732695.jpg';

export const Hero: React.FC = () => {
  const { setCurrentView, setSelectedCategorySlug } = useStore();

  const handleShop = (slug: string = 'all') => {
    setSelectedCategorySlug(slug);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative bg-[#FAF8F4] overflow-hidden border-b border-[#E8E1D7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Visual Artwork (Diamond & Yellow Sapphire Pendant) */}
          <div className="lg:col-span-6 order-2 lg:order-1 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Decorative Subtle Halo */}
              <div className="absolute inset-0 bg-[#D8C59B]/20 blur-3xl rounded-full transform -translate-y-4 scale-90 -z-10" />

              {/* Main Image Container */}
              <div className="relative bg-white p-3 sm:p-5 border border-[#E8E1D7] shadow-xl">
                <div className="overflow-hidden bg-[#FAF8F4] aspect-[4/3] sm:aspect-[16/10] relative">
                  <img
                    src={heroImage}
                    alt="Élan Aurora Yellow Sapphire Diamond Pendant"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
                    loading="eager"
                  />
                  {/* Subtle Corner Hallmark Badge */}
                  <div className="absolute bottom-3 left-3 bg-[#111111]/85 backdrop-blur-sm text-white px-3 py-1 text-[9px] uppercase tracking-[0.22em] font-sans border border-[#B89B5E]/30">
                    Aurora Edition · 18K Gold
                  </div>
                </div>
              </div>

              {/* Floating Architectural Annotation */}
              <div className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:-right-6 bg-white border border-[#E8E1D7] p-4 shadow-lg hidden sm:block max-w-[210px]">
                <div className="flex items-center gap-1.5 text-[#B89B5E] text-[10px] uppercase tracking-wider font-semibold mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Artisanal Cut</span>
                </div>
                <p className="text-xs text-[#77716A] leading-relaxed">
                  Cushion-cut certified natural yellow sapphire framed in brilliant micro-pavé diamonds.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Typography & CTAs */}
          <div className="lg:col-span-6 order-1 lg:order-2 lg:pl-8 text-center lg:text-left">
            {/* Small Label */}
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-[1px] w-6 bg-[#B89B5E] hidden lg:block" />
              <span className="text-[11px] uppercase tracking-[0.28em] text-[#B89B5E] font-medium font-sans">
                The Art of Elegance
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#111111] leading-[1.12] mb-6 tracking-tight">
              Jewelry That <br />
              <span className="italic font-normal">Tells Your Story.</span>
            </h1>

            {/* Description */}
            <p className="text-[#77716A] text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8 font-sans font-normal">
              Discover timeless pieces designed to celebrate every moment, from quiet beginnings to unforgettable occasions. Handcrafted with ethically sourced gemstones and certified hallmarked gold.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => handleShop('all')}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#111111] text-white text-[12px] uppercase tracking-[0.2em] font-medium hover:bg-[#B89B5E] transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Shop Collection</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => handleShop('necklaces')}
                className="w-full sm:w-auto px-8 py-3.5 bg-transparent text-[#111111] border border-[#111111] text-[12px] uppercase tracking-[0.2em] font-medium hover:bg-white hover:border-[#B89B5E] hover:text-[#B89B5E] transition-all duration-300 cursor-pointer"
              >
                Explore New Arrivals
              </button>
            </div>

            {/* Trust Quote / Footnote */}
            <div className="mt-10 pt-6 border-t border-[#E8E1D7] flex items-center justify-center lg:justify-start gap-6 text-[11px] text-[#77716A] font-sans">
              <div>
                <span className="font-semibold text-[#111111]">100% Certified</span>
                <span className="block text-[10px]">IGI & GIA Diamonds</span>
              </div>
              <span className="text-[#E8E1D7]">|</span>
              <div>
                <span className="font-semibold text-[#111111]">Hallmarked 18K & 22K</span>
                <span className="block text-[10px]">BIS Certified Pure Gold</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
