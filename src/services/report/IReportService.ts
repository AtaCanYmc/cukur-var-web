export interface ReportData {
    id: string;
    image: string; // Base64
    category: string;
    description: string;
    location?: {
        lat: number;
        lng: number;
    };
    timestamp: number;
    status: 'pending' | 'approved' | 'rejected';
}

export interface IReportService {
    createReport(report: Omit<ReportData, 'id' | 'timestamp' | 'status'>): Promise<void>;
    getReports(): Promise<ReportData[]>;
    getReportById(id: string): Promise<ReportData | undefined>;
}
