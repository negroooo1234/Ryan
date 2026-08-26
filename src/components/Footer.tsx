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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1 & 2: Brand Identity */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border border-white/30 bg-gradient-to-br from-white/15 to-black flex items-center justify-center rounded-sm">
                <span className="text-chrome font-black text-base">RN</span>
              </div>
              <div>
                <span className="text-2xl font-black tracking-[0.25em] text-white">RAYN</span>
                <span className="block text-[8px] font-mono tracking-[0.35em] text-[#71717A] uppercase">
                  Maison Urbaine
                </span>
              </div>
            </div>

            <p className="text-xs text-[#A1A1AA] leading-relaxed max-w-sm font-light">
              Estética premium urbana, minimalista y con carácter. Unificando moda, calzado de autor, extractos de perfume y belleza unisex en una sola firma.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-sm border border-white/10 text-white hover:bg-white/10 transition-colors"
                aria-label="Instagram de RAYN"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://wa.me"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-sm border border-white/10 text-white hover:bg-white/10 transition-colors"
                aria-label="WhatsApp Concierge"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Categorías */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Universo RAYN
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <Link
                  href="#coleccion"
                  onClick={() => setSelectedCategory('fashion')}
                  className="hover:text-white transition-colors"
                >
                  Fashion & Sastrería
                </Link>
              </li>
              <li>
                <Link
                  href="#coleccion"
                  onClick={() => setSelectedCategory('sneakers')}
                  className="hover:text-white transition-colors"
                >
                  Sneakers Arquitectura
                </Link>
              </li>
              <li>
                <Link
                  href="#coleccion"
                  onClick={() => setSelectedCategory('fragrance')}
                  className="hover:text-white transition-colors"
                >
                  Fragrance / Extractos
                </Link>
              </li>
              <li>
                <Link
                  href="#coleccion"
                  onClick={() => setSelectedCategory('beauty')}
                  className="hover:text-white transition-colors"
                >
                  Beauty & Skincare
                </Link>
              </li>
              <li>
                <Link
                  href="#lookbook"
                  className="hover:text-white transition-colors"
                >
                  Lookbook Pareja / Editorial
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Experiencia & Contacto */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Experiencia
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <a
                  href="https://wa.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>WhatsApp Concierge</span>
                  <span className="text-[9px] bg-emerald-950 text-emerald-400 px-1 rounded border border-emerald-500/20">
                    24/7
                  </span>
                </a>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Envíos Internacionales
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Autenticidad & Materiales
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Guía de Tallas Unisex
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Cuidados de Textil & Cuero
                </span>
              </li>
            </ul>
          </div>

          {/* Col 5: Filosofía */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Valores Firma
            </h4>
            <div className="p-3.5 bg-[#0E0E12] border border-white/10 rounded-sm space-y-2">
              <div className="text-[10px] font-mono font-bold text-white uppercase">
                &bull; Fino, pero con fuerza
              </div>
              <p className="text-[11px] text-[#A1A1AA] leading-snug font-light">
                Cero colores saturados innecesarios. Cero apariencia de catálogo genérico.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#71717A]">
          <div>
            &copy; {new Date().getFullYear()} RAYN MAISON. TODOS LOS DERECHOS RESERVADOS.
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer">TÉRMINOS</span>
            <span className="hover:text-white cursor-pointer">PRIVACIDAD</span>
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
