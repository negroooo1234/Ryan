'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useStore } from '@/store/useStore';
import { X, ShoppingBag, Check, MessageCircle } from 'lucide-react';

export function ProductQuickViewModal() {
  const quickViewProduct = useStore((s) => s.quickViewProduct);
  const closeQuickView = useStore((s) => s.closeQuickView);
  const addToCart = useStore((s) => s.addToCart);
  const formatPrice = useStore((s) => s.formatPrice);

  const [selectedOption, setSelectedOption] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const currentProductId = quickViewProduct?.id ?? null;
  const [lastProductId, setLastProductId] = useState(currentProductId);
  if (currentProductId !== lastProductId) {
    setLastProductId(currentProductId);
    setSelectedOption(quickViewProduct?.options[0] ?? '');
    setQuantity(1);
    setIsAdded(false);
  }

  useEffect(() => {
    if (!quickViewProduct) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const handleAddToCart = () => {
    addToCart(quickViewProduct, selectedOption, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1800);
  };

  const handleWhatsAppConsult = () => {
    const text = encodeURIComponent(
      `Hola RAYN Concierge, deseo consultar disponibilidad y detalles de la pieza: ${quickViewProduct.name} (${selectedOption}).`
    );
    window.open(`https://wa.me/595986454492?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-fadeIn">
      <div
        className="fixed inset-0"
        onClick={closeQuickView}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-4xl bg-[#0E0E12] border border-white/20 rounded-sm shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row max-h-[90vh]">
        <button
          type="button"
          onClick={closeQuickView}
          className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-[#A1A1AA] hover:text-white hover:bg-black border border-white/10 z-20 transition-colors"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="md:w-1/2 relative bg-[#141418] min-h-[320px] md:min-h-[460px] overflow-hidden">
          <Image
            src={quickViewProduct.image}
            alt={quickViewProduct.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E12]/80 via-transparent to-transparent md:hidden" />
        </div>

        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#94A3B8] uppercase">
                {'// '}
                {quickViewProduct.categoryLabel}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
                {quickViewProduct.name}
              </h3>
              <p className="text-xs text-[#CBD5E1] mt-1 font-light">
                {quickViewProduct.subtitle}
              </p>
            </div>

            <div className="flex items-baseline gap-3 py-2 border-y border-white/10">
              <span className="text-2xl font-bold font-mono text-white">
                {formatPrice(quickViewProduct.price || quickViewProduct.priceUSD || 0)}
              </span>
              {(quickViewProduct.originalPrice || quickViewProduct.originalPriceUSD) && (
                <span className="text-sm font-mono text-[#71717A] line-through">
                  {formatPrice(quickViewProduct.originalPrice || quickViewProduct.originalPriceUSD || 0)}
                </span>
              )}
              <span className="ml-auto text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
                DISPONIBLE
              </span>
            </div>

            <p className="text-xs text-[#A1A1AA] leading-relaxed font-light">
              {quickViewProduct.description}
            </p>

            <div className="bg-[#141418] border border-white/10 p-3.5 rounded-sm space-y-2">
              <div className="text-[10px] font-mono text-[#71717A] uppercase tracking-wider">
                Ficha Técnica & Composición
              </div>
              {quickViewProduct.specs.map((spec, idx) => (
                <div key={idx} className="flex justify-between text-[11px] font-mono">
                  <span className="text-[#A1A1AA]">{spec.label}:</span>
                  <span className="text-white font-medium text-right">{spec.value}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#A1A1AA] uppercase">
                  Seleccionar {quickViewProduct.optionsLabel}:
                </span>
                <span className="text-white font-bold">{selectedOption}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {quickViewProduct.options.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setSelectedOption(opt)}
                    className={`px-3 py-2 text-xs font-mono rounded-sm transition-all ${selectedOption === opt
                      ? 'bg-white text-black font-bold shadow-md'
                      : 'bg-white/5 text-[#CBD5E1] hover:bg-white/10 border border-white/15'
                      }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-[#A1A1AA] uppercase">Cantidad:</span>
              <div className="flex items-center border border-white/15 rounded-sm bg-white/5">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 text-white hover:bg-white/10 text-sm font-mono"
                >
                  -
                </button>
                <span className="px-3 py-1 text-xs font-mono font-bold text-white">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 text-white hover:bg-white/10 text-sm font-mono"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 space-y-2.5">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleAddToCart}
                className={`flex-1 py-3.5 px-4 rounded-sm flex items-center justify-center gap-2 text-xs font-mono font-bold tracking-wider uppercase transition-all ${isAdded
                  ? 'bg-emerald-500 text-black'
                  : 'bg-white text-black hover:bg-[#E2E8F0]'
                  }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>AÑADIDO A LA BOLSA</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>AÑADIR A LA BOLSA • {formatPrice((quickViewProduct.price || quickViewProduct.priceUSD || 0) * quantity)}</span>
                  </>
                )}
              </button>
            </div>

            <button
              type="button"
              onClick={handleWhatsAppConsult}
              className="w-full py-2.5 px-3 bg-transparent hover:bg-white/5 border border-white/10 hover:border-white/30 text-[#A1A1AA] hover:text-white rounded-sm text-[11px] font-mono tracking-wider uppercase flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Consultar con Concierge por WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
