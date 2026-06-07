import { describe, it, expect } from 'vitest';
import { buildMailContent } from './mailBuilder';

describe('mailBuilder.ts', () => {
    it('should build correct subject for pothole category', () => {
        const result = buildMailContent({
            category: 'pothole',
            description: 'Derin bir çukur',
            location: { lat: 38.4237, lng: 27.1428 },
            address: 'Konak, İzmir',
            images: []
        });

        expect(result.subject).toContain('Tehlikeli Çukur');
        expect(result.subject).toContain(new Date().toLocaleDateString('tr-TR'));
    });

    it('should build correct subject for damage category', () => {
        const result = buildMailContent({
            category: 'damage',
            description: 'Aracım hasar gördü',
            location: { lat: 38.4237, lng: 27.1428 },
            address: 'Konak, İzmir',
            images: []
        });

        expect(result.subject).toContain('damage');
        expect(result.subject).toContain(new Date().toLocaleDateString('tr-TR'));
    });

    it('should include correct coordinates and google maps link', () => {
        const location = { lat: 38.123456, lng: 27.654321 };
        const result = buildMailContent({
            category: 'other',
            description: 'Kaldırım çökmüş',
            location,
            address: 'Buca, İzmir',
            images: []
        });

        expect(result.body).toContain('38.123456, 27.654321');
        expect(result.body).toContain(`https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`);
    });

    it('should handle missing location data gracefully', () => {
        const result = buildMailContent({
            category: 'pothole',
            description: 'Test',
            location: null,
            address: '',
            images: []
        });

        expect(result.body).toContain('Konum bilgisi yok');
        expect(result.body).toContain('Belirtilmemiş / İzmir');
    });

    it('should attach base64 images properly', () => {
        const result = buildMailContent({
            category: 'pothole',
            description: 'Test',
            location: null,
            address: '',
            images: ['fakebase64data1', 'fakebase64data2']
        });

        expect(result.imageAttachments).toHaveLength(2);
        expect(result.imageAttachments[0]).toBe('data:image/jpeg;base64,fakebase64data1');
        expect(result.imageAttachments[1]).toBe('data:image/jpeg;base64,fakebase64data2');
    });
});
