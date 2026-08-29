import { Suspense } from 'react';
import { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { CatalogView } from '@/components/CatalogView';
import { Footer } from '@/components/Footer';
import { ProductQuickViewModal } from '@/components/ProductQuickViewModal';
import { CartDrawer } from '@/components/CartDrawer';
import { ToastContainer } from '@/components/ToastContainer';

export const metadata: Metadata = {
  title: 'Tienda & Catálogo // RAYN',
  description:
    'Explora el catálogo completo de RAYN: ropa streetwear, sneakers de colección, fundas para iPhone, perfumes árabes y de nicho. Envíos asegurados a todo Paraguay.',
};

export default function TiendaPage() {
  return (
    <div className="min-h-screen bg-[#070708] text-[#F1F1F3] flex flex-col relative selection:bg-white selection:text-black">
      <Navbar />

      <main className="flex-1">
        <Suspense
          fallback={
            <div className="min-h-[60vh] flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <span className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                <span className="text-xs font-mono tracking-widest text-[#71717A] uppercase">
                  Cargando Catálogo RAYN...
                </span>
              </div>
            </div>
          }
        >
          <CatalogView />
        </Suspense>
      </main>

      <Footer />

      {/* Floating Drawers & Modals */}
      <ProductQuickViewModal />
      <CartDrawer />
      <ToastContainer />
    </div>
  );
}
