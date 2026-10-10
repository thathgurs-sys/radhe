import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import {
  Star,
  Heart,
  ShoppingBag,
  Truck,
  ShieldCheck,
  RefreshCw,
  Check,
  ArrowLeft
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedProduct,
    setCurrentView,
    addToCart,
    toggleWishlist,
    isInWishlist,
    products,
    reviews,
    addReview,
    settings,
    setIsCartDrawerOpen
  } = useStore();

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('Standard');
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'shipping' | 'reviews'>('desc');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Review submission state
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');

  if (!selectedProduct) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-[#77716A] mb-4">No product selected.</p>
        <button
          onClick={() => setCurrentView('shop')}
          className="px-6 py-2 bg-[#111111] text-white text-xs uppercase tracking-wider"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const product = selectedProduct;
  const isLiked = isInWishlist(product.id);
  const gallery = [product.image, ...(product.secondaryImages || [])];
  const currentImage = gallery[activeImageIndex] || product.image;

  const productReviews = reviews.filter((r) => r.productId === product.id && r.status === 'approved');
  const relatedProducts = products
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize);
    setIsCartDrawerOpen(true);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewName && reviewTitle && reviewComment) {
      addReview({
        productId: product.id,
        productName: product.name,
        customerName: reviewName,
        rating: reviewRating,
        title: reviewTitle,
        comment: reviewComment
      });
      setReviewName('');
      setReviewTitle('');
      setReviewComment('');
    }
  };

  return (
    <div className="bg-[#FAF8F4] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Back */}
        <div className="flex items-center gap-2 text-xs text-[#77716A] mb-8 font-sans">
          <button
            onClick={() => setCurrentView('shop')}
            className="flex items-center gap-1 hover:text-[#111111] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Shop</span>
          </button>
          <span>/</span>
          <span className="uppercase text-[#B89B5E]">{product.categoryName}</span>
          <span>/</span>
          <span className="text-[#111111] font-medium">{product.name}</span>
        </div>

        {/* Product Purchase Module */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white border border-[#E8E1D7] p-6 sm:p-10 mb-16 shadow-sm">
          
          {/* Gallery Column (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="aspect-square bg-[#FAF8F4] border border-[#E8E1D7] overflow-hidden p-6 relative">
              <img
                src={currentImage}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
              {product.salePrice && (
                <span className="absolute top-4 left-4 bg-[#B89B5E] text-white text-[10px] uppercase tracking-wider px-2.5 py-1 font-sans font-medium">
                  Special Privé Pricing
                </span>
              )}
            </div>

            {/* Thumbnail row */}
            {gallery.length > 1 && (
              <div className="flex gap-3">
                {gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 h-20 border overflow-hidden p-1 bg-[#FAF8F4] cursor-pointer transition-all ${
                      activeImageIndex === idx
                        ? 'border-[#B89B5E] ring-1 ring-[#B89B5E]'
                        : 'border-[#E8E1D7] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Gallery" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details & Purchase Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Category & SKU */}
              <div className="flex items-center justify-between text-xs text-[#77716A] mb-2 font-sans">
                <span className="uppercase tracking-[0.2em] text-[#B89B5E] font-medium">
                  {product.categoryName}
                </span>
                <span className="font-mono text-[11px] text-stone-400">SKU: {product.sku}</span>
              </div>

              {/* Title */}
              <h1 className="font-serif text-3xl sm:text-4xl text-[#111111] mb-3">
                {product.name}
              </h1>

              {/* Ratings */}
              <div className="flex items-center gap-2 mb-6 font-sans text-xs">
                <div className="flex text-[#B89B5E]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-stone-300'}`}
                    />
                  ))}
                </div>
                <span className="font-semibold text-[#111111]">{product.rating}</span>
                <span className="text-[#77716A]">({productReviews.length || product.reviewCount} customer reviews)</span>
              </div>

              {/* Pricing */}
              <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-[#E8E1D7]">
                <span className="font-serif text-3xl font-semibold text-[#111111] tabular-nums">
                  {settings.currencySymbol}
                  {(product.salePrice || product.price).toLocaleString('en-IN')}
                </span>
                {product.salePrice && (
                  <span className="text-base text-[#77716A] line-through tabular-nums font-sans">
                    {settings.currencySymbol}
                    {product.price.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-xs text-stone-500 font-sans">
                  (Inclusive of 3% GST & Insured Shipping)
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-[#77716A] leading-relaxed font-sans mb-8">
                {product.description}
              </p>

              {/* Specifications snippet */}
              <div className="grid grid-cols-2 gap-3 p-4 bg-[#FAF8F4] border border-[#E8E1D7] text-xs font-sans mb-8">
                <div>
                  <span className="text-[#77716A] text-[10px] uppercase tracking-wider block">Material</span>
                  <span className="font-medium text-[#111111]">{product.material}</span>
                </div>
                <div>
                  <span className="text-[#77716A] text-[10px] uppercase tracking-wider block">Approx. Weight</span>
                  <span className="font-medium text-[#111111]">{product.weight}</span>
                </div>
                {product.dimensions && (
                  <div className="col-span-2 pt-2 border-t border-[#E8E1D7]/60">
                    <span className="text-[#77716A] text-[10px] uppercase tracking-wider block">Dimensions</span>
                    <span className="font-medium text-[#111111]">{product.dimensions}</span>
                  </div>
                )}
              </div>

              {/* Sizing options if applicable */}
              {product.categoryName.toLowerCase() === 'rings' && (
                <div className="mb-8">
                  <div className="flex justify-between text-xs font-sans mb-2">
                    <span className="font-medium uppercase tracking-wider text-[#111111]">Select Ring Size</span>
                    <span className="text-[#B89B5E] text-[11px] cursor-pointer hover:underline">Sizing Guide</span>
                  </div>
                  <div className="flex gap-2">
                    {['Size 6', 'Size 7', 'Size 8', 'Size 9'].map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`px-4 py-2 text-xs font-sans border transition-all cursor-pointer ${
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

              {/* Stock Status */}
              <div className="flex items-center gap-2 text-xs font-sans mb-6">
                <span className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-emerald-600' : 'bg-red-500'}`} />
                <span className="text-[#111111]">
                  {product.stock > 0 ? `In Stock (${product.stock} units available)` : 'Temporarily Reserved'}
                </span>
              </div>

              {/* Purchase Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
                <div className="flex items-center border border-[#E8E1D7] bg-[#FAF8F4] w-full sm:w-auto justify-between">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 text-stone-600 hover:text-[#111111] text-sm cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-4 py-3 text-xs font-semibold tabular-nums text-[#111111]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 text-stone-600 hover:text-[#111111] text-sm cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => addToCart(product, quantity, selectedSize)}
                  className="w-full sm:flex-1 bg-[#111111] text-white py-3.5 px-6 text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#B89B5E] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="w-full sm:w-auto bg-[#B89B5E] text-white py-3.5 px-6 text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#9A7D42] transition-colors cursor-pointer shadow-sm"
                >
                  Buy Now
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3.5 border border-[#E8E1D7] transition-colors cursor-pointer ${
                    isLiked ? 'bg-[#B89B5E] text-white border-[#B89B5E]' : 'hover:border-[#B89B5E] text-[#111111]'
                  }`}
                  title={isLiked ? 'In Wishlist' : 'Add to Wishlist'}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                </button>
              </div>

            </div>

            {/* Guarantees */}
            <div className="pt-6 border-t border-[#E8E1D7] grid grid-cols-3 gap-2 text-[11px] text-[#77716A] font-sans text-center">
              <div>
                <Truck className="w-4 h-4 text-[#B89B5E] mx-auto mb-1" />
                <span>Complimentary Delivery</span>
              </div>
              <div>
                <ShieldCheck className="w-4 h-4 text-[#B89B5E] mx-auto mb-1" />
                <span>100% Certified</span>
              </div>
              <div>
                <RefreshCw className="w-4 h-4 text-[#B89B5E] mx-auto mb-1" />
                <span>7-Day Return</span>
              </div>
            </div>

          </div>

        </div>

        {/* Detailed Tabs: Description, Specs, Shipping, Reviews */}
        <div className="bg-white border border-[#E8E1D7] p-6 sm:p-10 mb-16 shadow-sm">
          <div className="flex border-b border-[#E8E1D7] gap-8 text-xs uppercase tracking-[0.18em] font-medium mb-8">
            <button
              onClick={() => setActiveTab('desc')}
              className={`pb-3 cursor-pointer relative ${
                activeTab === 'desc' ? 'text-[#111111] font-semibold' : 'text-[#77716A] hover:text-[#111111]'
              }`}
            >
              Description & Inspiration
              {activeTab === 'desc' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#B89B5E]" />}
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-3 cursor-pointer relative ${
                activeTab === 'specs' ? 'text-[#111111] font-semibold' : 'text-[#77716A] hover:text-[#111111]'
              }`}
            >
              Technical Specifications
              {activeTab === 'specs' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#B89B5E]" />}
            </button>
            <button
              onClick={() => setActiveTab('shipping')}
              className={`pb-3 cursor-pointer relative ${
                activeTab === 'shipping' ? 'text-[#111111] font-semibold' : 'text-[#77716A] hover:text-[#111111]'
              }`}
            >
              Shipping & Authenticity
              {activeTab === 'shipping' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#B89B5E]" />}
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 cursor-pointer relative ${
                activeTab === 'reviews' ? 'text-[#111111] font-semibold' : 'text-[#77716A] hover:text-[#111111]'
              }`}
            >
              Client Reviews ({productReviews.length})
              {activeTab === 'reviews' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#B89B5E]" />}
            </button>
          </div>

          {/* Tab 1: Description */}
          {activeTab === 'desc' && (
            <div className="space-y-4 text-sm text-[#77716A] leading-relaxed font-sans max-w-3xl">
              <p>{product.description}</p>
              <p>
                Each creation from ÉLAN JEWELS is sculpted by master goldsmiths with decades of dedication. Every gemstone is examined under 40x magnification for clarity, symmetry, and color uniformity before setting.
              </p>
            </div>
          )}

          {/* Tab 2: Specs */}
          {activeTab === 'specs' && (
            <div className="max-w-2xl font-sans text-xs">
              <table className="w-full border-collapse">
                <tbody>
                  <tr className="border-b border-[#E8E1D7] py-2">
                    <td className="py-2.5 text-[#77716A] w-1/3">Stock Keeping Unit (SKU)</td>
                    <td className="py-2.5 font-medium text-[#111111] font-mono">{product.sku}</td>
                  </tr>
                  <tr className="border-b border-[#E8E1D7] py-2">
                    <td className="py-2.5 text-[#77716A]">Precious Metal</td>
                    <td className="py-2.5 font-medium text-[#111111]">{product.material}</td>
                  </tr>
                  <tr className="border-b border-[#E8E1D7] py-2">
                    <td className="py-2.5 text-[#77716A]">Gross Weight</td>
                    <td className="py-2.5 font-medium text-[#111111]">{product.weight}</td>
                  </tr>
                  <tr className="border-b border-[#E8E1D7] py-2">
                    <td className="py-2.5 text-[#77716A]">Hallmarking & Certification</td>
                    <td className="py-2.5 font-medium text-[#111111]">BIS Hallmarked, IGI/GIA Diamond Dossier</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Tab 3: Shipping */}
          {activeTab === 'shipping' && (
            <div className="space-y-4 text-sm text-[#77716A] leading-relaxed font-sans max-w-3xl">
              <p>
                <strong>Complimentary Insured Delivery:</strong> Every order is delivered in tamper-evident security packaging with armored courier transit insurance.
              </p>
              <p>
                <strong>7-Day Privilege Exchange:</strong> We offer complete confidence with a 7-day hassle-free exchange privilege on all uncustomized jewelry pieces.
              </p>
            </div>
          )}

          {/* Tab 4: Reviews */}
          {activeTab === 'reviews' && (
            <div className="space-y-8 max-w-3xl font-sans">
              {/* Existing Reviews */}
              {productReviews.length === 0 ? (
                <p className="text-xs text-[#77716A]">Be the first patron to leave an impression on this creation.</p>
              ) : (
                <div className="space-y-4">
                  {productReviews.map((rev) => (
                    <div key={rev.id} className="p-4 bg-[#FAF8F4] border border-[#E8E1D7]">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-xs text-[#111111]">{rev.customerName}</span>
                          <span className="text-[10px] text-stone-400">· {rev.date}</span>
                        </div>
                        <div className="flex text-[#B89B5E]">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                      </div>
                      <h4 className="font-semibold text-xs text-[#111111] mb-1">{rev.title}</h4>
                      <p className="text-xs text-[#77716A] leading-relaxed">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Submit Review Form */}
              <div className="pt-6 border-t border-[#E8E1D7]">
                <h4 className="font-serif text-xl text-[#111111] mb-4">Share Your Impression</h4>
                <form onSubmit={handleReviewSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      required
                      className="px-3 py-2 text-xs border border-[#E8E1D7] bg-[#FAF8F4]"
                    />
                    <select
                      value={reviewRating}
                      onChange={(e) => setReviewRating(Number(e.target.value))}
                      className="px-3 py-2 text-xs border border-[#E8E1D7] bg-[#FAF8F4]"
                    >
                      <option value={5}>5 Stars - Outstanding Heirloom</option>
                      <option value={4}>4 Stars - Very Pleased</option>
                      <option value={3}>3 Stars - Satisfied</option>
                    </select>
                  </div>
                  <input
                    type="text"
                    placeholder="Review Title (e.g. Breathtaking luster & shine)"
                    value={reviewTitle}
                    onChange={(e) => setReviewTitle(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs border border-[#E8E1D7] bg-[#FAF8F4]"
                  />
                  <textarea
                    placeholder="Your detailed review..."
                    rows={3}
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs border border-[#E8E1D7] bg-[#FAF8F4]"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#111111] text-white text-xs uppercase tracking-wider hover:bg-[#B89B5E] transition-colors cursor-pointer"
                  >
                    Submit Review
                  </button>
                </form>
              </div>
            </div>
          )}

        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="text-center mb-10">
              <span className="text-[10px] uppercase tracking-[0.24em] text-[#B89B5E] block mb-1 font-sans">
                Curated Pairing
              </span>
              <h3 className="font-serif text-3xl text-[#111111]">
                Complete Your Ensemble
              </h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
