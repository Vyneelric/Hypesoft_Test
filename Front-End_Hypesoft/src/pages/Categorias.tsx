import { Plus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { CategoriaForm } from '@/components/forms/CategoriaForm'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useCategorias, useDeletarCategoria } from '@/hooks/useCategoria'
import { useState } from 'react'
import { CategoriaActionsDialog } from '@/components/CategoriaActionsDialog'
import { toast } from 'sonner'

export function Categorias() {
  const { data: categorias, isLoading, error } = useCategorias()
  const { mutate: deletarCategoria } = useDeletarCategoria()
  const [criarDialogOpen, setCriarDialogOpen] = useState(false)
  const [selectedCategoria, setSelectedCategoria] = useState<any>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [filtroNome, setFiltroNome] = useState('')

  const categoriasFiltradas = categorias?.filter((categoria: any) =>
    categoria.nome.toLowerCase().includes(filtroNome.toLowerCase())
  ) || []

  const handleDelete = () => {
    if (!selectedCategoria) return
    deletarCategoria(selectedCategoria.id, {
      onSuccess: () => {
        toast.success('Categoria deletada com sucesso!')
        setDialogOpen(false)
      },
      onError: () => {
        toast.error('Erro ao deletar categoria')
      }
    })
  }

  return (
    <div className="w-full min-h-screen pb-6">
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-4 sm:px-6 py-4">
        <p className="text-xl sm:text-2xl font-medium">Categorias</p>
        <Dialog open={criarDialogOpen} onOpenChange={setCriarDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto h-10 rounded-3xl bg-[#FFFFFF] text-black flex items-center justify-center gap-2 px-4 border border-gray-300">
              <Plus />
              Criar categoria
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white w-[95vw] sm:max-w-xl max-h-[90vh] overflow-y-auto" aria-describedby={undefined}>
            <DialogHeader>
              <DialogTitle className="font-bold mb-2 text-center">Nova Categoria</DialogTitle>
            </DialogHeader>
            <CategoriaForm onSuccess={() => setCriarDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="w-full h-auto bg-[#FAFAFC] p-4 sm:p-8">
        <Card className="border-none ring-0 w-full h-full bg-[#FFFFFF]">
          <p className="flex mt-2 ml-4 sm:ml-10 font-bold text-lg sm:text-xl">Filtros</p>
          <CardHeader className="flex flex-row items-center gap-2 px-4">
            <CardTitle className="w-full items-center font-semibold text-base sm:text-lg flex gap-4 p-2 sm:p-4">
              <Input
                className="w-full sm:w-56 placeholder:text-sm placeholder:text-gray-600 rounded-lg h-10"
                placeholder="Busca por nome..."
                value={filtroNome}
                onChange={(e) => setFiltroNome(e.target.value)}
              />
            </CardTitle>
          </CardHeader>
          <CardContent className="px-2 sm:px-6">
            <div className="w-full h-[442px] overflow-y-auto overflow-x-auto">
              <Table className="w-full min-w-[600px]">
                <TableHeader className='justify-center'>
                  <TableRow>
                    <TableHead className="w-[30%] text-gray-600 text-xs sm:text-sm text-center">ID</TableHead>
                    <TableHead className="w-[20%] text-gray-600 text-xs sm:text-sm text-center">Nome</TableHead>
                    <TableHead className="w-[50%] text-gray-600 text-xs sm:text-sm text-center">Descrição</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center">Carregando...</TableCell>
                    </TableRow>
                  ) : error ? (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center text-red-500">Erro ao carregar categorias</TableCell>
                    </TableRow>
                  ) : categoriasFiltradas?.map((categoria: any) => (
                    <TableRow
                      key={categoria.id}
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => {
                        setSelectedCategoria(categoria)
                        setDialogOpen(true)
                      }}
                    >
                      <TableCell className="break-all whitespace-normal text-xs sm:text-sm text-center">{categoria.id}</TableCell>
                      <TableCell className="break-all whitespace-normal text-xs sm:text-sm text-center">{categoria.nome}</TableCell>
                      <TableCell className="break-all whitespace-normal text-xs sm:text-sm text-center">{categoria.descricao}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      <CategoriaActionsDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onDelete={handleDelete}
      />
    </div>
  )
}
