'use client';

import { Hero3DCanvas } from './Hero3DCanvas';

export function BrandManifesto() {
  return (
    <section id="universo" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Manifesto Headline Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left: Free Floating Interactive 3D Medallion */}
        <div className="lg:col-span-5 flex items-center justify-center relative">
          <Hero3DCanvas className="w-full h-[360px] sm:h-[440px] lg:h-[500px]" />
        </div>

        {/* Right: The Brand Creed */}
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-[0.95]">
            Fino, pero <br />
            <span className="text-chrome">con fuerza.</span>
          </h2>

          <div className="text-xs sm:text-sm font-mono text-[#94A3B8] tracking-wider uppercase">
            Tu estilo, en un solo lugar
          </div>

          <p className="text-base sm:text-lg text-[#CBD5E1] font-light leading-relaxed">
            Fundada y dirigida por sus CEOs <strong>Nayhara Sanabria</strong> y <strong>Rodrigo Hidalgo</strong>, originarios de <strong>Paraguay</strong>, <strong>RAYN</strong> es una tienda online especializada en la <strong>reventa y curaduría exclusiva de ropa streetwear, sneakers de colección, fundas para iPhone, perfumes árabes y fragancias de nicho</strong>.
          </p>

          <p className="text-sm text-[#A1A1AA] leading-relaxed font-light">
            Operamos de manera digital con envíos asegurados a todo el territorio paraguayo, acercándote los drops más cotizados y las fragancias virales más deseadas con garantía de autenticidad para que tengas tu estilo en un solo lugar.
          </p>

          {/* Channels & Leadership Distinction */}
          <div className="pt-3 border-t border-white/10 space-y-2.5">
            {/* Empresa Oficial */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="text-[10px] font-mono text-[#71717A] uppercase tracking-wider sm:min-w-[120px]">
                CUENTA EMPRESA:
              </span>
              <a
                href="https://www.instagram.com/rayn_py/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#16161B] hover:bg-[#202028] border border-white/20 hover:border-white/40 rounded-sm text-xs font-mono text-white transition-all group"
              >
                <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2 text-white group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <span className="font-bold">@rayn_py</span>
                <span className="text-[9px] font-mono uppercase text-emerald-400 bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-500/30">
                  Instagram Oficial
                </span>
              </a>
            </div>

            {/* CEOs & Fundadores */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="text-[10px] font-mono text-[#71717A] uppercase tracking-wider sm:min-w-[120px]">
                CEOS & DIRECCIÓN:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href="https://www.instagram.com/nayysanabria/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0E0E12] hover:bg-[#18181E] border border-white/10 hover:border-white/30 rounded-sm text-xs font-mono text-white transition-all group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40 group-hover:bg-emerald-400 transition-colors" />
                  <span>Nayhara Sanabria</span>
                  <span className="text-[#A1A1AA] group-hover:text-white text-[11px]">@nayysanabria</span>
                </a>
                <a
                  href="https://www.instagram.com/rodrigo_hidalgo06/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0E0E12] hover:bg-[#18181E] border border-white/10 hover:border-white/30 rounded-sm text-xs font-mono text-white transition-all group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40 group-hover:bg-emerald-400 transition-colors" />
                  <span>Rodrigo Hidalgo</span>
                  <span className="text-[#A1A1AA] group-hover:text-white text-[11px]">@rodrigo_hidalgo06</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
