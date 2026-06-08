import { useState } from 'react';
import { supabase } from '../lib/supabase';
import type {IPotholeRecord} from '../types/potholeReport';

export const useSupabaseReport = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const savePotholeCoordinates = async (record: IPotholeRecord) => {
        // 🚨 Fail-Silent: Client yoksa sessizce çık. Ana mail akışını baltalama.
        if (!supabase) {
            console.warn("Supabase client bulunamadı, arşivleme adımı atlandı.");
            return;
        }

        setIsSubmitting(true);
        try {
            const { error } = await supabase
                .from('potholes')
                .insert([
                    {
                        category: record.category,
                        latitude: record.latitude,
                        longitude: record.longitude,
                        city: record.city
                    }
                ]);

            if (error) {
                throw error;
            }
            
            console.log("📍 Lokasyon sivil arşive başarıyla eklendi.");
        } catch (error) {
            // Sadece logla, asla dışarıya throw etme ki vatandaşın mail atma süreci kesilmesin!
            console.error("Supabase kayıt hatası (Sessizce yutuldu):", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        savePotholeCoordinates,
        isSubmitting
    };
};
