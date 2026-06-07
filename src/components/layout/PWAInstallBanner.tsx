import React, { useState } from 'react';
import { usePWAInstall } from '../../hooks/usePWAInstall';
import { Download, X, Share, PlusSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const PWAInstallBanner: React.FC = () => {
    const { isInstallable, isInstalled, isIOS, promptInstall } = usePWAInstall();
    const [dismissed, setDismissed] = useState(false);

    // Eğer zaten yüklüyse veya kullanıcı gizlediyse hiçbir şey gösterme
    if (isInstalled || dismissed) return null;

    // Yüklenebilir (Android/Chrome vb.) durumu veya iOS durumu yoksa gizle
    if (!isInstallable && !isIOS) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className="fixed top-24 left-4 right-4 z-[9999]"
            >
                <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-800 shadow-2xl rounded-2xl p-4 pr-12 relative overflow-hidden">
                    {/* Turuncu Vurgu */}
                    <div className="absolute top-0 left-0 bottom-0 w-1 bg-orange-500"></div>
                    
                    <button 
                        onClick={() => setDismissed(true)}
                        className="absolute top-3 right-3 text-slate-400 hover:text-white transition-colors p-1"
                    >
                        <X size={18} />
                    </button>

                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center shrink-0 border border-orange-500/20">
                            <Download className="text-orange-500" size={24} />
                        </div>
                        
                        <div className="flex-1">
                            <h3 className="text-white font-bold text-sm mb-1">
                                ÇukurVar'ı Yükleyin
                            </h3>
                            
                            {isInstallable ? (
                                <div>
                                    <p className="text-slate-400 text-xs mb-3">
                                        Daha hızlı ve kotasız bir deneyim için ana ekrana ekleyin.
                                    </p>
                                    <button 
                                        onClick={promptInstall}
                                        className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold py-2 px-4 rounded-lg transition-colors shadow-lg shadow-orange-500/20"
                                    >
                                        Hemen Yükle
                                    </button>
                                </div>
                            ) : isIOS ? (
                                <div className="text-slate-400 text-xs flex flex-col gap-2 mt-1">
                                    <p>iOS cihazınıza kurmak için:</p>
                                    <ol className="flex flex-col gap-1.5 text-[11px] font-medium text-slate-300">
                                        <li className="flex items-center gap-1.5">
                                            1. <Share size={14} className="text-orange-400" /> Paylaş butonuna dokunun
                                        </li>
                                        <li className="flex items-center gap-1.5">
                                            2. <PlusSquare size={14} className="text-orange-400" /> "Ana Ekrana Ekle"yi seçin
                                        </li>
                                    </ol>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};
