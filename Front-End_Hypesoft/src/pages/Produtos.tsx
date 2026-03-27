import { Plus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ProdutoForm } from '@/components/forms/ProdutoForm'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useProdutos, useAtualizarProduto, useDeletarProduto } from '@/hooks/useProduto'
import { useCategorias } from '@/hooks/useCategoria'
import { ProdutoActionsDialog } from '@/components/ProdutoActionsDialog'
import { ProdutoUpdateForm } from '@/components/forms/ProdutoUpdateForm'
import { useState } from 'react'
import { toast } from 'sonner'

export function Produtos() {
  const { data: produtos, isLoading, error } = useProdutos()
  const { data: categorias = [] } = useCategorias()
  const [selectedProduto, setSelectedProduto] = useState<any>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false)
  const { mutate: atualizarProduto } = useAtualizarProduto()
  const { mutate: deletarProduto } = useDeletarProduto()
  const [criarDialogOpen, setCriarDialogOpen] = useState(false)
  
  const [filtroNome, setFiltroNome] = useState('')
  const [filtroEstoque, setFiltroEstoque] = useState('')
  const [filtroCategoria, setFiltroCategoria] = useState<string | undefined>(undefined)

  const produtosFiltrados = produtos?.filter((produto: any) => {
    const matchNome = produto.nome.toLowerCase().includes(filtroNome.toLowerCase())
    const matchEstoque = filtroEstoque === '' || produto.quantidade_estoque <= Number(filtroEstoque)
    const matchCategoria = !filtroCategoria || produto.categoria_id === filtroCategoria || produto.category?.id === filtroCategoria
    return matchNome && matchEstoque && matchCategoria
  }) || []

  const handleDelete = () => {
    if (!selectedProduto) return
    deletarProduto(selectedProduto.id, {
      onSuccess: () => {
        toast.success('Produto deletado com sucesso!')
        setDialogOpen(false)
      },
      onError: () => {
        toast.error('Erro ao deletar produto')
      }
    })
  }

  const handleUpdate = () => {
    setDialogOpen(false)
    setUpdateDialogOpen(true)
  }

  const handleUpdateSubmit = (data: any) => {
    atualizarProduto(data, {
      onSuccess: () => {
        toast.success('Produto atualizado com sucesso!')
        setUpdateDialogOpen(false)
      },
      onError: () => {
        toast.error('Erro ao atualizar produto')
      }
    })
  }
  return (
    <div className="w-full min-h-screen pb-6">
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-4 sm:px-6 py-4">
        <p className="text-xl sm:text-2xl font-medium">Produtos</p>
        <Dialog open={criarDialogOpen} onOpenChange={setCriarDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto h-10 rounded-3xl bg-[#FFFFFF] text-black flex items-center justify-center gap-2 px-4 border border-gray-300">
            <Plus />
            Criar produto
          </Button>
          </DialogTrigger>
            <DialogContent className="bg-white w-[95vw] sm:max-w-xl max-h-[90vh] overflow-y-auto" aria-describedby={undefined}>
              <DialogHeader>
                <DialogTitle className="font-bold mb-2 text-center">Novo Produto</DialogTitle>
              </DialogHeader>
              <ProdutoForm onSuccess={() => setCriarDialogOpen(false)} />
            </DialogContent>
        </Dialog>

      </div>
      <div className="w-full h-auto bg-[#FAFAFC] p-4 sm:p-8">
          <Card className="border-none ring-0 w-full h-full bg-[#FFFFFF]">
            <p className="flex mt-2 ml-4 sm:ml-10 font-bold text-lg sm:text-xl">Filtros</p>
            <CardHeader className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 px-4">

              <CardTitle className="w-full items-center font-semibold text-base sm:text-lg flex flex-col sm:flex-row gap-3 sm:gap-4 p-2 sm:p-4">
                <Input 
                  className="w-full sm:w-56 placeholder:text-sm placeholder:text-gray-600 rounded-lg h-10" 
                  placeholder="Busca por nome..."
                  value={filtroNome}
                  onChange={(e) => setFiltroNome(e.target.value)}
                />
                <Input 
                  className="w-full sm:w-56 placeholder:text-sm placeholder:text-gray-600 rounded-lg h-10" 
                  placeholder="Qnt. Estoque Máximo"
                  type="number"
                  value={filtroEstoque}
                  onChange={(e) => setFiltroEstoque(e.target.value)}
                />
                <div className="relative w-full sm:w-56">
                  <Select value={filtroCategoria} onValueChange={setFiltroCategoria}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Todas as categorias" />
                    </SelectTrigger>
                    <SelectContent>
                      {categorias.map((cat: any) => (
                        <SelectItem key={cat.id} value={cat.id}>{cat.nome}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {filtroCategoria && (
                    <button
                      onClick={() => setFiltroCategoria(undefined)}
                      className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      type="button"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="px-2 sm:px-6">
              <div className="w-full h-[442px] overflow-y-auto overflow-x-auto">
                <Table className="w-full min-w-[800px]">
                  <TableHeader className='justify-center'>
                    <TableRow>
                      <TableHead className="w-[30%] text-gray-600 text-xs sm:text-sm text-center">ID</TableHead>
                      <TableHead className="w-[20%] text-gray-600 text-xs sm:text-sm text-center">Nome</TableHead>
                      <TableHead className="w-[35%] text-gray-600 text-xs sm:text-sm text-center">Descrição</TableHead>
                      <TableHead className="w-[15%] text-gray-600 text-xs sm:text-sm text-center">Preço</TableHead>
                      <TableHead className="w-[15%] text-gray-600 text-xs sm:text-sm text-center">Qnt. estoque</TableHead>
                      <TableHead className="w-[15%] text-gray-600 text-xs sm:text-sm text-center">Categoria</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center">Carregando...</TableCell>
                      </TableRow>
                    ) : error ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-red-500">Erro ao carregar produtos</TableCell>
                      </TableRow>
                    ) : produtosFiltrados?.map((produto: any) => (
                      <TableRow 
                        key={produto.id} 
                        className="cursor-pointer hover:bg-gray-50"
                        onClick={() => {
                          setSelectedProduto(produto)
                          setDialogOpen(true)
                        }}
                      >
                        <TableCell className="break-all whitespace-normal text-xs sm:text-sm text-center">{produto.id}</TableCell>
                        <TableCell className="break-all whitespace-normal text-xs sm:text-sm text-center">{produto.nome}</TableCell>
                        <TableCell className="break-all whitespace-normal text-xs sm:text-sm text-center">{produto.descricao}</TableCell>
                        <TableCell className="break-all whitespace-normal text-xs sm:text-sm text-center">R$ {produto.preco}</TableCell>
                        <TableCell className="break-all whitespace-normal text-xs sm:text-sm text-center">{produto.quantidade_estoque}</TableCell>
                        <TableCell className="break-all whitespace-normal text-xs sm:text-sm text-center">{produto.category?.nome}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
      </div>
      <ProdutoActionsDialog 
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />
      <Dialog open={updateDialogOpen} onOpenChange={setUpdateDialogOpen}>
        <DialogContent className="bg-white w-[95vw] sm:max-w-xl max-h-[90vh] overflow-y-auto" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle className="font-bold mb-2">Atualizar Produto</DialogTitle>
          </DialogHeader>
          {selectedProduto && (
            <ProdutoUpdateForm 
              produto={selectedProduto}
              onSubmit={handleUpdateSubmit}
              onCancel={() => setUpdateDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
