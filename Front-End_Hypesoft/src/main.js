import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import './index.css';
import { AppLayout } from './components/layout/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { Produtos } from './pages/Produtos';
import { Categorias } from './pages/Categorias';
import { ErrorBoundary } from './components/ErrorBoundary';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
const router = createBrowserRouter([
    {
        path: '/',
        element: _jsx(AppLayout, {}),
        errorElement: _jsx(ErrorBoundary, {}),
        children: [
            { index: true, element: _jsx(Dashboard, {}) },
            { path: 'produtos', element: _jsx(Produtos, {}) },
            { path: 'categorias', element: _jsx(Categorias, {}) }
        ],
    },
]);
const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(_jsx(StrictMode, { children: _jsx(AuthProvider, { children: _jsxs(QueryClientProvider, { client: queryClient, children: [_jsx(Toaster, { position: "top-right", richColors: true }), _jsx(RouterProvider, { router: router })] }) }) }));
