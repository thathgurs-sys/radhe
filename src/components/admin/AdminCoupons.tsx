import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Plus, Tag, Check } from 'lucide-react';

export const AdminCoupons: React.FC = () => {
  const { coupons, addCoupon, settings } = useStore();
  const [code, setCode] = useState('');
  const [type, setType] = useState<'percentage' | 'fixed'>('percentage');
  const [value, setValue] = useState(15);
  const [minOrder, setMinOrder] = useState(3000);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) return;
    addCoupon({
      code: code.toUpperCase().trim(),
      type,
      value: Number(value),
      minOrder: Number(minOrder),
      status: 'active'
    });
    setCode('');
  };

  return (
    <div className="space-y-6 font-sans text-stone-200">
      <div className="pb-4 border-b border-[#2C2C2C]">
        <h2 className="font-serif text-2xl text-white">Promotional Coupons & Privileges</h2>
        <p className="text-xs text-stone-400">Configure discount vouchers validated server-side</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Form */}
        <div className="bg-[#1C1C1C] border border-[#2D2D2D] p-5">
          <h3 className="font-serif text-lg text-white mb-4">Create New Voucher</h3>
          <form onSubmit={handleCreate} className="space-y-4 text-xs">
            <div>
              <label className="block text-stone-400 mb-1">Coupon Code</label>
              <input
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="e.g. FESTIVE25"
                className="w-full px-3 py-2 bg-[#141414] border border-[#383838] text-white font-mono uppercase focus:outline-none focus:border-[#B89B5E]"
              />
            </div>
            <div>
              <label className="block text-stone-400 mb-1">Discount Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full px-3 py-2 bg-[#141414] border border-[#383838] text-white focus:outline-none focus:border-[#B89B5E]"
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount (₹)</option>
              </select>
            </div>
            <div>
              <label className="block text-stone-400 mb-1">Discount Value</label>
              <input
                type="number"
                required
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#141414] border border-[#383838] text-white focus:outline-none focus:border-[#B89B5E]"
              />
            </div>
            <div>
              <label className="block text-stone-400 mb-1">Minimum Order Amount (₹)</label>
              <input
                type="number"
                required
                value={minOrder}
                onChange={(e) => setMinOrder(Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#141414] border border-[#383838] text-white focus:outline-none focus:border-[#B89B5E]"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-[#B89B5E] text-[#111111] font-semibold hover:bg-[#D8C59B] transition-colors cursor-pointer"
            >
              Issue Coupon
            </button>
          </form>
        </div>

        {/* Coupons List */}
        <div className="md:col-span-2 bg-[#1C1C1C] border border-[#2D2D2D] p-5">
          <h3 className="font-serif text-lg text-white mb-4">Active Vouchers</h3>
          <div className="divide-y divide-[#2A2A2A]">
            {coupons.map((c) => (
              <div key={c.id} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-[#B89B5E]">{c.code}</span>
                    <span className="px-2 py-0.5 bg-[#262626] text-[10px] text-stone-300">
                      {c.type === 'percentage' ? `${c.value}% OFF` : `₹${c.value} OFF`}
                    </span>
                  </div>
                  <span className="text-[10px] text-stone-400 block mt-0.5">
                    Min order: {settings.currencySymbol}{c.minOrder.toLocaleString('en-IN')} · Used {c.timesUsed} times
                  </span>
                </div>
                <span className="px-2 py-0.5 bg-emerald-950/60 text-emerald-400 text-[10px] uppercase font-semibold border border-emerald-800">
                  {c.status}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
