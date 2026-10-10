import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { ArrowRight } from 'lucide-react';

export const ProductGrid: React.FC = () => {
  const { products, setCurrentView, setSelectedCategorySlug } = useStore();
  const [activeTab, setActiveTab] = useState<'all' | 'necklaces' | 'earrings' | 'rings' | 'bracelets'>('all');

  const filteredProducts = products.filter((p) => {
    if (activeTab === 'all') return true;
    return p.categoryName.toLowerCase() === activeTab;
  });

  const handleViewAll = () => {
    setSelectedCategorySlug(activeTab);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-16 md:py-24 bg-white border-b border-[#E8E1D7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-[11px] uppercase tracking-[0.28em] text-[#B89B5E] font-medium block mb-2 font-sans">
              Curated Showcase
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#111111]">
              New Arrivals & Iconic Designs
            </h2>
            <p className="text-[#77716A] text-xs sm:text-sm font-sans mt-2">
              Fresh designs. Timeless feeling. Each piece is hallmarked and individually inspected.
            </p>
          </div>

          {/* Interactive Filter Tabs (Buttons with click handlers) */}
          <div className="flex items-center flex-wrap gap-2 sm:gap-3">
            {[
              { id: 'all', label: 'All' },
              { id: 'necklaces', label: 'Necklaces' },
              { id: 'earrings', label: 'Earrings' },
              { id: 'rings', label: 'Rings' },
              { id: 'bracelets', label: 'Bracelets' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 text-[11px] uppercase tracking-[0.16em] font-medium transition-all duration-300 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#111111] text-white shadow-sm'
                    : 'bg-[#FAF8F4] text-[#77716A] hover:text-[#111111] border border-[#E8E1D7]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4-column desktop, 3-column tablet, 2-column mobile Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-14 text-center">
          <button
            onClick={handleViewAll}
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-[#111111] text-[#111111] text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-[#111111] hover:text-white transition-all duration-300 cursor-pointer group"
          >
            <span>View Complete Collection</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
