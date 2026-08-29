'use client';

import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { Mail, ArrowRight, Check, MessageSquare, Sparkles } from 'lucide-react';

export function VIPAccessSection() {
  const { addToast } = useStore();
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrPhone.trim()) return;

    setIsSubscribed(true);
    addToast(
      'Acceso VIP Confirmado',
      'Recibirás notificación prioritaria antes del lanzamiento de cada Drop.',
      'success'
    );
    setEmailOrPhone('');
    setTimeout(() => setIsSubscribed(false), 5000);
  };

  const handleWhatsAppVIP = () => {
    const text = encodeURIComponent(
      'Hola RAYN Studio, deseo unirme al Club VIP y recibir invitaciones privadas para los próximos Drops.'
    );
    window.open(`https://wa.me/595986454492?text=${text}`, '_blank');
  };

  return (
    <section className="py-20 bg-gradient-to-b from-[#070708] via-[#0E0E12] to-[#070708] border-t border-white/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-white/5 text-xs font-mono tracking-[0.25em] text-[#CBD5E1] uppercase">
          <Sparkles className="w-3 h-3 text-white" />
          <span>CLUB PRIVÉ // ACCESO PRIORITARIO</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
          Sé el primero en acceder <br />
          <span className="text-chrome">a los próximos Drops</span>
        </h2>

        <p className="text-sm sm:text-base text-[#A1A1AA] max-w-xl mx-auto font-light leading-relaxed">
          Nuestras piezas se producen en tiradas cortas y numeradas para garantizar exclusividad. Ingresa tu contacto o comunícate directamente con nuestro Concierge para reservar lanzamientos.
        </p>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Mail className="w-4 h-4 text-[#71717A] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              placeholder="Email o WhatsApp..."
              required
              className="w-full bg-[#121216] border border-white/15 text-white pl-10 pr-4 py-3.5 text-xs font-mono placeholder-[#71717A] rounded-sm focus:outline-none focus:border-white transition-colors"
            />
          </div>

          <button
            type="submit"
            className="btn-rayn-primary px-6 py-3.5 flex items-center justify-center gap-2 rounded-sm whitespace-nowrap"
          >
            {isSubscribed ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span>REGISTRADO</span>
              </>
            ) : (
              <>
                <span>OBTENER ACCESO</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        {/* WhatsApp Direct Option */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleWhatsAppVIP}
            className="inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-[#A1A1AA] hover:text-white transition-colors border-b border-dashed border-white/30 pb-0.5"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
            <span>O CONECTA DIRECTAMENTE POR WHATSAPP CONCIERGE</span>
          </button>
        </div>
      </div>
    </section>
  );
}
