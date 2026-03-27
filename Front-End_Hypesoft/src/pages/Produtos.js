import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ProdutoForm } from '@/components/forms/ProdutoForm';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useProdutos, useAtualizarProduto, useDeletarProduto } from '@/hooks/useProduto';
import { useCategorias } from '@/hooks/useCategoria';
import { ProdutoActionsDialog } from '@/components/ProdutoActionsDialog';
import { ProdutoUpdateForm } from '@/components/forms/ProdutoUpdateForm';
import { useState } from 'react';
import { toast } from 'sonner';
export function Produtos() {
    const { data: produtos, isLoading, error } = useProdutos();
    const { data: categorias = [] } = useCategorias();
    const [selectedProduto, setSelectedProduto] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
    const { mutate: atualizarProduto } = useAtualizarProduto();
    const { mutate: deletarProduto } = useDeletarProduto();
    const [criarDialogOpen, setCriarDialogOpen] = useState(false);
    const [filtroNome, setFiltroNome] = useState('');
    const [filtroEstoque, setFiltroEstoque] = useState('');
    const [filtroCategoria, setFiltroCategoria] = useState(undefined);
    const produtosFiltrados = produtos?.filter((produto) => {
        const matchNome = produto.nome.toLowerCase().includes(filtroNome.toLowerCase());
        const matchEstoque = filtroEstoque === '' || produto.quantidade_estoque <= Number(filtroEstoque);
        const matchCategoria = !filtroCategoria || produto.categoria_id === filtroCategoria || produto.category?.id === filtroCategoria;
        return matchNome && matchEstoque && matchCategoria;
    }) || [];
    const handleDelete = () => {
        if (!selectedProduto)
            return;
        deletarProduto(selectedProduto.id, {
            onSuccess: () => {
                toast.success('Produto deletado com sucesso!');
                setDialogOpen(false);
            },
            onError: () => {
                toast.error('Erro ao deletar produto');
            }
        });
    };
    const handleUpdate = () => {
        setDialogOpen(false);
        setUpdateDialogOpen(true);
    };
    const handleUpdateSubmit = (data) => {
        atualizarProduto(data, {
            onSuccess: () => {
                toast.success('Produto atualizado com sucesso!');
                setUpdateDialogOpen(false);
            },
            onError: () => {
                toast.error('Erro ao atualizar produto');
            }
        });
    };
    return (_jsxs("div", { className: "w-full min-h-screen pb-6", children: [_jsxs("div", { className: "w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-4 sm:px-6 py-4", children: [_jsx("p", { className: "text-xl sm:text-2xl font-medium", children: "Produtos" }), _jsxs(Dialog, { open: criarDialogOpen, onOpenChange: setCriarDialogOpen, children: [_jsx(DialogTrigger, { asChild: true, children: _jsxs(Button, { className: "w-full sm:w-auto h-10 rounded-3xl bg-[#FFFFFF] text-black flex items-center justify-center gap-2 px-4 border border-gray-300", children: [_jsx(Plus, {}), "Criar produto"] }) }), _jsxs(DialogContent, { className: "bg-white w-[95vw] sm:max-w-xl max-h-[90vh] overflow-y-auto", "aria-describedby": undefined, children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { className: "font-bold mb-2 text-center", children: "Novo Produto" }) }), _jsx(ProdutoForm, { onSuccess: () => setCriarDialogOpen(false) })] })] })] }), _jsx("div", { className: "w-full h-auto bg-[#FAFAFC] p-4 sm:p-8", children: _jsxs(Card, { className: "border-none ring-0 w-full h-full bg-[#FFFFFF]", children: [_jsx("p", { className: "flex mt-2 ml-4 sm:ml-10 font-bold text-lg sm:text-xl", children: "Filtros" }), _jsx(CardHeader, { className: "flex flex-col sm:flex-row items-stretch sm:items-center gap-2 px-4", children: _jsxs(CardTitle, { className: "w-full items-center font-semibold text-base sm:text-lg flex flex-col sm:flex-row gap-3 sm:gap-4 p-2 sm:p-4", children: [_jsx(Input, { className: "w-full sm:w-56 placeholder:text-sm placeholder:text-gray-600 rounded-lg h-10", placeholder: "Busca por nome...", value: filtroNome, onChange: (e) => setFiltroNome(e.target.value) }), _jsx(Input, { className: "w-full sm:w-56 placeholder:text-sm placeholder:text-gray-600 rounded-lg h-10", placeholder: "Qnt. Estoque M\u00E1ximo", type: "number", value: filtroEstoque, onChange: (e) => setFiltroEstoque(e.target.value) }), _jsxs("div", { className: "relative w-full sm:w-56", children: [_jsxs(Select, { value: filtroCategoria, onValueChange: setFiltroCategoria, children: [_jsx(SelectTrigger, { className: "w-full", children: _jsx(SelectValue, { placeholder: "Todas as categorias" }) }), _jsx(SelectContent, { children: categorias.map((cat) => (_jsx(SelectItem, { value: cat.id, children: cat.nome }, cat.id))) })] }), filtroCategoria && (_jsx("button", { onClick: () => setFiltroCategoria(undefined), className: "absolute right-8 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600", type: "button", children: "\u2715" }))] })] }) }), _jsx(CardContent, { className: "px-2 sm:px-6", children: _jsx("div", { className: "w-full h-[442px] overflow-y-auto overflow-x-auto", children: _jsxs(Table, { className: "w-full min-w-[800px]", children: [_jsx(TableHeader, { className: 'justify-center', children: _jsxs(TableRow, { children: [_jsx(TableHead, { className: "w-[30%] text-gray-600 text-xs sm:text-sm text-center", children: "ID" }), _jsx(TableHead, { className: "w-[20%] text-gray-600 text-xs sm:text-sm text-center", children: "Nome" }), _jsx(TableHead, { className: "w-[35%] text-gray-600 text-xs sm:text-sm text-center", children: "Descri\u00E7\u00E3o" }), _jsx(TableHead, { className: "w-[15%] text-gray-600 text-xs sm:text-sm text-center", children: "Pre\u00E7o" }), _jsx(TableHead, { className: "w-[15%] text-gray-600 text-xs sm:text-sm text-center", children: "Qnt. estoque" }), _jsx(TableHead, { className: "w-[15%] text-gray-600 text-xs sm:text-sm text-center", children: "Categoria" })] }) }), _jsx(TableBody, { children: isLoading ? (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: 6, className: "text-center", children: "Carregando..." }) })) : error ? (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: 6, className: "text-center text-red-500", children: "Erro ao carregar produtos" }) })) : produtosFiltrados?.map((produto) => (_jsxs(TableRow, { className: "cursor-pointer hover:bg-gray-50", onClick: () => {
                                                    setSelectedProduto(produto);
                                                    setDialogOpen(true);
                                                }, children: [_jsx(TableCell, { className: "break-all whitespace-normal text-xs sm:text-sm text-center", children: produto.id }), _jsx(TableCell, { className: "break-all whitespace-normal text-xs sm:text-sm text-center", children: produto.nome }), _jsx(TableCell, { className: "break-all whitespace-normal text-xs sm:text-sm text-center", children: produto.descricao }), _jsxs(TableCell, { className: "break-all whitespace-normal text-xs sm:text-sm text-center", children: ["R$ ", produto.preco] }), _jsx(TableCell, { className: "break-all whitespace-normal text-xs sm:text-sm text-center", children: produto.quantidade_estoque }), _jsx(TableCell, { className: "break-all whitespace-normal text-xs sm:text-sm text-center", children: produto.category?.nome })] }, produto.id))) })] }) }) })] }) }), _jsx(ProdutoActionsDialog, { open: dialogOpen, onOpenChange: setDialogOpen, onDelete: handleDelete, onUpdate: handleUpdate }), _jsx(Dialog, { open: updateDialogOpen, onOpenChange: setUpdateDialogOpen, children: _jsxs(DialogContent, { className: "bg-white w-[95vw] sm:max-w-xl max-h-[90vh] overflow-y-auto", "aria-describedby": undefined, children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { className: "font-bold mb-2", children: "Atualizar Produto" }) }), selectedProduto && (_jsx(ProdutoUpdateForm, { produto: selectedProduto, onSubmit: handleUpdateSubmit, onCancel: () => setUpdateDialogOpen(false) }))] }) })] }));
}
