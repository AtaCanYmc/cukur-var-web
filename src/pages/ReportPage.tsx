import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUploadStore } from '../store/useUploadStore';
import { PageWrapper } from '../components/layout/PageWrapper';
import { UploadOverlay } from "../components/layout/UploadOverlay.tsx";
import { ROUTES } from "../routes/paths..ts";
import { CameraCapture } from "../components/report/CameraCapture";
import { ImagePreview } from "../components/report/ImagePreview";
import { ReportForm } from "../components/report/ReportForm";
import { LocationPicker } from "../components/report/LocationPicker";
import { useReportService } from "../hooks/useReportService";

export const ReportPage: React.FC = () => {
    const navigate = useNavigate();
    const { currentStep, setStep, setImage, resetUpload, image, category, description } = useUploadStore();
    const service = useReportService();

    // Reset on mount
    useEffect(() => {
        resetUpload();
    }, [resetUpload]);

    const handleCameraCapture = (img: string) => {
        setImage(img);
        setStep('PREVIEW');
    };

    const handlePreviewConfirm = (finalImage: string) => {
        setImage(finalImage); // Update with potential edits (if any)
        setStep('LOCATION'); // Go to Location Picker
    };

    const handleLocationConfirm = () => {
        setStep('FORM');
    };

    const handleReportSubmit = async () => {
        setStep('UPLOADING');

        try {
            await service.createReport({
                image: image || '',
                category: category,
                description: description,
                // Location is already in store, need to pass it?
                // IReportService expects location?: {lat, lng} inside ReportData
                // Let's grab it from store
                location: useUploadStore.getState().location || undefined
            });

            setStep('SUCCESS');

            // Redirect after delay
            setTimeout(() => {
                navigate(ROUTES.HOME);
            }, 2000);

        } catch (error) {
            console.error("Upload failed", error);
            // Handle error state (maybe alert or back to form)
            setStep('FORM');
            alert("Rapor gönderilemedi. Lütfen tekrar deneyin.");
        }
    };

    return (
        <PageWrapper showHeader={false} showBottomNav={false}>
            <div className="h-screen w-full bg-slate-900 relative overflow-hidden flex flex-col">

                {/* 1. Camera Step */}
                {currentStep === 'CAMERA' && (
                    <CameraCapture
                        onCapture={handleCameraCapture}
                        onCancel={() => navigate(ROUTES.HOME)}
                    />
                )}

                {/* 2. Preview & Blur Step */}
                {currentStep === 'PREVIEW' && (
                    <ImagePreview
                        onConfirm={handlePreviewConfirm}
                        onRetake={() => setStep('CAMERA')}
                    />
                )}

                {/* 3. Location Picker Step */}
                {currentStep === 'LOCATION' && (
                    <LocationPicker
                        onConfirm={handleLocationConfirm}
                        onCancel={() => setStep('PREVIEW')}
                    />
                )}

                {/* 4. Form Step */}
                {currentStep === 'FORM' && (
                    <ReportForm
                        onSubmit={handleReportSubmit}
                        onBack={() => setStep('LOCATION')}
                        onCancel={() => navigate(ROUTES.HOME)}
                    />
                )}

                {/* 4. Uploading & Success States (Overlay) */}
                {currentStep === 'UPLOADING' && <UploadOverlay />}

                {/* Success Screen */}
                {currentStep === 'SUCCESS' && (
                    <div className="absolute inset-0 flex items-center justify-center z-[110] bg-slate-900">
                        <div className="text-center p-8 animate-in fade-in zoom-in duration-500">
                            <div
                                className="w-24 h-24 bg-green-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.4)]">
                                <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3}
                                        d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h2 className="text-white font-black text-3xl uppercase tracking-tighter mb-2">
                                Rapor Gönderildi
                            </h2>
                            <p className="text-slate-400 text-lg font-medium">
                                Katkınız için teşekkürler.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </PageWrapper>
    );
};

export default ReportPage;