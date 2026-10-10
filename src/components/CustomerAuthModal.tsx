import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Lock, Mail, User, Phone, CheckCircle } from 'lucide-react';

export const CustomerAuthModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
}) => {
  const { loginCustomer, registerCustomer } = useStore();
  const [tab, setTab] = useState<'login' | 'register'>('login');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      loginCustomer(email, password);
      onClose();
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      registerCustomer(name, email, phone, password);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white border border-[#E8E1D7] max-w-md w-full p-8 shadow-2xl animate-in zoom-in-95 duration-200 font-sans">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-500 hover:text-[#111111] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center mb-6">
          <span className="font-serif text-2xl tracking-[0.14em] text-[#111111] block">
            ÉLAN JEWELS
          </span>
          <span className="text-[9px] uppercase tracking-[0.26em] text-[#B89B5E] block font-medium">
            Privé Client Portal
          </span>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-[#E8E1D7] mb-6 text-xs uppercase tracking-wider font-medium">
          <button
            onClick={() => setTab('login')}
            className={`flex-1 py-2.5 text-center cursor-pointer relative ${
              tab === 'login' ? 'text-[#111111] font-semibold' : 'text-[#77716A] hover:text-[#111111]'
            }`}
          >
            Sign In
            {tab === 'login' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#B89B5E]" />}
          </button>
          <button
            onClick={() => setTab('register')}
            className={`flex-1 py-2.5 text-center cursor-pointer relative ${
              tab === 'register' ? 'text-[#111111] font-semibold' : 'text-[#77716A] hover:text-[#111111]'
            }`}
          >
            Create Account
            {tab === 'register' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#B89B5E]" />}
          </button>
        </div>

        {/* Form */}
        {tab === 'login' ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] text-[#77716A] mb-1 font-medium">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="patron@example.com"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-[#E8E1D7] bg-[#FAF8F4] focus:outline-none focus:border-[#B89B5E]"
                />
                <Mail className="w-4 h-4 text-stone-400 absolute left-2.5 top-2.5 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-[#77716A] mb-1 font-medium">Password</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-[#E8E1D7] bg-[#FAF8F4] focus:outline-none focus:border-[#B89B5E]"
                />
                <Lock className="w-4 h-4 text-stone-400 absolute left-2.5 top-2.5 pointer-events-none" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#111111] text-white py-3 text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#B89B5E] transition-colors cursor-pointer shadow-sm mt-2"
            >
              Sign In to Privé
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-3">
            <div>
              <label className="block text-[11px] text-[#77716A] mb-1 font-medium">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Aanya Sharma"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-[#E8E1D7] bg-[#FAF8F4] focus:outline-none focus:border-[#B89B5E]"
                />
                <User className="w-4 h-4 text-stone-400 absolute left-2.5 top-2.5 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-[#77716A] mb-1 font-medium">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="aanya.sharma@example.com"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-[#E8E1D7] bg-[#FAF8F4] focus:outline-none focus:border-[#B89B5E]"
                />
                <Mail className="w-4 h-4 text-stone-400 absolute left-2.5 top-2.5 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-[#77716A] mb-1 font-medium">Phone</label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98201 12345"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-[#E8E1D7] bg-[#FAF8F4] focus:outline-none focus:border-[#B89B5E]"
                />
                <Phone className="w-4 h-4 text-stone-400 absolute left-2.5 top-2.5 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-[#77716A] mb-1 font-medium">Password</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-[#E8E1D7] bg-[#FAF8F4] focus:outline-none focus:border-[#B89B5E]"
                />
                <Lock className="w-4 h-4 text-stone-400 absolute left-2.5 top-2.5 pointer-events-none" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#111111] text-white py-3 text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#B89B5E] transition-colors cursor-pointer shadow-sm mt-3"
            >
              Complete Registration
            </button>
          </form>
        )}

        <div className="mt-6 pt-4 border-t border-[#E8E1D7] text-center text-[10px] text-stone-400">
          Protected by AES-256 session encryption & PBKDF2 / Bcrypt.
        </div>

      </div>
    </div>
  );
};
