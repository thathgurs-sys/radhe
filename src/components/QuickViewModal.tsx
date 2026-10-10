import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Star, Heart, ShoppingBag, ShieldCheck, Truck, Sparkles } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    settings
  } = useStore();

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('Size 7');
  const [activeImage, setActiveImage] = useState<string>('');

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const currentImg = activeImage || product.image;
  const isLiked = isInWishlist(product.id);
  const discountPercent = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  const allImages = [product.image, ...(product.secondaryImages || [])];

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white border border-[#E8E1D7] max-w-3xl w-full p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 p-2 text-stone-500 hover:text-[#111111] transition-colors cursor-pointer"
          aria-label="Close Quick View"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Left: Product Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-[#FAF8F4] border border-[#E8E1D7] overflow-hidden p-4 relative">
              <img
                src={currentImg}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
              {discountPercent > 0 && (
                <span className="absolute top-3 left-3 bg-[#B89B5E] text-white text-[10px] uppercase tracking-wider px-2 py-0.5 font-sans font-medium">
                  -{discountPercent}% OFF
                </span>
              )}
            </div>

            {/* Thumbnail row */}
            {allImages.length > 1 && (
              <div className="flex gap-2">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(img)}
                    className={`w-16 h-16 border overflow-hidden p-1 bg-[#FAF8F4] cursor-pointer transition-all ${
                      currentImg === img ? 'border-[#B89B5E] ring-1 ring-[#B89B5E]' : 'border-[#E8E1D7] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details & Purchase Actions */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Category & SKU */}
              <div className="flex items-center justify-between text-xs text-[#77716A] mb-2 font-sans">
                <span className="uppercase tracking-[0.2em] text-[#B89B5E] font-medium">
                  {product.categoryName}
                </span>
                <span className="font-mono text-[10px] text-stone-400">SKU: {product.sku}</span>
              </div>

              {/* Title */}
              <h2 className="font-serif text-2xl sm:text-3xl text-[#111111] mb-2 font-normal">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4 font-sans text-xs">
                <div className="flex text-[#B89B5E]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-stone-300'}`}
                    />
                  ))}
                </div>
                <span className="text-[#111111] font-semibold tabular-nums">{product.rating}</span>
                <span className="text-stone-400">({product.reviewCount} verified reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-4 pb-4 border-b border-[#E8E1D7]">
                <span className="font-serif text-2xl text-[#111111] font-semibold tabular-nums">
                  {settings.currencySymbol}
                  {(product.salePrice || product.price).toLocaleString('en-IN')}
                </span>
                {product.salePrice && (
                  <span className="text-sm text-[#77716A] line-through tabular-nums font-sans">
                    {settings.currencySymbol}
                    {product.price.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-[10px] text-stone-500 font-sans">
                  (Incl. of all taxes & BIS Hallmarking)
                </span>
              </div>

              {/* Short Description */}
              <p className="text-xs text-[#77716A] leading-relaxed font-sans mb-6">
                {product.shortDescription || product.description}
              </p>

              {/* Metal Specs Table */}
              <div className="grid grid-cols-2 gap-2 p-3 bg-[#FAF8F4] border border-[#E8E1D7] text-xs font-sans mb-6">
                <div>
                  <span className="text-stone-400 text-[10px] uppercase tracking-wider block">Metal</span>
                  <span className="font-medium text-[#111111]">{product.material}</span>
                </div>
                <div>
                  <span className="text-stone-400 text-[10px] uppercase tracking-wider block">Gross Weight</span>
                  <span className="font-medium text-[#111111]">{product.weight}</span>
                </div>
              </div>

              {/* Size Selector for Rings/Bracelets */}
              {product.categoryName.toLowerCase() === 'rings' && (
                <div className="mb-6">
                  <div className="flex justify-between items-center text-xs font-sans mb-2">
                    <span className="font-medium uppercase tracking-wider text-[#111111]">Ring Size</span>
                    <span className="text-[10px] text-[#B89B5E] cursor-pointer hover:underline">Sizing Guide</span>
                  </div>
                  <div className="flex gap-2">
                    {['Size 6', 'Size 7', 'Size 8', 'Size 9'].map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`px-3 py-1.5 text-xs font-sans border transition-all cursor-pointer ${
                          selectedSize === sz
                            ? 'border-[#111111] bg-[#111111] text-white'
                            : 'border-[#E8E1D7] text-[#171717] hover:border-[#B89B5E]'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper & Buttons */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center border border-[#E8E1D7] bg-[#FAF8F4]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-stone-600 hover:text-[#111111] text-sm cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-xs font-semibold tabular-nums text-[#111111]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-stone-600 hover:text-[#111111] text-sm cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#111111] text-white py-3 px-6 text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#B89B5E] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3 border border-[#E8E1D7] transition-colors cursor-pointer ${
                    isLiked ? 'bg-[#B89B5E] text-white border-[#B89B5E]' : 'hover:border-[#B89B5E] text-[#111111]'
                  }`}
                  title={isLiked ? 'In Wishlist' : 'Add to Wishlist'}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            {/* Micro Guarantees */}
            <div className="pt-4 border-t border-[#E8E1D7] flex items-center justify-between text-[11px] text-[#77716A] font-sans">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#B89B5E]" />
                <span>Free Insured Delivery</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B89B5E]" />
                <span>Lifetime Certification</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
