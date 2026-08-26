'use client';

import Link from 'next/link';
import { ArrowDownRight, ArrowRight } from 'lucide-react';
import { Hero3DCanvas } from './Hero3DCanvas';

export function Hero() {
  return (
    <section className="relative min-h-[94vh] flex flex-col justify-between overflow-hidden border-b border-white/10 bg-[#070708]">
      {/* Subtle Ambient Lighting Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.05),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.03),transparent_70%)]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-8 flex-1 flex flex-col justify-between w-full">
        {/* Top Badges & Meta */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/15 bg-black/50 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
            <span className="text-[11px] font-mono tracking-[0.25em] text-[#E2E8F0] uppercase">
              Colección Oficial // Drop 01
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-6 text-xs font-mono text-[#A1A1AA] tracking-[0.16em] uppercase">
            <span>FASHION</span>
            <span className="text-white/20">/</span>
            <span>BEAUTY</span>
            <span className="text-white/20">/</span>
            <span>SNEAKERS</span>
            <span className="text-white/20">/</span>
            <span>FRAGRANCE</span>
          </div>
        </div>

        {/* Center: Grid with Editorial Copy and 3D Interactive Logo */}
        <div className="my-auto py-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Brand Statement & Actions */}
          <div className="lg:col-span-7 space-y-6">
            <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.35em] text-[#CBD5E1] flex items-center gap-2">
              <span className="w-8 h-[1px] bg-white/40 inline-block" />
              Lujo Accesible • Moda Urbana • Minimalismo
            </p>

            <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[8.5rem] font-black uppercase tracking-[0.04em] leading-[0.9] text-white select-none flex items-baseline">
              <span className="text-chrome">RA</span>
              <span className="text-white ml-2 sm:ml-3">YN</span>
            </h1>

            <p className="text-base sm:text-lg text-[#CBD5E1] font-light leading-relaxed max-w-xl">
              Una estética premium, minimalista y con carácter. Piezas urbanas, fragancias de autor, sneakers de arquitectura y belleza unisex dentro de un mismo universo.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="#coleccion"
                className="btn-rayn-primary px-7 py-4 flex items-center gap-3 group"
              >
                <span>Explorar Selección</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="#lookbook"
                className="btn-rayn-outline px-6 py-4 flex items-center gap-2.5"
              >
                <span>Ver Lookbook Urbano</span>
                <ArrowDownRight className="w-4 h-4 opacity-70" />
              </Link>
            </div>
          </div>

          {/* Right Column: 3D Interactive Monogram Experience */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            <Hero3DCanvas />
          </div>
        </div>

        {/* Bottom Hero Matrix / Brand Coordinates */}
        <div className="pt-6 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-xs font-mono">
          <div className="space-y-1">
            <div className="text-[#71717A] tracking-wider text-[10px] uppercase">ESTÉTICA</div>
            <div className="text-[#EDEDF0] font-semibold tracking-wider">EDITORIAL & URBANA</div>
          </div>
          <div className="space-y-1">
            <div className="text-[#71717A] tracking-wider text-[10px] uppercase">PALETA FIRMA</div>
            <div className="text-[#EDEDF0] font-semibold tracking-wider">NEGRO &bull; PLATA &bull; GRIS</div>
          </div>
          <div className="space-y-1">
            <div className="text-[#71717A] tracking-wider text-[10px] uppercase">FILOSOFÍA</div>
            <div className="text-[#EDEDF0] font-semibold tracking-wider">FINO, PERO CON FUERZA</div>
          </div>
          <div className="space-y-1">
            <div className="text-[#71717A] tracking-wider text-[10px] uppercase">EXPERIENCIA 3D</div>
            <div className="text-[#EDEDF0] font-semibold tracking-wider">MONOGRAMA RN WEBGL</div>
          </div>
        </div>
      </div>
    </section>
  );
}
