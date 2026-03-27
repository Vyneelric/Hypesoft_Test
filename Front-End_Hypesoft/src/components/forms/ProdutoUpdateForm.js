import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCategorias } from '@/hooks/useCategoria';
const produtoSchema = z.object({
    nome: z.string().min(1, 'Nome é obrigatório').max(100, 'Nome deve ter no máximo 100 caracteres'),
    descricao: z.string().min(1, 'Descrição é obrigatória').max(500, 'Descrição deve ter no máximo 500 caracteres'),
    preco: z.preprocess((v) => Number(v), z.number().gt(0, 'Preço deve ser maior que 0')),
    quantidade_estoque: z.preprocess((v) => Number(v), z.number().gte(0, 'Quantidade deve ser maior ou igual a 0')),
    categoria_id: z.string().min(1, 'Categoria é obrigatória')
});
export function ProdutoUpdateForm({ produto, onSubmit, onCancel }) {
    const { data: categorias = [] } = useCategorias();
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
        resolver: zodResolver(produtoSchema),
        mode: 'onChange',
        defaultValues: {
            nome: produto.nome,
            descricao: produto.descricao,
            preco: produto.preco,
            quantidade_estoque: produto.quantidade_estoque,
            categoria_id: produto.categoria_id
        }
    });
    const categoriaId = watch('categoria_id');
    const onSubmitForm = (data) => {
        onSubmit({ id: produto.id, ...data });
    };
    return (_jsxs("form", { onSubmit: handleSubmit(onSubmitForm), className: "bg-white space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium", children: "Nome do Produto" }), _jsx(Input, { className: "mt-2 placeholder:text-sm placeholder:text-gray-600 rounded-lg", placeholder: "Ex: Mouse Gamer", ...register('nome') }), errors.nome && _jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.nome.message })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium", children: "Descri\u00E7\u00E3o" }), _jsx(Input, { className: "mt-2 placeholder:text-sm placeholder:text-gray-600 rounded-lg", placeholder: "Descri\u00E7\u00E3o do produto", ...register('descricao') }), errors.descricao && _jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.descricao.message })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium", children: "Pre\u00E7o" }), _jsx(Input, { className: "mt-2 placeholder:text-sm placeholder:text-gray-600 rounded-lg", type: "number", step: "0.01", placeholder: "0.00", ...register('preco') }), errors.preco && _jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.preco.message })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium", children: "Quantidade em estoque" }), _jsx(Input, { className: "mt-2 placeholder:text-sm placeholder:text-gray-600 rounded-lg", type: "number", placeholder: "0", ...register('quantidade_estoque') }), errors.quantidade_estoque && _jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.quantidade_estoque.message })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium", children: "Categoria" }), _jsxs(Select, { value: categoriaId, onValueChange: (value) => setValue('categoria_id', value, { shouldValidate: true }), children: [_jsx(SelectTrigger, { className: "mt-2", children: _jsx(SelectValue, { placeholder: "Selecione uma categoria" }) }), _jsx(SelectContent, { children: categorias.map((cat) => (_jsx(SelectItem, { value: cat.id, children: cat.nome }, cat.id))) })] }), errors.categoria_id && _jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.categoria_id.message })] }), _jsxs("div", { className: "flex justify-center gap-3", children: [_jsx(Button, { type: "button", onClick: onCancel, className: "w-38 h-10 rounded-xl bg-gray-200 text-black hover:bg-gray-300", children: "Cancelar" }), _jsx(Button, { type: "submit", className: "w-38 h-10 rounded-xl bg-blue-600 text-white hover:bg-blue-700", children: "Atualizar" })] })] }));
}
