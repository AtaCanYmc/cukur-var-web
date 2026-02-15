import { Map, BarChart2, Camera } from 'lucide-react';
import { ActionButton } from "../components/button/ActionButton/ActionButton";
import type {ElementType} from "react";

// Interface tanımlarını Senior seviyesinde, net yapalım
interface INavItemProps {
    icon: ElementType;
    label: string;
    active?: boolean;
    onClick?: () => void;
}

interface IBottomNavProps {
    onReportClick: () => void;
    activeTab?: 'map' | 'stats'; // Aktif sekmeyi yönetmek için
}

// NavItem: Tekrar kullanılabilir küçük atom
const NavItem = ({ icon: Icon, label, active, onClick }: INavItemProps) => (
    <button
        onClick={onClick}
        className={`flex flex-col items-center justify-center flex-1 py-2 transition-colors
                   ${active ? 'text-orange-600' : 'text-gray-400 hover:text-gray-600'}`}
    >
        <Icon className={`w-6 h-6 ${active ? 'stroke-[2.5px]' : 'stroke-[2px]'}`} />
        <span className="text-[10px] mt-1 font-bold tracking-tight">{label}</span>
    </button>
);

export const BottomNav = ({ onReportClick, activeTab = 'map' }: IBottomNavProps) => {
    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md
                        border-t border-gray-100 flex justify-between items-end
                        px-4 z-50 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]
                        pb-[env(safe-area-inset-bottom,1.5rem)] pt-2">

            <NavItem
                icon={Map}
                label="HARİTA"
                active={activeTab === 'map'}
                onClick={() => console.log('Haritaya git')}
            />

            {/* Orta butonun navigasyon elemanlarını ezmemesi için bir kapsayıcı */}
            <div className="flex-1 flex justify-center">
                <ActionButton
                    onClick={onReportClick}
                    icon={Camera}
                    label="BİLDİR"
                />
            </div>

            <NavItem
                icon={BarChart2}
                label="İSTATİSTİK"
                active={activeTab === 'stats'}
                onClick={() => console.log('İstatistiklere git')}
            />
        </nav>
    );
};