export interface IPotholeRecord {
    category: 'pothole' | 'damage' | 'other' | string;
    latitude: number;
    longitude: number;
    city: string;
}
