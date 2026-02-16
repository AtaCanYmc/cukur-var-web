import { create } from 'zustand';

export type UploadStep = 'CAMERA' | 'PREVIEW' | 'FORM' | 'UPLOADING' | 'SUCCESS';

interface IUploadState {
    currentStep: UploadStep;
    image: string | null; // Base64
    description: string;
    category: string;

    setStep: (step: UploadStep) => void;
    setImage: (image: string | null) => void;
    setDetails: (category: string, description: string) => void;
    resetUpload: () => void;
}

export const useUploadStore = create<IUploadState>((set) => ({
    currentStep: 'CAMERA',
    image: null,
    description: '',
    category: '',

    setStep: (step) => set({ currentStep: step }),
    setImage: (image) => set({ image }),
    setDetails: (category, description) => set({ category, description }),
    resetUpload: () => set({
        currentStep: 'CAMERA',
        image: null,
        description: '',
        category: ''
    }),
}));