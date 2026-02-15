export interface IPothole {
    id: string;
    lat: number;
    lng: number;
    status: 'active' | 'repaired' | 'verifying';
    severity: 'low' | 'medium' | 'high';
}