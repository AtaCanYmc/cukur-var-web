import { Home } from 'lucide-react';

interface IProps {
    onClick: () => void;
    className?: string;
}

const StickyHomeButton = (props: IProps) => {
    return (
        <button
            type="button"
            onClick={props.onClick}
            aria-label="Ana Konuma Dön"
            className={`
                fixed top-5 left-4 z-40 
                pointer-events-auto
                flex items-center justify-center 
                w-12 h-12 bg-white dark:bg-slate-800 
                text-orange-500 dark:text-orange-500
                rounded-full shadow-lg border border-slate-200 dark:border-slate-700
                active:scale-90 transition-all duration-200
                hover:bg-slate-50 dark:hover:bg-slate-700
                ${props.className}
            `}
        >
            <Home size={24} strokeWidth={2.5} />
        </button>
    );
};

export default StickyHomeButton;