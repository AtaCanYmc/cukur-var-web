import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useUploadStore} from '../store/useUploadStore';
import {PageWrapper} from '../components/layout/PageWrapper';
import {UploadOverlay} from "../components/layout/UploadOverlay.tsx";
import {ROUTES} from "../routes/paths..ts";

export const ReportPage: React.FC = () => {
    const navigate = useNavigate();
    const {setStep, setProgress, resetUpload, currentStep} = useUploadStore();

    useEffect(() => {
        // Sayfa açıldığında yükleme simülasyonunu başlat
        const startProcessing = async () => {
            resetUpload();

            // 1. Adım: Konum Doğrulama
            setStep('PREPARING');
            for (let i = 0; i <= 30; i += 5) {
                setProgress(i);
                await new Promise(r => setTimeout(r, 150));
            }

            // 2. Adım: AI ile Gizlilik Maskeleme
            setStep('BLURRING');
            for (let i = 31; i <= 70; i += 3) {
                setProgress(i);
                await new Promise(r => setTimeout(r, 100));
            }

            // 3. Adım: Sunucuya Gönderim
            setStep('UPLOADING');
            for (let i = 71; i <= 100; i += 10) {
                setProgress(i);
                await new Promise(r => setTimeout(r, 200));
            }

            // Başarılı! 1 saniye bekle ve ana sayfaya (veya başarı sayfasına) dön
            setTimeout(() => {
                // Burada istersen bir confetti efekti tetikleyebilirsin
                navigate(ROUTES.HOME);
            }, 1000);
        };

        startProcessing().then(r => r);
    }, [navigate, setStep, setProgress, resetUpload]);

    return (
        <PageWrapper>
            <div className="h-screen w-full bg-slate-900 relative overflow-hidden">
                {/* Yükleme Katmanı */}
                <UploadOverlay/>

                {/* Arka planda hafifçe görünen 'işleniyor' temalı dekoratif elementler */}
                <div className="absolute top-10 left-10 w-64 h-64 bg-orange-500/5 blur-[120px] rounded-full"/>
                <div className="absolute bottom-10 right-10 w-64 h-64 bg-orange-500/5 blur-[120px] rounded-full"/>

                {/* İşlem bittiğinde görünecek gizli bir başarı mesajı (opsiyonel) */}
                {currentStep === 'SUCCESS' && (
                    <div className="absolute inset-0 flex items-center justify-center z-[110] bg-slate-900">
                        <div className="text-center">
                            <div
                                className="w-20 h-20 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.4)]">
                                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3}
                                          d="M5 13l4 4L19 7"/>
                                </svg>
                            </div>
                            <h2 className="text-white font-black text-2xl uppercase tracking-tighter">Rapor
                                Gönderildi</h2>
                            <p className="text-slate-400 text-sm mt-2 font-medium">İzmir daha güvenli bir yer
                                oluyor.</p>
                        </div>
                    </div>
                )}
            </div>
        </PageWrapper>
    );
};

export default ReportPage;