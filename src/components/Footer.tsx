'use client';

import Link from 'next/link';
import { useStore } from '@/store/useStore';
import { ArrowUp, MessageCircle } from 'lucide-react';

export function Footer() {
  const { setSelectedCategory } = useStore();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050507] border-t border-white/10 text-[#A1A1AA] pt-16 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Col 1: Brand Identity */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-sm border border-white/25 bg-black overflow-hidden flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.08)] group-hover:border-white/60 transition-all duration-300">
                <img
                  src="/RAYN.PNG"
                  alt="Logo RN"
                  className="object-cover scale-110"
                />
              </div>
              <div>
                <span className="text-2xl font-black tracking-[0.25em] text-white">RAYN</span>
                <span className="block text-[8px] font-mono tracking-[0.3em] text-[#71717A] uppercase">
                  PARAGUAY
                </span>
              </div>
            </div>

            <p className="text-xs text-[#CBD5E1] font-medium leading-relaxed max-w-sm">
              <span className="text-white">Tu estilo, en un solo lugar</span>.
            </p>

            <p className="text-xs text-[#A1A1AA] leading-relaxed max-w-sm font-light">
              Envíos asegurados a todo el territorio paraguayo 🇵🇾.
            </p>

            {/* CEOs & Fundadores */}
            <div className="pt-2 border-t border-white/10 space-y-1.5">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#71717A]">
                CEOs & Fundadores:
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
                <a
                  href="https://www.instagram.com/nayysanabria/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-emerald-400 transition-colors flex items-center gap-1"
                >
                  <span>Nayhara Sanabria</span>
                  <span className="text-[#71717A] text-[11px]">(@nayysanabria)</span>
                </a>
                <span className="text-white/20">&bull;</span>
                <a
                  href="https://www.instagram.com/rodrigo_hidalgo06/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-emerald-400 transition-colors flex items-center gap-1"
                >
                  <span>Rodrigo Hidalgo</span>
                  <span className="text-[#71717A] text-[11px]">(@rodrigo_hidalgo06)</span>
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/rayn_py/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-sm border border-white/15 text-white hover:bg-white/10 hover:border-white/40 transition-colors text-xs font-mono group"
                aria-label="Instagram oficial @rayn_py"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2 text-white group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <span>@rayn_py</span>
              </a>
              <a
                href="https://wa.me/595986454492"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-sm border border-white/15 text-white hover:bg-white/10 hover:border-white/40 transition-colors text-xs font-mono group"
                aria-label="WhatsApp oficial +595 986 454492"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span>+595 986 454492</span>
              </a>
            </div>
          </div>

          {/* Col 2: Categorías */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Universo RAYN
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <Link
                  href="/tienda"
                  className="text-white hover:text-emerald-400 font-bold transition-colors"
                >
                  ✦ Catálogo Completo
                </Link>
              </li>
              <li>
                <Link
                  href="/tienda?cat=fashion"
                  className="hover:text-white transition-colors"
                >
                  Ropa Streetwear
                </Link>
              </li>
              <li>
                <Link
                  href="/tienda?cat=sneakers"
                  className="hover:text-white transition-colors"
                >
                  Sneakers & Calzado
                </Link>
              </li>
              <li>
                <Link
                  href="/tienda?cat=cases"
                  className="hover:text-white transition-colors"
                >
                  Fundas para iPhone
                </Link>
              </li>
              <li>
                <Link
                  href="/tienda?cat=fragrance"
                  className="hover:text-white transition-colors"
                >
                  Perfumes Árabes & Nicho
                </Link>
              </li>
              <li>
                <Link
                  href="/#lookbook"
                  className="hover:text-white transition-colors"
                >
                  Lookbook
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Filosofía / Valores Firma (Separada con más margen) */}
          <div className="lg:col-span-4 lg:pl-12 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Valores Firma
            </h4>
            <div className="p-4 bg-[#0E0E12] border border-white/10 rounded-sm space-y-2">
              <div className="text-[10px] font-mono font-bold text-white uppercase">
                &bull; Fino, pero con fuerza
              </div>
              <p className="text-[11px] text-[#A1A1AA] leading-relaxed font-light">
                Curaduría y reventa de ropa exclusiva, sneakers, perfumes árabes y fragancias de nicho.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#71717A]">
          <div>
            &copy; {new Date().getFullYear()} Todos los derechos reservados. &middot; Desarrollado por{' '}
            <a
              href="https://www.instagram.com/vectrapy/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-bold hover:text-emerald-400 transition-colors inline"
            >
              VectraPY
            </a>
          </div>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-white hover:text-zinc-300 font-bold transition-colors"
            >
              <span>SUBIR</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
