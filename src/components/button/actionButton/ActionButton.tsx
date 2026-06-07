import type {ElementType} from "react";

interface IProps {
    icon: ElementType
    onClick?: () => void
    label?: string
}

export const ActionButton = ({ onClick, icon: Icon, label }: IProps) => {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={label ?? 'Eylem Butonu'} // Erişilebilirlik (A11y)
            className="flex flex-col items-center justify-center bg-orange-600 text-white
                       rounded-full p-6 shadow-2xl active:scale-90 transition-all
                       border-4 border-white -translate-y-8 hover:bg-orange-700
                       focus:outline-none focus:ring-4 focus:ring-orange-300"
        >
            <Icon className="w-8 h-8" strokeWidth={2.5} />

            {label && (
                <span className="text-[10px] font-black mt-1 uppercase tracking-widest">
                    {label}
                </span>
            )}
        </button>
    );
};