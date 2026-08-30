'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PRODUCTS } from '@/data/products';
import { useStore } from '@/store/useStore';
import { ChevronLeft, ChevronRight, Eye, ShoppingBag, Check, X } from 'lucide-react';

interface LookData {
  id: string;
  title: string;
  colorName: string;
  subtitle: string;
  badge: string;
  image: string;
  hotspot: {
    top: string;
    left: string;
    label: string;
  };
}

export function EditorialLookbook() {
  const openQuickView = useStore((s) => s.openQuickView);
  const addToCart = useStore((s) => s.addToCart);
  const formatPrice = useStore((s) => s.formatPrice);

  const denimProduct = PRODUCTS.find((p) => p.id === 'rayn-fashion-02') || PRODUCTS[0];

  const looks: LookData[] = [
    {
      id: 'look-01',
      title: 'Pantalón Corte Recto Celeste',
      colorName: 'Celeste',
      subtitle: 'Pantalón corte recto en denim celeste lavado de caída limpia sobre sneakers.',
      badge: '01 // PANTALÓN CORTE RECTO CELESTE',
      image: '/images/lookbook-1.jpg',
      hotspot: {
        top: '62%',
        left: '50%',
        label: 'Pantalón Corte Recto Celeste',
      },
    },
    {
      id: 'look-02',
      title: 'Pantalón Corte Recto Negro',
      colorName: 'Negro',
      subtitle: 'Pantalón corte recto en denim negro lavado estructurado y versátil.',
      badge: '02 // PANTALÓN CORTE RECTO NEGRO',
      image: '/images/lookbook-2.jpg',
      hotspot: {
        top: '62%',
        left: '50%',
        label: 'Pantalón Corte Recto Negro',
      },
    },
  ];

  const [activeLookIndex, setActiveLookIndex] = useState(0);
  const currentLook = looks[activeLookIndex];
  const [isTooltipOpen, setIsTooltipOpen] = useState(true);
  const [selectedSize, setSelectedSize] = useState('32 US');
  const [isAdded, setIsAdded] = useState(false);

  const handleNextLook = () => {
    setActiveLookIndex((prev) => (prev + 1) % looks.length);
    setIsTooltipOpen(true);
  };

  const handlePrevLook = () => {
    setActiveLookIndex((prev) => (prev - 1 + looks.length) % looks.length);
    setIsTooltipOpen(true);
  };

  const handleSelectLook = (idx: number) => {
    setActiveLookIndex(idx);
    setIsTooltipOpen(true);
  };

  const handleAddToCart = () => {
    addToCart(denimProduct, `${currentLook.colorName} - ${selectedSize}`, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <section id="lookbook" className="py-20 sm:py-28 bg-[#09090C] border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight">
              Street Fit // <span className="text-chrome">Pantalón Corte Recto</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2 bg-[#0E0E12] p-1 rounded-sm border border-white/10">
                {looks.map((l, idx) => (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => handleSelectLook(idx)}
                    className={`px-3 sm:px-4 py-2 rounded-sm text-xs font-mono tracking-wider uppercase transition-all ${activeLookIndex === idx
                        ? 'bg-white text-black font-bold shadow-sm'
                        : 'text-[#A1A1AA] hover:text-white hover:bg-white/5'
                      }`}
                  >
                    {l.badge}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handlePrevLook}
                  className="p-2 bg-[#0E0E12] hover:bg-[#18181E] text-white border border-white/10 hover:border-white/30 rounded-sm transition-colors"
                  aria-label="Ver fit anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono text-[#A1A1AA] px-2">
                  0{activeLookIndex + 1} / 0{looks.length}
                </span>
                <button
                  type="button"
                  onClick={handleNextLook}
                  className="p-2 bg-[#0E0E12] hover:bg-[#18181E] text-white border border-white/10 hover:border-white/30 rounded-sm transition-colors"
                  aria-label="Ver siguiente fit"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="relative aspect-[3/4] max-h-[720px] rounded-sm overflow-hidden border border-white/15 shadow-2xl group bg-black select-none">
              <Image
                src={currentLook.image}
                alt={currentLook.title}
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover object-center filter brightness-[0.92] contrast-[1.05] transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

              {/* Hotspot Pin */}
              <div
                style={{ top: currentLook.hotspot.top, left: currentLook.hotspot.left }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
              >
                <button
                  type="button"
                  onClick={() => setIsTooltipOpen(!isTooltipOpen)}
                  className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isTooltipOpen
                      ? 'bg-white text-black scale-110 shadow-[0_0_25px_rgba(255,255,255,0.9)]'
                      : 'bg-black/80 text-white border-2 border-white/80 hover:scale-110'
                    }`}
                  aria-label="Ver pieza en el fit"
                >
                  <span className="text-sm font-mono font-black">{isTooltipOpen ? '×' : '+'}</span>
                  <span className="absolute inset-0 rounded-full animate-ping opacity-30 bg-white pointer-events-none" />
                </button>
              </div>

              {/* Product Popup Card */}
              {isTooltipOpen && (
                <div className="absolute z-40 animate-fadeIn pointer-events-auto bottom-3 left-3 right-3 sm:bottom-auto sm:right-auto sm:w-72 sm:left-auto sm:right-4 sm:top-1/2 sm:-translate-y-1/2 lg:left-[calc(50%+24px)] lg:right-auto lg:top-[62%] bg-[#0E0E12]/95 backdrop-blur-xl border border-white/25 p-3.5 sm:p-4 rounded-sm shadow-2xl">
                  <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider font-bold">
                        PIEZA EN EL FIT
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-mono text-[#A1A1AA]">
                        {currentLook.colorName}
                      </span>
                      <button
                        type="button"
                        onClick={() => setIsTooltipOpen(false)}
                        className="text-[#71717A] hover:text-white p-0.5 transition-colors"
                        aria-label="Cerrar popup"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h4 className="text-xs sm:text-sm font-bold text-white mt-2 leading-snug uppercase tracking-tight line-clamp-1 sm:line-clamp-none">
                    {currentLook.title}
                  </h4>
                  <p className="text-[11px] text-[#A1A1AA] mt-0.5">
                    Pantalón Corte Recto
                  </p>
                  <p className="text-sm font-mono font-bold text-white mt-1.5">
                    {formatPrice(denimProduct.price || denimProduct.priceUSD || 750000)}
                  </p>

                  <div className="mt-3 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => openQuickView(denimProduct)}
                      className="flex-1 py-2 px-2.5 bg-white hover:bg-[#E2E8F0] active:scale-[0.98] text-black text-[10px] font-mono font-bold uppercase rounded-sm flex items-center justify-center gap-1.5 transition-all shadow-sm"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Ver Detalles</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleAddToCart}
                      className="py-2 px-3 bg-white/10 hover:bg-white/20 active:scale-[0.98] text-white text-[10px] font-mono uppercase font-bold rounded-sm border border-white/20 transition-all flex items-center gap-1.5"
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-bold">Listo</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>+ Bolsa</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-5">
            <div className="p-6 bg-[#0E0E12] border border-white/10 rounded-sm">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-[10px] font-mono tracking-[0.25em] text-[#A1A1AA] uppercase">
                  DETALLE DE LA PRENDA
                </span>
              </div>

              <div className="mt-4">
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">
                  STREETWEAR ESSENTIAL // DROP 01
                </span>
                <h3 className="text-2xl font-bold text-white tracking-tight mt-1 uppercase">
                  Pantalón Corte Recto
                </h3>
                <div className="text-xs font-mono text-[#CBD5E1] mt-1">
                  {currentLook.title}
                </div>
                <div className="flex items-baseline gap-3 mt-2">
                  <span className="text-xl font-mono font-bold text-white">
                    {formatPrice(denimProduct.price || denimProduct.priceUSD || 750000)}
                  </span>
                  <span className="text-xs font-mono text-[#71717A] line-through">
                    {formatPrice(denimProduct.originalPrice || 890000)}
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#A1A1AA] mt-3 leading-relaxed font-light">
                Silueta de corte recto y amplio, con una caída limpia desde la cadera hasta el ruedo. Un pantalón cómodo y estructurado, pensado para caer naturalmente sobre las zapatillas y lograr un estilo urbano, relajado y moderno.
              </p>

              <div className="mt-5 pt-4 border-t border-white/10 space-y-2">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#71717A]">
                  Seleccionar Lavado:
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {looks.map((l, idx) => (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => handleSelectLook(idx)}
                      className={`p-2.5 rounded-sm border text-left text-xs font-mono transition-all ${activeLookIndex === idx
                          ? 'bg-white/10 border-white text-white font-bold'
                          : 'bg-white/2 border-white/10 text-[#A1A1AA] hover:border-white/30'
                        }`}
                    >
                      <div className="text-[10px] text-[#71717A]">0{idx + 1} {'//'}</div>
                      <div className="truncate mt-0.5">{l.title}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono text-[#71717A] uppercase">
                  <span>Talla (US):</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['30 US', '32 US', '34 US', '36 US'].map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSelectedSize(sz)}
                      className={`px-3 py-1.5 text-xs font-mono rounded-sm transition-all ${selectedSize === sz
                          ? 'bg-white text-black font-bold'
                          : 'bg-white/5 text-[#A1A1AA] hover:text-white border border-white/10'
                        }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 space-y-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`w-full py-3 px-4 rounded-sm flex items-center justify-center gap-2 text-xs font-mono font-bold tracking-wider uppercase transition-all duration-200 ${isAdded
                      ? 'bg-emerald-500 text-black'
                      : 'bg-white hover:bg-[#E2E8F0] text-black shadow-lg shadow-white/10'
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
                      <span>AÑADIR A LA BOLSA • {formatPrice(750000)}</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => openQuickView(denimProduct)}
                  className="w-full py-2.5 px-4 bg-transparent hover:bg-white/5 border border-white/15 hover:border-white/30 text-white rounded-sm text-xs font-mono tracking-wider uppercase flex items-center justify-center gap-2 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-[#A1A1AA]" />
                  <span>Ver Ficha Completa del Pantalón</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
