'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, CategoryId, CurrencyCode, Product, ToastMessage } from '@/types';
import { CURRENCY, PRODUCTS } from '@/data/products';

interface StoreState {
  // Cart
  cart: CartItem[];
  isCartOpen: boolean;
  addToCart: (product: Product, selectedOption?: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  // Currency
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  formatPrice: (amountUSD: number) => string;

  // Quick View Modal
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Filters
  selectedCategory: CategoryId;
  setSelectedCategory: (cat: CategoryId) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Toasts
  toasts: ToastMessage[];
  addToast: (title: string, description?: string, type?: 'success' | 'info' | 'cart') => void;
  removeToast: (id: string) => void;

  // Lookbook active tab
  activeLookIndex: number;
  setActiveLookIndex: (idx: number) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      cart: [],
      isCartOpen: false,

      addToCart: (product, selectedOption, quantity = 1) => {
        const option = selectedOption || product.options[0] || 'Standard';
        const cartItemId = `${product.id}-${option}`;
        const currentCart = get().cart;
        const existingIndex = currentCart.findIndex((item) => item.id === cartItemId);

        let newCart: CartItem[];
        if (existingIndex > -1) {
          newCart = [...currentCart];
          newCart[existingIndex] = {
            ...newCart[existingIndex],
            quantity: newCart[existingIndex].quantity + quantity,
          };
        } else {
          newCart = [
            ...currentCart,
            {
              id: cartItemId,
              productId: product.id,
              name: product.name,
              category: product.categoryLabel,
              price: product.price || product.priceUSD || 0,
              priceUSD: product.price || product.priceUSD || 0,
              image: product.image,
              selectedOption: option,
              quantity,
            },
          ];
        }

        set({ cart: newCart, isCartOpen: true });
        get().addToast(
          'Pieza agregada a tu selección',
          `${product.name} (${option}) x${quantity}`,
          'cart'
        );
      },

      removeFromCart: (cartItemId) => {
        const item = get().cart.find((i) => i.id === cartItemId);
        set({ cart: get().cart.filter((i) => i.id !== cartItemId) });
        if (item) {
          get().addToast('Eliminado de la bolsa', item.name, 'info');
        }
      },

      updateQuantity: (cartItemId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(cartItemId);
          return;
        }
        set({
          cart: get().cart.map((item) =>
            item.id === cartItemId ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => set({ cart: [] }),
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

      // Currency & Price Formatting (Guaraníes PYG ₲)
      currency: 'PYG',
      setCurrency: (currency) => set({ currency }),
      formatPrice: (amount: number) => {
        const val = Math.round(amount || 0);
        return `₲ ${val.toLocaleString('es-PY')}`;
      },

      // Quick View
      quickViewProduct: null,
      openQuickView: (product) => set({ quickViewProduct: product }),
      closeQuickView: () => set({ quickViewProduct: null }),

      // Wishlist
      wishlist: [],
      toggleWishlist: (productId) => {
        const current = get().wishlist;
        const exists = current.includes(productId);
        const next = exists ? current.filter((id) => id !== productId) : [...current, productId];
        set({ wishlist: next });
        get().addToast(
          exists ? 'Eliminado de deseados' : 'Guardado en tu lista de deseos',
          undefined,
          'info'
        );
      },
      isInWishlist: (productId) => get().wishlist.includes(productId),

      // Filters
      selectedCategory: 'all',
      setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
      searchQuery: '',
      setSearchQuery: (searchQuery) => set({ searchQuery }),

      // Toasts
      toasts: [],
      addToast: (title, description, type = 'info') => {
        const id = Math.random().toString(36).substring(2, 9);
        const newToast: ToastMessage = { id, title, description, type };
        set((state) => ({ toasts: [...state.toasts, newToast] }));
        setTimeout(() => {
          get().removeToast(id);
        }, 4000);
      },
      removeToast: (id) =>
        set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),

      // Lookbook
      activeLookIndex: 0,
      setActiveLookIndex: (activeLookIndex) => set({ activeLookIndex }),
    }),
    {
      name: 'rayn-store-storage',
      partialize: (state) => ({
        cart: state.cart,
        wishlist: state.wishlist,
        currency: state.currency,
      }),
      onRehydrateStorage: () => (state) => {
        if (state && state.cart) {
          state.currency = 'PYG';
          state.cart = state.cart.map((item) => {
            const prod = PRODUCTS.find((p) => p.id === item.productId);
            const correctPrice = prod ? (prod.price || prod.priceUSD || item.price) : item.price;
            return {
              ...item,
              price: correctPrice,
              priceUSD: correctPrice,
            };
          });
        }
      },
    }
  )
);
