import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { UniverseShowcase } from '@/components/UniverseShowcase';
import { EditorialLookbook } from '@/components/EditorialLookbook';
import { BrandManifesto } from '@/components/BrandManifesto';
import { Footer } from '@/components/Footer';
import { ProductQuickViewModal } from '@/components/ProductQuickViewModal';
import { CartDrawer } from '@/components/CartDrawer';
import { ToastContainer } from '@/components/ToastContainer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#070708] text-[#F1F1F3] flex flex-col relative selection:bg-white selection:text-black">
      <Navbar />

      <main className="flex-1">
        <Hero />
        <UniverseShowcase />
        <EditorialLookbook />
        <BrandManifesto />
      </main>

      <Footer />

      <ProductQuickViewModal />
      <CartDrawer />
      <ToastContainer />
    </div>
  );
}
