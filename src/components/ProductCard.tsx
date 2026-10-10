import React from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    setQuickViewProduct,
    setSelectedProduct,
    setCurrentView,
    settings
  } = useStore();

  const isLiked = isInWishlist(product.id);
  const discountPercent = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  const handleCardClick = () => {
    setSelectedProduct(product);
    setCurrentView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="group relative bg-white border border-[#E8E1D7] flex flex-col justify-between transition-all duration-300 hover:shadow-lg">
      {/* Top Image Showcase */}
      <div className="relative aspect-square overflow-hidden bg-[#FAF8F4] p-3 sm:p-4">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 items-start">
          {product.isNewArrival && (
            <span className="bg-[#111111] text-[#E8E1D7] text-[9px] uppercase tracking-[0.2em] px-2 py-0.5 font-sans font-medium">
              New
            </span>
          )}
          {discountPercent > 0 && (
            <span className="bg-[#B89B5E] text-white text-[9px] uppercase tracking-[0.2em] px-2 py-0.5 font-sans font-medium">
              -{discountPercent}%
            </span>
          )}
          {product.stock <= product.lowStockThreshold && product.stock > 0 && (
            <span className="bg-amber-800 text-white text-[9px] uppercase tracking-[0.16em] px-2 py-0.5 font-sans">
              Only {product.stock} Left
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
            isLiked
              ? 'bg-[#B89B5E] text-white'
              : 'bg-white/90 text-[#171717] hover:bg-white hover:text-[#B89B5E] shadow-sm'
          }`}
          title={isLiked ? 'Remove from Wishlist' : 'Add to Wishlist'}
          aria-label="Wishlist"
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
        </button>

        {/* Product Image */}
        <div
          onClick={handleCardClick}
          className="w-full h-full flex items-center justify-center cursor-pointer overflow-hidden"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center transform group-hover:scale-106 transition-transform duration-500 ease-out"
            loading="lazy"
          />
        </div>

        {/* Quick View Floating Action Bar on Hover */}
        <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="flex-1 bg-white/95 hover:bg-white text-[#111111] py-2 text-[10px] uppercase tracking-[0.18em] font-medium border border-[#E8E1D7] shadow-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#B89B5E]" />
            <span>Quick View</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, 1);
            }}
            className="bg-[#111111] hover:bg-[#B89B5E] text-white p-2 border border-[#111111] transition-colors cursor-pointer shadow-sm"
            title="Add to Bag"
            aria-label="Add to Bag"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow border-t border-[#E8E1D7]">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[11px] text-[#77716A] mb-1.5 font-sans">
            <span className="uppercase tracking-[0.18em] text-[#B89B5E] font-medium">
              {product.categoryName}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-[#B89B5E] fill-current" />
              <span className="text-[10px] font-medium text-[#111111] tabular-nums">
                {product.rating.toFixed(1)}
              </span>
              <span className="text-[10px] text-stone-400">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3
            onClick={handleCardClick}
            className="font-serif text-lg sm:text-xl text-[#111111] hover:text-[#B89B5E] transition-colors cursor-pointer line-clamp-1 mb-2 font-medium"
          >
            {product.name}
          </h3>

          {/* Material & Weight */}
          <p className="text-[11px] text-[#77716A] mb-3 line-clamp-1 font-sans">
            {product.material} · {product.weight}
          </p>
        </div>

        {/* Pricing Row & Add to Cart button */}
        <div className="pt-2 border-t border-[#E8E1D7]/60 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-base sm:text-lg font-semibold text-[#111111] tabular-nums">
              {settings.currencySymbol}
              {(product.salePrice || product.price).toLocaleString('en-IN')}
            </span>
            {product.salePrice && (
              <span className="text-xs text-[#77716A] line-through tabular-nums font-sans">
                {settings.currencySymbol}
                {product.price.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            className="text-[10px] uppercase tracking-[0.16em] font-medium text-[#111111] hover:text-[#B89B5E] transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>+ Add to Bag</span>
          </button>
        </div>
      </div>
    </div>
  );
};
