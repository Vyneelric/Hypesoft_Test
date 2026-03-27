import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import ProductsByCategoryChart from '@/components/charts/ProductsByCategoryChart'
import { Ellipsis, ShoppingBasket, Scroll, ChartColumn } from 'lucide-react'
import { PackageIcon, ArrowFatDownIcon } from '@phosphor-icons/react'
import { useValorTotalEstoque, useTotalProdutos, useProdutosEstoqueBaixo, useProdutosPorCategoria, useProdutosEstoqueBaixoLista } from '@/hooks/useProduto'

export function Dashboard() {
  const { data: produtos, isLoading, error} = useProdutosEstoqueBaixoLista()
  const { data: valorTotal, isLoading: loadingValor } = useValorTotalEstoque()
  const { data: totalProdutos, isLoading: loadingTotal } = useTotalProdutos()
  const { data: estoqueBaixo, isLoading: loadingEstoque } = useProdutosEstoqueBaixo()
  const { data: dadosGrafico, isLoading: loadingGrafico } = useProdutosPorCategoria()
  return (
    <div className="w-full min-h-screen pb-6">
      <div className="w-full flex items-center justify-between px-4 sm:px-6 py-4">
        <p className="text-xl sm:text-2xl font-medium">Dashboard</p>
      </div>
      <div className="w-full h-auto bg-[#FAFAFC] p-4 sm:p-8">
        <div className="w-full flex flex-col lg:flex-row gap-4 lg:gap-10">
          <Card className="border-none ring-0 w-full lg:w-1/3 bg-[#FFFFFF] pl-2">
            <CardHeader className="flex flex-row items-center gap-2">
              <ShoppingBasket className="!w-8 !h-8 sm:!w-9 sm:!h-9 bg-[#F9F9F9] rounded-xl p-1" stroke="#4E36DF" strokeWidth={1.6} />
              <CardTitle className="font-semibold text-sm sm:text-lg flex-1">Valor total do estoque</CardTitle>
              <Ellipsis stroke="#545162" className="h-6 w-10" /> 
            </CardHeader>
            <CardContent className="font-semibold text-2xl sm:text-4xl">
              {loadingValor ? 'Carregando...' : `R$ ${valorTotal?.toFixed(2)}`}
            </CardContent>
          </Card>
          <Card className="border-none ring-0 w-full lg:w-1/3 bg-[#FFFFFF] pl-2">
            <CardHeader className="flex flex-row items-center gap-2">
              <PackageIcon className="!w-8 !h-8 sm:!w-9 sm:!h-9 bg-[#F9F9F9] rounded-xl p-1" fill="#4E36DF" />
              <CardTitle className="font-semibold text-sm sm:text-lg flex-1">Total de produtos</CardTitle>
              <Ellipsis stroke="#545162" className="h-6 w-10" /> 
            </CardHeader>
            <CardContent className="font-semibold text-2xl sm:text-4xl">
              {loadingTotal ? 'Carregando...' : totalProdutos}
            </CardContent>
          </Card>
          <Card className="border-none ring-0 w-full lg:w-1/3 bg-[#FFFFFF] pl-2">
            <CardHeader className="flex flex-row items-center gap-2">
              <ArrowFatDownIcon className="!w-8 !h-8 sm:!w-9 sm:!h-9 bg-[#F9F9F9] rounded-xl p-1" fill="#4E36DF" />
              <CardTitle className="font-semibold text-sm sm:text-lg flex-1">Produtos em estoque (≤ 9)</CardTitle>
              <Ellipsis stroke="#545162" className="h-6 w-10" /> 
            </CardHeader>
            <CardContent className="font-semibold text-2xl sm:text-4xl">
              {loadingEstoque ? 'Carregando...' : estoqueBaixo}
            </CardContent>
          </Card>
        </div>

        <div className="w-full h-auto mt-6 lg:mt-10 flex-col gap-6 lg:gap-10">
          <Card className="border-none ring-0 w-full lg:w-3/5 bg-[#FFFFFF]">
            <CardHeader className="flex flex-row items-center gap-2">
              <Scroll className="!w-8 !h-8 sm:!w-9 sm:!h-9 bg-[#F9F9F9] rounded-xl p-1" stroke="#4E36DF" strokeWidth={1.6} />
              <CardTitle className="font-semibold text-sm sm:text-lg flex-1">Lista de produtos com estoque baixo</CardTitle>
            </CardHeader>
            <CardContent className="px-2 sm:px-6">
              <div className="w-full h-[442px] overflow-y-auto overflow-x-auto">
                <Table className="w-full min-w-[600px]">
                  <TableHeader className='justify-center'>
                    <TableRow>
                      <TableHead className="w-[30%] text-gray-600 text-xs sm:text-sm text-center">ID</TableHead>
                      <TableHead className="w-[20%] text-gray-600 text-xs sm:text-sm text-center">Nome</TableHead>
                      <TableHead className="w-[35%] text-gray-600 text-xs sm:text-sm text-center">Descrição</TableHead>
                      <TableHead className="w-[15%] text-gray-600 text-xs sm:text-sm text-center">Preço</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center">Carregando...</TableCell>
                      </TableRow>
                    ) : error ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center text-red-500">Erro ao carregar produtos</TableCell>
                      </TableRow>
                    ) : produtos?.map((produto: any) => (
                      <TableRow key={produto.id}>
                        <TableCell className="break-all whitespace-normal text-xs sm:text-sm text-center">{produto.id}</TableCell>
                        <TableCell className="break-all whitespace-normal text-xs sm:text-sm text-center">{produto.nome}</TableCell>
                        <TableCell className="break-all whitespace-normal text-xs sm:text-sm text-center">{produto.descricao}</TableCell>
                        <TableCell className="break-all whitespace-normal text-xs sm:text-sm text-center">R$ {produto.preco}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none ring-0 w-full lg:w-2/5 bg-[#FFFFFF]">
            <CardHeader className="flex flex-row items-center gap-2">
              <ChartColumn className="!w-8 !h-8 sm:!w-9 sm:!h-9 bg-[#F9F9F9] rounded-xl p-1" stroke="#4E36DF" />
              <CardTitle className="font-semibold text-sm sm:text-lg flex-1">Produtos e suas categorias</CardTitle>
            </CardHeader>
            <CardContent className="font-semibold text-4xl overflow-x-auto">
              {loadingGrafico ? 'Carregando...' : <ProductsByCategoryChart data={dadosGrafico || []} />}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
