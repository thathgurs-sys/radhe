import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Trash2, ShoppingBag, ArrowRight, Tag, Check, Truck, ShieldCheck } from 'lucide-react';

export const CartPage: React.FC<{ onOpenCheckout: () => void }> = ({ onOpenCheckout }) => {
  const {
    cart,
    cartCount,
    subtotal,
    discount,
    shippingFee,
    grandTotal,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    settings,
    setCurrentView
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

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

  if (cart.length === 0) {
    return (
      <div className="bg-[#FAF8F4] min-h-[70vh] flex items-center justify-center py-20 font-sans">
        <div className="bg-white border border-[#E8E1D7] p-10 max-w-md w-full text-center">
          <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto mb-4" />
          <h2 className="font-serif text-3xl text-[#111111] mb-2">Your Shopping Bag is Empty</h2>
          <p className="text-xs text-[#77716A] mb-6">
            Explore our curated collections of diamond pendants, earrings, and rings.
          </p>
          <button
            onClick={() => setCurrentView('shop')}
            className="px-8 py-3 bg-[#111111] text-white text-xs uppercase tracking-wider font-medium hover:bg-[#B89B5E] transition-colors cursor-pointer"
          >
            Explore Catalog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF8F4] min-h-screen py-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="mb-8 flex justify-between items-baseline border-b border-[#E8E1D7] pb-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.24em] text-[#B89B5E] font-medium block">
              Luxury Shopping Bag
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#111111]">
              Review Your Selections
            </h1>
          </div>
          <button
            onClick={clearCart}
            className="text-xs text-[#77716A] hover:text-red-600 transition-colors cursor-pointer"
          >
            Clear Entire Bag
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Items Table (8 cols) */}
          <div className="lg:col-span-8 bg-white border border-[#E8E1D7] p-6 shadow-sm">
            <div className="divide-y divide-[#E8E1D7]">
              {cart.map((item) => {
                const p = item.product;
                const unitPrice = p.salePrice || p.price;
                return (
                  <div key={item.id} className="py-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
                    <div className="flex gap-4 items-center min-w-0">
                      <div className="w-24 h-24 bg-[#FAF8F4] border border-[#E8E1D7] p-2 shrink-0">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] uppercase tracking-wider text-[#B89B5E] block">
                          {p.categoryName}
                        </span>
                        <h3 className="font-serif text-xl text-[#111111] truncate">{p.name}</h3>
                        <p className="text-xs text-[#77716A] mb-1">SKU: {p.sku}</p>
                        {item.selectedSize && (
                          <span className="inline-block bg-[#FAF8F4] border border-[#E8E1D7] px-2 py-0.5 text-[10px] text-[#77716A]">
                            Size: {item.selectedSize}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                      <div className="flex items-center border border-[#E8E1D7] bg-[#FAF8F4] text-xs">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1.5 hover:text-[#B89B5E] cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-3 py-1.5 font-semibold tabular-nums">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1.5 hover:text-[#B89B5E] cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-serif text-lg font-semibold text-[#111111] tabular-nums block">
                          {settings.currencySymbol}{(unitPrice * item.quantity).toLocaleString('en-IN')}
                        </span>
                        {item.quantity > 1 && (
                          <span className="text-[10px] text-[#77716A]">
                            ({settings.currencySymbol}{unitPrice.toLocaleString('en-IN')} each)
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-stone-400 hover:text-red-600 transition-colors cursor-pointer p-1"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Totals Summary (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-[#E8E1D7] p-6 shadow-sm space-y-6">
              <h3 className="font-serif text-2xl text-[#111111] pb-3 border-b border-[#E8E1D7]">
                Order Summary
              </h3>

              {/* Coupon Section */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#111111] mb-2">
                  Promotional Voucher
                </label>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-3 bg-[#FAF8F4] border border-[#B89B5E]/40 text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-800">
                      <Check className="w-4 h-4 text-[#B89B5E]" />
                      <span><strong>{appliedCoupon.code}</strong> Applied</span>
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
                    <input
                      type="text"
                      placeholder="e.g. ELAN20"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs border border-[#E8E1D7] bg-[#FAF8F4] focus:outline-none focus:border-[#B89B5E]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#111111] text-white text-xs uppercase tracking-wider font-medium hover:bg-[#B89B5E] transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && <p className="text-[11px] text-red-600 mt-1">{couponError}</p>}
              </div>

              {/* Price Calculations */}
              <div className="space-y-2 text-xs text-[#77716A] pt-4 border-t border-[#E8E1D7]">
                <div className="flex justify-between">
                  <span>Subtotal ({cartCount} items)</span>
                  <span className="text-[#111111] font-mono tabular-nums">
                    {settings.currencySymbol}{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-800 font-medium">
                    <span>Privé Privilege ({appliedCoupon?.code})</span>
                    <span className="font-mono tabular-nums">
                      -{settings.currencySymbol}{discount.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Armored Insured Shipping</span>
                  <span className="text-[#111111] font-mono tabular-nums">
                    {shippingFee === 0 ? 'Complimentary' : `${settings.currencySymbol}${shippingFee}`}
                  </span>
                </div>
                <div className="pt-3 border-t border-[#E8E1D7] flex justify-between text-xl font-serif font-semibold text-[#111111]">
                  <span>Total Amount</span>
                  <span className="tabular-nums">
                    {settings.currencySymbol}{grandTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={onOpenCheckout}
                className="w-full bg-[#111111] text-white py-4 text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#B89B5E] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#77716A]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B89B5E]" />
                <span>BIS Hallmarked & 100% Insured Delivery</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
