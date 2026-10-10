import React from 'react';
import { Truck, ShieldCheck, RefreshCw, Gem } from 'lucide-react';

export const BenefitsBar: React.FC = () => {
  const benefits = [
    {
      icon: Truck,
      title: 'Free Shipping',
      subtitle: 'Complimentary delivery on orders over ₹5,000'
    },
    {
      icon: ShieldCheck,
      title: 'Secure Payments',
      subtitle: 'Safe, encrypted and protected checkout'
    },
    {
      icon: RefreshCw,
      title: 'Easy Returns',
      subtitle: '7-day hassle-free luxury exchanges'
    },
    {
      icon: Gem,
      title: 'Crafted With Care',
      subtitle: 'BIS Hallmarked & certified diamonds'
    }
  ];

  return (
    <div className="bg-white border-b border-[#E8E1D7] py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {benefits.map((b, index) => {
            const Icon = b.icon;
            return (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3.5 group"
              >
                <div className="w-10 h-10 rounded-full bg-[#FAF8F4] border border-[#E8E1D7] flex items-center justify-center text-[#B89B5E] shrink-0 group-hover:border-[#B89B5E] group-hover:bg-[#B89B5E] group-hover:text-white transition-all duration-300">
                  <Icon className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[#111111] mb-1 font-sans">
                    {b.title}
                  </h4>
                  <p className="text-[11px] text-[#77716A] leading-relaxed font-sans">
                    {b.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
