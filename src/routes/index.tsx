import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ROUTES } from "./paths..ts";
import { GlobalLoader } from "../components/loader/GlobalLoader.tsx";

// Sayfaları Lazy Load olarak tanımlayalım
const HomePage = lazy(() => import('../pages/HomePage.tsx'));
const ReportPage = lazy(() => import('../pages/ReportPage.tsx'));
const AboutPage = lazy(() => import('../pages/AboutPage.tsx'));

const router = createBrowserRouter([
    {
        path: ROUTES.HOME,
        element: (
            <Suspense fallback={<GlobalLoader />}>
                <HomePage />
            </Suspense>
        ),
    },
    {
        path: ROUTES.REPORT,
        element: (
            <Suspense fallback={<GlobalLoader />}>
                <ReportPage />
            </Suspense>
        ),
    },
    {
        path: ROUTES.ABOUT,
        element: (
            <Suspense fallback={<GlobalLoader />}>
                <AboutPage />
            </Suspense>
        ),
    },
]);

export const AppRouter = () => <RouterProvider router={router} />;