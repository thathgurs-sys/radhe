import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { Filter, SlidersHorizontal, Search, RotateCcw } from 'lucide-react';

export const ShopCatalogView: React.FC = () => {
  const {
    products,
    categories,
    selectedCategorySlug,
    setSelectedCategorySlug,
    searchQuery,
    setSearchQuery,
    settings
  } = useStore();

  const [sortBy, setSortBy] = useState<'newest' | 'price_low' | 'price_high' | 'popular'>('newest');
  const [maxPrice, setMaxPrice] = useState<number>(20000);
  const [selectedMaterial, setSelectedMaterial] = useState<string>('all');

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategorySlug !== 'all') {
        const cat = categories.find((c) => c.slug === selectedCategorySlug);
        if (cat && p.categoryId !== cat.id) return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesSku = p.sku.toLowerCase().includes(q);
        const matchesCat = p.categoryName.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
        if (!matchesName && !matchesSku && !matchesCat && !matchesDesc) return false;
      }

      // Max price filter
      const effectivePrice = p.salePrice || p.price;
      if (effectivePrice > maxPrice) return false;

      // Material filter
      if (selectedMaterial !== 'all') {
        if (!p.material.toLowerCase().includes(selectedMaterial.toLowerCase())) return false;
      }

      return true;
    }).sort((a, b) => {
      const priceA = a.salePrice || a.price;
      const priceB = b.salePrice || b.price;

      if (sortBy === 'price_low') return priceA - priceB;
      if (sortBy === 'price_high') return priceB - priceA;
      if (sortBy === 'popular') return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
      return b.id - a.id; // newest
    });
  }, [products, categories, selectedCategorySlug, searchQuery, maxPrice, selectedMaterial, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategorySlug('all');
    setSearchQuery('');
    setMaxPrice(20000);
    setSelectedMaterial('all');
    setSortBy('newest');
  };

  return (
    <div className="bg-[#FAF8F4] min-h-screen py-10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Catalog Banner */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[10px] uppercase tracking-[0.28em] text-[#B89B5E] font-medium block mb-2">
            Haute Joaillerie Catalog
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#111111] mb-3">
            All Jewelry Collections
          </h1>
          <p className="text-xs text-[#77716A]">
            Discover certified yellow sapphires, brilliant diamond solitaires, and hallmarked gold creations.
          </p>
        </div>

        {/* Toolbar: Category Pills & Sort */}
        <div className="bg-white border border-[#E8E1D7] p-4 sm:p-5 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex items-center flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategorySlug('all')}
              className={`px-3 py-1.5 text-xs uppercase tracking-wider font-medium transition-colors cursor-pointer ${
                selectedCategorySlug === 'all'
                  ? 'bg-[#111111] text-white'
                  : 'bg-[#FAF8F4] text-[#77716A] hover:text-[#111111] border border-[#E8E1D7]'
              }`}
            >
              All Pieces
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategorySlug(c.slug)}
                className={`px-3 py-1.5 text-xs uppercase tracking-wider font-medium transition-colors cursor-pointer ${
                  selectedCategorySlug === c.slug
                    ? 'bg-[#111111] text-white'
                    : 'bg-[#FAF8F4] text-[#77716A] hover:text-[#111111] border border-[#E8E1D7]'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          {/* Right: Sort & Filter Controls */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#77716A] whitespace-nowrap">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-2.5 py-1.5 border border-[#E8E1D7] bg-[#FAF8F4] text-xs focus:outline-none focus:border-[#B89B5E]"
              >
                <option value="newest">Newest Releases</option>
                <option value="popular">Bestsellers & Popular</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
              </select>
            </div>
          </div>

        </div>

        {/* Content Layout: Filters Sidebar + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left: Filter Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white border border-[#E8E1D7] p-5 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8E1D7]">
                <h3 className="font-serif text-lg text-[#111111] font-semibold flex items-center gap-1.5">
                  <SlidersHorizontal className="w-4 h-4 text-[#B89B5E]" />
                  <span>Refine Catalog</span>
                </h3>
                <button
                  onClick={handleResetFilters}
                  className="text-[11px] text-[#77716A] hover:text-[#B89B5E] flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Keyword Search */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#111111] mb-2">
                  Search Query
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, SKU..."
                    className="w-full pl-8 pr-3 py-1.5 text-xs border border-[#E8E1D7] bg-[#FAF8F4] focus:outline-none focus:border-[#B89B5E]"
                  />
                  <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5 pointer-events-none" />
                </div>
              </div>

              {/* Price Filter Slider */}
              <div>
                <div className="flex justify-between items-center text-[11px] font-semibold uppercase tracking-wider text-[#111111] mb-2">
                  <span>Maximum Price</span>
                  <span className="font-mono text-[#B89B5E]">
                    {settings.currencySymbol}{maxPrice.toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  type="range"
                  min={5000}
                  max={25000}
                  step={500}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#B89B5E]"
                />
                <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                  <span>{settings.currencySymbol}5,000</span>
                  <span>{settings.currencySymbol}25,000</span>
                </div>
              </div>

              {/* Material Selector */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#111111] mb-2">
                  Precious Metal
                </label>
                <select
                  value={selectedMaterial}
                  onChange={(e) => setSelectedMaterial(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-[#E8E1D7] bg-[#FAF8F4] text-xs focus:outline-none focus:border-[#B89B5E]"
                >
                  <option value="all">All Metals & Finishes</option>
                  <option value="yellow gold">Yellow Gold</option>
                  <option value="white gold">White Gold</option>
                  <option value="platinum">Platinum</option>
                  <option value="rose">Rose Gold</option>
                </select>
              </div>

              {/* Authenticity Guarantee Callout */}
              <div className="p-3 bg-[#FAF8F4] border border-[#E8E1D7] text-[11px] text-[#77716A] leading-relaxed">
                <span className="font-semibold text-[#111111] block mb-1">Assay & Certification</span>
                Every piece ships with individual IGI/GIA certificate of authentication and BIS Hallmark seal.
              </div>
            </div>
          </div>

          {/* Right: Products Grid (3 cols) */}
          <div className="lg:col-span-3">
            {/* Results Bar */}
            <div className="flex justify-between items-center mb-6 text-xs text-[#77716A]">
              <span>Showing <strong>{filteredProducts.length}</strong> jewelry pieces</span>
              {searchQuery && (
                <span>
                  Matching query: "<em>{searchQuery}</em>"
                </span>
              )}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="bg-white border border-[#E8E1D7] p-12 text-center">
                <p className="font-serif text-2xl text-[#111111] mb-2">No Matching Jewels Found</p>
                <p className="text-xs text-[#77716A] mb-6">
                  Try adjusting your price range or search terms to explore available pieces.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2 bg-[#111111] text-white text-xs uppercase tracking-wider hover:bg-[#B89B5E] transition-colors cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
