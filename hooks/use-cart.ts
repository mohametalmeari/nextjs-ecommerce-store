import { Product } from "@/types";
import toast from "react-hot-toast";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CartStore {
  items: { product: Product; amount: number }[];
  addItem: (data: { product: Product; amount: number }) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
  updateAmount: (id: string, amount: number) => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: { product: Product; amount: number }) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(
          (item) => item.product.id === data.product.id
        );

        if (existingItem) {
          return toast("Item already in cart.");
        }

        set({ items: [...get().items, data] });
        toast.success("Item added to cart.");
      },

      removeItem: (id: string) => {
        set({
          items: [...get().items.filter((item) => item.product.id !== id)],
        });
        toast.success("Item removed from cart.");
      },

      removeAll: () => set({ items: [] }),
      updateAmount: (id: string, amount: number) => {
        const currentItems = get().items;
        const item = currentItems.find((item) => item.product.id === id);

        if (item) {
          item.amount = amount;
          set({ items: [...currentItems] });
        }
      },
    }),
    { name: "cart-storage", storage: createJSONStorage(() => localStorage) }
  )
);

export default useCart;
