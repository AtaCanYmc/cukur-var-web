import React from 'react';
import { useUploadStore } from '../../store/useUploadStore';
import { Check, ChevronRight, Mail, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';
import { useMailAutomation } from '../../hooks/useMailAutomation';
import { buildMailContent } from '../../utils/mailBuilder';

interface IProps {
    onConfirm: () => void;
    onCancel: () => void;
    images: string[];
}

export const MailPreview: React.FC<IProps> = ({ onConfirm, onCancel, images }) => {
    // Zustand Atomic Selectors - Performans İyileştirmesi
    const category = useUploadStore(state => state.category);
    const description = useUploadStore(state => state.description);
    const location = useUploadStore(state => state.location);
    const resetUpload = useUploadStore(state => state.resetUpload);

    // Adres çözme ve akıllı kurum seçme otomasyonu
    const { 
        institutions, 
        toggleInstitution, 
        getSelectedEmails, 
        address, 
        loading: addressLoading 
    } = useMailAutomation(location?.lat, location?.lng);

    // E-posta önizlemesi için içerik üretimi (Bileşenden ayrıldı)
    const { subject, body } = buildMailContent({ 
        category, 
        description, 
        location, 
        address, 
        images 
    });

    const handleSendMail = () => {
        const emails = getSelectedEmails();
        if (!emails) {
            toast.error("Lütfen en az bir kurum seçin.");
            return;
        }

        toast.success(
            "Fotoğraf cihazınıza indirildi! Lütfen açılacak mail ekranında ataç butonuna basarak bu fotoğrafı ekleyin",
            { duration: 6000, icon: '📎' }
        );

        // Mail istemcisini tetikle
        window.location.href = `mailto:${emails}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        // İşlem tamamlandıktan sonra başarılı sayfasına geç
        setTimeout(() => {
            onConfirm();
            
            // Mail client'ın içeriği alabilmesi için ekstra bir süre tanıyıp bellek temizliği yapıyoruz (Memory Leak Önlemi)
            setTimeout(() => {
                resetUpload();
            }, 1500);
        }, 1500);
    };

    return (
        <div className="h-full w-full bg-slate-50 dark:bg-slate-900 flex flex-col">
            <div className="flex-1 overflow-y-auto px-6 pt-6 pb-44">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Kurum Seçimi</h2>
                    <p className="text-sm text-slate-500 mb-4">Raporun gönderileceği kurumları seçin.</p>

                    <div className="flex overflow-x-auto gap-3 pb-4 px-6 snap-x hide-scrollbar">
                        {institutions.map(inst => (
                            <div
                                key={inst.id}
                                onClick={() => toggleInstitution(inst.id)}
                                className={`shrink-0 w-[200px] p-3 rounded-xl border-2 flex flex-col gap-2 cursor-pointer transition-all snap-start ${inst.selected
                                    ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'
                                    }`}
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <span className="font-bold text-sm text-slate-700 dark:text-slate-200 line-clamp-2 leading-tight">
                                        {inst.name}
                                    </span>
                                    <div className={`shrink-0 w-5 h-5 rounded flex items-center justify-center border transition-colors ${inst.selected ? 'bg-orange-500 border-orange-500 text-white' : 'border-slate-300'}`}>
                                        {inst.selected && <Check size={14} strokeWidth={3} />}
                                    </div>
                                </div>
                                <div className="text-[10px] text-slate-400 truncate">{inst.email}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mb-6">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">E-Posta Önizleme</h2>
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs">
                        <div className="border-b border-slate-100 dark:border-slate-700 pb-3 mb-3">
                            <div className="text-xs text-slate-400 font-bold uppercase mb-1">Alıcı</div>
                            <div className="text-sm text-slate-800 dark:text-slate-200 break-words">
                                {getSelectedEmails() || '(Seçim yok)'}
                            </div>
                        </div>
                        <div className="border-b border-slate-100 dark:border-slate-700 pb-3 mb-3">
                            <div className="text-xs text-slate-400 font-bold uppercase mb-1">Konu</div>
                            <div className="text-sm font-bold text-slate-800 dark:text-slate-200">{subject}</div>
                        </div>
                        <div className="border-b border-slate-100 dark:border-slate-700 pb-3 mb-3">
                            <div className="text-xs text-slate-400 font-bold uppercase mb-1">Açık Adres</div>
                            <div className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-start gap-1">
                                <MapPin size={16} className="text-orange-500 mt-0.5 shrink-0" />
                                {addressLoading ? (
                                    <span className="animate-pulse">Adres çözümleniyor...</span>
                                ) : (
                                    <span>{address}</span>
                                )}
                            </div>
                        </div>
                        <div>
                            <div className="text-xs text-slate-400 font-bold uppercase mb-1">İçerik</div>
                            <div className="text-sm text-slate-600 dark:text-slate-300 whitespace-pre-wrap font-mono text-[11px] leading-relaxed">
                                {body}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-sm text-slate-500 italic">
                    (*) Çektiğiniz fotoğrafı maile eklemeyi unutmayınız. Fotoğraf otomatik olarak cihazınıza indirilecektir.
                </div>
            </div>

            <div className="p-6 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 z-10 fixed bottom-0 left-0 right-0">
                <button
                    onClick={handleSendMail}
                    className="w-full py-4 rounded-2xl font-black text-white text-lg shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95 bg-blue-600 hover:bg-blue-700 shadow-blue-500/30"
                >
                    <Mail size={20} />
                    E-Posta Gönder ve Bitir
                    <ChevronRight size={20} />
                </button>
                <button
                    onClick={onCancel}
                    className="w-full text-center text-slate-400 font-bold text-sm mt-4 hover:text-slate-600 transition-colors"
                >
                    Vazgeç ve Düzenle
                </button>
            </div>
        </div>
    );
};
