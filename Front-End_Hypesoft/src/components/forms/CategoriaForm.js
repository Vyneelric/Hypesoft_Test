import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCriarCategoria } from '@/hooks/useCategoria';
import { toast } from 'sonner';
const categoriaSchema = z.object({
    nome: z.string().min(1, 'Nome é obrigatório').max(100, 'Nome deve ter no máximo 100 caracteres'),
    descricao: z.string().min(1, 'Descrição é obrigatória').max(500, 'Descrição deve ter no máximo 500 caracteres')
});
export function CategoriaForm({ onSuccess }) {
    const { mutate: criarCategoria, isPending } = useCriarCategoria();
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(categoriaSchema),
        mode: 'onChange',
        defaultValues: {
            nome: '',
            descricao: ''
        }
    });
    const onSubmitForm = (data) => {
        criarCategoria(data, {
            onSuccess: () => {
                reset();
                toast.success('Categoria criada com sucesso!');
                onSuccess?.();
            },
            onError: () => {
                toast.error('Erro ao criar categoria');
            }
        });
    };
    return (_jsxs("form", { onSubmit: handleSubmit(onSubmitForm), className: "bg-white space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium", children: "Nome da Categoria" }), _jsx(Input, { className: "mt-2 placeholder:text-sm placeholder:text-gray-600 rounded-lg", placeholder: "Ex: Eletr\u00F4nicos", ...register('nome') }), errors.nome && _jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.nome.message })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium", children: "Descri\u00E7\u00E3o" }), _jsx(Input, { className: "mt-2 placeholder:text-sm placeholder:text-gray-600 rounded-lg", placeholder: "Descri\u00E7\u00E3o da categoria", ...register('descricao') }), errors.descricao && _jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.descricao.message })] }), _jsx("div", { className: "flex justify-center", children: _jsx(Button, { type: "submit", disabled: isPending, className: "w-38 h-10 rounded-xl bg-[#F8F8F8] text-black items-center gap-2 p-3 border border-gray-300", children: isPending ? 'Enviando...' : 'Enviar Categoria' }) })] }));
}
