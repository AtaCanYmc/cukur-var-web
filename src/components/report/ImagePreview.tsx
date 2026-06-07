import React, { useRef, useEffect, useState } from 'react';
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
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        const objectUrl: string | null = null;
        if (image) {
            const img = new Image();
            img.src = image;
            img.onload = () => {
                // eslint-disable-next-line react-hooks/immutability
                drawImage(img);
            };
            
            // Memory Management: Component unmount olduğunda objeyi ve referansları temizle
            return () => {
                img.onload = null;
                img.src = '';
                if (objectUrl) URL.revokeObjectURL(objectUrl);
            };
        }
    }, [image]);

    // Native TouchMove for preventing scroll (bypasses React passive event warnings)
    useEffect(() => {
        const canvas = canvasRef.current;
        const preventScroll = (e: TouchEvent) => {
            if (e.cancelable) {
                e.preventDefault();
            }
        };

        if (canvas) {
            canvas.addEventListener('touchmove', preventScroll, { passive: false });
        }
        return () => {
            if (canvas) {
                canvas.removeEventListener('touchmove', preventScroll);
            }
        };
    }, []);

    const drawImage = (img: HTMLImageElement) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // RAM Dostu Görsel Ölçeklendirme (Downscale)
        const MAX_DIMENSION = 1200;
        let drawWidth = img.width;
        let drawHeight = img.height;

        if (drawWidth > MAX_DIMENSION || drawHeight > MAX_DIMENSION) {
            const ratio = Math.min(MAX_DIMENSION / drawWidth, MAX_DIMENSION / drawHeight);
            drawWidth = Math.floor(drawWidth * ratio);
            drawHeight = Math.floor(drawHeight * ratio);
        }

        // Canvas asıl çözünürlüğü (arka plan pikselleri)
        canvas.width = drawWidth;
        canvas.height = drawHeight;

        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.drawImage(img, 0, 0, drawWidth, drawHeight);
        }
    };

    const performBlur = (e: React.PointerEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        
        // Mobil Dokunmatik Optimizasyonu: CSS boyutlarından gerçek çözünürlüğe oranlama (Scale Mapping)
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;

        const ctx = canvas.getContext('2d');
        if (ctx) {
            // Fırça boyutunu canvas çözünürlüğüne göre dinamik ayarla (%5'i kadar)
            const size = Math.max(40, canvas.width * 0.05); 

            ctx.filter = 'blur(15px)';
            ctx.drawImage(
                canvas, 
                Math.max(0, x - size / 2), 
                Math.max(0, y - size / 2), 
                size, size, 
                x - size / 2, y - size / 2, 
                size, size
            );
            ctx.filter = 'none'; // Reset filter
        }
    };

    // --- Unified Pointer Event Handlers (iOS Safari & Android Chrome & Desktop Fix) ---
    const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
        setIsDrawing(true);
        if (canvasRef.current) {
            canvasRef.current.setPointerCapture(e.pointerId);
        }
        performBlur(e);
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return;
        performBlur(e);
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
        setIsDrawing(false);
        if (canvasRef.current) {
            try {
                canvasRef.current.releasePointerCapture(e.pointerId);
            } catch {
                // Ignore capture release errors
            }
        }
    };

    const handleConfirm = () => {
        if (canvasRef.current) {
            // %80 Kalite ile JPEG çıktısı
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
            <div className="flex-1 w-full flex items-center justify-center overflow-hidden relative p-4">
                <canvas
                    ref={canvasRef}
                    className="shadow-2xl rounded-lg border-2 border-slate-200 dark:border-slate-700 max-w-full max-h-[70vh] object-contain select-none"
                    style={{ 
                        touchAction: 'none', 
                        WebkitTouchCallout: 'none', 
                        WebkitUserSelect: 'none',
                        userSelect: 'none'
                    }}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerUp}
                />

                <div className="absolute top-6 bg-black/50 text-white px-4 py-2 rounded-full text-xs font-bold pointer-events-none backdrop-blur-sm">
                    <Eraser size={14} className="inline mr-2" />
                    Gizlemek istediğiniz yere dokunun veya sürükleyin
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
