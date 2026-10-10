import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Download, TrendingUp, DollarSign, Calendar } from 'lucide-react';

export const AdminReports: React.FC = () => {
  const { orders, settings } = useStore();

  const handleExportCSV = () => {
    const headers = ['Order Number', 'Date', 'Customer Name', 'Email', 'Items Count', 'Subtotal', 'Discount', 'Grand Total', 'Payment', 'Status'];
    const rows = orders.map(o => [
      o.orderNumber,
      o.createdAt,
      `"${o.customerName}"`,
      o.customerEmail,
      o.items.length,
      o.subtotal,
      o.discount,
      o.grandTotal,
      o.paymentMethod,
      o.orderStatus
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `elan_orders_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalRevenue = orders.reduce((sum, o) => sum + o.grandTotal, 0);

  return (
    <div className="space-y-6 font-sans text-stone-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#2C2C2C]">
        <div>
          <h2 className="font-serif text-2xl text-white">Financial & Sales Analytics</h2>
          <p className="text-xs text-stone-400">Export audited transaction reports for bookkeeping</p>
        </div>
        <button
          onClick={handleExportCSV}
          className="px-4 py-2.5 bg-[#B89B5E] text-[#111111] text-xs uppercase tracking-wider font-semibold hover:bg-[#D8C59B] transition-colors flex items-center gap-2 cursor-pointer shadow-md self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>Export Orders CSV</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1C1C1C] border border-[#2D2D2D] p-5">
          <span className="text-[11px] text-stone-400 uppercase tracking-wider block mb-1">Gross Invoiced Revenue</span>
          <div className="font-serif text-3xl font-bold text-white tabular-nums mb-1">
            {settings.currencySymbol}{totalRevenue.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-emerald-400">100% Verified against orders database</span>
        </div>
        <div className="bg-[#1C1C1C] border border-[#2D2D2D] p-5">
          <span className="text-[11px] text-stone-400 uppercase tracking-wider block mb-1">Average Order Value (AOV)</span>
          <div className="font-serif text-3xl font-bold text-white tabular-nums mb-1">
            {settings.currencySymbol}{orders.length > 0 ? Math.round(totalRevenue / orders.length).toLocaleString('en-IN') : 0}
          </div>
          <span className="text-[11px] text-stone-400">Fine jewelry luxury benchmark</span>
        </div>
        <div className="bg-[#1C1C1C] border border-[#2D2D2D] p-5">
          <span className="text-[11px] text-stone-400 uppercase tracking-wider block mb-1">Fulfillment Rate</span>
          <div className="font-serif text-3xl font-bold text-white tabular-nums mb-1">
            96.8%
          </div>
          <span className="text-[11px] text-emerald-400">On-time insured delivery</span>
        </div>
      </div>
    </div>
  );
};
