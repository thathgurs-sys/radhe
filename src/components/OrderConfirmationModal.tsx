import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, Printer, ArrowRight, PackageCheck, Clock } from 'lucide-react';

export const OrderConfirmationModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
}) => {
  const { lastPlacedOrder, settings, setCurrentView } = useStore();

  if (!isOpen || !lastPlacedOrder) return null;

  const order = lastPlacedOrder;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white border border-[#E8E1D7] max-w-2xl w-full p-8 sm:p-12 shadow-2xl animate-in zoom-in-95 duration-200 font-sans my-8">
        
        {/* Celebration Header */}
        <div className="text-center mb-8 pb-6 border-b border-[#E8E1D7]">
          <div className="w-16 h-16 bg-[#FAF8F4] border border-[#B89B5E] text-[#B89B5E] rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.28em] text-[#B89B5E] font-medium block mb-1">
            Order Confirmed
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#111111] mb-2">
            Thank You For Your Patronage
          </h2>
          <p className="text-xs text-[#77716A]">
            A confirmation receipt has been dispatched to <strong>{order.customerEmail}</strong>.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-[#FAF8F4] border border-[#E8E1D7] p-6 mb-6 text-xs space-y-4">
          <div className="flex flex-wrap justify-between items-center gap-2 pb-3 border-b border-[#E8E1D7]">
            <div>
              <span className="text-stone-400 block text-[10px] uppercase tracking-wider">Order Reference</span>
              <span className="font-mono font-bold text-sm text-[#111111]">{order.orderNumber}</span>
            </div>
            <div>
              <span className="text-stone-400 block text-[10px] uppercase tracking-wider">Date</span>
              <span className="font-medium text-[#111111]">{order.createdAt}</span>
            </div>
            <div>
              <span className="text-stone-400 block text-[10px] uppercase tracking-wider">Payment</span>
              <span className="font-medium text-[#111111] uppercase">{order.paymentMethod}</span>
            </div>
            <div>
              <span className="text-stone-400 block text-[10px] uppercase tracking-wider">Total</span>
              <span className="font-serif font-bold text-base text-[#111111] tabular-nums">
                {settings.currencySymbol}{order.grandTotal.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Delivery Address */}
          <div>
            <span className="text-stone-400 block text-[10px] uppercase tracking-wider mb-1">Shipping Destination</span>
            <p className="text-[#111111] leading-relaxed">
              <strong>{order.customerName}</strong> ({order.customerPhone})<br />
              {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
            </p>
          </div>

          {/* Items Purchased */}
          <div>
            <span className="text-stone-400 block text-[10px] uppercase tracking-wider mb-2">Pieces Reserved</span>
            <div className="space-y-2">
              {order.items.map((it, idx) => (
                <div key={idx} className="flex justify-between items-center bg-white p-2 border border-[#E8E1D7]">
                  <div className="flex items-center gap-2">
                    <img src={it.image} alt={it.productName} className="w-8 h-8 object-cover border" />
                    <div>
                      <span className="font-medium text-[#111111] block">{it.productName}</span>
                      <span className="text-[10px] text-stone-400">SKU: {it.sku} · Qty: {it.quantity}</span>
                    </div>
                  </div>
                  <span className="font-mono tabular-nums text-[#111111]">
                    {settings.currencySymbol}{(it.price * it.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Status Timeline */}
        <div className="flex items-center justify-between text-center text-[10px] font-sans text-stone-400 mb-8 px-4">
          <div className="flex flex-col items-center text-[#B89B5E] font-medium">
            <PackageCheck className="w-4 h-4 mb-1" />
            <span>Order Placed</span>
          </div>
          <div className="h-[1px] flex-1 bg-[#B89B5E] mx-2" />
          <div className="flex flex-col items-center text-[#111111]">
            <Clock className="w-4 h-4 mb-1" />
            <span>Master Atelier Inspection</span>
          </div>
          <div className="h-[1px] flex-1 bg-stone-300 mx-2" />
          <div className="flex flex-col items-center">
            <span>Armored Transit</span>
          </div>
          <div className="h-[1px] flex-1 bg-stone-300 mx-2" />
          <div className="flex flex-col items-center">
            <span>Delivered</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handlePrint}
            className="flex-1 border border-[#111111] py-3 text-xs uppercase tracking-wider font-medium text-[#111111] hover:bg-stone-50 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Official Invoice</span>
          </button>
          
          <button
            onClick={() => {
              onClose();
              setCurrentView('shop');
            }}
            className="flex-1 bg-[#111111] text-white py-3 text-xs uppercase tracking-wider font-medium hover:bg-[#B89B5E] transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
