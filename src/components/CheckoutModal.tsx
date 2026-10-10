import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, ShieldCheck, CheckCircle2, CreditCard, Banknote, Lock } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onOrderSuccess
}) => {
  const {
    cart,
    subtotal,
    discount,
    shippingFee,
    grandTotal,
    appliedCoupon,
    placeOrder,
    settings,
    currentUser
  } = useStore();

  const [firstName, setFirstName] = useState(currentUser?.name.split(' ')[0] || '');
  const [lastName, setLastName] = useState(currentUser?.name.split(' ')[1] || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '+91 98201 12345');
  const [street, setStreet] = useState('Flat 402, Sea Green Apts, Worli Sea Face');
  const [city, setCity] = useState('Mumbai');
  const [state, setState] = useState('Maharashtra');
  const [pincode, setPincode] = useState('400018');
  const [country] = useState('India');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'razorpay' | 'card'>('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const orderItems = cart.map((item) => ({
        productId: item.productId,
        productName: item.product.name,
        sku: item.product.sku,
        price: item.product.salePrice || item.product.price,
        quantity: item.quantity,
        image: item.product.image
      }));

      placeOrder({
        customerName: `${firstName} ${lastName}`.trim(),
        customerEmail: email,
        customerPhone: phone,
        shippingAddress: {
          street,
          city,
          state,
          pincode,
          country
        },
        items: orderItems,
        subtotal,
        discount,
        couponCode: appliedCoupon?.code,
        shipping: shippingFee,
        grandTotal,
        paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
        orderStatus: 'confirmed'
      });

      setIsSubmitting(false);
      onClose();
      onOrderSuccess();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white border border-[#E8E1D7] max-w-4xl w-full p-6 sm:p-10 shadow-2xl animate-in zoom-in-95 duration-200 font-sans my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-stone-500 hover:text-[#111111] transition-colors cursor-pointer"
          aria-label="Close checkout"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-8 pb-4 border-b border-[#E8E1D7]">
          <Lock className="w-5 h-5 text-[#B89B5E]" />
          <h2 className="font-serif text-2xl sm:text-3xl text-[#111111]">
            Encrypted Luxury Checkout
          </h2>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Shipping & Delivery Info (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#111111] mb-4">
                1. Delivery & Recipient Details
              </h3>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-[11px] text-[#77716A] mb-1 font-medium">First Name</label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#E8E1D7] bg-[#FAF8F4] focus:outline-none focus:border-[#B89B5E]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-[#77716A] mb-1 font-medium">Last Name</label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#E8E1D7] bg-[#FAF8F4] focus:outline-none focus:border-[#B89B5E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-[11px] text-[#77716A] mb-1 font-medium">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#E8E1D7] bg-[#FAF8F4] focus:outline-none focus:border-[#B89B5E]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-[#77716A] mb-1 font-medium">Phone (for Armored Delivery)</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#E8E1D7] bg-[#FAF8F4] focus:outline-none focus:border-[#B89B5E]"
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="block text-[11px] text-[#77716A] mb-1 font-medium">Street Address / Suite / Residence</label>
                <input
                  type="text"
                  required
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#E8E1D7] bg-[#FAF8F4] focus:outline-none focus:border-[#B89B5E]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] text-[#77716A] mb-1 font-medium">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#E8E1D7] bg-[#FAF8F4] focus:outline-none focus:border-[#B89B5E]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-[#77716A] mb-1 font-medium">State</label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#E8E1D7] bg-[#FAF8F4] focus:outline-none focus:border-[#B89B5E]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-[#77716A] mb-1 font-medium">PIN Code</label>
                  <input
                    type="text"
                    required
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#E8E1D7] bg-[#FAF8F4] focus:outline-none focus:border-[#B89B5E]"
                  />
                </div>
              </div>
            </div>

            {/* Payment Options */}
            <div className="pt-4 border-t border-[#E8E1D7]">
              <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#111111] mb-3">
                2. Payment Method
              </h3>
              <div className="space-y-2.5">
                <label
                  className={`flex items-center justify-between p-3.5 border cursor-pointer transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-[#B89B5E] bg-[#FAF8F4] ring-1 ring-[#B89B5E]'
                      : 'border-[#E8E1D7] bg-white hover:border-stone-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="accent-[#B89B5E]"
                    />
                    <div>
                      <span className="text-xs font-semibold text-[#111111] block">
                        Cash on Delivery (COD) / Pay at Delivery
                      </span>
                      <span className="text-[11px] text-[#77716A]">
                        Inspect the sealed tamper-proof luxury box upon delivery.
                      </span>
                    </div>
                  </div>
                  <Banknote className="w-5 h-5 text-[#B89B5E]" />
                </label>

                <label
                  className={`flex items-center justify-between p-3.5 border cursor-pointer transition-all ${
                    paymentMethod === 'razorpay'
                      ? 'border-[#B89B5E] bg-[#FAF8F4] ring-1 ring-[#B89B5E]'
                      : 'border-[#E8E1D7] bg-white hover:border-stone-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'razorpay'}
                      onChange={() => setPaymentMethod('razorpay')}
                      className="accent-[#B89B5E]"
                    />
                    <div>
                      <span className="text-xs font-semibold text-[#111111] block">
                        Online Payment (UPI / Cards / NetBanking)
                      </span>
                      <span className="text-[11px] text-[#77716A]">
                        Razorpay Gateway Architecture Integration (Live Ready).
                      </span>
                    </div>
                  </div>
                  <CreditCard className="w-5 h-5 text-[#B89B5E]" />
                </label>
              </div>
            </div>

          </div>

          {/* Right Column: Order Summary (5 cols) */}
          <div className="lg:col-span-5 bg-[#FAF8F4] p-6 border border-[#E8E1D7] flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-xl text-[#111111] mb-4 pb-3 border-b border-[#E8E1D7]">
                Order Summary ({cart.length} items)
              </h3>

              {/* Items List */}
              <div className="max-h-48 overflow-y-auto space-y-3 mb-4 pr-1 divide-y divide-[#E8E1D7]/60">
                {cart.map((item) => (
                  <div key={item.id} className="pt-2 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 min-w-0">
                      <img src={item.product.image} alt={item.product.name} className="w-10 h-10 object-cover border border-[#E8E1D7]" />
                      <div className="truncate">
                        <span className="font-medium text-[#111111] block truncate">{item.product.name}</span>
                        <span className="text-[10px] text-stone-500">Qty: {item.quantity}</span>
                      </div>
                    </div>
                    <span className="font-mono tabular-nums text-[#111111] shrink-0">
                      {settings.currencySymbol}
                      {((item.product.salePrice || item.product.price) * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals Breakdown */}
              <div className="space-y-2 pt-3 border-t border-[#E8E1D7] text-xs text-[#77716A]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
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
                  <span>Insured Courier</span>
                  <span className="text-[#111111] font-mono tabular-nums">
                    {shippingFee === 0 ? 'Complimentary' : `${settings.currencySymbol}${shippingFee}`}
                  </span>
                </div>
                <div className="pt-3 border-t border-[#E8E1D7] flex justify-between text-lg font-serif font-semibold text-[#111111]">
                  <span>Grand Total</span>
                  <span className="tabular-nums">
                    {settings.currencySymbol}{grandTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

            </div>

            {/* Submit Button */}
            <div className="mt-8 space-y-3">
              <button
                type="submit"
                disabled={isSubmitting || cart.length === 0}
                className="w-full bg-[#111111] text-white py-4 px-6 text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#B89B5E] transition-colors cursor-pointer shadow-lg disabled:opacity-50"
              >
                {isSubmitting ? 'Confirming Your Order...' : `Place Order · ${settings.currencySymbol}${grandTotal.toLocaleString('en-IN')}`}
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#77716A] text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B89B5E]" />
                <span>256-bit Encrypted · BIS Hallmarked Certified</span>
              </div>
            </div>

          </div>

        </form>

      </div>
    </div>
  );
};
