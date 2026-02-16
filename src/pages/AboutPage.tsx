import React from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Shield, Mail, Github, Heart } from 'lucide-react';
import { BottomNav } from '../components/layout/BottomNav';

export const AboutPage: React.FC = () => {
    return (
        <PageWrapper>
            <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-32">
                {/* Header Image / Banner */}
                <div className="h-64 bg-slate-900 relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-orange-600/10 blur-3xl rounded-full scale-150" />
                    <div className="z-10 text-center">
                        <h1 className="text-4xl font-black text-white tracking-tighter mb-2">
                            ÇUKUR<span className="text-orange-500">VAR</span>
                        </h1>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.3em]">
                            İzmir İçin Teknoloji
                        </p>
                    </div>
                </div>

                <div className="px-6 -mt-10 relative z-10">
                    {/* Mission Card */}
                    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-none mb-6 border border-slate-100 dark:border-slate-700">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Amacımız</h2>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                            ÇukurVar, İzmir yollarındaki bozuklukları, çukurları ve altyapı sorunlarını vatandaşların gücüyle tespit eden kolektif bir haritalama projesidir. Amacımız, sorunları görünür kılarak çözümü hızlandırmaktır.
                        </p>
                    </div>

                    {/* KVKK / Privacy Card */}
                    <div className="bg-blue-50 dark:bg-slate-800/50 rounded-3xl p-6 mb-6 border border-blue-100 dark:border-slate-700">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-blue-500 text-white rounded-xl">
                                <Shield size={20} />
                            </div>
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Gizlilik & Anonimlik</h2>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">
                            Gönderilen raporlar tamamen anonimdir. Fotoğraflardaki yüzler ve plakalar yapay zeka/algoritmalar ile otomatik olarak bulanıklaştırılır. Kişisel verileriniz asla saklanmaz.
                        </p>
                    </div>

                    {/* Developer / Contact */}
                    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">İletişim</h2>

                        <div className="space-y-4">
                            <a href="https://github.com/atacan" target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 transition-colors">
                                <Github className="text-slate-900 dark:text-white" size={24} />
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white text-sm">GitHub</h3>
                                    <p className="text-xs text-slate-500">Projeye katkıda bulunun</p>
                                </div>
                            </a>

                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900">
                                <Mail className="text-orange-500" size={24} />
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white text-sm">E-Posta</h3>
                                    <p className="text-xs text-slate-500">info@cukurvar.com</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 text-center">
                            <p className="text-xs text-slate-400 flex items-center justify-center gap-1">
                                İzmir'de <Heart size={10} className="text-red-500 fill-red-500" /> ile geliştirildi.
                            </p>
                            <p className="text-[10px] text-slate-300 dark:text-slate-600 mt-2">
                                v1.0.0 • 2026
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <BottomNav />
        </PageWrapper>
    );
};

export default AboutPage;
