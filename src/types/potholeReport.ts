export interface IPotholeRecord {
    id?: string;
    category: 'pothole' | 'damage' | 'other' | string;
    latitude: number;
    longitude: number;
    city: string;
}
