export type CategoryId = 'all' | 'fashion' | 'sneakers' | 'cases' | 'fragrance' | 'beauty';

export type CurrencyCode = 'PYG';

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'fashion' | 'sneakers' | 'cases' | 'fragrance' | 'beauty';
  categoryLabel: string;
  price: number; // Precio en Guaraníes (PYG ₲)
  originalPrice?: number;
  priceUSD?: number; // legacy alias
  originalPriceUSD?: number;
  tag?: string; // 'DROP 01' | 'LIMITED EDITION' | 'SIGNATURE' | 'ICONIC'
  isNew?: boolean;
  image: string;
  secondaryImage?: string;
  description: string;
  editorialNote: string;
  specs: {
    label: string;
    value: string;
  }[];
  optionsLabel: string; // 'Talla', 'Volumen', 'Presentación'
  options: string[];
  inStock: boolean;
  featured?: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  category: string;
  price: number; // Precio en Guaraníes
  priceUSD?: number; // legacy alias
  image: string;
  selectedOption: string;
  quantity: number;
}

export interface LookHotspot {
  id: string;
  top: string;
  left: string;
  product: Product;
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'info' | 'cart';
}
