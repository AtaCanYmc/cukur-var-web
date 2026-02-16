import { StatusBadge } from "../button/badge/StatusBadgeü.tsx";
import { useTheme } from "../../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

interface IProps {
    activePothole?: number;
    fixedPothole?: number;
    showBadges: boolean;
}

const StickyHeader = (props: IProps) => {
    const { isDark, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(isDark ? 'light' : 'dark');
    };

    return (
        <header
            className="absolute top-5 left-0 right-0 p-5 z-20 flex justify-between items-center pointer-events-none">

            {/* Brand Box - Dark/Light Modern Style */}
            <div
                className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-700/50 p-3 px-4 rounded-[20px] shadow-2xl pointer-events-auto transition-all hover:scale-105 flex items-center justify-between gap-4">
                <div onClick={toggleTheme} className="cursor-pointer">
                    {isDark ? <Sun size={18} className="text-orange-400" /> : <Moon size={18} className="text-slate-600" />}
                </div>
                <div className="flex items-center gap-2">
                    {/* Küçük bir Orange Dot - "Live" Efekti */}
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                    <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
                        ÇUKUR<span className="text-orange-500">VAR</span>
                    </h1>
                </div>
                <p className="text-[9px] text-slate-500 dark:text-slate-400 font-black uppercase tracking-[0.2em] mt-1 hidden sm:block">
                    <span className="text-slate-500">Live Feed</span>
                </p>
            </div>

            {/* Stats Cluster - Floating Dark badges */}
            {props.showBadges && <div className="flex gap-2 pointer-events-auto scale-90 origin-right">
                <StatusBadge
                    count={props.activePothole ?? 0}
                    label="Aktif"
                    variant="danger" // Turuncu-Siyah temada Kırmızı/Turuncu tonları daha uyarıcı olur
                />
                <StatusBadge
                    count={props.fixedPothole ?? 0}
                    label="Onarıldı"
                    variant="success"
                />
            </div>}
        </header>
    );
};

export default StickyHeader;