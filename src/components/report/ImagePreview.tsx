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
    const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        let objectUrl: string | null = null;
        if (image) {
            const img = new Image();
            img.src = image;
            img.onload = () => {
                initializeCanvas(img);
            };
            
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

    const initializeCanvas = (img: HTMLImageElement) => {
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

        // Ana ekran (Görünür Canvas)
        canvas.width = drawWidth;
        canvas.height = drawHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.drawImage(img, 0, 0, drawWidth, drawHeight);
        }

        // Safari Fix: Arka Planda Kliplenecek Bulanık Canvas (Offscreen Pre-Blur)
        const offscreen = document.createElement('canvas');
        offscreen.width = drawWidth;
        offscreen.height = drawHeight;
        const offCtx = offscreen.getContext('2d');
        
        if (offCtx) {
            // Görsel arka planda SADECE BİR KERE blurlanır, bu Safari'nin rendering bug'larını engeller.
            offCtx.filter = 'blur(20px)';
            offCtx.drawImage(img, 0, 0, drawWidth, drawHeight);
            offscreenCanvasRef.current = offscreen;
        }
    };

    const performBlur = (e: React.PointerEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        const offscreen = offscreenCanvasRef.current;
        if (!canvas || !offscreen) return;

        const rect = canvas.getBoundingClientRect();
        
        // Ekrana basılan yerin (CSS) gerçek canvas çözünürlüğündeki X,Y karşılığı
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;

        const ctx = canvas.getContext('2d');
        if (ctx) {
            const radius = Math.max(30, canvas.width * 0.04); // Dairesel fırça yarıçapı

            // Dairesel Kırpma Maskesi (Circular Clip Mask)
            ctx.save();
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2, true);
            ctx.clip(); // Sadece bu dairenin içine çizim yapmasına izin ver
            
            // Önceden blurlanmış harika görselden tam o dairenin üstüne pikselleri kopyala!
            ctx.drawImage(offscreen, 0, 0, canvas.width, canvas.height);
            ctx.restore(); // Maskeyi kaldır
        }
    };

    // --- Unified Pointer Event Handlers ---
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
            } catch (err) {
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
                    className="shadow-2xl rounded-lg border-2 border-slate-200 dark:border-slate-700 max-w-full max-h-[70vh] object-contain select-none cursor-crosshair"
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
