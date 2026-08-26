import { Product } from '@/types';

export const CURRENCY_RATES = {
  USD: { symbol: '$', rate: 1, label: 'USD ($)' },
  EUR: { symbol: '€', rate: 0.92, label: 'EUR (€)' },
  COP: { symbol: '$', rate: 4150, label: 'COP ($)' },
  MXN: { symbol: '$', rate: 18.5, label: 'MXN ($)' },
};

export const PRODUCTS: Product[] = [
  {
    id: 'rayn-sneaker-01',
    name: 'SILVER-LINE RUNNER V1',
    subtitle: 'Sneaker Arquitectónico en Piel & Cromo',
    category: 'sneakers',
    categoryLabel: 'Sneakers',
    priceUSD: 240,
    originalPriceUSD: 280,
    tag: 'SIGNATURE DROP',
    isNew: true,
    featured: true,
    image: '/images/sneaker.jpg',
    description:
      'Silueta de ingeniería urbana esculpida en piel italiana matte profunda con inserciones de aleación de cromo pulido y suela geométrica amortiguada. Una declaración de presencia en cada paso.',
    editorialNote:
      'Diseñada como una pieza de arquitectura portátil. El balance perfecto entre robustez urbana y elegancia minimalista.',
    specs: [
      { label: 'Material', value: 'Piel Nappa italiana + TPU metalizado líquido' },
      { label: 'Suela', value: 'Geometría multi-densidad con placa de tracción' },
      { label: 'Cierre', value: 'Cordones técnicos encerados con herrajes RN' },
      { label: 'Ajuste', value: 'Unisex contemporáneo / Calce fiel a la talla' },
      { label: 'Edición', value: 'Serie limitada de 150 pares numerados' },
    ],
    optionsLabel: 'Talla (EU)',
    options: ['39 EU', '40 EU', '41 EU', '42 EU', '43 EU', '44 EU', '45 EU'],
    inStock: true,
  },
  {
    id: 'rayn-fragrance-01',
    name: 'NOCTURNE METALLIQUE',
    subtitle: 'Extrait de Parfum / 100ml',
    category: 'fragrance',
    categoryLabel: 'Fragrance',
    priceUSD: 165,
    tag: 'LIMITED EDITION',
    isNew: true,
    featured: true,
    image: '/images/fragrance.jpg',
    description:
      'Una fragancia magnética con presencia inolvidable. Notas oscuras de cuero negro, cardamomo ahumado y ámbar mineral, selladas con una salida de pimienta plateada y madera de cedro blanco.',
    editorialNote:
      'Frasco de cristal ahumado de alta densidad con tapón esculpido en aleación de plata líquida pulida con monograma RN grabado a láser.',
    specs: [
      { label: 'Concentración', value: 'Extrait de Parfum (30% aceite puro)' },
      { label: 'Notas de Salida', value: 'Pimienta Plateada, Bergamota Fría, Enebro' },
      { label: 'Notas de Corazón', value: 'Cuero Ahumado, Iris Negro, Cardamomo' },
      { label: 'Notas de Fondo', value: 'Ámbar Mineral, Cedro Blanco, Vetiver' },
      { label: 'Longevidad', value: '14+ horas en piel con estela envolvente' },
    ],
    optionsLabel: 'Presentación',
    options: ['50ml Extrait ($120)', '100ml Extrait ($165)', '100ml + Discovery Travel Set ($195)'],
    inStock: true,
  },
  {
    id: 'rayn-fashion-01',
    name: 'HEAVY WASH BOMBER RN-01',
    subtitle: 'Chaqueta Técnica Oversized con Herrajes de Plata',
    category: 'fashion',
    categoryLabel: 'Fashion',
    priceUSD: 290,
    originalPriceUSD: 330,
    tag: 'DROP 01',
    isNew: true,
    featured: true,
    image: '/images/fashion.jpg',
    description:
      'Chaqueta bomber estructurada confeccionada en algodón lavado pesado (540 GSM) con tratamiento mineral desgastado. Cremalleras bidireccionales en acabado cromo satinado y parche sutil RN en manga.',
    editorialNote:
      'Corte unisex estructurado que mantiene la silueta limpia sin perder volumen. Desarrollada para durar décadas y envejecer con carácter.',
    specs: [
      { label: 'Composición', value: '100% Algodón Pesado 540 GSM mineral wash' },
      { label: 'Forro', value: 'Satén térmico acolchado en patrón geométrico' },
      { label: 'Herrajes', value: 'Cremalleras de metal macizo con tiradores RN' },
      { label: 'Fit', value: 'Boxy / Oversized moderno' },
      { label: 'Cuidado', value: 'Lavado en seco o ciclo frío delicado' },
    ],
    optionsLabel: 'Talla',
    options: ['Size 1 (S - M)', 'Size 2 (L - XL)', 'Size 3 (Oversized XXL)'],
    inStock: true,
  },
  {
    id: 'rayn-beauty-01',
    name: 'LUMINA SERUM & ESSENCE DUO',
    subtitle: 'Tratamiento Restaurador Unisex en Cristal Mate & Aluminio',
    category: 'beauty',
    categoryLabel: 'Beauty & Care',
    priceUSD: 110,
    tag: 'ICONIC RITUAL',
    isNew: true,
    featured: true,
    image: '/images/beauty.jpg',
    description:
      'El ritual diario que redefine el cuidado personal. Sérum antioxidante con péptidos bio-idénticos y crema regeneradora con ácido hialurónico multi-peso en frascos de cristal negro mate y aluminio cepillado.',
    editorialNote:
      'Formulado sin fragancias añadidas ni sulfatos. Una experiencia táctil y visual sofisticada concebida para todo tipo de piel.',
    specs: [
      { label: 'Activos Clave', value: 'Complejo de 5 Péptidos, Niacinamida al 6%, Escualano' },
      { label: 'Contenido', value: 'Sérum 30ml con gotero de precisión + Crema 50ml' },
      { label: 'Textura', value: 'Fluido sedoso de rápida absorción con acabado mate natural' },
      { label: 'Packaging', value: 'Vidrio reciclable tratado UV con tapas de aluminio macizo' },
      { label: 'Certificación', value: 'Cruelty-free, vegano y dermatológicamente probado' },
    ],
    optionsLabel: 'Selección',
    options: ['Duo Completo (Serum 30ml + Cream 50ml)', 'Solo Lumina Serum 30ml ($65)', 'Solo Essence Cream 50ml ($58)'],
    inStock: true,
  },
  {
    id: 'rayn-fashion-02',
    name: 'STRUCTURAL OVERCOAT // CHARCOAL',
    subtitle: 'Abrigo Sastrería Contemporánea en Lana Virgen',
    category: 'fashion',
    categoryLabel: 'Fashion',
    priceUSD: 380,
    tag: 'EXCLUSIVE PIECE',
    isNew: true,
    featured: false,
    image: '/images/campaign.jpg',
    description:
      'Abrigo de corte recto y solapas arquitectónicas en mezcla de lana virgen y cachemira color carbón. Hombros definidos con sutileza y forro de seda interior con monograma plata RN.',
    editorialNote:
      'La pieza definitiva del vestuario de transición. Eleva cualquier look diario a una composición editorial de alta pasarela.',
    specs: [
      { label: 'Composición', value: '80% Lana Virgen, 20% Cachemira reciclada' },
      { label: 'Botones', value: 'Cuerno natural con grabado interior discreto' },
      { label: 'Bolsillos', value: 'Bolsillos laterales profundos + 2 interiores de seguridad' },
      { label: 'Silueta', value: 'Straight Tailored / Caída pesada impecable' },
    ],
    optionsLabel: 'Talla',
    options: ['S (46)', 'M (48)', 'L (50)', 'XL (52)'],
    inStock: true,
  },
  {
    id: 'rayn-sneaker-02',
    name: 'CHROME MONOLITH LOW',
    subtitle: 'Calzado Minimalista de Lujo en Cuero Graneado',
    category: 'sneakers',
    categoryLabel: 'Sneakers',
    priceUSD: 215,
    tag: 'LIMITED DROP',
    isNew: false,
    featured: false,
    image: '/images/sneaker.jpg',
    description:
      'La reinterpretación del clásico sneaker bajo urbano. Piel de becerro graneada color negro azabache combinada con placa metálica plateada posterior y plantilla ortopédica de memoria.',
    editorialNote:
      'El calzado diario más versátil de RAYN: combina con sastrería relajada, denim lavado o joggers técnicos.',
    specs: [
      { label: 'Exterior', value: '100% Cuero de becerro graneado seleccionado' },
      { label: 'Interior', value: 'Forro de cuero suave transpirable' },
      { label: 'Detalle', value: 'Placa RN en talón en acabado plata cepillada' },
    ],
    optionsLabel: 'Talla (EU)',
    options: ['40 EU', '41 EU', '42 EU', '43 EU', '44 EU'],
    inStock: true,
  },
];

export const EDITORIAL_PILLARS = [
  {
    number: '01',
    title: 'LUJO ACCESIBLE',
    badge: 'ACCESSIBLE LUXURY',
    desc: 'Materiales nobles, patrones de sastrería e ingeniería de calzado premium a un valor honesto y alcanzable.',
  },
  {
    number: '02',
    title: 'MODA URBANA',
    badge: 'STREET MATRIX',
    desc: 'Siluetas contemporáneas concebidas para la ciudad: con presencia, movimiento y autenticidad.',
  },
  {
    number: '03',
    title: 'MINIMALISMO',
    badge: 'PURE FORM',
    desc: 'Espacios limpios, paleta cromática disciplinada (negro, plata, gris) y cero ruido visual innecesario.',
  },
  {
    number: '04',
    title: 'PERSONALIDAD',
    badge: 'UNISEX SOUL',
    desc: 'Fino, pero con fuerza. Creaciones unisex con carácter que pertenecen a un mismo e inconfundible universo.',
  },
];

export const CATEGORIES_CONFIG = [
  { id: 'all', label: 'Universo Completo', count: '6 Piezas' },
  { id: 'fashion', label: 'Fashion & Tailoring', count: '2 Drops' },
  { id: 'sneakers', label: 'Sneakers Arquitectura', count: '2 Siluetas' },
  { id: 'fragrance', label: 'Fragrance & Extractos', count: '1 Extrait' },
  { id: 'beauty', label: 'Beauty & Skincare', count: '1 Ritual' },
] as const;
