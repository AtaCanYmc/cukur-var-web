import {useEffect, useState} from "react";
import {useUIStore} from "../store/useUIStore.ts";
import {MainMap} from "../components/map/MainMap.tsx";
import type {IPothole} from "../components/map/types/Pothole.ts";
import {BottomNav} from "../components/layout/BottomNav.tsx";
import {PageWrapper} from "../components/layout/PageWrapper.tsx";
import {PWAInstallBanner} from "../components/layout/PWAInstallBanner.tsx";
import {supabase} from "../lib/supabase.ts";
import type {IPotholeRecord} from "../types/potholeReport.ts";

const HomePage = () => {
    const startLoading = useUIStore(state => state.startLoading);
    const stopLoading = useUIStore(state => state.stopLoading);
    const [potholes, setPotholes] = useState<IPothole[]>([]);

    useEffect(() => {
        let isMounted = true;

        const fetchPotholes = async () => {
            if (!supabase) {
                // Supabase kurulu değilse simülasyon olarak geç veya doğrudan çık
                return;
            }

            try {
                startLoading('İhbarlar yükleniyor...');
                
                // Supabase'den canlı koordinatları çek (En yeni en üstte)
                const { data, error } = await supabase
                    .from('potholes')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) {
                    throw error;
                }

                if (data && isMounted) {
                    const mappedData: IPothole[] = data.map((item: IPotholeRecord) => ({
                        id: item.id || crypto.randomUUID(),
                        lat: item.latitude,
                        lng: item.longitude, // Supabase'deki longitude -> Haritanın beklediği lng
                        status: 'active', // Harita marker'ını aktif tut
                        severity: item.category === 'pothole' ? 'high' : 'low' // Kategoriye göre dinamik tehlike derecesi
                    }));
                    
                    setPotholes(mappedData);
                }
            } catch (error) {
                console.error("Harita verileri Supabase'den çekilirken hata oluştu:", error);
            } finally {
                if (isMounted) {
                    stopLoading();
                }
            }
        };

        fetchPotholes().then(r => r);

        return () => {
            isMounted = false;
        };
    }, [startLoading, stopLoading]);

    return (
        <PageWrapper showHeader showBottomNav>
            <PWAInstallBanner />
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