export type CategoryId = 'all' | 'fashion' | 'sneakers' | 'fragrance' | 'beauty';

export type CurrencyCode = 'USD' | 'EUR' | 'COP' | 'MXN';

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'fashion' | 'sneakers' | 'fragrance' | 'beauty';
  categoryLabel: string;
  priceUSD: number;
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
  priceUSD: number;
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
