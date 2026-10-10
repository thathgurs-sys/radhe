import React from 'react';
import { useStore } from '../context/StoreContext';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const {
    wishlist,
    products,
    toggleWishlist,
    addToCart,
    setCurrentView,
    setSelectedProduct,
    settings
  } = useStore();

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="bg-[#FAF8F4] min-h-screen py-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-[10px] uppercase tracking-[0.28em] text-[#B89B5E] font-medium block mb-2">
            Personal Curation
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#111111] mb-2">
            Your Wishlist
          </h1>
          <p className="text-xs text-[#77716A]">
            {wishlistProducts.length} cherished piece{wishlistProducts.length !== 1 ? 's' : ''} saved for your collection.
          </p>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="bg-white border border-[#E8E1D7] p-12 text-center max-w-md mx-auto">
            <Heart className="w-12 h-12 text-stone-300 mx-auto mb-4" />
            <p className="font-serif text-xl text-[#111111] mb-2">No Pieces in Wishlist</p>
            <p className="text-xs text-[#77716A] mb-6">
              Browse our collections and tap the heart icon on any jewelry piece to save it here.
            </p>
            <button
              onClick={() => setCurrentView('shop')}
              className="px-6 py-2.5 bg-[#111111] text-white text-xs uppercase tracking-wider hover:bg-[#B89B5E] transition-colors cursor-pointer"
            >
              Explore Collection
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistProducts.map((p) => (
              <div key={p.id} className="bg-white border border-[#E8E1D7] flex flex-col justify-between">
                <div className="relative aspect-square bg-[#FAF8F4] p-4 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-500"
                    onClick={() => {
                      setSelectedProduct(p);
                      setCurrentView('product-detail');
                    }}
                  />
                  <button
                    onClick={() => toggleWishlist(p.id)}
                    className="absolute top-3 right-3 p-1.5 bg-white/90 text-stone-500 hover:text-red-600 transition-colors shadow-sm"
                    title="Remove from Wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-4 flex flex-col justify-between flex-grow">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#B89B5E] block mb-1">
                      {p.categoryName}
                    </span>
                    <h3
                      onClick={() => {
                        setSelectedProduct(p);
                        setCurrentView('product-detail');
                      }}
                      className="font-serif text-lg text-[#111111] hover:text-[#B89B5E] transition-colors cursor-pointer truncate mb-2"
                    >
                      {p.name}
                    </h3>
                    <div className="font-serif text-base font-semibold text-[#111111] tabular-nums mb-4">
                      {settings.currencySymbol}
                      {(p.salePrice || p.price).toLocaleString('en-IN')}
                    </div>
                  </div>

                  <button
                    onClick={() => addToCart(p, 1)}
                    className="w-full bg-[#111111] text-white py-2.5 text-xs uppercase tracking-wider font-medium hover:bg-[#B89B5E] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Move to Bag</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
