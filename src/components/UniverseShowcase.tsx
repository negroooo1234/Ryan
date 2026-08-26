'use client';

import { useMemo, useState } from 'react';
import { useStore } from '@/store/useStore';
import { PRODUCTS, CATEGORIES_CONFIG } from '@/data/products';
import { ProductCard } from './ProductCard';
import { CategoryId } from '@/types';
import { SlidersHorizontal, Sparkles, Search } from 'lucide-react';

export function UniverseShowcase() {
  const { selectedCategory, setSelectedCategory, searchQuery, setSearchQuery } = useStore();
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Category match
      const categoryMatch = selectedCategory === 'all' || p.category === selectedCategory;
      // Search match
      const searchMatch =
        !searchQuery ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());

      return categoryMatch && searchMatch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceUSD - b.priceUSD;
      if (sortBy === 'price-desc') return b.priceUSD - a.priceUSD;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <section id="coleccion" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#CBD5E1] tracking-[0.25em] uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>UN MISMO UNIVERSO • 4 PILARES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            Curaduría <span className="text-chrome">RAYN</span>
          </h2>
          <p className="text-sm sm:text-base text-[#A1A1AA] max-w-xl mt-2 font-light">
            De sneakers arquitectónicos a extractos de perfume y prendas urbanas: cada silueta comparte la misma disciplina de diseño, materiales premium y acabados en plata líquida.
          </p>
        </div>

        {/* Sorting Dropdown & Filter Count */}
        <div className="flex items-center gap-4 self-start md:self-end">
          <span className="text-xs font-mono text-[#71717A]">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'PIEZA' : 'PIEZAS'}
          </span>
          <div className="flex items-center gap-2 bg-[#0E0E12] border border-white/15 px-3 py-1.5 rounded-sm">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#71717A]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-xs font-mono text-white focus:outline-none cursor-pointer"
            >
              <option value="featured" className="bg-[#0E0E12] text-white">
                Destacados
              </option>
              <option value="price-asc" className="bg-[#0E0E12] text-white">
                Menor Precio
              </option>
              <option value="price-desc" className="bg-[#0E0E12] text-white">
                Mayor Precio
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none">
        {CATEGORIES_CONFIG.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id as CategoryId)}
              className={`whitespace-nowrap px-4 py-2.5 rounded-sm text-xs font-mono tracking-wider uppercase transition-all duration-200 flex items-center gap-2.5 ${isActive
                  ? 'bg-white text-black font-bold shadow-lg shadow-white/10'
                  : 'bg-[#0E0E12] text-[#A1A1AA] hover:text-white hover:bg-white/5 border border-white/10'
                }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[9px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-black/20 text-black' : 'bg-white/10 text-[#71717A]'
                  }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Search Banner if searching */}
      {searchQuery && (
        <div className="mt-4 flex items-center justify-between bg-white/5 border border-white/10 px-4 py-2 rounded text-xs font-mono">
          <span>Resultados para: &ldquo;{searchQuery}&rdquo;</span>
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="text-[#A1A1AA] hover:text-white underline"
          >
            Mostrar todo
          </button>
        </div>
      )}

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="mt-16 text-center py-16 bg-[#0E0E12] border border-dashed border-white/15 rounded-sm">
          <p className="text-base text-white font-semibold">No se encontraron piezas en esta categoría</p>
          <p className="text-xs text-[#71717A] mt-1 font-mono">Intenta con otra búsqueda o selecciona el universo completo.</p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 bg-white text-black font-mono text-xs font-bold rounded-sm uppercase hover:bg-[#E2E8F0]"
          >
            Ver Todo el Universo
          </button>
        </div>
      )}
    </section>
  );
}
