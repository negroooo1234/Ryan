'use client';

import Image from 'next/image';
import { EDITORIAL_PILLARS } from '@/data/products';
import { ShieldCheck, Sparkles, Gem, Layers } from 'lucide-react';

export function BrandManifesto() {
  const icons = [Gem, Layers, Sparkles, ShieldCheck];

  return (
    <section id="universo" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Manifesto Headline Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left: Sculptural Chrome RN Plate */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-[360px] aspect-[4/5] rounded-sm bg-gradient-to-b from-[#1E1E24] via-[#101014] to-[#0A0A0C] border border-white/20 p-8 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.8)] group overflow-hidden">
            {/* Liquid silver reflection overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-50 group-hover:opacity-80 transition-opacity" />
            <div className="absolute -right-20 -top-20 w-40 h-40 bg-white/10 rounded-full blur-3xl pointer-events-none" />

            {/* Top Monogram Label */}
            <div className="relative z-10 flex items-center justify-between text-xs font-mono text-[#A1A1AA]">
              <span className="tracking-[0.3em] uppercase">MONOGRAMA OFICIAL</span>
              <span>// 00-RN</span>
            </div>

            {/* Giant Chrome Monogram from RAYN.PNG */}
            <div className="relative z-10 my-auto flex flex-col items-center justify-center py-4">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56">
                <Image
                  src="/RAYN.PNG"
                  alt="Monograma Oficial RAYN RN"
                  fill
                  className="object-contain filter drop-shadow-[0_10px_25px_rgba(255,255,255,0.15)] group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent mx-auto mt-2" />
            </div>

            {/* Bottom Plate Specs */}
            <div className="relative z-10 text-[10px] font-mono text-[#71717A] space-y-1">
              <div className="flex justify-between">
                <span>MATRIZ:</span>
                <span className="text-[#EDEDF0]">PLATA LÍQUIDA &bull; NEGRO MATE</span>
              </div>
              <div className="flex justify-between">
                <span>UNIVERSO:</span>
                <span className="text-[#EDEDF0]">FASHION • BEAUTY • SNEAKERS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: The Brand Creed */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-[#CBD5E1] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            <span>ADN &bull; FILOSOFÍA DE MARCA</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-[0.95]">
            Fino, pero <br />
            <span className="text-chrome">con fuerza.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#CBD5E1] font-light leading-relaxed">
            No creemos en la moda recargada ni en lo genérico. RAYN nace del contraste armónico entre la elegancia arquitectónica de un monograma plateado y la solidez contundente de la moda urbana.
          </p>

          <p className="text-sm text-[#A1A1AA] leading-relaxed font-light">
            Ya sea una fragancia con notas de cuero ahumado, un abrigo de lana carbón o un sneaker con líneas de ingeniería: cada creación responde al principio de <strong>lujo accesible</strong> y autenticidad sin pretensiones.
          </p>

          {/* Pillars List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-white/10">
            {EDITORIAL_PILLARS.map((pillar, idx) => {
              const Icon = icons[idx] || Sparkles;
              return (
                <div
                  key={pillar.number}
                  className="p-4 bg-[#0E0E12] border border-white/8 hover:border-white/25 rounded-sm transition-all group"
                >
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="text-white/40 group-hover:text-white transition-colors">
                      {pillar.number} // {pillar.badge}
                    </span>
                    <Icon className="w-3.5 h-3.5 text-[#94A3B8]" />
                  </div>
                  <h3 className="text-sm font-bold text-white tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-[#A1A1AA] mt-1 font-light leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
