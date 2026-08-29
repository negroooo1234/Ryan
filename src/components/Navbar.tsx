'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/store/useStore';
import { ShoppingBag, Search, X, Menu, MessageCircle } from 'lucide-react';

export function Navbar() {
  const totalCartCount = useStore((s) =>
    s.cart.reduce((acc, item) => acc + item.quantity, 0)
  );
  const toggleCart = useStore((s) => s.toggleCart);
  const searchQuery = useStore((s) => s.searchQuery);
  const setSearchQuery = useStore((s) => s.setSearchQuery);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${isScrolled
          ? 'glass-header py-3.5 shadow-2xl shadow-black/60'
          : 'bg-[#070708]/90 backdrop-blur-md py-4 border-b border-white/5'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <nav className="hidden lg:flex items-center gap-6">
            <Link
              href="/tienda"
              className="text-xs font-semibold tracking-[0.16em] uppercase text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-sm transition-all border border-white/15 hover:border-white/30"
            >
              ✦ Tienda
            </Link>
          </nav>

          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="RAYN Home"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-sm border border-white/25 bg-black overflow-hidden flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.08)] group-hover:border-white/60 transition-all duration-300">
              <Image
                src="/RAYN.PNG"
                alt="Logo RN"
                fill
                sizes="40px"
                priority
                className="object-cover scale-110"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-bold tracking-[0.25em] text-white select-none leading-none">
                RAYN
              </span>
              <span className="text-[8px] font-mono tracking-[0.28em] text-[#71717A] uppercase leading-none mt-1">
                PARAGUAY
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3 sm:gap-5">
            <a
              href="https://www.instagram.com/rayn_py/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#A1A1AA] hover:text-white p-2 transition-colors focus:outline-none hidden sm:flex items-center"
              aria-label="Instagram @rayn_py"
            >
              <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>

            <a
              href="https://wa.me/595986454492"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#A1A1AA] hover:text-emerald-400 p-2 transition-colors focus:outline-none hidden sm:flex items-center"
              aria-label="WhatsApp Oficial RAYN +595 986 454492"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-[#A1A1AA] hover:text-white p-2 transition-colors focus:outline-none"
              aria-label="Buscar productos"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <button
              type="button"
              onClick={toggleCart}
              className="relative flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/40 text-white px-3 sm:px-4 py-2 rounded-sm transition-all duration-200 group"
              aria-label="Abrir bolsa de compras"
            >
              <ShoppingBag className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
              <span className="text-xs font-mono font-bold tracking-wider hidden sm:inline">
                BAG
              </span>
              <span className="bg-white text-black font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-mono ml-0.5">
                {totalCartCount}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-[#A1A1AA] hover:text-white p-2 transition-colors"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isSearchOpen && (
          <div className="bg-[#0E0E12] border-t border-b border-white/10 px-4 py-3 animate-fadeIn">
            <div className="max-w-4xl mx-auto flex items-center gap-3">
              <Search className="w-4 h-4 text-[#71717A]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar en el universo RAYN (sneakers, fragancias, bombers, skincare...)"
                className="w-full bg-transparent text-sm text-white placeholder-[#71717A] focus:outline-none font-sans"
                autoFocus
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-[#A1A1AA] hover:text-white"
                >
                  Limpiar
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="text-[#71717A] hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#0A0A0D] border-b border-white/10 px-6 py-6 space-y-4">
            <div className="flex flex-col space-y-3 font-mono text-xs tracking-[0.18em] uppercase">
              <Link
                href="/tienda"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white font-bold bg-white/10 px-3 py-2 rounded-sm"
              >
                ✦ Tienda Completa
              </Link>
              <Link
                href="/tienda?cat=fashion"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[#A1A1AA] hover:text-white py-1"
              >
                Ropa
              </Link>
              <Link
                href="/tienda?cat=sneakers"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[#A1A1AA] hover:text-white py-1"
              >
                Sneakers
              </Link>
              <Link
                href="/tienda?cat=cases"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[#A1A1AA] hover:text-white py-1"
              >
                Fundas para iPhone
              </Link>
              <Link
                href="/tienda?cat=fragrance"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[#A1A1AA] hover:text-white py-1"
              >
                Perfumes (Árabes & Nicho)
              </Link>
              <Link
                href="/#lookbook"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[#A1A1AA] hover:text-white py-1"
              >
                Lookbook Urbano
              </Link>
              <Link
                href="/#universo"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[#A1A1AA] hover:text-white py-1"
              >
                Manifiesto RAYN
              </Link>
              <a
                href="https://wa.me/595986454492"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-emerald-400 font-bold hover:text-emerald-300 py-1 flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp (+595 986 454492)</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
