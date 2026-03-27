import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'

interface CategoriaActionsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onDelete: () => void
}

export function CategoriaActionsDialog({ open, onOpenChange, onDelete }: CategoriaActionsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white sm:max-w-md" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className='text-center'>Ações da Categoria</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3">
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
