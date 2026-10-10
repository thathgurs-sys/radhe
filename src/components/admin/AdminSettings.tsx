import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Save, ShieldCheck } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { settings, updateSettings } = useStore();

  const [brandName, setBrandName] = useState(settings.brandName);
  const [tagline, setTagline] = useState(settings.tagline);
  const [currencySymbol, setCurrencySymbol] = useState(settings.currencySymbol);
  const [contactEmail, setContactEmail] = useState(settings.contactEmail);
  const [contactPhone, setContactPhone] = useState(settings.contactPhone);
  const [boutiqueAddress, setBoutiqueAddress] = useState(settings.boutiqueAddress);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(settings.freeShippingThreshold);
  const [standardShippingFee, setStandardShippingFee] = useState(settings.standardShippingFee);
  const [razorpayKeyId, setRazorpayKeyId] = useState(settings.razorpayKeyId);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      brandName,
      tagline,
      currencySymbol,
      contactEmail,
      contactPhone,
      boutiqueAddress,
      freeShippingThreshold: Number(freeShippingThreshold),
      standardShippingFee: Number(standardShippingFee),
      razorpayKeyId
    });
  };

  return (
    <div className="space-y-6 font-sans text-stone-200">
      <div className="pb-4 border-b border-[#2C2C2C]">
        <h2 className="font-serif text-2xl text-white">Store Configuration & Logistics</h2>
        <p className="text-xs text-stone-400">Settings stored in MySQL `settings` table and synchronized across store</p>
      </div>

      <form onSubmit={handleSave} className="bg-[#1C1C1C] border border-[#2D2D2D] p-6 space-y-6 text-xs max-w-4xl">
        
        {/* Brand Information */}
        <div>
          <h3 className="font-serif text-lg text-white mb-3">Brand Identity</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-stone-400 mb-1">Brand Name</label>
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="w-full px-3 py-2 bg-[#141414] border border-[#383838] text-white focus:outline-none focus:border-[#B89B5E]"
              />
            </div>
            <div>
              <label className="block text-stone-400 mb-1">Official Tagline</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-3 py-2 bg-[#141414] border border-[#383838] text-white focus:outline-none focus:border-[#B89B5E]"
              />
            </div>
          </div>
        </div>

        {/* Currency & Logistics */}
        <div className="pt-4 border-t border-[#2C2C2C]">
          <h3 className="font-serif text-lg text-white mb-3">Pricing & Shipping Thresholds</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-stone-400 mb-1">Currency Symbol</label>
              <input
                type="text"
                value={currencySymbol}
                onChange={(e) => setCurrencySymbol(e.target.value)}
                className="w-full px-3 py-2 bg-[#141414] border border-[#383838] text-white font-mono focus:outline-none focus:border-[#B89B5E]"
              />
            </div>
            <div>
              <label className="block text-stone-400 mb-1">Free Delivery Threshold (₹)</label>
              <input
                type="number"
                value={freeShippingThreshold}
                onChange={(e) => setFreeShippingThreshold(Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#141414] border border-[#383838] text-white font-mono focus:outline-none focus:border-[#B89B5E]"
              />
            </div>
            <div>
              <label className="block text-stone-400 mb-1">Standard Courier Fee (₹)</label>
              <input
                type="number"
                value={standardShippingFee}
                onChange={(e) => setStandardShippingFee(Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#141414] border border-[#383838] text-white font-mono focus:outline-none focus:border-[#B89B5E]"
              />
            </div>
          </div>
        </div>

        {/* Concierge & Boutique */}
        <div className="pt-4 border-t border-[#2C2C2C]">
          <h3 className="font-serif text-lg text-white mb-3">Concierge & Boutique Location</h3>
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <label className="block text-stone-400 mb-1">Customer Support Email</label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full px-3 py-2 bg-[#141414] border border-[#383838] text-white focus:outline-none focus:border-[#B89B5E]"
              />
            </div>
            <div>
              <label className="block text-stone-400 mb-1">Customer Care Phone</label>
              <input
                type="text"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="w-full px-3 py-2 bg-[#141414] border border-[#383838] text-white focus:outline-none focus:border-[#B89B5E]"
              />
            </div>
          </div>
          <div>
            <label className="block text-stone-400 mb-1">Flagship Boutique Address</label>
            <input
              type="text"
              value={boutiqueAddress}
              onChange={(e) => setBoutiqueAddress(e.target.value)}
              className="w-full px-3 py-2 bg-[#141414] border border-[#383838] text-white focus:outline-none focus:border-[#B89B5E]"
            />
          </div>
        </div>

        {/* Razorpay Gateway Placeholder */}
        <div className="pt-4 border-t border-[#2C2C2C]">
          <h3 className="font-serif text-lg text-white mb-2">Payment Gateway Integration</h3>
          <p className="text-[11px] text-stone-400 mb-3">
            Cash on Delivery is active by default. Enter your production Razorpay Key ID when ready to accept cards & UPI online.
          </p>
          <div>
            <label className="block text-stone-400 mb-1">Razorpay API Key ID</label>
            <input
              type="text"
              value={razorpayKeyId}
              onChange={(e) => setRazorpayKeyId(e.target.value)}
              placeholder="rzp_live_xxxxxxxxxxxxxx"
              className="w-full px-3 py-2 bg-[#141414] border border-[#383838] text-white font-mono focus:outline-none focus:border-[#B89B5E]"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-[#2C2C2C] flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#B89B5E] text-[#111111] font-semibold text-xs uppercase tracking-wider hover:bg-[#D8C59B] transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Store Configuration</span>
          </button>
        </div>

      </form>
    </div>
  );
};
