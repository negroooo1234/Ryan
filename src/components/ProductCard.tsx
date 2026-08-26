'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/types';
import { useStore } from '@/store/useStore';
import { Heart, Eye, ShoppingBag, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const {
    formatPrice,
    addToCart,
    openQuickView,
    toggleWishlist,
    isInWishlist,
  } = useStore();

  const [selectedOption, setSelectedOption] = useState<string>(product.options[0] || '');
  const [isAdded, setIsAdded] = useState(false);
  const isFavorite = isInWishlist(product.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedOption, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  return (
    <article
      onClick={() => openQuickView(product)}
      className="group relative bg-[#0E0E12] border border-white/10 hover:border-white/35 rounded-sm overflow-hidden flex flex-col justify-between transition-all duration-300 cursor-pointer shadow-[0_4px_24px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.7)]"
    >
      {/* Top Image Container */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#141418]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Gradient Overlay for subtle depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E12] via-transparent to-black/20 opacity-80" />

        {/* Top Badges & Actions */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-auto">
          {product.tag ? (
            <span className="px-2.5 py-1 text-[9px] font-mono font-bold tracking-[0.2em] uppercase bg-black/70 backdrop-blur-md border border-white/20 text-[#E2E8F0] rounded-sm">
              {product.tag}
            </span>
          ) : (
            <span className="px-2 py-0.5 text-[9px] font-mono tracking-widest uppercase text-[#A1A1AA]">
              {product.categoryLabel}
            </span>
          )}

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleWishlist(product.id);
              }}
              className={`p-2 rounded-full backdrop-blur-md transition-all duration-200 ${isFavorite
                  ? 'bg-white text-black shadow-lg shadow-white/20'
                  : 'bg-black/50 text-[#A1A1AA] hover:text-white hover:bg-black/80 border border-white/10'
                }`}
              aria-label={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
            >
              <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-black' : ''}`} />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                openQuickView(product);
              }}
              className="p-2 rounded-full bg-black/50 text-[#A1A1AA] hover:text-white hover:bg-black/80 border border-white/10 backdrop-blur-md transition-all"
              aria-label="Vista rápida"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Category pill on image bottom */}
        <div className="absolute bottom-2.5 left-3">
          <span className="text-[10px] font-mono tracking-widest text-[#94A3B8] uppercase">
            // {product.categoryLabel}
          </span>
        </div>
      </div>

      {/* Card Info & Actions */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-[#E2E8F0] transition-colors">
              {product.name}
            </h3>
          </div>

          <p className="text-xs text-[#A1A1AA] mt-1 line-clamp-1 font-light">
            {product.subtitle}
          </p>

          <div className="mt-3 flex items-baseline gap-2.5">
            <span className="text-lg font-bold font-mono text-white">
              {formatPrice(product.priceUSD)}
            </span>
            {product.originalPriceUSD && (
              <span className="text-xs font-mono text-[#71717A] line-through">
                {formatPrice(product.originalPriceUSD)}
              </span>
            )}
          </div>
        </div>

        {/* Options & Quick Add */}
        <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
          {/* Quick Option Selector */}
          <div className="flex items-center justify-between gap-2" onClick={(e) => e.stopPropagation()}>
            <span className="text-[10px] font-mono text-[#71717A] uppercase tracking-wider">
              {product.optionsLabel}:
            </span>
            <div className="flex flex-wrap gap-1">
              {product.options.slice(0, 3).map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setSelectedOption(opt)}
                  className={`px-2 py-0.5 text-[10px] font-mono rounded-sm transition-all ${selectedOption === opt
                      ? 'bg-white text-black font-bold'
                      : 'bg-white/5 text-[#A1A1AA] hover:text-white border border-white/10'
                    }`}
                >
                  {opt.split(' ')[0]}
                </button>
              ))}
              {product.options.length > 3 && (
                <span className="text-[10px] font-mono text-[#71717A] self-center">
                  +{product.options.length - 3}
                </span>
              )}
            </div>
          </div>

          {/* Action Button */}
          <button
            type="button"
            onClick={handleAdd}
            className={`w-full py-2.5 px-3 rounded-sm flex items-center justify-center gap-2 text-xs font-mono font-bold tracking-wider uppercase transition-all duration-200 ${isAdded
                ? 'bg-emerald-500 text-black'
                : 'bg-white/5 hover:bg-white text-white hover:text-black border border-white/15 hover:border-white'
              }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>AGREGADO A LA BOLSA</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>AÑADIR A LA BOLSA</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
