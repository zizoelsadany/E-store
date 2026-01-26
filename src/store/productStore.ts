import { create } from 'zustand';

interface ProductStoreState {
  lastUpdated: number;
  triggerRefresh: () => void;
}

export const useProductStore = create<ProductStoreState>((set) => ({
  lastUpdated: 0,
  triggerRefresh: () => {
    set({ lastUpdated: Date.now() });
    console.log('Product store refreshed at:', new Date().toISOString());
  },
}));
