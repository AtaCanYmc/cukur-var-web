import React from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {Map, BarChart2, Camera} from 'lucide-react';
import {ROUTES} from "../../routes/paths..ts";
import {ActionButton} from "../button/actionButton/ActionButton.tsx";

// NavItem için basit bir yardımcı bileşen (Internal)
const NavItem = ({icon: Icon, active, onClick, label}: any) => {
    return (
        <button
            onClick={onClick}
            className={`flex flex-col items-center justify-center transition-all duration-300 ${
                active ? 'text-orange-500 scale-110' : 'text-slate-500'
            }`}
        >
            <Icon size={24} strokeWidth={active ? 2.5 : 2}/>
            <span
                className={`text-[9px] font-black mt-1 uppercase tracking-tighter ${active ? 'opacity-100' : 'opacity-0'}`}>
          {label}
        </span>
        </button>
    );
};

export const BottomNav: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Mevcut yolu takip eder

    const handleReportClick = () => {
        // Mobil cihazlarda hafif bir titreşim (Haptic Feedback)
        if ('vibrate' in navigator) {
            navigator.vibrate(50);
        }

        // Raporlama sayfasına yönlendir
        navigate(ROUTES.REPORT);
    };

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[400px] z-50">
            <div
                className="flex items-center justify-between px-8 py-3 bg-slate-900/90 backdrop-blur-xl border border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-[32px]">

                {/* Harita Sekmesi */}
                <NavItem
                    icon={Map}
                    label="Harita"
                    active={location.pathname === ROUTES.HOME}
                    onClick={() => navigate(ROUTES.HOME)}
                />

                {/* ANA BUTON: Bildir */}
                <div className="absolute left-1/2 -translate-x-1/2 -top-6">
                    <ActionButton
                        onClick={handleReportClick}
                        icon={Camera}
                        // Burada ActionButton'ın içindeki label'ı "BİLDİR" olarak varsayıyoruz
                    />
                </div>

                <div className="w-8"/>
                {/* Orta boşluk için spacer */}

                {/* Hakkında/İstatistik Sekmesi */}
                <NavItem
                    icon={BarChart2}
                    label="İstatistik"
                    active={location.pathname === ROUTES.STATS}
                    onClick={() => navigate(ROUTES.STATS)}
                />

            </div>
        </div>
    );
};