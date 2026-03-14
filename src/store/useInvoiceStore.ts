import { create } from "zustand";

export type Item = {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  price: number;
  total: number;
};

type InvoiceStore = {
  items: Item[];
  addItem: (item: Item) => void;
  editItem: (updatedItem: Item) => void; 
  deleteItem: (id:number) => void;
  clearItems: (id: Item) => void;
};

export const useInvoiceStore = create<InvoiceStore>((set) => ({
  items: [],

  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item],
    })),

editItem: (updatedItem) =>
  set((state) => ({
    items: state.items.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    ),
  })),
deleteItem: (id) =>
  set((state) => ({
    items: state.items.filter((item) => item.id !== id),
  })),

  clearItems: () => set({ items: [] }),
}));
