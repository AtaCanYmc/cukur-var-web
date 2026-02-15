import React from 'react';

// Renk paletini bir tip olarak sabitlemek hata payını sıfıra indirir
type BadgeVariant = 'danger' | 'success' | 'warning' | 'info';

interface IStatusBadgeProps {
    count: number | string;
    label: string;
    variant: BadgeVariant;
}

// Variant mapping ile Tailwind sınıflarını merkezi yönetiyoruz
const variantStyles: Record<BadgeVariant, string> = {
    danger: 'border-red-100 text-red-600 bg-red-50/50',
    success: 'border-green-100 text-green-600 bg-green-50/50',
    warning: 'border-orange-100 text-orange-600 bg-orange-50/50',
    info: 'border-blue-100 text-blue-600 bg-blue-50/50',
};

export const StatusBadge: React.FC<IStatusBadgeProps> = ({ count, label, variant }) => {
    return (
        <div className={`flex flex-col items-center min-w-[64px] p-2 rounded-2xl border backdrop-blur-sm transition-all ${variantStyles[variant]}`}>
            <span className="text-lg font-black leading-none">{count}</span>
            <span className="text-[9px] mt-1 uppercase font-bold tracking-wider opacity-80">
        {label}
      </span>
        </div>
    );
};