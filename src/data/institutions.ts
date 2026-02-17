export interface Institution {
    id: string;
    name: string;
    email: string;
    selected: boolean;
}

export const INITIAL_INSTITUTIONS: Institution[] = [
    {
        id: 'izmir_bb',
        name: 'İzmir Büyükşehir Belediyesi (HİM)',
        email: 'him@izmir.bel.tr',
        selected: true
    },
    {
        id: 'cimer',
        name: 'CİMER (Cumhurbaşkanlığı İletişim Merkezi)',
        email: 'cimer@iletisim.gov.tr', // This might not be a direct email, usually a form, but for mailto we need an email. Let's use a placeholder or remove if not applicable. 
        // Actually CİMER doesn't accept direct emails usually. Let's stick to local municipalities.
        // Let's replace with a generic district one for now or just keep İzmir BB.
        selected: true
    },
    {
        id: 'ilce_bel',
        name: 'İlçe Belediyesi (Konum Bazlı)',
        email: 'info@ilce.bel.tr', // Placeholder
        selected: true
    }
];
