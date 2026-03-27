import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CategoriaForm } from '@/components/forms/CategoriaForm';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useCategorias, useDeletarCategoria } from '@/hooks/useCategoria';
import { useState } from 'react';
import { CategoriaActionsDialog } from '@/components/CategoriaActionsDialog';
import { toast } from 'sonner';
export function Categorias() {
    const { data: categorias, isLoading, error } = useCategorias();
    const { mutate: deletarCategoria } = useDeletarCategoria();
    const [criarDialogOpen, setCriarDialogOpen] = useState(false);
    const [selectedCategoria, setSelectedCategoria] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [filtroNome, setFiltroNome] = useState('');
    const categoriasFiltradas = categorias?.filter((categoria) => categoria.nome.toLowerCase().includes(filtroNome.toLowerCase())) || [];
    const handleDelete = () => {
        if (!selectedCategoria)
            return;
        deletarCategoria(selectedCategoria.id, {
            onSuccess: () => {
                toast.success('Categoria deletada com sucesso!');
                setDialogOpen(false);
            },
            onError: () => {
                toast.error('Erro ao deletar categoria');
            }
        });
    };
    return (_jsxs("div", { className: "w-full min-h-screen pb-6", children: [_jsxs("div", { className: "w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-4 sm:px-6 py-4", children: [_jsx("p", { className: "text-xl sm:text-2xl font-medium", children: "Categorias" }), _jsxs(Dialog, { open: criarDialogOpen, onOpenChange: setCriarDialogOpen, children: [_jsx(DialogTrigger, { asChild: true, children: _jsxs(Button, { className: "w-full sm:w-auto h-10 rounded-3xl bg-[#FFFFFF] text-black flex items-center justify-center gap-2 px-4 border border-gray-300", children: [_jsx(Plus, {}), "Criar categoria"] }) }), _jsxs(DialogContent, { className: "bg-white w-[95vw] sm:max-w-xl max-h-[90vh] overflow-y-auto", "aria-describedby": undefined, children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { className: "font-bold mb-2 text-center", children: "Nova Categoria" }) }), _jsx(CategoriaForm, { onSuccess: () => setCriarDialogOpen(false) })] })] })] }), _jsx("div", { className: "w-full h-auto bg-[#FAFAFC] p-4 sm:p-8", children: _jsxs(Card, { className: "border-none ring-0 w-full h-full bg-[#FFFFFF]", children: [_jsx("p", { className: "flex mt-2 ml-4 sm:ml-10 font-bold text-lg sm:text-xl", children: "Filtros" }), _jsx(CardHeader, { className: "flex flex-row items-center gap-2 px-4", children: _jsx(CardTitle, { className: "w-full items-center font-semibold text-base sm:text-lg flex gap-4 p-2 sm:p-4", children: _jsx(Input, { className: "w-full sm:w-56 placeholder:text-sm placeholder:text-gray-600 rounded-lg h-10", placeholder: "Busca por nome...", value: filtroNome, onChange: (e) => setFiltroNome(e.target.value) }) }) }), _jsx(CardContent, { className: "px-2 sm:px-6", children: _jsx("div", { className: "w-full h-[442px] overflow-y-auto overflow-x-auto", children: _jsxs(Table, { className: "w-full min-w-[600px]", children: [_jsx(TableHeader, { className: 'justify-center', children: _jsxs(TableRow, { children: [_jsx(TableHead, { className: "w-[30%] text-gray-600 text-xs sm:text-sm text-center", children: "ID" }), _jsx(TableHead, { className: "w-[20%] text-gray-600 text-xs sm:text-sm text-center", children: "Nome" }), _jsx(TableHead, { className: "w-[50%] text-gray-600 text-xs sm:text-sm text-center", children: "Descri\u00E7\u00E3o" })] }) }), _jsx(TableBody, { children: isLoading ? (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: 3, className: "text-center", children: "Carregando..." }) })) : error ? (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: 3, className: "text-center text-red-500", children: "Erro ao carregar categorias" }) })) : categoriasFiltradas?.map((categoria) => (_jsxs(TableRow, { className: "cursor-pointer hover:bg-gray-50", onClick: () => {
                                                    setSelectedCategoria(categoria);
                                                    setDialogOpen(true);
                                                }, children: [_jsx(TableCell, { className: "break-all whitespace-normal text-xs sm:text-sm text-center", children: categoria.id }), _jsx(TableCell, { className: "break-all whitespace-normal text-xs sm:text-sm text-center", children: categoria.nome }), _jsx(TableCell, { className: "break-all whitespace-normal text-xs sm:text-sm text-center", children: categoria.descricao })] }, categoria.id))) })] }) }) })] }) }), _jsx(CategoriaActionsDialog, { open: dialogOpen, onOpenChange: setDialogOpen, onDelete: handleDelete })] }));
}
