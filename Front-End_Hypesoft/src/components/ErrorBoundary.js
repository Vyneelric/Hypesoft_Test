import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRouteError, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
export function ErrorBoundary() {
    const error = useRouteError();
    return (_jsxs("div", { className: "w-full h-screen flex items-center justify-center flex-col gap-4", children: [_jsx("h1", { className: "text-4xl font-bold", children: "Oops!" }), _jsx("p", { className: "text-xl", children: "Algo deu errado." }), _jsx("p", { className: "text-gray-500", children: error?.message || 'Erro desconhecido' }), _jsx(Link, { to: "/", children: _jsx(Button, { children: "Voltar para o Dashboard" }) })] }));
}
