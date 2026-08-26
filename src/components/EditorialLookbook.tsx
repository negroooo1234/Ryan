'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PRODUCTS } from '@/data/products';
import { useStore } from '@/store/useStore';
import { Plus, ArrowRight, Sparkles, Check } from 'lucide-react';

export function EditorialLookbook() {
  const { openQuickView, addToCart, formatPrice } = useStore();
  const [activeHotspot, setActiveHotspot] = useState<string | null>('jacket');

  const hotspots = [
    {
      id: 'jacket',
      top: '32%',
      left: '42%',
      product: PRODUCTS.find((p) => p.id === 'rayn-fashion-01') || PRODUCTS[2],
      label: '01 // Heavy Wash Bomber RN-01',
    },
    {
      id: 'sneaker',
      top: '88%',
      left: '48%',
      product: PRODUCTS.find((p) => p.id === 'rayn-sneaker-01') || PRODUCTS[0],
      label: '02 // Silver-Line Runner V1',
    },
    {
      id: 'overcoat',
      top: '38%',
      left: '58%',
      product: PRODUCTS.find((p) => p.id === 'rayn-fashion-02') || PRODUCTS[4],
      label: '03 // Structural Overcoat Charcoal',
    },
  ];

  return (
    <section id="lookbook" className="py-20 sm:py-28 bg-[#09090C] border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-[#CBD5E1] flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-white rounded-full inline-block" />
              LOOKBOOK // SERIE EDITORIAL URBANA
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight">
              Estética <span className="text-chrome">Unisex & Pareja</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#A1A1AA] max-w-md font-light">
            Ni puramente masculino ni excesivamente delicado. Un lenguaje contemporáneo donde las proporciones limpias, el negro profundo y los destellos plateados visten a quien busca distinción auténtica.
          </p>
        </div>

        {/* Lookbook Interactive Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Campaign Canvas with Hotspots */}
          <div className="lg:col-span-8 relative aspect-[16/10] rounded-sm overflow-hidden border border-white/15 shadow-2xl group">
            <Image
              src="/images/campaign.jpg"
              alt="Editorial lookbook RAYN pareja urbana unisex"
              fill
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover object-center filter brightness-[0.75] contrast-[1.08] group-hover:scale-102 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

            {/* Hotspots */}
            {hotspots.map((hs) => {
              const isActive = activeHotspot === hs.id;
              return (
                <div
                  key={hs.id}
                  style={{ top: hs.top, left: hs.left }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  <button
                    type="button"
                    onClick={() => setActiveHotspot(isActive ? null : hs.id)}
                    className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isActive
                        ? 'bg-white text-black scale-125 shadow-[0_0_20px_#ffffff]'
                        : 'bg-black/70 text-white border border-white/50 hover:scale-110 hover:border-white'
                      }`}
                    aria-label={`Ver pieza ${hs.label}`}
                  >
                    <span className="text-xs font-mono font-bold">{isActive ? '×' : '+'}</span>
                    <span className="absolute inset-0 rounded-full animate-ping opacity-25 bg-white pointer-events-none" />
                  </button>

                  {/* Hotspot Floating Tooltip */}
                  {isActive && (
                    <div className="absolute left-11 top-1/2 -translate-y-1/2 w-64 bg-[#0E0E12]/95 backdrop-blur-xl border border-white/25 p-4 rounded-sm shadow-2xl z-30 animate-fadeIn pointer-events-auto">
                      <p className="text-[10px] font-mono text-[#94A3B8] uppercase tracking-wider">
                        Pieza en el look
                      </p>
                      <h4 className="text-xs font-bold text-white mt-1 leading-snug">
                        {hs.product.name}
                      </h4>
                      <p className="text-xs font-mono font-bold text-[#E2E8F0] mt-1">
                        {formatPrice(hs.product.priceUSD)}
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => openQuickView(hs.product)}
                          className="flex-1 py-1.5 px-3 bg-white hover:bg-[#E2E8F0] text-black text-[10px] font-mono font-bold uppercase rounded-sm text-center transition-colors shadow-sm"
                        >
                          Ver Detalles
                        </button>
                        <button
                          type="button"
                          onClick={() => addToCart(hs.product)}
                          className="py-1.5 px-3 bg-white/10 hover:bg-white/20 text-white text-[10px] font-mono uppercase font-bold rounded-sm border border-white/20 transition-colors"
                        >
                          + Bolsa
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Bottom Caption on Lookbook Canvas */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
              <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-[10px] font-mono tracking-widest text-[#E2E8F0] border border-white/15 uppercase">
                CAMPAIGN NO. 01 // TOKYO • BERLIN AT DUSK
              </span>
              <span className="hidden sm:inline-block text-[10px] font-mono text-[#A1A1AA]">
                Haz clic en los puntos (+) para interactuar
              </span>
            </div>
          </div>

          {/* Right Editorial Story & Breakdown Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 bg-[#0E0E12] border border-white/10 rounded-sm">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-[10px] font-mono tracking-[0.25em] text-[#A1A1AA] uppercase">
                  DIRECCIÓN DE ESTILO
                </span>
                <span className="text-[10px] font-mono text-white/50">RN-DSGN-2026</span>
              </div>

              <h3 className="text-xl font-bold text-white mt-4 tracking-tight">
                El balance entre lo sobrio y lo contundente
              </h3>
              <p className="text-xs text-[#A1A1AA] mt-2 leading-relaxed font-light">
                Prendas estructuradas que no dependen de logomanía exagerada. La presencia se comunica a través del peso del textil, la exactitud del corte y los herrajes en plata pulida.
              </p>

              {/* Look Highlights */}
              <div className="mt-6 space-y-3">
                {hotspots.map((hs) => (
                  <div
                    key={hs.id}
                    onClick={() => setActiveHotspot(hs.id)}
                    className={`p-3 rounded-sm border transition-all cursor-pointer flex items-center justify-between ${activeHotspot === hs.id
                        ? 'bg-white/10 border-white/40'
                        : 'bg-white/2 border-white/5 hover:border-white/20'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-sm overflow-hidden bg-black flex-shrink-0">
                        <Image
                          src={hs.product.image}
                          alt={hs.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-[11px] font-bold text-white line-clamp-1">
                          {hs.product.name}
                        </div>
                        <div className="text-[10px] font-mono text-[#A1A1AA]">
                          {formatPrice(hs.product.priceUSD)}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#71717A]" />
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Quote Card */}
            <div className="p-4 bg-gradient-to-r from-white/5 to-transparent border-l-2 border-white pl-4">
              <p className="text-xs italic text-[#CBD5E1] leading-relaxed">
                &ldquo;Una estética premium urbana, minimalista y moderna, con predominio de negro, blanco y plata, combinando elegancia con carácter.&rdquo;
              </p>
              <span className="block mt-2 text-[9px] font-mono tracking-widest text-[#71717A] uppercase">
                // RAYN BRAND MANIFESTO
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
