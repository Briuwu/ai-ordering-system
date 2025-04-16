import { createStore } from "zustand/vanilla";

export type CartState = {
  items: { name: string; price: number; quantity: number }[];
};

export type CartActions = {
  addToCart: (item: { name: string; price: number; quantity: number }) => void;
  removeFromCart: (name: string) => void;
  clearCart: () => void;
  handleQuantityChange: (name: string, quantity: number) => void;
};

export type CartStore = CartState & CartActions;

export const defaultInitState: CartState = {
  items: [],
};

export const createCartStore = (initState: CartState = defaultInitState) => {
  return createStore<CartStore>()((set) => ({
    ...initState,
    addToCart: (item) =>
      set((state) => ({ items: [...state.items, { ...item, quantity: 1 }] })),
    removeFromCart: (name) =>
      set((state) => ({
        items: state.items.filter((item) => item.name !== name),
      })),
    clearCart: () => set(() => ({ items: [] })),
    handleQuantityChange: (name, quantity) =>
      set((state) => {
        const items = state.items.map((item) => {
          if (item.name === name) {
            return { ...item, quantity };
          }
          return item;
        });
        return { items };
      }),
  }));
};
