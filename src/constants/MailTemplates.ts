interface ITemplateParams {
    locationName?: string;
    coordinates: string;
    date: string;
    googleMapsLink: string;
    description?: string;
}

// Şablonları merkezi bir nesnede topluyoruz
export const MAIL_TEMPLATES: Record<string, (p: ITemplateParams) => string> = {
    pothole: (p) => `
SAYIN BELEDİYE YETKİLİLERİ,

Aşağıda bilgileri yer alan noktada trafik güvenliğini tehlikeye atan bir ÇUKUR tespit ettim:

📍 KONUM: ${p.locationName || 'Konum bilgisi girilmedi.'}
🌐 KOORDİNATLAR: ${p.coordinates}
🗺️ HARİTA: ${p.googleMapsLink}
⏰ TARİH: ${p.date}

${p.description ? `AÇIKLAMA: ${p.description}` : ''}

Acil onarım yapılmasını arz ederim.
`.trim(),

    damage: (p) => `
SAYIN BELEDİYE YETKİLİLERİ,

Aşağıdaki konumda bulunan bakım eksikliği (çukur) nedeniyle aracımda MADDİ HASAR meydana geldi:

📍 KONUM: ${p.locationName || 'Konum bilgisi girilmedi.'}
🌐 KOORDİNAT: ${p.coordinates}
🗺️ HARİTA: ${p.googleMapsLink}
⏰ OLAY ZAMANI: ${p.date}

${p.description ? `AÇIKLAMA: ${p.description}` : ''}

İlgili birimlerin hasar tespiti ve onarım sürecini başlatmasını talep ediyorum.
`.trim(),

    other: (p) => `
SAYIN BELEDİYE YETKİLİLERİ,

İzmir sınırları içerisinde bir yol altyapı sorunu bildirmek istiyorum:

📍 KONUM: ${p.locationName || 'Konum bilgisi girilmedi.'}
🌐 KOORDİNAT: ${p.coordinates}
🗺️ HARİTA: ${p.googleMapsLink}

${p.description ? `AÇIKLAMA: ${p.description}` : ''}

Gereğinin yapılmasını bilgilerinize sunarım.
`.trim(),
};