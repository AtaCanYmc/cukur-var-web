import React, {useState, useEffect} from 'react';
import {useUploadStore} from '../../store/useUploadStore';
import {INITIAL_INSTITUTIONS, type Institution} from '../../data/institutions';
import {Check, ChevronRight, Mail, MapPin} from 'lucide-react';
import toast from 'react-hot-toast';
import {MAIL_TEMPLATES} from '../../constants/MailTemplates';
import {useNominatim} from '../../hooks/useNominatim';

interface IProps {
    onConfirm: () => void;
    onCancel: () => void;
    images: string[];
}

export const MailPreview: React.FC<IProps> = ({ onConfirm, onCancel, images }) => {
    const { category, description, location } = useUploadStore();
    const [institutions, setInstitutions] = useState<Institution[]>(INITIAL_INSTITUTIONS);
    const { address, rawAddress, loading: addressLoading } = useNominatim(location?.lat, location?.lng);

    useEffect(() => {
        if (!rawAddress) return;

        const districtName = (rawAddress.country || rawAddress.town || rawAddress.suburb || rawAddress.city_district || '').toLocaleLowerCase('tr-TR');
        
        if (districtName) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setInstitutions(prev => prev.map(inst => {
                if (inst.id === 'izmir_bb') return { ...inst, selected: true };
                
                const instNameNormalized = inst.name.toLocaleLowerCase('tr-TR');
                // Normalize terms to effectively match
                const districtWords = districtName.split(/\s+/);
                const isMatch = districtWords.some(word => word.length > 3 && instNameNormalized.includes(word)) || instNameNormalized.includes(districtName);

                if (isMatch || inst.selected) {
                    return { ...inst, selected: true };
                }
                
                return { ...inst, selected: false };
            }));
        }
    }, [rawAddress]);

    const toggleInstitution = (id: string) => {
        setInstitutions(prev => prev.map(inst =>
            inst.id === id ? { ...inst, selected: !inst.selected } : inst
        ));
    };

    const getSelectedEmails = () => {
        return institutions.filter(i => i.selected).map(i => i.email).join(',');
    };

    const generateMailContent = () => {
        const coords = location ? `${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}` : 'Konum bilgisi yok';
        const googleMapsLink = location ? `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}` : '';
        const subject = `Çukur İhbarı: ${category === 'pothole' ? 'Tehlikeli Çukur' : category} - ${new Date().toLocaleDateString('tr-TR')}`;
        const imageAttachments = images.map(image => `data:image/jpeg;base64,${image}`);

        const body = MAIL_TEMPLATES[category]({
            locationName: address || 'Belirtilmemiş / İzmir',
            coordinates: coords,
            date: new Date().toLocaleDateString('tr-TR'),
            googleMapsLink: googleMapsLink,
            description: description,
        });

        return { subject, body, imageAttachments };
    };

    const handleSendMail = () => {
        const emails = getSelectedEmails();
        if (!emails) {
            toast.error("Lütfen en az bir kurum seçin.");
            return;
        }

        const { subject, body } = generateMailContent();

        window.location.href = `mailto:${emails}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        // Proceed to success after a short delay to allow mail client to open
        setTimeout(() => {
            onConfirm();
        }, 1500);
    };

    const { subject, body } = generateMailContent();

    return (
        <div className="h-full w-full bg-slate-50 dark:bg-slate-900 flex flex-col">
            <div className="flex-1 overflow-y-auto px-6 pt-6 pb-44">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Kurum Seçimi</h2>
                    <p className="text-sm text-slate-500 mb-4">Raporun gönderileceği kurumları seçin.</p>

                    <div className="flex overflow-x-auto gap-3 pb-4 -ml-2 mr-2 px-6 snap-x hide-scrollbar">
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
                                    <span className="font-bold text-sm text-slate-700 dark:text-slate-200 line-clamp-2 leading-tight">{inst.name}</span>
                                    <div className={`shrink-0 w-5 h-5 rounded flex items-center justify-center border ${inst.selected ? 'bg-orange-500 border-orange-500 text-white' : 'border-slate-300'}`}>
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
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                        <div className="border-b border-slate-100 dark:border-slate-700 pb-3 mb-3">
                            <div className="text-xs text-slate-400 font-bold uppercase mb-1">Alıcı</div>
                            <div className="text-sm text-slate-800 dark:text-slate-200 break-words">{getSelectedEmails() || '(Seçim yok)'}</div>
                        </div>
                        <div className="border-b border-slate-100 dark:border-slate-700 pb-3 mb-3">
                            <div className="text-xs text-slate-400 font-bold uppercase mb-1">Konu</div>
                            <div className="text-sm font-bold text-slate-800 dark:text-slate-200">{subject}</div>
                        </div>
                        <div className="border-b border-slate-100 dark:border-slate-700 pb-3 mb-3">
                            <div className="text-xs text-slate-400 font-bold uppercase mb-1">Açık Adres</div>
                            <div className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-start gap-1">
                                <MapPin size={16} className="text-orange-500 mt-0.5 shrink-0" />
                                {addressLoading ? <span className="animate-pulse">Adres çözümleniyor...</span> : (address || 'Konum bulunamadı')}
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

                {/*Fotoğrafı maile eklemeyi unutmayın notu*/}
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
                    className="w-full text-center text-slate-400 font-bold text-sm mt-4 hover:text-slate-600"
                >
                    Vazgeç ve Düzenle
                </button>
            </div>
        </div>
    );
};
