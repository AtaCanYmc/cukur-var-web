import { useState, useEffect } from 'react';

interface IDeviceInfo {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    isTouch: boolean;
}

export const useDevice = (): IDeviceInfo => {
    const [device, setDevice] = useState<IDeviceInfo>({
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        isTouch: false,
    });

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;

            // Dokunmatik kontrolü (Modern tarayıcılar için en güvenli yol)
            const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

            setDevice({
                isMobile: width < 768,
                isTablet: width >= 768 && width < 1024,
                isDesktop: width >= 1024,
                isTouch: isTouch,
            });
        };

        // İlk yüklemede çalıştır
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return device;
};