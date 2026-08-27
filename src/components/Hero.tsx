'use client';

import Link from 'next/link';
import { ArrowDownRight, ArrowRight } from 'lucide-react';
import { Hero3DCanvas } from './Hero3DCanvas';
import { ChosoAsciiCanvas } from './ChosoAsciiCanvas';

export function Hero() {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden border-b border-white/10 bg-ink">
      {/* Dynamic Background: CHOSO ASCII / Dither Canvas */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <ChosoAsciiCanvas
          imageSrc="/ascii-background.png"
          className="w-full h-full"
        />
        {/* Layered cinematic vignette and dark gradient masks */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/92 via-ink/55 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/45 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(7,7,8,0.75)_100%)] pointer-events-none" />
      </div>

      {/* Ambient lighting */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.06),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.04),transparent_70%)]" />
      </div>

      {/* Columna vertical de margen — solo desktop */}
      <div className="hidden xl:flex absolute left-5 top-0 bottom-0 z-10 flex-col items-center justify-center gap-6 pointer-events-none">
        <span className="w-px flex-1 bg-gradient-to-b from-transparent via-white/12 to-transparent" />
        <span className="mark-reg" aria-hidden="true" />
        <span className="w-px flex-1 bg-gradient-to-b from-transparent via-white/12 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 flex flex-col justify-center w-full">
        {/* Centro: composición editorial asimétrica */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            {/* Titular RAYN */}
            <h1 className="lg:-ml-[0.5rem] text-6xl sm:text-8xl md:text-9xl lg:text-[8.5rem] font-black uppercase tracking-[-0.04em] leading-[0.85] text-white select-none flex items-baseline">
              <span className="text-chrome">RA</span>
              <span className="text-white">YN</span>
            </h1>

            <p className="text-base sm:text-lg text-silver font-light leading-relaxed max-w-xl text-pretty">
              Una estética premium, minimalista y con carácter. Piezas urbanas,
              fragancias de autor, sneakers de arquitectura y belleza unisex dentro
              de un mismo universo.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="#coleccion"
                className="btn-rayn-primary px-7 py-4 min-h-12 flex items-center gap-3"
              >
                <span>Explorar Selección</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="#lookbook"
                className="btn-rayn-outline px-6 py-4 min-h-12 flex items-center gap-2.5"
              >
                <span>Ver Lookbook Urbano</span>
                <ArrowDownRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Hero3DCanvas (Medallón RN 3D) temporalmente oculto a petición del usuario */}
          {/* <div className="lg:col-span-5 flex items-center justify-center lg:justify-end relative lg:translate-x-10 xl:translate-x-30">
            <Hero3DCanvas />
          </div> */}
        </div>
      </div>
    </section>
  );
}
