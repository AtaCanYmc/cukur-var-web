import { create } from 'zustand';

interface IUIState {
    isLoading: boolean;
    loadingMessage: string | null;
    altLoadingMessage: string | null;
    // Actions
    startLoading: (message?: string) => void;
    stopLoading: () => void;
}

export const useUIStore = create<IUIState>((set) => ({
    isLoading: false,
    loadingMessage: null,
    altLoadingMessage: null,

    startLoading: (message = 'Yükleniyor...', alt = null) =>
        set({ isLoading: true, loadingMessage: message, altLoadingMessage: alt }),

    stopLoading: () =>
        set({ isLoading: false, loadingMessage: null, altLoadingMessage: null }),
}));