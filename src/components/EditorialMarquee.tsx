'use client';

export function EditorialMarquee() {
  const words = [
    'RAYN MAISON',
    'LUJO ACCESIBLE',
    'MODA URBANA',
    'SNEAKERS ARQUITECTÓNICOS',
    'EXTRAIT DE PARFUM',
    'FINO CON FUERZA',
    'NEGRO PROFUNDO & PLATA',
    'BEAUTY UNISEX',
    'DROP 01 LIMITADO',
    'DISCIPLINA ESTÉTICA',
  ];

  return (
    <div className="relative py-4 bg-[#0A0A0D] border-b border-white/10 overflow-hidden select-none">
      {/* Side gradients */}
      <div className="absolute left-0 inset-y-0 w-16 bg-gradient-to-r from-[#0A0A0D] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-16 bg-gradient-to-l from-[#0A0A0D] to-transparent z-10 pointer-events-none" />

      <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
        {[...words, ...words].map((phrase, idx) => (
          <div key={idx} className="flex items-center gap-8">
            <span className="text-xs sm:text-sm font-mono tracking-[0.28em] uppercase text-[#A1A1AA] hover:text-white transition-colors cursor-default">
              {phrase}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
          </div>
        ))}
      </div>
    </div>
  );
}
