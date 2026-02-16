import type { IReportService, ReportData } from './IReportService';

const STORAGE_KEY = 'cukurvar_reports';

export class MockReportService implements IReportService {
    async createReport(report: Omit<ReportData, 'id' | 'timestamp' | 'status'>): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newReport: ReportData = {
                    ...report,
                    id: crypto.randomUUID(),
                    timestamp: Date.now(),
                    status: 'pending'
                };

                const reports = this.getStoredReports();
                reports.push(newReport);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));

                console.log('Report created:', newReport);
                resolve();
            }, 800); // Simulate network delay
        });
    }

    async getReports(): Promise<ReportData[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.getStoredReports());
            }, 400);
        });
    }

    async getReportById(id: string): Promise<ReportData | undefined> {
        return new Promise((resolve) => {
            // Simulate network delay
            setTimeout(() => {
                const reports = this.getStoredReports();
                resolve(reports.find(r => r.id === id));
            }, 300);
        });
    }

    private getStoredReports(): ReportData[] {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    }
}
