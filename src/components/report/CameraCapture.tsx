import React, {useRef, useEffect, useState} from 'react';
import {RefreshCw, Paperclip, X, Home} from 'lucide-react';

interface IProps {
    onCapture: (imageSrc: string) => void;
    onCancel?: () => void;
}

export const CameraCapture: React.FC<IProps> = ({onCapture, onCancel}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [error, setError] = useState<string | null>(null);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {facingMode: 'environment'} // Arka kamera öncelikli
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err) {
            console.error("Kamera hatası:", err);
            setError("Kameraya erişilemedi. Lütfen izinleri kontrol edin.");
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        startCamera().then(r => r);
        return () => stopCamera();
    }, []);

    const handleCapture = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;

            // Video boyutlarına göre canvas'ı ayarla
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            const context = canvas.getContext('2d');
            if (context) {
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                const imageSrc = canvas.toDataURL('image/jpeg', 0.8);

                // Fotoğrafı galeriye kaydetmek için indirme tetikle
                const link = document.createElement('a');
                link.href = imageSrc;
                link.download = `cukur-var-${new Date().getTime()}.jpg`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                stopCamera();
                onCapture(imageSrc);
            }
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onCapture(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="relative h-full w-full bg-black flex flex-col items-center justify-center overflow-hidden">

            {/* Kamera Görüntüsü */}
            <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="absolute inset-0 w-full h-full object-cover"
            />
            <canvas ref={canvasRef} className="hidden"/>

            {/* Hata Durumu */}
            {error && (
                <div className="z-20 text-white text-center p-6 bg-slate-900/80 rounded-xl max-w-xs">
                    <p className="mb-4">{error}</p>
                    <label
                        className="bg-orange-600 px-4 py-2 rounded-lg cursor-pointer flex items-center justify-center gap-2">
                        <Paperclip size={18}/>
                        Galeriden Seç
                        <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload}/>
                    </label>
                    <label
                        className="bg-orange-600 px-4 py-2 rounded-lg cursor-pointer flex items-center justify-center gap-2 mt-2">
                        <Home size={18}/>
                        <button onClick={onCancel}>Ana Sayfaya Dön</button>
                    </label>
                </div>
            )}

            {/* UI Kontrolleri */}
            {/* UI Kontrolleri */}
            {!error && (
                <>
                    {/* Kapat Butonu */}
                    <button
                        onClick={() => window.location.href = '/'} // Basit yönlendirme veya onCancel prop'u
                        className="absolute top-6 right-6 z-30 w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors"
                    >
                        <X size={24}/>
                    </button>

                    <div className="absolute bottom-10 w-full flex items-center justify-center gap-8 z-20">
                        {/* Dosya Yükleme (Alternatif) */}
                        <label
                            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white cursor-pointer hover:bg-white/30 transition-all">
                            <Paperclip size={24}/>
                            <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload}/>
                        </label>

                        {/* Çekim Butonu */}
                        <button
                            onClick={handleCapture}
                            className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center bg-transparent active:scale-95 transition-transform"
                        >
                            <div className="w-16 h-16 bg-white rounded-full"/>
                        </button>

                        {/* Kamerayı Yenile/Çevir (Mock - aslında sadece yeniden başlatır) */}
                        <button
                            onClick={() => {
                                stopCamera();
                                startCamera();
                            }}
                            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-all"
                        >
                            <RefreshCw size={24}/>
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};
