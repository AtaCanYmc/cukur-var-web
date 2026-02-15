import { create } from 'zustand';

type UploadStep = 'PREPARING' | 'BLURRING' | 'UPLOADING' | 'SUCCESS';

interface IUploadState {
    currentStep: UploadStep;
    progress: number;
    setStep: (step: UploadStep) => void;
    setProgress: (progress: number) => void;
    resetUpload: () => void;
}

export const useUploadStore = create<IUploadState>((set) => ({
    currentStep: 'PREPARING',
    progress: 0,
    setStep: (step) => set({ currentStep: step }),
    setProgress: (progress) => set({ progress }),
    resetUpload: () => set({ currentStep: 'PREPARING', progress: 0 }),
}));