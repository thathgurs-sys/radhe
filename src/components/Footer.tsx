import React from 'react';
import { useStore } from '../context/StoreContext';
import { MapPin, Mail, Phone, Instagram, Facebook, Youtube } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView, setSelectedCategorySlug, settings } = useStore();

  const handleNav = (catSlug?: string) => {
    if (catSlug) setSelectedCategorySlug(catSlug);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#111111] text-[#E8E1D7] pt-16 pb-10 border-t border-[#222222] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-[#262626]">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <span className="font-serif text-3xl tracking-[0.12em] text-white block mb-2 font-medium">
              ÉLAN JEWELS
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#B89B5E] block mb-4">
              "Jewelry Made to Be Remembered"
            </span>
            <p className="text-stone-400 text-xs leading-relaxed max-w-sm mb-6">
              Haute Joaillerie atelier creating heirloom necklaces, rings, and earrings in hallmarked gold and certified conflict-free diamonds.
            </p>
            <div className="flex items-center gap-4 text-stone-300">
              <a href="#instagram" className="w-8 h-8 rounded-full border border-stone-700 flex items-center justify-center hover:border-[#B89B5E] hover:text-[#B89B5E] transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#facebook" className="w-8 h-8 rounded-full border border-stone-700 flex items-center justify-center hover:border-[#B89B5E] hover:text-[#B89B5E] transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#youtube" className="w-8 h-8 rounded-full border border-stone-700 flex items-center justify-center hover:border-[#B89B5E] hover:text-[#B89B5E] transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: SHOP */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-white mb-4 border-b border-stone-800 pb-2">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button onClick={() => handleNav('necklaces')} className="hover:text-[#B89B5E] transition-colors cursor-pointer">
                  Diamond Necklaces
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('earrings')} className="hover:text-[#B89B5E] transition-colors cursor-pointer">
                  Drop & Chandelier Earrings
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('rings')} className="hover:text-[#B89B5E] transition-colors cursor-pointer">
                  Solitaire Rings
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('bracelets')} className="hover:text-[#B89B5E] transition-colors cursor-pointer">
                  Diamond Tennis Bracelets
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('all')} className="hover:text-[#B89B5E] transition-colors cursor-pointer">
                  Bridal Troussau
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: CLIENT CARE */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-white mb-4 border-b border-stone-800 pb-2">
              Concierge
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <span className="hover:text-[#B89B5E] cursor-pointer">Complimentary Insured Shipping</span>
              </li>
              <li>
                <span className="hover:text-[#B89B5E] cursor-pointer">7-Day Return Policy</span>
              </li>
              <li>
                <span className="hover:text-[#B89B5E] cursor-pointer">Certificate of Authenticity</span>
              </li>
              <li>
                <span className="hover:text-[#B89B5E] cursor-pointer">Ring Sizing Guide</span>
              </li>
              <li>
                <span className="hover:text-[#B89B5E] cursor-pointer">Jewelry Care & Polishing</span>
              </li>
              <li>
                <button onClick={() => setCurrentView('cpanel-export')} className="text-[#B89B5E] hover:underline cursor-pointer">
                  cPanel Hosting Deployment
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: BOUTIQUE & CONTACT */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-white mb-4 border-b border-stone-800 pb-2">
              Atelier
            </h4>
            <div className="space-y-3 text-xs text-stone-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#B89B5E] shrink-0 mt-0.5" />
                <span>{settings.boutiqueAddress}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#B89B5E] shrink-0" />
                <a href={`mailto:${settings.contactEmail}`} className="hover:text-[#B89B5E]">
                  {settings.contactEmail}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#B89B5E] shrink-0" />
                <span>{settings.contactPhone}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} {settings.brandName}. All Rights Reserved. Engineered for Shared Hosting & cPanel.
          </div>

          {/* Payment Badges */}
          <div className="flex items-center gap-3">
            <span className="px-2 py-1 bg-stone-900 border border-stone-800 text-[10px] text-stone-300 font-mono">VISA</span>
            <span className="px-2 py-1 bg-stone-900 border border-stone-800 text-[10px] text-stone-300 font-mono">Mastercard</span>
            <span className="px-2 py-1 bg-stone-900 border border-stone-800 text-[10px] text-stone-300 font-mono">UPI</span>
            <span className="px-2 py-1 bg-stone-900 border border-stone-800 text-[10px] text-stone-300 font-mono">Cash on Delivery</span>
            <span className="px-2 py-1 bg-stone-900 border border-stone-800 text-[10px] text-[#B89B5E] font-mono">Razorpay Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
