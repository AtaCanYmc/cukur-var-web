import { useState, useEffect } from 'react';

interface NominatimResponse {
    address?: {
        road?: string;
        neighbourhood?: string;
        suburb?: string;
        city_district?: string;
        city?: string;
        town?: string;
        province?: string;
        state?: string;
        country?: string;
        postcode?: string;
    };
    display_name?: string;
    error?: string;
}

export const useNominatim = (lat?: number, lng?: number) => {
    const [address, setAddress] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!lat || !lng) return;

        const fetchAddress = async () => {
            setLoading(true);
            setError(null);
            try {
                // Nominatim Reverse Geocoding API
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&accept-language=tr`,
                    {
                        headers: {
                            // Note: Bazı tarayıcılar User-Agent header'ını ezdirmeyebilir, 
                            // ancak Nominatim politikaları gereği ekliyoruz.
                            'User-Agent': 'CukurVar-App'
                        }
                    }
                );

                if (!response.ok) {
                    throw new Error('Adres çözümlenemedi');
                }

                const data: NominatimResponse = await response.json();
                
                if (data.error) {
                    throw new Error(data.error);
                }

                if (data.display_name) {
                    setAddress(data.display_name);
                } else {
                    setAddress('Adres bulunamadı');
                }
            } catch (err: any) {
                setError(err.message || 'Bir hata oluştu');
                setAddress('');
            } finally {
                setLoading(false);
            }
        };

        fetchAddress();
    }, [lat, lng]);

    return { address, loading, error };
};
