import React, { createContext, useContext, type ReactNode } from 'react';
import type { IReportService } from '../services/report/IReportService';
import { MockReportService } from '../services/report/MockReportService';

interface IServiceContext {
    reportService: IReportService;
}

const ServiceContext = createContext<IServiceContext | undefined>(undefined);

// Initialize services (Lazy or Singleton)
const reportService = new MockReportService();

export const ServiceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <ServiceContext.Provider value={{ reportService }}>
            {children}
        </ServiceContext.Provider>
    );
};

export const useServices = (): IServiceContext => {
    const context = useContext(ServiceContext);
    if (!context) {
        throw new Error('useServices must be used within a ServiceProvider');
    }
    return context;
};
