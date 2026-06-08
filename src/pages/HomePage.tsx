import {useEffect, useState} from "react";
import {useUIStore} from "../store/useUIStore.ts";
import {MainMap} from "../components/map/MainMap.tsx";
import type {IPothole} from "../components/map/types/Pothole.ts";
import {BottomNav} from "../components/layout/BottomNav.tsx";
import {PageWrapper} from "../components/layout/PageWrapper.tsx";
import {PWAInstallBanner} from "../components/layout/PWAInstallBanner.tsx";

const HomePage = () => {
    const startLoading = useUIStore(state => state.startLoading);
    const stopLoading = useUIStore(state => state.stopLoading);
    const [potholes, setPotholes] = useState<IPothole[]>([]);

    useEffect(() => {
        let isMounted = true;

        const fetchStaticPotholes = async () => {
            try {
                startLoading('İhbarlar haritaya işleniyor...');

                const baseUrl = import.meta.env.BASE_URL.endsWith('/')
                    ? import.meta.env.BASE_URL
                    : `${import.meta.env.BASE_URL}/`;

                const response = await fetch(`${baseUrl}potholes.json`, {
                    cache: 'no-store' // Tarayıcı agresif cache'ini önlemek için
                });

                if (!response.ok) {
                    throw new Error(`Statik JSON dosyası bulunamadı (Status: ${response.status})`);
                }

                const data = await response.json();

                if (isMounted) {
                    setPotholes(data);
                }
            } catch (error) {
                // 🚨 Fail-Silent (Sessiz Hata)
                // Henüz cron job çalışmadıysa veya dosya yoksa beyaz ekrana düşmeyi önler
                console.error("Harita statik verileri çekilirken hata oluştu:", error);
            } finally {
                if (isMounted) {
                    stopLoading();
                }
            }
        };

        fetchStaticPotholes().then(r => r);

        return () => {
            isMounted = false;
        };
    }, [startLoading, stopLoading]);

    return (
        <PageWrapper showHeader showBottomNav>
            <PWAInstallBanner/>
            <MainMap
                potholes={potholes}
                onMarkerClick={function (pothole: IPothole): void {
                    console.log(pothole);
                    throw new Error("Function not implemented.");
                }}
            />

            <BottomNav/>
        </PageWrapper>
    );
};

export default HomePage;