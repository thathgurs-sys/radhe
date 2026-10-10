import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Lock, Mail, ShieldAlert, ArrowLeft, KeyRound } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const { loginAdmin, setCurrentView } = useStore();
  const [email, setEmail] = useState('admin@elanjewels.com');
  const [password, setPassword] = useState('Admin@Elan2026');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(email, password);
    if (!success) {
      setError('Invalid admin credentials. Please verify your email and password.');
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] flex items-center justify-center p-4 font-sans text-stone-200">
      <div className="max-w-md w-full bg-[#1C1C1C] border border-[#333333] p-8 shadow-2xl rounded-none">
        
        {/* Back to Store */}
        <button
          onClick={() => setCurrentView('home')}
          className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-[#B89B5E] mb-6 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Élan Storefront</span>
        </button>

        {/* Brand */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-[#252525] border border-[#B89B5E]/40 text-[#B89B5E] flex items-center justify-center mx-auto mb-3">
            <Lock className="w-5 h-5" />
          </div>
          <h1 className="font-serif text-2xl text-white tracking-wider">
            ÉLAN JEWELS ADMIN
          </h1>
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#B89B5E] mt-1">
            Store Management Console · Shared Hosting Ready
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-950/60 border border-red-800 text-red-200 text-xs flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-stone-400 mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-9 pr-3 py-2.5 bg-[#141414] border border-[#383838] text-white text-xs focus:outline-none focus:border-[#B89B5E]"
              />
              <Mail className="w-4 h-4 text-stone-500 absolute left-3 top-3 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-stone-400 mb-1.5">
              Master Password
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-9 pr-3 py-2.5 bg-[#141414] border border-[#383838] text-white text-xs focus:outline-none focus:border-[#B89B5E]"
              />
              <KeyRound className="w-4 h-4 text-stone-500 absolute left-3 top-3 pointer-events-none" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#B89B5E] text-[#111111] py-3 text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#D8C59B] transition-colors cursor-pointer shadow-lg mt-2"
          >
            Authenticate & Access Dashboard
          </button>
        </form>

        {/* Demo Credentials Helper */}
        <div className="mt-8 p-3.5 bg-[#161616] border border-[#2B2B2B] text-[11px] text-stone-400 space-y-1">
          <span className="font-semibold text-stone-300 block text-[10px] uppercase tracking-wider">
            Demo Setup Credentials:
          </span>
          <div className="font-mono text-stone-300">
            Email: <span className="text-[#B89B5E]">admin@elanjewels.com</span>
          </div>
          <div className="font-mono text-stone-300">
            Password: <span className="text-[#B89B5E]">Admin@Elan2026</span>
          </div>
        </div>

      </div>
    </div>
  );
};
