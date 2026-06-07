import {useEffect} from "react";
import {useUIStore} from "../store/useUIStore.ts";
import {MainMap} from "../components/map/MainMap.tsx";
import type {IPothole} from "../components/map/types/Pothole.ts";
import {BottomNav} from "../components/layout/BottomNav.tsx";
import {PageWrapper} from "../components/layout/PageWrapper.tsx";
import {PWAInstallBanner} from "../components/layout/PWAInstallBanner.tsx";

const HomePage = () => {
    const startLoading = useUIStore(state => state.startLoading);
    const stopLoading = useUIStore(state => state.stopLoading);

    useEffect(() => {
        // Veri çekme simülasyonu
        startLoading('Yükleniyor...');

        const timer = setTimeout(() => {
            stopLoading();
        }, 500);

        return () => clearTimeout(timer);
    }, [startLoading, stopLoading]);

    return (
        <PageWrapper showHeader showBottomNav>
            <PWAInstallBanner />
            <MainMap
                potholes={[
                    {
                        id: "",
                        lat: 0,
                        lng: 0,
                        status: "active",
                        severity: "low"
                    }
                ]}
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