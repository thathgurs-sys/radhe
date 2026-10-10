import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Check, Truck } from 'lucide-react';

export const CartDrawer: React.FC<{ onOpenCheckout: () => void }> = ({ onOpenCheckout }) => {
  const {
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    cart,
    cartCount,
    subtotal,
    discount,
    shippingFee,
    grandTotal,
    updateCartQuantity,
    removeFromCart,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    settings,
    setCurrentView
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartDrawerOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError('');
      setCouponInput('');
    }
  };

  const amountToFreeShipping = Math.max(0, settings.freeShippingThreshold - (subtotal - discount));
  const shippingProgress = Math.min(100, Math.round(((subtotal - discount) / settings.freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-[#E8E1D7] flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300 font-sans">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-[#E8E1D7] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#B89B5E]" />
              <h2 className="font-serif text-2xl text-[#111111]">Shopping Bag</h2>
              <span className="text-xs text-[#77716A]">({cartCount} items)</span>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1.5 text-stone-500 hover:text-[#111111] transition-colors cursor-pointer"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#FAF8F4] px-6 py-3 border-b border-[#E8E1D7] text-xs">
            <div className="flex items-center gap-1.5 text-[#111111] mb-1.5">
              <Truck className="w-3.5 h-3.5 text-[#B89B5E]" />
              {amountToFreeShipping === 0 ? (
                <span className="font-medium text-emerald-800">
                  You have unlocked Complimentary Insured Delivery!
                </span>
              ) : (
                <span>
                  Add <strong className="text-[#111111]">{settings.currencySymbol}{amountToFreeShipping.toLocaleString('en-IN')}</strong> more for Free Shipping
                </span>
              )}
            </div>
            <div className="w-full bg-[#E8E1D7] h-1.5 overflow-hidden">
              <div
                className="bg-[#B89B5E] h-full transition-all duration-500"
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 divide-y divide-[#E8E1D7]/70">
            {cart.length === 0 ? (
              <div className="py-20 text-center">
                <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto mb-4" />
                <p className="font-serif text-xl text-[#111111] mb-2">Your Bag is Empty</p>
                <p className="text-xs text-[#77716A] mb-6 max-w-xs mx-auto">
                  Discover timeless jewelry handcrafted with precious metals and fine gems.
                </p>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    setCurrentView('shop');
                  }}
                  className="px-6 py-2.5 bg-[#111111] text-white text-xs uppercase tracking-wider hover:bg-[#B89B5E] transition-colors cursor-pointer"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const p = item.product;
                const unitPrice = p.salePrice || p.price;
                return (
                  <div key={item.id} className="py-4 flex gap-4 items-center">
                    {/* Thumbnail */}
                    <div className="w-20 h-20 bg-[#FAF8F4] border border-[#E8E1D7] p-1.5 shrink-0">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <h4 className="font-serif text-base text-[#111111] truncate">{p.name}</h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-stone-400 hover:text-red-600 transition-colors cursor-pointer p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-[11px] text-[#77716A] mb-2">
                        {item.selectedSize ? `Variant: ${item.selectedSize}` : p.categoryName}
                      </p>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center border border-[#E8E1D7] bg-[#FAF8F4] text-xs">
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1 hover:text-[#B89B5E] cursor-pointer"
                          >
                            -
                          </button>
                          <span className="px-2 py-1 font-semibold tabular-nums">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 hover:text-[#B89B5E] cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        <span className="font-serif text-base font-semibold text-[#111111] tabular-nums">
                          {settings.currencySymbol}
                          {(unitPrice * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Drawer Footer / Totals & Coupon */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#E8E1D7] bg-[#FAF8F4] space-y-4">
              
              {/* Coupon Form */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 bg-white border border-[#B89B5E]/40 text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-800">
                    <Check className="w-3.5 h-3.5 text-[#B89B5E]" />
                    <span>Coupon <strong>{appliedCoupon.code}</strong> Applied</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-[11px] text-stone-500 hover:text-red-600 underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Coupon Code (e.g. ELAN20)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="w-full text-xs px-3 py-2 border border-[#E8E1D7] bg-white focus:outline-none focus:border-[#B89B5E]"
                    />
                    <Tag className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-2.5 pointer-events-none" />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#111111] text-white text-[11px] uppercase tracking-wider font-medium hover:bg-[#B89B5E] transition-colors cursor-pointer shrink-0"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && <p className="text-[11px] text-red-600 font-sans">{couponError}</p>}

              {/* Subtotal Breakdowns */}
              <div className="space-y-1.5 text-xs text-[#77716A]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-[#111111] font-mono tabular-nums">
                    {settings.currencySymbol}{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount</span>
                    <span className="font-mono tabular-nums">
                      -{settings.currencySymbol}{discount.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-[#111111] font-mono tabular-nums">
                    {shippingFee === 0 ? 'Complimentary' : `${settings.currencySymbol}${shippingFee}`}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#E8E1D7] flex justify-between text-base font-serif font-semibold text-[#111111]">
                  <span>Total</span>
                  <span className="tabular-nums">
                    {settings.currencySymbol}{grandTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    onOpenCheckout();
                  }}
                  className="w-full bg-[#111111] text-white py-3.5 px-4 text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#B89B5E] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    setCurrentView('cart');
                  }}
                  className="w-full bg-white border border-[#E8E1D7] text-[#111111] py-2 text-xs uppercase tracking-[0.16em] hover:border-[#111111] transition-colors cursor-pointer text-center"
                >
                  View Full Cart Page
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
