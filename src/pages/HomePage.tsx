import { useEffect } from "react";
import { useUIStore } from "../store/useUIStore.ts";
import { MainMap } from "../components/map/MainMap.tsx";
import type { IPothole } from "../components/map/types/Pothole.ts";
import { BottomNav } from "../components/layout/BottomNav.tsx";
import { PageWrapper } from "../components/layout/PageWrapper.tsx";

const HomePage = () => {
    const { startLoading, stopLoading } = useUIStore();

    useEffect(() => {
        // Veri çekme simülasyonu
        startLoading('Çukurlar Haritalanıyor...');

        const timer = setTimeout(() => {
            stopLoading();
        }, 2000);

        return () => clearTimeout(timer);
    }, [startLoading, stopLoading]);

    return (
        <PageWrapper showHeader showBadges showBottomNav>
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

            <BottomNav />
        </PageWrapper>
    );
};

export default HomePage;