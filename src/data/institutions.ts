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
        id: 'emniyet',
        name: 'İzmir Emniyet Müdürlüğü (Trafik)',
        email: 'izmiremniyet@egm.gov.tr',
        selected: true
    },
    {
        id: 'karayollari',
        name: 'Karayolları 2. Bölge Müdürlüğü',
        email: 'bol02@kgm.gov.tr',
        selected: false
    },
    {
        id: 'konak',
        name: 'Konak Belediyesi',
        email: 'iletisim@konak.bel.tr',
        selected: false
    },
    {
        id: 'bornova',
        name: 'Bornova Belediyesi',
        email: 'iletisim@bornova.bel.tr',
        selected: false
    },
    {
        id: 'buca',
        name: 'Buca Belediyesi',
        email: 'iletisim@buca.bel.tr',
        selected: false
    },
    {
        id: 'karsiyaka',
        name: 'Karşıyaka Belediyesi',
        email: 'iletisim@karsiyaka.bel.tr',
        selected: false
    },
    {
        id: 'cigli',
        name: 'Çiğli Belediyesi',
        email: 'iletisim@cigli.bel.tr',
        selected: false
    },
    {
        id: 'gaziemir',
        name: 'Gaziemir Belediyesi',
        email: 'iletisim@gaziemir.bel.tr',
        selected: false
    },
    {
        id: 'balcova',
        name: 'Balçova Belediyesi',
        email: 'iletisim@balcova.bel.tr',
        selected: false
    },
    {
        id: 'narlidere',
        name: 'Narlıdere Belediyesi',
        email: 'iletisim@narlidere.bel.tr',
        selected: false
    },
    {
        id: 'karabaglar',
        name: 'Karabağlar Belediyesi',
        email: 'iletisim@karabaglar.bel.tr',
        selected: false
    },
    {
        id: 'bayrakli',
        name: 'Bayraklı Belediyesi',
        email: 'iletisim@bayrakli.bel.tr',
        selected: false
    }
];
