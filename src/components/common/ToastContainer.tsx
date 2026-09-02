import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useShop();

  if (toasts.length === 0) return null;

  return (
    <aside aria-label="Notifications" className="fixed top-24 right-4 sm:right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center gap-3 p-3.5 bg-[#141312] text-[#FAF8F5] rounded-xl shadow-2xl border border-stone-700/80 animate-in slide-in-from-top-3 fade-in duration-200"
        >
          {toast.image ? (
            <img
              src={toast.image}
              alt=""
              className="w-10 h-12 object-cover rounded-md shrink-0 border border-stone-700"
            />
          ) : (
            <div className="p-1 rounded-full shrink-0">
              {toast.type === 'error' ? (
                <AlertCircle className="w-5 h-5 text-rose-400" />
              ) : toast.type === 'info' ? (
                <Info className="w-5 h-5 text-sky-400" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              )}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <p className="text-xs text-stone-200 font-medium leading-tight">
              {toast.message}
            </p>
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            aria-label="Dismiss notification"
            className="text-stone-400 hover:text-white p-1 rounded-md transition-colors shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </aside>
  );
};
