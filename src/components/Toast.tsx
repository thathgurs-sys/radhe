import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, Info, AlertCircle } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toasts } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center gap-3 bg-[#111111] text-white px-4 py-3 shadow-xl border border-[#B89B5E]/30 rounded-none transform transition-all duration-300 animate-in slide-in-from-bottom-2"
        >
          {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-[#B89B5E] shrink-0" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-[#D8C59B] shrink-0" />}
          {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />}
          <p className="text-xs tracking-wide leading-relaxed font-sans">{toast.message}</p>
        </div>
      ))}
    </div>
  );
};
