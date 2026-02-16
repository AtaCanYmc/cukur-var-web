import { useServices } from '../context/ServiceContext';
import type { IReportService } from '../services/report/IReportService';

export const useReportService = (): IReportService => {
    const { reportService } = useServices();
    return reportService;
};
