import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Order } from '../../types';
import { Search, Eye, Printer, X, CheckCircle, Clock, Truck, Package } from 'lucide-react';

export const AdminOrders: React.FC = () => {
  const { orders, updateOrderStatus, settings } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filtered = orders.filter((o) => {
    if (statusFilter !== 'all' && o.orderStatus !== statusFilter) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        o.orderNumber.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.customerEmail.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 font-sans text-stone-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#2C2C2C]">
        <div>
          <h2 className="font-serif text-2xl text-white">Order Management Workflow</h2>
          <p className="text-xs text-stone-400">Track and update customer fulfillment lifecycle</p>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#1C1C1C] p-4 border border-[#2D2D2D]">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search order ref, patron name, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#141414] border border-[#383838] text-white focus:outline-none focus:border-[#B89B5E]"
          />
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5 pointer-events-none" />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-stone-400">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 text-xs bg-[#141414] border border-[#383838] text-white focus:outline-none focus:border-[#B89B5E]"
          >
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="processing">Processing (Atelier)</option>
            <option value="shipped">Shipped (Armored)</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-[#1C1C1C] border border-[#2D2D2D] overflow-x-auto">
        <table className="w-full text-left text-xs text-stone-300">
          <thead className="bg-[#151515] text-[10px] uppercase tracking-wider text-stone-400 border-b border-[#2C2C2C]">
            <tr>
              <th className="py-3 px-4">Order Ref</th>
              <th className="py-3 px-4">Client</th>
              <th className="py-3 px-4">Items</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Total</th>
              <th className="py-3 px-4">Payment</th>
              <th className="py-3 px-4">Status & Update</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#262626]">
            {filtered.map((ord) => (
              <tr key={ord.id} className="hover:bg-[#222222]/50">
                <td className="py-3 px-4 font-mono font-bold text-white">{ord.orderNumber}</td>
                <td className="py-3 px-4">
                  <div className="font-medium text-white">{ord.customerName}</div>
                  <div className="text-[10px] text-stone-400">{ord.customerPhone}</div>
                </td>
                <td className="py-3 px-4">
                  <span className="text-stone-300">{ord.items.length} item{ord.items.length !== 1 ? 's' : ''}</span>
                </td>
                <td className="py-3 px-4 text-stone-400">{ord.createdAt}</td>
                <td className="py-3 px-4 font-serif text-white tabular-nums font-semibold">
                  {settings.currencySymbol}{ord.grandTotal.toLocaleString('en-IN')}
                </td>
                <td className="py-3 px-4">
                  <span className="px-1.5 py-0.5 text-[9px] uppercase font-mono bg-stone-900 border border-stone-800 text-stone-300">
                    {ord.paymentMethod} ({ord.paymentStatus})
                  </span>
                </td>
                <td className="py-3 px-4">
                  <select
                    value={ord.orderStatus}
                    onChange={(e) => updateOrderStatus(ord.id, e.target.value as any)}
                    className="px-2 py-1 text-[11px] bg-[#141414] border border-[#3A3A3A] text-[#B89B5E] focus:outline-none focus:border-[#B89B5E]"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => setSelectedOrder(ord)}
                    className="p-1.5 text-stone-400 hover:text-[#B89B5E] transition-colors cursor-pointer"
                    title="View Order Details & Invoice"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Detail Modal / Invoice */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1C1C1C] border border-[#333333] max-w-2xl w-full p-6 sm:p-8 shadow-2xl my-8">
            <div className="flex justify-between items-center mb-6 pb-3 border-b border-[#2C2C2C]">
              <div>
                <h3 className="font-serif text-2xl text-white">Order {selectedOrder.orderNumber}</h3>
                <span className="text-[10px] text-stone-400">Placed on {selectedOrder.createdAt}</span>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-stone-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6 text-xs">
              {/* Customer & Shipping */}
              <div className="grid grid-cols-2 gap-4 p-3 bg-[#151515] border border-[#2B2B2B]">
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase tracking-wider mb-1">Patron Information</span>
                  <div className="font-semibold text-white">{selectedOrder.customerName}</div>
                  <div className="text-stone-300">{selectedOrder.customerEmail}</div>
                  <div className="text-stone-300">{selectedOrder.customerPhone}</div>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase tracking-wider mb-1">Shipping Address</span>
                  <div className="text-stone-300">
                    {selectedOrder.shippingAddress.street}, {selectedOrder.shippingAddress.city}<br />
                    {selectedOrder.shippingAddress.state} - {selectedOrder.shippingAddress.pincode}, {selectedOrder.shippingAddress.country}
                  </div>
                </div>
              </div>

              {/* Items Table */}
              <div>
                <span className="text-stone-400 block text-[10px] uppercase tracking-wider mb-2">Jewelry Pieces</span>
                <div className="divide-y divide-[#2A2A2A] border border-[#2B2B2B] bg-[#151515]">
                  {selectedOrder.items.map((it, idx) => (
                    <div key={idx} className="p-3 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <img src={it.image} alt={it.productName} className="w-9 h-9 object-cover border border-stone-800" />
                        <div>
                          <div className="font-medium text-white">{it.productName}</div>
                          <div className="text-[10px] text-stone-400 font-mono">SKU: {it.sku} · Qty: {it.quantity}</div>
                        </div>
                      </div>
                      <span className="font-mono text-white">
                        {settings.currencySymbol}{(it.price * it.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totals */}
              <div className="p-3 bg-[#151515] border border-[#2B2B2B] space-y-1.5 text-stone-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono">{settings.currencySymbol}{selectedOrder.subtotal.toLocaleString('en-IN')}</span>
                </div>
                {selectedOrder.discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount ({selectedOrder.couponCode})</span>
                    <span className="font-mono">-{settings.currencySymbol}{selectedOrder.discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-mono">{selectedOrder.shipping === 0 ? 'Free' : `${settings.currencySymbol}${selectedOrder.shipping}`}</span>
                </div>
                <div className="pt-2 border-t border-[#2A2A2A] flex justify-between text-base font-serif font-bold text-white">
                  <span>Total Due</span>
                  <span>{settings.currencySymbol}{selectedOrder.grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-white flex items-center gap-2 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Invoice</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
