import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Check, Mail } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const { addToast } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      addToast('Welcome to Élan Privé! Use code ELAN20 for 20% off your purchase.', 'success');
      setEmail('');
    } else {
      addToast('Please provide a valid email address.', 'error');
    }
  };

  return (
    <section className="bg-[#FAF8F4] py-16 sm:py-20 border-b border-[#E8E1D7]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 sm:p-12 border border-[#E8E1D7] shadow-sm text-center">
          <div className="w-12 h-12 bg-[#FAF8F4] border border-[#E8E1D7] rounded-full flex items-center justify-center mx-auto mb-4 text-[#B89B5E]">
            <Mail className="w-5 h-5" />
          </div>

          <span className="text-[10px] uppercase tracking-[0.28em] text-[#B89B5E] font-medium block mb-2 font-sans">
            Élan Privé Club
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#111111] mb-3">
            Save 20% On Your First Heirloom
          </h2>
          <p className="text-xs sm:text-sm text-[#77716A] max-w-lg mx-auto font-sans mb-8 leading-relaxed">
            Join our private circle to receive private exhibition invitations, seasonal jewelry styling guides, and immediate access to code <strong className="text-[#111111]">ELAN20</strong>.
          </p>

          {subscribed ? (
            <div className="bg-[#FAF8F4] border border-[#B89B5E]/40 p-4 max-w-md mx-auto text-center">
              <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#111111] uppercase tracking-wider mb-1">
                <Check className="w-4 h-4 text-[#B89B5E]" />
                <span>You are on the VIP guestlist</span>
              </div>
              <p className="text-xs text-[#77716A]">
                Use voucher code <span className="font-mono font-bold text-[#B89B5E]">ELAN20</span> at checkout for 20% savings.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                required
                className="flex-1 px-4 py-3 text-xs border border-[#E8E1D7] bg-[#FAF8F4] focus:outline-none focus:border-[#B89B5E] text-[#111111]"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-[#111111] text-white text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-[#B89B5E] transition-colors cursor-pointer shrink-0"
              >
                Subscribe
              </button>
            </form>
          )}

          <p className="text-[10px] text-stone-400 mt-4 font-sans">
            We value your privacy. No spam, only rare fine jewelry releases. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};
