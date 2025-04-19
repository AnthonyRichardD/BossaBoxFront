import { create } from "zustand";

type ErrorState = {
  error: string | null;
  showError: (message: string) => void;
  clearError: () => void;
};

export const useErrorStore = create<ErrorState>((set) => ({
  error: null,
  showError: (message) => {
    set({ error: message });
  },
  clearError: () => set({ error: null }),
}));
