'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { CategoryId } from '@/types';
import {
  SlidersHorizontal,
  Search,
  X,
  RotateCcw,
  Tag,
} from 'lucide-react';

export function CatalogView() {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get('cat') as CategoryId | null;

  const [selectedCategory, setSelectedCategory] = useState<CategoryId>(urlCategory || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest'>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(true);

  const [lastSyncedCategory, setLastSyncedCategory] = useState(urlCategory);
  if (urlCategory !== lastSyncedCategory) {
    setLastSyncedCategory(urlCategory);
    if (urlCategory) {
      setSelectedCategory(urlCategory);
    }
  }

  const categories = [
    { id: 'all' as CategoryId, label: 'Todos los Productos', icon: '✦' },
    { id: 'fashion' as CategoryId, label: 'Ropa', icon: '✦' },
    { id: 'sneakers' as CategoryId, label: 'Sneakers', icon: '✦' },
    { id: 'cases' as CategoryId, label: 'Fundas para iPhone', icon: '✦' },
    { id: 'fragrance' as CategoryId, label: 'Perfumes', icon: '✦' },
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesSubtitle = product.subtitle.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesCat = product.categoryLabel.toLowerCase().includes(q);
        if (!matchesName && !matchesSubtitle && !matchesDesc && !matchesCat) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      const priceA = a.price || a.priceUSD || 0;
      const priceB = b.price || b.priceUSD || 0;

      if (sortBy === 'price-asc') return priceA - priceB;
      if (sortBy === 'price-desc') return priceB - priceA;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, sortBy]);

  const hasActiveFilters = selectedCategory !== 'all' || searchQuery.trim() !== '';

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="border-b border-white/10 pb-8 mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-[#CBD5E1] uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>PARAGUAY &bull; CATÁLOGO COMPLETO</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight">
              Tienda // <span className="text-chrome">Colección RAYN</span>
            </h1>
            <p className="text-sm sm:text-base text-[#A1A1AA] mt-2 font-light max-w-xl">
              Explora nuestra selección exclusiva de ropa streetwear, sneakers auténticos, fundas para iPhone, perfumes árabes y de nicho. Envíos asegurados a todo Paraguay.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:hidden flex items-center justify-between gap-4 bg-[#0E0E12] p-3 rounded-sm border border-white/10">
          <button
            type="button"
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="flex items-center gap-2 text-xs font-mono font-bold text-white uppercase"
          >
            <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
            <span>Categorías</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            )}
          </button>

          <span className="text-xs font-mono text-[#A1A1AA]">
            {filteredProducts.length} piezas
          </span>
        </div>

        <aside
          className={`lg:col-span-3 space-y-6 lg:sticky lg:top-24 ${isMobileFilterOpen ? 'block' : 'hidden lg:block'
            }`}
        >
          <div className="p-5 bg-[#0E0E12] border border-white/10 rounded-sm space-y-3">
            <label htmlFor="catalog-search" className="block text-xs font-bold font-mono text-white uppercase tracking-wider">
              Buscar en Catálogo
            </label>
            <div className="relative">
              <input
                id="catalog-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Jeans, sneakers, funda, oud..."
                className="w-full bg-[#14141A] border border-white/15 focus:border-white/50 text-xs text-white placeholder-[#71717A] rounded-sm py-2.5 pl-8 pr-8 font-sans focus:outline-none transition-colors"
              />
              <Search className="w-3.5 h-3.5 text-[#71717A] absolute left-2.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#71717A] hover:text-white"
                  aria-label="Borrar búsqueda"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          <div className="p-5 bg-[#0E0E12] border border-white/10 rounded-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono text-white uppercase tracking-wider">
                Categoría
              </span>
              <span className="text-[10px] font-mono text-[#71717A]">
                {selectedCategory === 'all' ? 'Todas' : selectedCategory}
              </span>
            </div>

            <div className="space-y-1 pt-1">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                const count = cat.id === 'all'
                  ? PRODUCTS.length
                  : PRODUCTS.filter((p) => p.category === cat.id).length;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-sm text-xs font-mono transition-all text-left ${isSelected
                        ? 'bg-white text-black font-bold shadow-sm'
                        : 'text-[#A1A1AA] hover:text-white hover:bg-white/5'
                      }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-xs">{cat.icon}</span>
                      <span>{cat.label}</span>
                    </span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${isSelected ? 'bg-black text-white' : 'bg-white/5 text-[#71717A]'
                        }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="w-full py-2.5 px-4 bg-transparent hover:bg-white/5 border border-white/20 hover:border-white/40 text-xs font-mono text-[#A1A1AA] hover:text-white rounded-sm flex items-center justify-center gap-2 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restablecer Filtros</span>
            </button>
          )}

          <div className="p-4 bg-[#0A0A0D] border border-emerald-500/20 rounded-sm space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Asesoría Personalizada</span>
            </div>
            <p className="text-[11px] text-[#A1A1AA] font-light leading-relaxed">
              ¿Buscando un modelo o fragancia específica? Consulta con nosotros directamente por WhatsApp.
            </p>
            <a
              href="https://wa.me/595986454492?text=Hola%20RAYN!%20Deseo%20consultar%20por%20un%20producto%20del%20cat%C3%A1logo."
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-[10px] font-bold uppercase rounded-sm transition-colors mt-2"
            >
              Contactar por WhatsApp (+595 986 454492)
            </a>
          </div>
        </aside>

        <main className="lg:col-span-9 space-y-6">
          <div className="p-4 bg-[#0E0E12] border border-white/10 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-[#71717A] uppercase">Filtros:</span>

              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/10 border border-white/15 rounded-sm text-[11px] font-mono text-white">
                <Tag className="w-3 h-3 text-emerald-400" />
                <span>
                  {categories.find((c) => c.id === selectedCategory)?.label || 'Todos'}
                </span>
                {selectedCategory !== 'all' && (
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('all')}
                    className="hover:text-red-400 ml-1"
                    aria-label="Quitar filtro de categoría"
                  >
                    ×
                  </button>
                )}
              </span>

              {searchQuery && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/10 border border-white/15 rounded-sm text-[11px] font-mono text-white">
                  <span>&ldquo;{searchQuery}&rdquo;</span>
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="hover:text-red-400 ml-1"
                    aria-label="Quitar búsqueda"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-20 px-4 text-center bg-[#0E0E12] border border-white/10 rounded-sm space-y-4">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/15 flex items-center justify-center mx-auto text-[#71717A]">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                No se encontraron productos
              </h3>
              <p className="text-xs text-[#A1A1AA] max-w-sm mx-auto font-light leading-relaxed">
                No hay coincidencias para la búsqueda seleccionada. Intenta con otra categoría o restablece los filtros.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="py-2.5 px-5 bg-white text-black font-mono text-xs font-bold uppercase rounded-sm hover:bg-[#E2E8F0] transition-colors inline-flex items-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Ver Todos los Productos</span>
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
