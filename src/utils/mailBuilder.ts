import { MAIL_TEMPLATES } from '../constants/MailTemplates';

interface IMailBuilderParams {
    category: string;
    description: string;
    location: { lat: number; lng: number } | null;
    address: string;
    images: string[];
}

export const buildMailContent = ({ category, description, location, address, images }: IMailBuilderParams) => {
    // Koordinatlar
    const coords = location 
        ? `${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}` 
        : 'Konum bilgisi yok';
        
    // Google Haritalar linki
    const googleMapsLink = location 
        ? `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}` 
        : '';
        
    // Konu başlığı
    const subjectTitle = category === 'pothole' ? 'Tehlikeli Çukur' : category;
    const subject = `Çukur İhbarı: ${subjectTitle} - ${new Date().toLocaleDateString('tr-TR')}`;

    // Mail Gövdesi (Template içerisinden)
    const body = MAIL_TEMPLATES[category]?.({
        locationName: address || 'Belirtilmemiş / İzmir',
        coordinates: coords,
        date: new Date().toLocaleDateString('tr-TR'),
        googleMapsLink,
        description,
    }) || 'Açıklama belirtilmedi.';

    // Base64 görseller
    const imageAttachments = images.map(img => `data:image/jpeg;base64,${img}`);

    return { subject, body, imageAttachments };
};
