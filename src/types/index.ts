export type CategoryId = 'all' | 'fashion' | 'sneakers' | 'cases' | 'fragrance' | 'beauty';

export type CurrencyCode = 'PYG';

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'fashion' | 'sneakers' | 'cases' | 'fragrance' | 'beauty';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  priceUSD?: number;
  originalPriceUSD?: number;
  tag?: string;
  isNew?: boolean;
  image: string;
  secondaryImage?: string;
  description: string;
  editorialNote: string;
  specs: {
    label: string;
    value: string;
  }[];
  optionsLabel: string;
  options: string[];
  inStock: boolean;
  featured?: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  category: string;
  price: number;
  priceUSD?: number;
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
