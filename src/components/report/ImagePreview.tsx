import React, { useRef, useEffect, useState, useCallback } from 'react';
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
    const dprRef = useRef(window.devicePixelRatio || 1);

    // Canvas blur uygulamak için fallback fonksiyon
    const applyCanvasBlur = (ctx: CanvasRenderingContext2D, width: number, height: number, dpr: number) => {
        const iterations = 2;
        const radius = 10;
        
        for (let i = 0; i < iterations; i++) {
            ctx.globalAlpha = 0.9;
            ctx.drawImage(ctx.canvas, -radius * dpr, 0, width * dpr + radius * dpr * 2, height * dpr);
            ctx.drawImage(ctx.canvas, radius * dpr, 0, width * dpr - radius * dpr * 2, height * dpr);
            ctx.drawImage(ctx.canvas, 0, -radius * dpr, width * dpr, height * dpr + radius * dpr * 2);
            ctx.drawImage(ctx.canvas, 0, radius * dpr, width * dpr, height * dpr - radius * dpr * 2);
        }
        ctx.globalAlpha = 1;
    };

    const initializeCanvas = useCallback((img: HTMLImageElement) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const dpr = window.devicePixelRatio || 1;
        dprRef.current = dpr;

        // RAM Dostu Görsel Ölçeklendirme (Downscale)
        let MAX_DIMENSION = 1200;
        // Mobil cihazlarda daha küçük tutma
        if (window.innerWidth < 768) {
            MAX_DIMENSION = 800;
        }

        let drawWidth = img.width;
        let drawHeight = img.height;

        if (drawWidth > MAX_DIMENSION || drawHeight > MAX_DIMENSION) {
            const ratio = Math.min(MAX_DIMENSION / drawWidth, MAX_DIMENSION / drawHeight);
            drawWidth = Math.floor(drawWidth * ratio);
            drawHeight = Math.floor(drawHeight * ratio);
        }

        // Canvas iç çözünürlüğü (Device Pixel Ratio ile ölçeklendir)
        const canvasWidth = drawWidth * dpr;
        const canvasHeight = drawHeight * dpr;

        // Ana ekran (Görünür Canvas)
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.width = drawWidth + 'px';
        canvas.style.height = drawHeight + 'px';

        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (ctx) {
            ctx.scale(dpr, dpr);
            ctx.drawImage(img, 0, 0, drawWidth, drawHeight);
        }

        // Safari Fix: Arka Planda Kliplenecek Bulanık Canvas
        const offscreen = document.createElement('canvas');
        offscreen.width = canvasWidth;
        offscreen.height = canvasHeight;
        const offCtx = offscreen.getContext('2d', { willReadFrequently: true });
        
        if (offCtx) {
            offCtx.scale(dpr, dpr);
            
            // Canvas filter desteği kontrol et (iOS Safari desteği yok)
            if (offCtx.filter !== undefined && offCtx.filter !== '') {
                offCtx.filter = 'blur(20px)';
                offCtx.drawImage(img, 0, 0, drawWidth, drawHeight);
            } else {
                // Fallback: Blur filterı desteklenmiyorsa, görüntüyü olduğu gibi kopyala
                // ve performans için daha hızlı blur uygula
                offCtx.drawImage(img, 0, 0, drawWidth, drawHeight);
                applyCanvasBlur(offCtx, drawWidth, drawHeight, dpr);
            }
            
            offscreenCanvasRef.current = offscreen;
        }
    }, []);

    useEffect(() => {
        if (image) {
            const img = new Image();
            img.src = image;
            img.onload = () => {
                initializeCanvas(img);
            };
            
            return () => {
                img.onload = null;
                img.src = '';
            };
        }
    }, [image, initializeCanvas]);

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

    // ... existing code ...
    const performBlur = (e: React.PointerEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        const offscreen = offscreenCanvasRef.current;
        if (!canvas || !offscreen) return;

        // iOS Safari'de PointerEvent.offsetX/Y dokunmatik ekranlarda hatalı çalışır!
        // Bu yüzden matematiksel olarak en kusursuz yöntem olan getBoundingClientRect + clientX/Y kullanıyoruz.
        const rect = canvas.getBoundingClientRect();
        
        // CSS border değerlerini hesapla (Örn: border-2 -> 2px)
        const style = window.getComputedStyle(canvas);
        const borderLeft = parseFloat(style.borderLeftWidth) || 0;
        const borderTop = parseFloat(style.borderTopWidth) || 0;
        const borderRight = parseFloat(style.borderRightWidth) || 0;
        const borderBottom = parseFloat(style.borderBottomWidth) || 0;

        // Border hariç (saf içerik) CSS boyutları
        const cssWidth = rect.width - borderLeft - borderRight;
        const cssHeight = rect.height - borderTop - borderBottom;

        // Farenin/Parmağın border'ı dışarıda bırakarak canvas içindeki CSS konumu
        const cssX = e.clientX - rect.left - borderLeft;
        const cssY = e.clientY - rect.top - borderTop;

        // CSS pikseli -> Gerçek Canvas pikseli oranı
        const scaleX = canvas.width / cssWidth;
        const scaleY = canvas.height / cssHeight;

        const x = cssX * scaleX;
        const y = cssY * scaleY;

        const ctx = canvas.getContext('2d');
        if (ctx) {
            // "Blur çok büyük" geri bildirimi üzerine fırça boyutu yarı yarıya küçültüldü
            const radius = Math.max(15, canvas.width * 0.02); 

            // Dairesel Kırpma Maskesi (Circular Clip Mask)
            ctx.save();
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2, true);
            ctx.clip(); // Sadece bu dairenin içine çizim yapmasına izin ver
            
            // Önceden blurlanmış görselden tam o dairenin üstüne pikselleri kopyala
            ctx.drawImage(offscreen, 0, 0, canvas.width, canvas.height);
            ctx.restore(); // Maskeyi kaldır
        }
    };

    // --- Unified Pointer Event Handlers ---
    const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
        e.preventDefault();
        setIsDrawing(true);
        if (canvasRef.current) {
            try {
                canvasRef.current.setPointerCapture(e.pointerId);
            } catch {
                // Pointer capture might fail on some devices
            }
        }
        performBlur(e);
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return;
        e.preventDefault();
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
                    className="shadow-2xl rounded-lg border-2 border-slate-200 dark:border-slate-700 max-w-full max-h-[70vh] select-none cursor-crosshair"
                    style={{ 
                        touchAction: 'none', 
                        WebkitTouchCallout: 'none', 
                        WebkitUserSelect: 'none',
                        userSelect: 'none',
                        maxWidth: '100%',
                        maxHeight: '70vh',
                        height: 'auto',
                        width: 'auto',
                        display: 'block'
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
