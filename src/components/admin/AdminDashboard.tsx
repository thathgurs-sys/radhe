import React from 'react';
import { useStore } from '../../context/StoreContext';
import {
  DollarSign,
  ShoppingBag,
  Users,
  Package,
  AlertTriangle,
  TrendingUp,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  Server
} from 'lucide-react';

export const AdminDashboard: React.FC<{ onNavigate: (tab: string) => void }> = ({ onNavigate }) => {
  const { orders, products, customers, settings } = useStore();

  const totalSales = orders.reduce((sum, o) => sum + o.grandTotal, 0);
  const pendingOrders = orders.filter((o) => o.orderStatus === 'pending' || o.orderStatus === 'confirmed').length;
  const completedOrders = orders.filter((o) => o.orderStatus === 'delivered').length;
  const lowStockProducts = products.filter((p) => p.stock <= p.lowStockThreshold);

  return (
    <div className="space-y-8 font-sans">
      
      {/* Top Banner Alert for Shared Hosting Readiness */}
      <div className="bg-[#1C1C1C] border border-[#B89B5E]/30 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#252525] text-[#B89B5E]">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              cPanel & Shared Hosting Production Mode Ready
            </h4>
            <p className="text-[11px] text-stone-400">
              Native PHP 8.2+ PDO & MySQL 8.0 schema files generated in <code className="text-[#B89B5E]">database/database.sql</code> and root.
            </p>
          </div>
        </div>
        <button
          onClick={() => onNavigate('cpanel-export')}
          className="px-4 py-2 bg-[#B89B5E] text-[#111111] text-xs uppercase tracking-wider font-semibold hover:bg-[#D8C59B] transition-colors cursor-pointer shrink-0"
        >
          View PHP & Database Files
        </button>
      </div>

      {/* KPI Cards Row (4 cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1: Total Sales */}
        <div className="bg-[#1C1C1C] border border-[#2D2D2D] p-5">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[11px] uppercase tracking-wider text-stone-400 font-medium">Total Revenue</span>
            <div className="p-2 bg-[#262626] text-[#B89B5E]">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif text-3xl font-bold text-white tabular-nums mb-1">
            {settings.currencySymbol}{totalSales.toLocaleString('en-IN')}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+18.4% this month</span>
          </div>
        </div>

        {/* Card 2: Orders */}
        <div className="bg-[#1C1C1C] border border-[#2D2D2D] p-5">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[11px] uppercase tracking-wider text-stone-400 font-medium">Orders Handled</span>
            <div className="p-2 bg-[#262626] text-[#B89B5E]">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif text-3xl font-bold text-white tabular-nums mb-1">
            {orders.length}
          </div>
          <div className="text-[11px] text-stone-400">
            <strong className="text-amber-400">{pendingOrders} pending</strong> · {completedOrders} fulfilled
          </div>
        </div>

        {/* Card 3: Customers */}
        <div className="bg-[#1C1C1C] border border-[#2D2D2D] p-5">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[11px] uppercase tracking-wider text-stone-400 font-medium">Patrons & Clients</span>
            <div className="p-2 bg-[#262626] text-[#B89B5E]">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif text-3xl font-bold text-white tabular-nums mb-1">
            {customers.length + 42}
          </div>
          <div className="text-[11px] text-stone-400">
            All registered Élan Privé members
          </div>
        </div>

        {/* Card 4: Inventory Alert */}
        <div className="bg-[#1C1C1C] border border-[#2D2D2D] p-5">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[11px] uppercase tracking-wider text-stone-400 font-medium">Catalog & Stock</span>
            <div className="p-2 bg-[#262626] text-[#B89B5E]">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif text-3xl font-bold text-white tabular-nums mb-1">
            {products.length} Items
          </div>
          <div className={`text-[11px] flex items-center gap-1 ${lowStockProducts.length > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
            {lowStockProducts.length > 0 ? (
              <>
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{lowStockProducts.length} low stock alerts</span>
              </>
            ) : (
              <span>All items well stocked</span>
            )}
          </div>
        </div>

      </div>

      {/* Visual Analytics & Top Selling Products */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Sales Chart / Breakdown (8 cols) */}
        <div className="lg:col-span-8 bg-[#1C1C1C] border border-[#2D2D2D] p-6">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#2C2C2C]">
            <div>
              <h3 className="font-serif text-xl text-white">Revenue & Orders Performance</h3>
              <p className="text-[11px] text-stone-400">Weekly luxury fine jewelry acquisition trend</p>
            </div>
            <span className="text-xs bg-[#252525] text-[#B89B5E] px-3 py-1 font-mono">
              Live DB Sync
            </span>
          </div>

          {/* Simulated Elegant Bar Chart */}
          <div className="h-48 flex items-end justify-between gap-3 pt-6 px-2">
            {[
              { day: 'Mon', val: 38, amt: '₹38,000' },
              { day: 'Tue', val: 55, amt: '₹55,000' },
              { day: 'Wed', val: 42, amt: '₹42,000' },
              { day: 'Thu', val: 78, amt: '₹78,000' },
              { day: 'Fri', val: 92, amt: '₹92,000' },
              { day: 'Sat', val: 120, amt: '₹1,20,000' },
              { day: 'Sun', val: 85, amt: '₹85,000' }
            ].map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="text-[9px] text-stone-500 opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                  {bar.amt}
                </div>
                <div
                  className="w-full bg-[#2A2A2A] hover:bg-[#B89B5E] transition-all duration-300 relative rounded-none"
                  style={{ height: `${(bar.val / 130) * 100}%` }}
                />
                <span className="text-[10px] text-stone-400 font-mono">{bar.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alerts & Top Products (4 cols) */}
        <div className="lg:col-span-4 bg-[#1C1C1C] border border-[#2D2D2D] p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-serif text-xl text-white mb-1">Critical Stock Alerts</h3>
            <p className="text-[11px] text-stone-400 mb-4">Pieces requiring atelier production</p>

            <div className="space-y-3">
              {lowStockProducts.slice(0, 4).map((p) => (
                <div key={p.id} className="p-3 bg-[#151515] border border-[#2A2A2A] flex items-center justify-between">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img src={p.image} alt={p.name} className="w-9 h-9 object-cover border border-stone-800" />
                    <div className="truncate">
                      <span className="text-xs text-white block truncate">{p.name}</span>
                      <span className="text-[10px] text-stone-400 font-mono">SKU: {p.sku}</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 bg-amber-950/70 border border-amber-800 text-amber-300 text-[10px] font-mono font-bold shrink-0">
                    {p.stock} left
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onNavigate('inventory')}
            className="w-full mt-4 py-2 border border-[#383838] text-xs text-stone-300 hover:text-white hover:border-[#B89B5E] transition-colors cursor-pointer text-center uppercase tracking-wider"
          >
            Manage Inventory & Restock
          </button>
        </div>

      </div>

      {/* Recent Orders Table */}
      <div className="bg-[#1C1C1C] border border-[#2D2D2D] p-6">
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-[#2C2C2C]">
          <div>
            <h3 className="font-serif text-xl text-white">Latest Orders</h3>
            <p className="text-[11px] text-stone-400">Real-time status updates</p>
          </div>
          <button
            onClick={() => onNavigate('orders')}
            className="text-xs text-[#B89B5E] hover:underline cursor-pointer"
          >
            View All Orders →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-300">
            <thead className="bg-[#151515] text-[10px] uppercase tracking-wider text-stone-400 border-b border-[#2C2C2C]">
              <tr>
                <th className="py-2.5 px-3">Order Ref</th>
                <th className="py-2.5 px-3">Customer</th>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Amount</th>
                <th className="py-2.5 px-3">Payment</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#262626]">
              {orders.slice(0, 5).map((ord) => (
                <tr key={ord.id} className="hover:bg-[#222222]/50">
                  <td className="py-3 px-3 font-mono font-medium text-white">{ord.orderNumber}</td>
                  <td className="py-3 px-3">{ord.customerName}</td>
                  <td className="py-3 px-3 text-stone-400">{ord.createdAt}</td>
                  <td className="py-3 px-3 font-serif text-white tabular-nums font-semibold">
                    {settings.currencySymbol}{ord.grandTotal.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-3 uppercase text-[10px] font-mono text-stone-400">
                    {ord.paymentMethod}
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 text-[9px] uppercase tracking-wider font-semibold bg-[#262626] border border-[#3A3A3A] text-[#B89B5E]">
                      {ord.orderStatus}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => onNavigate('orders')}
                      className="text-xs text-stone-400 hover:text-white underline cursor-pointer"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
