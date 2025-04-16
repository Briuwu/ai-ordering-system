import { createStore } from "zustand/vanilla";

export type CartState = {
  items: { name: string; price: number; quantity: number; slug: string }[];
  total: number;
};

export type CartActions = {
  addToCart: (item: {
    name: string;
    price: number;
    quantity: number;
    slug: string;
  }) => void;
  removeFromCart: (slug: string) => void;
  clearCart: () => void;
  handleQuantityChange: (slug: string, quantity: number) => void;
  addCartItems: (
    items: {
      name: string;
      price: number;
      quantity: number;
      slug: string;
    }[],
  ) => void;
  setTotal: (total: number) => void;
};

export type CartStore = CartState & CartActions;

export const defaultInitState: CartState = {
  items: [],
  total: 0,
};

export const createCartStore = (initState: CartState = defaultInitState) => {
  return createStore<CartStore>()((set) => ({
    ...initState,
    addToCart: (item) =>
      set((state) => ({ items: [...state.items, { ...item, quantity: 1 }] })),
    removeFromCart: (slug) =>
      set((state) => ({
        items: state.items.filter((item) => item.slug !== slug),
      })),
    clearCart: () => set(() => ({ items: [] })),
    handleQuantityChange: (slug, quantity) =>
      set((state) => {
        const items = state.items.map((item) => {
          if (item.slug === slug) {
            return { ...item, quantity };
          }
          return item;
        });
        return { items };
      }),
    addCartItems: (items) =>
      set((state) => ({ items: [...state.items, ...items] })),
    setTotal: (total) => set(() => ({ total })),
  }));
};
