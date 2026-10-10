import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight } from 'lucide-react';
import heroImage from '../assets/images/hero_diamond_pendant_1791612732695.jpg';
import bridalImage from '../assets/images/collection_bridal_luxury_1791612742370.jpg';
import sapphireImage from '../assets/images/sapphire_drop_earrings_1791612755801.jpg';
import ringImage from '../assets/images/gold_diamond_ring_1791612766918.jpg';

export const CollectionBanners: React.FC = () => {
  const { setCurrentView, setSelectedCategorySlug } = useStore();

  const handleSelectCollection = (slug: string) => {
    setSelectedCategorySlug(slug);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const collections = [
    {
      title: 'Everyday Elegance',
      subtitle: 'Effortless diamond essentials designed for daily grace.',
      image: ringImage,
      slug: 'rings'
    },
    {
      title: 'Bridal Collection',
      subtitle: 'Heirloom creations to crown your unforgettable day.',
      image: bridalImage,
      slug: 'necklaces'
    },
    {
      title: 'Statement Pieces',
      subtitle: 'Sculptural royal sapphires and striking diamond halos.',
      image: sapphireImage,
      slug: 'earrings'
    },
    {
      title: 'Timeless Classics',
      subtitle: 'Iconic tennis bracelets and solitaire brilliance.',
      image: heroImage,
      slug: 'bracelets'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#FAF8F4] border-b border-[#E8E1D7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[11px] uppercase tracking-[0.28em] text-[#B89B5E] font-medium block mb-2 font-sans">
            Curated For You
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#111111] mb-4">
            Expressions in Precious Metal
          </h2>
          <p className="text-[#77716A] text-sm font-sans leading-relaxed">
            Explore collections designed for every expression—from delicate morning sparkle to grand twilight galas.
          </p>
        </div>

        {/* 4 Large Curated Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((item, idx) => (
            <div
              key={idx}
              onClick={() => handleSelectCollection(item.slug)}
              className="group relative bg-white border border-[#E8E1D7] overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
            >
              {/* Image with zoom */}
              <div className="relative aspect-[4/5] overflow-hidden bg-[#FAF8F4]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center transform group-hover:scale-108 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
              </div>

              {/* Card Meta Content */}
              <div className="p-5 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#111111] mb-2 group-hover:text-[#B89B5E] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[#77716A] text-xs leading-relaxed font-sans mb-4">
                    {item.subtitle}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E8E1D7] flex items-center justify-between text-[11px] uppercase tracking-[0.16em] font-medium text-[#111111] group-hover:text-[#B89B5E] transition-colors">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Reference Image Triptych Feature: NEW COLLECTION | SUMMER COLLECTION | SALE OFF 20% - 45% */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            onClick={() => handleSelectCollection('necklaces')}
            className="group relative bg-[#111111] text-white p-8 sm:p-10 overflow-hidden cursor-pointer flex flex-col justify-between min-h-[220px]"
          >
            <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-30 group-hover:opacity-45 transition-opacity duration-500 overflow-hidden">
              <img src={heroImage} alt="New Collection" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
            </div>
            <div className="relative z-10">
              <span className="text-[10px] uppercase tracking-[0.24em] text-[#B89B5E] block mb-2 font-sans font-medium">New Arrival</span>
              <h4 className="font-serif text-2xl sm:text-3xl font-normal leading-tight mb-2">New Collection</h4>
              <p className="text-stone-300 text-xs font-sans max-w-[200px]">Pristine cuts and luminous sapphires.</p>
            </div>
            <div className="relative z-10 pt-4 flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[#B89B5E] group-hover:text-white transition-colors">
              <span>Discover Now</span>
              <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div
            onClick={() => handleSelectCollection('earrings')}
            className="group relative bg-[#F4EFE6] text-[#111111] p-8 sm:p-10 border border-[#E8E1D7] overflow-hidden cursor-pointer flex flex-col justify-between min-h-[220px]"
          >
            <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-40 group-hover:opacity-60 transition-opacity duration-500 overflow-hidden">
              <img src={sapphireImage} alt="Summer Collection" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
            </div>
            <div className="relative z-10">
              <span className="text-[10px] uppercase tracking-[0.24em] text-[#B89B5E] block mb-2 font-sans font-medium">Seasonal Edit</span>
              <h4 className="font-serif text-2xl sm:text-3xl font-normal leading-tight mb-2">Summer Collection</h4>
              <p className="text-[#77716A] text-xs font-sans max-w-[200px]">Breeze of gold and light chandelier drops.</p>
            </div>
            <div className="relative z-10 pt-4 flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[#111111] group-hover:text-[#B89B5E] transition-colors">
              <span>View Gallery</span>
              <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div
            onClick={() => handleSelectCollection('rings')}
            className="group relative bg-[#FAF8F4] text-[#111111] p-8 sm:p-10 border border-[#B89B5E]/40 overflow-hidden cursor-pointer flex flex-col justify-between min-h-[220px]"
          >
            <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-35 group-hover:opacity-55 transition-opacity duration-500 overflow-hidden">
              <img src={ringImage} alt="Special Privilege" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
            </div>
            <div className="relative z-10">
              <span className="text-[10px] uppercase tracking-[0.24em] text-[#B89B5E] block mb-2 font-sans font-medium">Privilege Offer</span>
              <h4 className="font-serif text-2xl sm:text-3xl font-normal leading-tight mb-2">Sale Off 20% – 45%</h4>
              <p className="text-[#77716A] text-xs font-sans max-w-[200px]">Selected diamond solitaires and bands.</p>
            </div>
            <div className="relative z-10 pt-4 flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[#B89B5E] group-hover:text-[#111111] transition-colors">
              <span>Explore Privé</span>
              <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
