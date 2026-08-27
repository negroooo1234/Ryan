'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/store/useStore';
import { ShoppingBag, Search, X, Menu, ArrowRight } from 'lucide-react';

export function Navbar() {
  const {
    cart,
    toggleCart,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Main Glass Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${isScrolled
          ? 'glass-header py-3.5 shadow-2xl shadow-black/60'
          : 'bg-[#070708]/90 backdrop-blur-md py-5 border-b border-white/5'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Navigation Categories */}
          <nav className="hidden lg:flex items-center gap-7">
            <Link
              href="#coleccion"
              onClick={() => setSelectedCategory('all')}
              className={`text-xs font-semibold tracking-[0.16em] uppercase transition-colors ${selectedCategory === 'all'
                ? 'text-white border-b border-white pb-0.5'
                : 'text-[#A1A1AA] hover:text-white'
                }`}
            >
              Colección
            </Link>
            <Link
              href="#coleccion"
              onClick={() => setSelectedCategory('fashion')}
              className={`text-xs font-semibold tracking-[0.16em] uppercase transition-colors ${selectedCategory === 'fashion'
                ? 'text-white border-b border-white pb-0.5'
                : 'text-[#A1A1AA] hover:text-white'
                }`}
            >
              Fashion
            </Link>
            <Link
              href="#coleccion"
              onClick={() => setSelectedCategory('sneakers')}
              className={`text-xs font-semibold tracking-[0.16em] uppercase transition-colors ${selectedCategory === 'sneakers'
                ? 'text-white border-b border-white pb-0.5'
                : 'text-[#A1A1AA] hover:text-white'
                }`}
            >
              Sneakers
            </Link>
            <Link
              href="#coleccion"
              onClick={() => setSelectedCategory('fragrance')}
              className={`text-xs font-semibold tracking-[0.16em] uppercase transition-colors ${selectedCategory === 'fragrance'
                ? 'text-white border-b border-white pb-0.5'
                : 'text-[#A1A1AA] hover:text-white'
                }`}
            >
              Fragrance
            </Link>
            <Link
              href="#coleccion"
              onClick={() => setSelectedCategory('beauty')}
              className={`text-xs font-semibold tracking-[0.16em] uppercase transition-colors ${selectedCategory === 'beauty'
                ? 'text-white border-b border-white pb-0.5'
                : 'text-[#A1A1AA] hover:text-white'
                }`}
            >
              Beauty
            </Link>
            <Link
              href="#universo"
              className="text-xs font-semibold tracking-[0.16em] uppercase text-[#A1A1AA] hover:text-white transition-colors"
            >
              Universo RN
            </Link>
          </nav>

          {/* Center: Brand Monogram & Name */}
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
                className="object-cover scale-110"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-[0.25em] text-white select-none leading-none">
                RAYN
              </span>
              <span className="text-[8px] font-mono tracking-[0.32em] text-[#71717A] uppercase leading-none mt-1">
                Maison Urbaine
              </span>
            </div>
          </Link>

          {/* Right: Actions (Search, Wishlist, Bag) */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Search Trigger Button */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-[#A1A1AA] hover:text-white p-2 transition-colors focus:outline-none"
              aria-label="Buscar productos"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Cart Button */}
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

            {/* Mobile Menu Button */}
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

        {/* Search Bar Drawer */}
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

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#0A0A0D] border-b border-white/10 px-6 py-6 space-y-4">
            <div className="flex flex-col space-y-3 font-mono text-xs tracking-[0.18em] uppercase">
              <Link
                href="#coleccion"
                onClick={() => {
                  setSelectedCategory('all');
                  setIsMobileMenuOpen(false);
                }}
                className="text-white hover:text-zinc-300 py-1"
              >
                Colección Completa
              </Link>
              <Link
                href="#coleccion"
                onClick={() => {
                  setSelectedCategory('fashion');
                  setIsMobileMenuOpen(false);
                }}
                className="text-[#A1A1AA] hover:text-white py-1"
              >
                Fashion & Tailoring
              </Link>
              <Link
                href="#coleccion"
                onClick={() => {
                  setSelectedCategory('sneakers');
                  setIsMobileMenuOpen(false);
                }}
                className="text-[#A1A1AA] hover:text-white py-1"
              >
                Sneakers Arquitectura
              </Link>
              <Link
                href="#coleccion"
                onClick={() => {
                  setSelectedCategory('fragrance');
                  setIsMobileMenuOpen(false);
                }}
                className="text-[#A1A1AA] hover:text-white py-1"
              >
                Fragrance // Extrait
              </Link>
              <Link
                href="#coleccion"
                onClick={() => {
                  setSelectedCategory('beauty');
                  setIsMobileMenuOpen(false);
                }}
                className="text-[#A1A1AA] hover:text-white py-1"
              >
                Beauty & Skincare
              </Link>
              <Link
                href="#universo"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[#A1A1AA] hover:text-white py-1"
              >
                Manifiesto RAYN
              </Link>
              <Link
                href="#lookbook"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[#A1A1AA] hover:text-white py-1"
              >
                Lookbook Urbano
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
