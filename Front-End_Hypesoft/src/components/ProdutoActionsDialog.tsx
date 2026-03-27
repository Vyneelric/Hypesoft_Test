import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Trash2, Edit } from 'lucide-react'

interface ProdutoActionsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onDelete: () => void
  onUpdate: () => void
}

export function ProdutoActionsDialog({ open, onOpenChange, onDelete, onUpdate }: ProdutoActionsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className='text-center'>Ações do Produto</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <Button 
            onClick={onUpdate}
            className="w-full flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Edit size={18} />
            Atualizar
          </Button>
          <Button 
            onClick={onDelete}
            className="w-full flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white"
          >
            <Trash2 size={18} />
            Apagar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
