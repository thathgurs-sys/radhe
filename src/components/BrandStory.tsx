import React from 'react';
import { Quote, Star, Award, ShieldCheck, HeartHandshake } from 'lucide-react';

export const BrandStory: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-white border-b border-[#E8E1D7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Story Section */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="text-[11px] uppercase tracking-[0.28em] text-[#B89B5E] font-medium block mb-3 font-sans">
            The Élan Philosophy
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#111111] mb-6 leading-tight">
            "Jewelry is memory held in gold and illuminated in diamond."
          </h2>
          <p className="text-[#77716A] text-sm sm:text-base leading-relaxed font-sans mb-8">
            Founded with a singular reverence for timeless beauty, ÉLAN JEWELS harmonizes traditional hand-setting techniques with contemporary sculptural forms. Every piece is sculpted to withstand generations, passing down emotion, celebration, and devotion.
          </p>
          <div className="inline-block border-b-2 border-[#B89B5E] pb-1 font-serif text-lg italic text-[#111111]">
            The Master Atelier
          </div>
        </div>

        {/* 3 Pillars: Why Choose Us */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-[#FAF8F4] p-8 border border-[#E8E1D7] text-center">
            <Award className="w-8 h-8 text-[#B89B5E] mx-auto mb-4" />
            <h3 className="font-serif text-2xl text-[#111111] mb-2">Master Hand-Crafting</h3>
            <p className="text-xs text-[#77716A] leading-relaxed font-sans">
              Over 180 hours of meticulous hand-setting and mirror polishing go into every signature heirloom necklace and ring.
            </p>
          </div>
          <div className="bg-[#FAF8F4] p-8 border border-[#E8E1D7] text-center">
            <ShieldCheck className="w-8 h-8 text-[#B89B5E] mx-auto mb-4" />
            <h3 className="font-serif text-2xl text-[#111111] mb-2">Conflict-Free Stones</h3>
            <p className="text-xs text-[#77716A] leading-relaxed font-sans">
              100% Kimberly Process compliant natural diamonds and conflict-free Sri Lankan sapphires.
            </p>
          </div>
          <div className="bg-[#FAF8F4] p-8 border border-[#E8E1D7] text-center">
            <HeartHandshake className="w-8 h-8 text-[#B89B5E] mx-auto mb-4" />
            <h3 className="font-serif text-2xl text-[#111111] mb-2">Lifetime Concierge</h3>
            <p className="text-xs text-[#77716A] leading-relaxed font-sans">
              Complimentary annual prong inspection, ultrasonic cleaning, and resizing across all our ateliers.
            </p>
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-[#FAF8F4] border border-[#E8E1D7] p-8 sm:p-14">
          <div className="max-w-3xl mx-auto text-center">
            <Quote className="w-10 h-10 text-[#B89B5E]/40 mx-auto mb-4" />
            <div className="flex items-center justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-[#B89B5E] fill-current" />
              ))}
            </div>
            <p className="font-serif text-xl sm:text-2xl text-[#111111] italic leading-relaxed mb-6">
              "The Aurora necklace arrived in a velvet presentation box with official gemological dossiers. When I put it on for my wedding reception, the yellow sapphire caught the chandeliers with an ethereal warmth I had never seen before."
            </p>
            <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#111111] font-sans">
              Meera Singhania
            </div>
            <div className="text-[11px] text-[#77716A] font-sans">
              Verified Patron · Mumbai, India
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
