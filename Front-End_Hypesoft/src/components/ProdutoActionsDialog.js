import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trash2, Edit } from 'lucide-react';
export function ProdutoActionsDialog({ open, onOpenChange, onDelete, onUpdate }) {
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "bg-white sm:max-w-md", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { className: 'text-center', children: "A\u00E7\u00F5es do Produto" }) }), _jsxs("div", { className: "flex flex-col gap-3", children: [_jsxs(Button, { onClick: onUpdate, className: "w-full flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white", children: [_jsx(Edit, { size: 18 }), "Atualizar"] }), _jsxs(Button, { onClick: onDelete, className: "w-full flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white", children: [_jsx(Trash2, { size: 18 }), "Apagar"] })] })] }) }));
}
