import React from 'react';
import { useUIStore } from '../../store/useUIStore';

export const GlobalLoader: React.FC = () => {
    const { isLoading, loadingMessage } = useUIStore();

    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-900/60 backdrop-blur-md">
            <div className="relative">
                {/* Dış halka animasyonu */}
                <div className="w-16 h-16 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin" />

                {/* İçerideki logo veya ikon (Sabit) */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.8)]" />
                </div>
            </div>

            {loadingMessage && (
                <p className="mt-4 text-white text-xs font-black uppercase tracking-[0.3em] animate-pulse">
                    {loadingMessage}
                </p>
            )}
        </div>
    );
};