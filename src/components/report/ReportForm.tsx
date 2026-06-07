import React, { useState } from 'react';
import { useUploadStore } from '../../store/useUploadStore';
import { Check, AlertTriangle, Info, X, Car, Map } from 'lucide-react';

interface IProps {
    onSubmit: () => void;
    onBack: () => void;
    onCancel?: () => void;
}

const CATEGORIES = [
    { id: 'pothole', label: 'Tehlikeli bir çukurla karşılaştım', icon: AlertTriangle, color: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' },
    { id: 'damage', label: 'Aracım çukurda hasar gördü', icon: Car, color: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' },
    { id: 'other', label: 'Yolda başka bir sorun yaşıyorum', icon: Info, color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' },
];

export const ReportForm: React.FC<IProps> = ({ onSubmit, onBack, onCancel }) => {
    const category = useUploadStore(state => state.category);
    const description = useUploadStore(state => state.description);
    const setDetails = useUploadStore(state => state.setDetails);
    const image = useUploadStore(state => state.image);
    const location = useUploadStore(state => state.location);
    const [localDesc, setLocalDesc] = useState(description);
    const [localCat, setLocalCat] = useState(category);

    const handleSubmit = () => {
        if (!localCat) return; // Kategori zorunlu
        setDetails(localCat, localDesc);
        onSubmit();
    };

    return (
        <div className="h-full w-full bg-slate-50 dark:bg-slate-900 flex flex-col pt-4 overflow-y-auto">
            {/* Preview Thumbnail */}
            <div className="w-full flex justify-center mb-6">
                <div className="relative">
                    <img src={image || ''} alt="Report" className="w-32 h-32 object-cover rounded-2xl shadow-lg border-2 border-white dark:border-slate-700" />
                </div>
            </div>

            {/* Location Info */}
            <div className="mx-6 mb-6 p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-lg">
                        <Map size={20} />
                    </div>
                    <div>
                        <div className="text-xs text-slate-500 font-medium">Konum</div>
                        <div className="text-sm font-bold text-slate-800 dark:text-gray-200">
                            {location ? `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}` : "Seçilmedi"}
                        </div>
                    </div>
                </div>
                <button
                    onClick={onBack}
                    className="text-xs text-blue-500 font-bold hover:underline"
                >
                    DEĞİŞTİR
                </button>
            </div>

            {/* Categories */}
            <div className="flex-1 bg-white dark:bg-slate-800 rounded-t-[32px] p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] dark:shadow-none">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Detaylar</h2>

                {/* Kategori Seçimi */}
                <div className="mb-8">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">SORUN TİPİ</label>
                    <div className="grid grid-cols-3 gap-3">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setLocalCat(cat.id)}
                                className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all ${localCat === cat.id
                                    ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                                    : 'border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800'
                                    }`}
                            >
                                <div className={`p-2 rounded-full ${cat.color}`}>
                                    <cat.icon size={20} />
                                </div>
                                <span className={`text-xs font-bold ${localCat === cat.id ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>
                                    {cat.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Açıklama */}
                <div className="mb-8">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">AÇIKLAMA (OPSİYONEL)</label>
                    <textarea
                        className="w-full h-32 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                        placeholder="Eklemek istediğiniz detaylar..."
                        value={localDesc}
                        onChange={(e) => setLocalDesc(e.target.value)}
                    />
                </div>

                {/* Submit Button */}
                <button
                    disabled={!localCat}
                    onClick={handleSubmit}
                    className={`w-full py-4 rounded-2xl font-black text-white text-lg shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95 ${localCat
                        ? 'bg-orange-600 hover:bg-orange-700 shadow-orange-500/30'
                        : 'bg-slate-300 dark:bg-slate-700 cursor-not-allowed'
                        }`}
                >
                    Raporla
                    <Check size={20} />
                </button>
                <button
                    onClick={onCancel}
                    className={`w-full py-4 rounded-2xl font-black text-white text-lg shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95 bg-slate-300 dark:bg-slate-700 cursor-not-allowed mt-4`}
                >
                    İptal
                    <X size={20} />
                </button>
            </div>
        </div>
    );
};
