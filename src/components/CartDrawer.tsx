'use client';

import Image from 'next/image';
import { useStore } from '@/store/useStore';
import { X, Trash2, Plus, Minus, ShoppingBag, MessageSquare } from 'lucide-react';

export function CartDrawer() {
  const cart = useStore((s) => s.cart);
  const isCartOpen = useStore((s) => s.isCartOpen);
  const closeCart = useStore((s) => s.closeCart);
  const removeFromCart = useStore((s) => s.removeFromCart);
  const updateQuantity = useStore((s) => s.updateQuantity);
  const formatPrice = useStore((s) => s.formatPrice);
  const addToast = useStore((s) => s.addToast);

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + (item.price || item.priceUSD || 0) * item.quantity, 0);

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;

    let message = `*SOLICITUD DE PEDIDO // RAYN*\n`;
    message += `📍 _Tu estilo, en un solo lugar — Paraguay_\n`;
    message += `──────────────────────\n`;
    cart.forEach((item, idx) => {
      const itemPrice = item.price || item.priceUSD || 0;
      message += `${idx + 1}. *${item.name}*\n   - Opción/Talla: ${item.selectedOption}\n   - Cantidad: ${item.quantity}\n   - Subtotal: ${formatPrice(itemPrice * item.quantity)}\n\n`;
    });
    message += `──────────────────────\n`;
    message += `*TOTAL:* ${formatPrice(subtotal)}\n`;
    message += `*DESTINO / CIUDAD (PARAGUAY):* [Indicar ciudad]\n`;
    message += `\n_Hola! Deseo confirmar la orden y coordinar el envío de mi selección RAYN._`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/595986454492?text=${encoded}`, '_blank');
    addToast('Redirigiendo a WhatsApp (+595 986 454492)', 'Tu pedido ha sido estructurado con éxito', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-0" onClick={closeCart} aria-hidden="true" />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0D0D10] border-l border-white/15 text-white flex flex-col shadow-2xl">
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-white" />
              <div>
                <h3 className="text-base font-bold uppercase tracking-wider">Tu Bolsa RAYN</h3>
                <span className="text-[10px] font-mono text-[#71717A]">
                  {cart.length} {cart.length === 1 ? 'artículo seleccionado' : 'artículos seleccionados'}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={closeCart}
              className="p-2 text-[#A1A1AA] hover:text-white rounded-full hover:bg-white/5 transition-colors"
              aria-label="Cerrar bolsa"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 rounded-full border border-white/15 bg-white/5 flex items-center justify-center">
                  <ShoppingBag className="w-7 h-7 text-[#71717A]" />
                </div>
                <div>
                  <p className="text-base font-bold text-white">Tu bolsa está vacía</p>
                  <p className="text-xs text-[#71717A] max-w-xs mt-1 font-light">
                    Explora nuestra selección de moda urbana, sneakers y fragancias de autor.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeCart}
                  className="btn-rayn-primary px-6 py-2.5 text-xs font-mono"
                >
                  Explorar Universo
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-[#141418] border border-white/10 rounded-sm flex gap-4 items-center group"
                >
                  <div className="relative w-18 h-18 rounded-sm overflow-hidden bg-black flex-shrink-0 border border-white/10">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="72px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-xs font-bold text-white truncate">{item.name}</h4>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#71717A] hover:text-red-400 p-1 transition-colors"
                        aria-label="Eliminar artículo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[10px] font-mono text-[#A1A1AA] mt-0.5">
                      {item.selectedOption}
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center border border-white/15 rounded-sm bg-white/5">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-white hover:bg-white/10 text-xs font-mono"
                        >
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <span className="px-2 py-0.5 text-[11px] font-mono font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-white hover:bg-white/10 text-xs font-mono"
                        >
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                      </div>

                      <span className="text-xs font-bold font-mono text-white">
                        {formatPrice((item.price || item.priceUSD || 0) * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-[#0A0A0D] space-y-4">
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
                  <span>TOTAL:</span>
                  <span className="text-base font-mono">{formatPrice(subtotal)}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleWhatsAppCheckout}
                  className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold font-mono text-xs tracking-wider uppercase rounded-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Comprar vía WhatsApp Concierge</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
