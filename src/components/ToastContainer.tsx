'use client';

import { useStore } from '@/store/useStore';
import { CheckCircle2, Info, ShoppingBag, X } from 'lucide-react';

export function ToastContainer() {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <aside aria-label="Notificaciones" className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-[#121216]/95 border border-white/20 text-white p-4 rounded-sm shadow-2xl backdrop-blur-md flex items-start gap-3 animate-slideUp"
        >
          {toast.type === 'cart' ? (
            <ShoppingBag className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
          ) : toast.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
          ) : (
            <Info className="w-5 h-5 text-[#94A3B8] flex-shrink-0 mt-0.5" />
          )}

          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-white tracking-wide">{toast.title}</h4>
            {toast.description && (
              <p className="text-[11px] text-[#A1A1AA] mt-0.5 font-light line-clamp-2">
                {toast.description}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={() => removeToast(toast.id)}
            className="text-[#71717A] hover:text-white p-1"
            aria-label="Cerrar notificación"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </aside>
  );
}
