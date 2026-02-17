import { create } from 'zustand';

export type UploadStep = 'CAMERA' | 'PREVIEW' | 'LOCATION' | 'FORM' | 'UPLOADING' | 'SUCCESS';

interface IUploadState {
    currentStep: UploadStep;
    image: string | null; // Base64
    description: string;
    category: string;
    location: { lat: number; lng: number } | null;
    userLocation: { lat: number; lng: number } | null;

    setStep: (step: UploadStep) => void;
    setImage: (image: string | null) => void;
    setDetails: (category: string, description: string) => void;
    setLocation: (lat: number, lng: number) => void;
    setUserLocation: (lat: number, lng: number) => void;
    resetUpload: () => void;
}

export const useUploadStore = create<IUploadState>((set) => ({
    currentStep: 'CAMERA',
    image: null,
    description: '',
    category: '',
    location: null,
    userLocation: null,

    setStep: (step) => set({ currentStep: step }),
    setImage: (image) => set({ image }),
    setDetails: (category, description) => set({ category, description }),
    setLocation: (lat, lng) => set({ location: { lat, lng } }),
    setUserLocation: (lat, lng) => set({ userLocation: { lat, lng } }),
    resetUpload: () => set({
        currentStep: 'CAMERA',
        image: null,
        description: '',
        category: '',
        location: null,
        userLocation: null
    }),
}));