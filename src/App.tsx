import React from 'react';
import { AppRouter } from './routes';
import { useDevice } from './hooks/useDevice';
import { GlobalLoader } from "./components/loader/GlobalLoader.tsx";
import { ThemeProvider } from './context/ThemeContext';

/**
 * App Component
 * 2026 Modern PWA Standartlarında:
 * - Global State Management (Zustand)
 * - Centralized Routing (React Router)
 * - Device-aware Rendering
 */
const App: React.FC = () => {
    const { isDesktop } = useDevice();

    return (
        <ThemeProvider>
            <div className="antialiased font-sans text-slate-900 bg-slate-900 overflow-hidden h-full">
                {/* 1. Global UI Katmanları (Z-Index: 100+) */}
                <GlobalLoader />

                {/* 2. Masaüstü Kullanıcıları İçin Kısıtlı Deneyim Uyarısı (Opsiyonel) */}
                {isDesktop && (
                    <div className="hidden lg:flex fixed top-0 left-0 w-full bg-orange-600 text-white text-[10px] font-bold py-1 px-4 z-[60] justify-center tracking-widest uppercase">
                        En iyi deneyim için mobil cihazdan giriş yapın.
                    </div>
                )}

                {/* 3. Ana Navigasyon ve Sayfa İçerikleri */}
                <main className="relative h-[100dvh] w-full flex flex-col">
                    <AppRouter />
                </main>
            </div>
        </ThemeProvider>
    );
};

export default App;