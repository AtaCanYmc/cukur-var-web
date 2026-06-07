import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ROUTES } from "./paths..ts";
import { GlobalLoader } from "../components/loader/GlobalLoader.tsx";

// Sayfaları Lazy Load olarak tanımlayalım
const HomePage = lazy(() => import('../pages/HomePage.tsx'));
const ReportPage = lazy(() => import('../pages/ReportPage.tsx'));
const AboutPage = lazy(() => import('../pages/AboutPage.tsx'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage.tsx'));

const router = createBrowserRouter([
    {
        path: ROUTES.HOME,
        errorElement: (
            <Suspense fallback={<GlobalLoader />}>
                <NotFoundPage />
            </Suspense>
        ),
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
], {
    basename: import.meta.env.BASE_URL
});

export const AppRouter = () => <RouterProvider router={router} />;