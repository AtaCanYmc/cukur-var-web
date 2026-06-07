import React, { useRef, useEffect } from 'react';
import { useUploadStore } from '../../store/useUploadStore';
import { Eraser, Check, RotateCcw } from 'lucide-react';
import toast from "react-hot-toast";

interface IProps {
    onConfirm: (finalImage: string) => void;
    onRetake: () => void;
}

export const ImagePreview: React.FC<IProps> = ({ onConfirm, onRetake }) => {
    const image = useUploadStore(state => state.image);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (image) {
            const img = new Image();
            img.src = image;
            img.onload = () => {
                // eslint-disable-next-line react-hooks/immutability
                drawImage(img);
            };
        }
    }, [image]);

    const drawImage = (img: HTMLImageElement) => {
        const canvas = canvasRef.current;
        if (canvas) {
            // Canvas boyutunu ekrana göre ayarla ama aspect ratio koru
            const containerWidth = window.innerWidth;
            const containerHeight = window.innerHeight * 0.7; // 70vh

            const scale = Math.min(containerWidth / img.width, containerHeight / img.height);

            canvas.width = img.width * scale;
            canvas.height = img.height * scale;

            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            }
        }
    };

    const handleBlur = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        let x, y;

        if ('touches' in e) {
            x = e.touches[0].clientX - rect.left;
            y = e.touches[0].clientY - rect.top;
        } else {
            x = (e as React.MouseEvent).clientX - rect.left;
            y = (e as React.MouseEvent).clientY - rect.top;
        }

        const ctx = canvas.getContext('2d');
        if (ctx) {
            const size = 40; // Blur kalem boyutu

            ctx.filter = 'blur(10px)';
            ctx.drawImage(canvas, x - size / 2, y - size / 2, size, size, x - size / 2, y - size / 2, size, size);
            ctx.filter = 'none'; // Reset filter
        }
    };

    const handleConfirm = () => {
        if (canvasRef.current) {
            const imageSrc = canvasRef.current.toDataURL('image/jpeg', 0.8);

            toast.success(
                "İndirme Başlıyor. Lütfen açılacak mail ekranında ataç butonuna basarak bu fotoğrafı ekleyin",
                { duration: 6000, icon: '📎' }
            );

            // Fotoğrafı galeriye kaydetmek için indirme tetikle
            const link = document.createElement('a');
            link.href = imageSrc;
            link.download = `cukur-var-${new Date().getTime()}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setTimeout(() => {
                onConfirm(imageSrc);
            }, 500);
        }
    };

    return (
        <div className="flex flex-col items-center h-full w-full bg-slate-50 dark:bg-slate-900 pt-4">
            <div className="flex-1 w-full flex items-center justify-center overflow-hidden relative">
                <canvas
                    ref={canvasRef}
                    className="shadow-2xl rounded-lg border-2 border-slate-200 dark:border-slate-700"
                    onMouseDown={(e) => {
                        handleBlur(e);
                    }}
                    onTouchStart={handleBlur}
                    onTouchMove={handleBlur} // Sürükleyerek blur
                />

                <div className="absolute top-4 bg-black/50 text-white px-4 py-2 rounded-full text-xs font-bold pointer-events-none backdrop-blur-sm">
                    <Eraser size={14} className="inline mr-2" />
                    Gizlemek istediğiniz yere dokunun
                </div>
            </div>

            <div className="w-full p-6 flex justify-between items-center bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 z-10">
                <button
                    onClick={onRetake}
                    className="flex flex-col items-center gap-1 text-slate-500 hover:text-red-500 transition-colors"
                >
                    <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full">
                        <RotateCcw size={24} />
                    </div>
                    <span className="text-xs font-bold uppercase">Tekrar</span>
                </button>

                <button
                    onClick={handleConfirm}
                    className="flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-bold shadow-green-500/30 shadow-lg text-lg transition-transform active:scale-95"
                >
                    <Check size={24} />
                    Onayla
                </button>
            </div>
        </div>
    );
};
