import {BottomNav} from "./layout/BottomNav.tsx";
import {StatusBadge} from "./components/button/badge/StatusBadgeü.tsx";
import {useDevice} from "./hooks/useDevice.tsx";

function App() {
    const { isMobile, isTouch } = useDevice();

    const handleNewReport = () => {
        console.log("Kamera modülü başlatılıyor...");
        // Burada browser camera API tetiklenecek
    };

    return (
        <div className="relative h-screen w-full bg-slate-100 overflow-hidden select-none">
            {/* Header - Minimalist */}
            <header
                className="absolute top-0 left-0 right-0 p-4 z-10 flex justify-between items-start pointer-events-none">
                <div className="bg-white/90 backdrop-blur shadow-sm p-3 rounded-2xl pointer-events-auto">
                    <h1 className="text-xl font-black text-slate-800 tracking-tight">
                        Çukur<span className="text-orange-600">Var</span>
                    </h1>
                    <p className="text-[10px] text-gray-500 font-bold uppercase">İzmir Canlı Rapor</p>
                </div>

                {/* Quick Stats Overlay */}
                <div className="flex gap-2 pointer-events-auto">
                    <StatusBadge count="124" label="Aktif" variant="warning"/>
                    <StatusBadge count="42" label="Onarıldı" variant="success"/>
                </div>
            </header>

            {/* Map Placeholder - Buraya Mapbox/Leaflet gelecek */}
            <div className="absolute inset-0 bg-slate-200 flex items-center justify-center">
                <div className="text-slate-400 animate-pulse font-medium">
                    Harita Yükleniyor...
                </div>
            </div>

            {/* Floating Action / Navigation */}
            {isMobile && isTouch && <BottomNav onReportClick={handleNewReport}/>}
        </div>
    );
}

export default App
