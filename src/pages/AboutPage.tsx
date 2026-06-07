import React from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Mail, Github, Heart, EyeOff } from 'lucide-react';
import { useDevice } from '../hooks/useDevice';

export const AboutPage: React.FC = () => {
    const { isMobile } = useDevice();

    return (
        <PageWrapper showBottomNav={false} showHeader={false} showBadges={false} showHomeButton={isMobile}>
            <div className="h-screen overflow-y-auto bg-slate-50 dark:bg-slate-900 pb-32">
                {/* Header / Banner (Yeni Turuncu & Siyah Teması) */}
                <div className="h-64 bg-slate-950 relative overflow-hidden flex flex-col items-center justify-center">
                    <div className="absolute inset-0 bg-orange-500/5 blur-3xl rounded-full scale-150" />

                    {/* Logomuzun Minimalist SVG Hali */}
                    <div className="w-16 h-16 mb-4">
                        <svg viewBox="0 0 500 500" width="100%" height="100%">
                            <path d="M 250 100 C 170 100 130 160 130 230 C 130 310 250 420 250 420 C 250 420 370 310 370 230 C 370 160 330 100 250 100 Z" fill="none" stroke="#f97316" strokeWidth="28" strokeLinecap="round"/>
                            <circle cx="250" cy="220" r="55" fill="#090d16" stroke="#f97316" strokeWidth="12" />
                            <path d="M 225 210 L 245 235 L 275 205" fill="none" stroke="#f97316" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>

                    <h1 className="text-4xl font-black text-white tracking-tighter mb-1">
                        ÇUKUR<span className="text-orange-500">VAR</span>
                    </h1>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em]">
                        Sivil Altyapı Otomasyonu
                    </p>
                </div>

                <div className="px-6 -mt-10 relative z-10">
                    {/* Mission Card */}
                    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl shadow-slate-200/40 dark:shadow-none mb-6 border border-slate-100 dark:border-slate-700/60">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Nedir?</h2>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                            ÇukurVar, İzmir sokaklarındaki bozuk yolları ve altyapı sorunlarını yetkili kurumlara bildirme sürecini hızlandıran sivil bir otomasyon aracıdır. Karmaşık şikayet formlarıyla uğraşmak yerine, saniyeler içinde resmi ve kurumsal dile uygun e-posta taslakları hazırlamanızı sağlar.
                        </p>
                    </div>

                    {/* KVKK / Privacy Card (Yenilenen Doğru Bilgiler) */}
                    <div className="bg-emerald-50/60 dark:bg-slate-800/50 rounded-3xl p-6 mb-6 border border-emerald-100/70 dark:border-slate-700/60">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-emerald-500 text-white rounded-xl">
                                <EyeOff size={18} />
                            </div>
                            <h2 className="text-base font-bold text-slate-900 dark:text-white">Sunucusuz ve %100 Güvenli</h2>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed space-y-2">
                            Uygulamanın bir veritabanı veya backend sunucusu bulunmamaktadır. Çektiğiniz fotoğraflar internete yüklenmez, doğrudan cihazınıza indirilir. Konum verileriniz hiçbir sistemde saklanmaz. İhbar metni tarayıcınızda hazırlanır ve doğrudan kendi e-posta adresiniz üzerinden ilgili kurumlara (Belediye, Emniyet, Karayolları) iletilir.
                        </p>
                    </div>

                    {/* Developer / Contact */}
                    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-100 dark:border-slate-700/60">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">İletişim & Katkı</h2>

                        <div className="space-y-3">
                            <a href={import.meta.env.VITE_GITHUB_URL || "https://github.com/AtaCanYmc"} target="_blank" rel="noopener noreferrer"
                               className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors">
                                <Github className="text-slate-900 dark:text-white" size={22} />
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white text-xs">Open Source GitHub</h3>
                                    <p className="text-[11px] text-slate-400">Kaynak kodları inceleyin ve katkıda bulunun</p>
                                </div>
                            </a>

                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40">
                                <Mail className="text-orange-500" size={22} />
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white text-xs">İletişim</h3>
                                    <p className="text-[11px] text-slate-400">{import.meta.env.VITE_CONTACT_EMAIL || "İletişim bilgisi girilmedi"}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 text-center border-t border-slate-100 dark:border-slate-700/40 pt-6">
                            <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
                                {import.meta.env.VITE_CITY_NAME || "İzmir"}'de <Heart size={10} className="text-red-500 fill-red-500" /> ile geliştirildi.
                            </p>
                            <p className="text-[9px] text-slate-300 dark:text-slate-600 mt-1">
                                {import.meta.env.VITE_APP_VERSION || "v1.0.0"} • {import.meta.env.VITE_APP_YEAR || "2026"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};

export default AboutPage;