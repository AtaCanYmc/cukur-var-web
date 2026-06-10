import { useState, useEffect } from 'react';
import { type Institution } from '../types/institutions.ts';
import {baseUrl} from "./useEnv.ts";

interface NominatimResponse {
    address?: {
        county?: string;
        town?: string;
        suburb?: string;
        city_district?: string;
    };
    display_name?: string;
    error?: string;
}

export const useMailAutomation = (lat?: number, lng?: number) => {
    const [baseInstitutions, setBaseInstitutions] = useState<Institution[]>([]);
    const [institutions, setInstitutions] = useState<Institution[]>([]);
    const [address, setAddress] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    const toggleInstitution = (id: string) => {
        setInstitutions(prev => prev.map(inst =>
            inst.id === id ? { ...inst, selected: !inst.selected } : inst
        ));
    };

    const getSelectedEmails = () => {
        return institutions.filter(i => i.selected).map(i => i.email).join(',');
    };

    useEffect(() => {
        fetch(`${baseUrl}json/institutions.json`)
            .then(res => res.json())
            .then((data: Institution[]) => {
                setBaseInstitutions(data);
                if (!lat || !lng) {
                    setInstitutions(data);
                    setLoading(false);
                }
            })
            .catch(err => {
                console.error("Failed to load institutions", err);
                setLoading(false);
            });
    }, [lat, lng]);

    useEffect(() => {
        if (!lat || !lng || baseInstitutions.length === 0) return;

        const fetchAddress = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&accept-language=tr`,
                    {
                        headers: {
                            'User-Agent': 'CukurVar-App'
                        }
                    }
                );

                if (!response.ok) throw new Error('Adres çözümlenemedi');

                const data: NominatimResponse = await response.json();
                
                if (data.error) throw new Error(data.error);

                const resolvedAddress = data.display_name || 'Adres bulunamadı';
                const rawAddress = data.address || {};
                
                setAddress(resolvedAddress);

                // İlçe Eşleştirme Algoritması
                const districtName = (rawAddress.county || rawAddress.town || rawAddress.suburb || rawAddress.city_district || '').toLocaleLowerCase('tr-TR');
                
                if (districtName) {
                    setInstitutions(baseInstitutions.map(inst => {
                        if (inst.id === 'izmir_bb') return { ...inst, selected: true };
                        
                        const instNameNormalized = inst.name.toLocaleLowerCase('tr-TR');
                        const districtWords = districtName.split(/\s+/);
                        const isMatch = districtWords.some(word => word.length > 3 && instNameNormalized.includes(word)) || instNameNormalized.includes(districtName);

                        return { ...inst, selected: isMatch || inst.selected };
                    }).sort(a => a.selected ? -1 : 1));
                } else {
                    setInstitutions(baseInstitutions);
                }

            } catch {
                // Sessiz hata yönetimi (Dayanıklılık)
                setAddress('Konum koordinat bazlı hazırlandı');
                setInstitutions(baseInstitutions.map(inst => 
                    inst.id === 'izmir_bb' ? { ...inst, selected: true } : { ...inst, selected: false }
                ));
            } finally {
                setLoading(false);
            }
        };

        fetchAddress();
    }, [lat, lng, baseInstitutions]);

    return { 
        institutions, 
        toggleInstitution, 
        getSelectedEmails, 
        address, 
        loading 
    };
};
