import Link from 'next/link';
import { ArrowDownRight, ArrowRight } from 'lucide-react';
import { ChosoAsciiCanvas } from './ChosoAsciiCanvas';
import { chosoSourceUrl } from '@/lib/imageUrl';

const HERO_BACKGROUND = '/ascii-background.png';

export function Hero() {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-end lg:justify-center overflow-hidden border-b border-white/10 bg-ink">
      <link
        rel="preload"
        as="image"
        href={chosoSourceUrl(HERO_BACKGROUND)}
        fetchPriority="high"
      />

      <div className="absolute inset-0 z-0 overflow-hidden">
        <ChosoAsciiCanvas
          imageSrc={HERO_BACKGROUND}
          className="w-full h-full"
        />
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/60 via-45% to-transparent pointer-events-none" />
        <div className="lg:hidden absolute inset-0 bg-gradient-to-t from-ink via-ink/85 via-42% to-transparent pointer-events-none" />
        <div className="lg:hidden absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-ink/20 to-transparent pointer-events-none" />
        <div className="hidden lg:block absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(7,7,8,0.75)_100%)] pointer-events-none" />
        <div className="lg:hidden absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_75%,rgba(7,7,8,0.2)_100%)] pointer-events-none" />
      </div>

      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.06),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.04),transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8 sm:pb-12 lg:py-12 flex-1 flex flex-col justify-end lg:justify-center w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end lg:items-center">
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            <h1 className="lg:-ml-[0.5rem] text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem] font-black uppercase tracking-[-0.04em] leading-[0.88] text-white select-none flex items-baseline">
              <span className="text-chrome">RA  </span>
              <span className="text-white">YN</span>
            </h1>

            <div className="text-xs sm:text-sm font-mono tracking-[0.2em] text-[#94A3B8] uppercase">
              <span className="text-white font-bold">Tu estilo, en un solo lugar</span>
            </div>

            <p className="text-sm sm:text-base lg:text-lg text-silver font-light leading-relaxed max-w-xl text-pretty">
              Ropa, Sneakers, Fundas para iPhone, Perfumes Árabes y de Nicho. Envios asegurados a todo el territorio paraguayo 🇵🇾.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link
                href="#coleccion"
                className="btn-rayn-primary px-7 py-3.5 sm:py-4 min-h-11 sm:min-h-12 flex items-center justify-center gap-3"
              >
                <span>Explorar Selección</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="#lookbook"
                className="btn-rayn-outline px-6 py-3.5 sm:py-4 min-h-11 sm:min-h-12 flex items-center justify-center gap-2.5"
              >
                <span>Ver Lookbook Urbano</span>
                <ArrowDownRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
