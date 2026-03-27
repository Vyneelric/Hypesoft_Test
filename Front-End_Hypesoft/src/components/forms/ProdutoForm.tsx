import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useCriarProduto } from '@/hooks/useProduto'
import { useCategorias } from '@/hooks/useCategoria'
import { toast } from 'sonner'

const produtoSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório').max(100, 'Nome deve ter no máximo 100 caracteres'),
  descricao: z.string().min(1, 'Descrição é obrigatória').max(500, 'Descrição deve ter no máximo 500 caracteres'),
  preco: z.preprocess((v) => Number(v), z.number().gt(0, 'Preço deve ser maior que 0')),
  quantidade_estoque: z.preprocess((v) => Number(v), z.number().gte(0, 'Quantidade deve ser maior ou igual a 0')),
  categoria_id: z.string().min(1, 'Categoria é obrigatória')
})

type ProdutoFormData = {
  nome: string
  descricao: string
  preco: number
  quantidade_estoque: number
  categoria_id: string
}

interface ProdutoFormProps {
  onSuccess?: () => void
}

export function ProdutoForm({ onSuccess }: ProdutoFormProps) {
  const { mutate: criarProduto, isPending } = useCriarProduto()
  const { data: categorias = [] } = useCategorias()

  const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm<ProdutoFormData>({
    resolver: zodResolver(produtoSchema) as any,
    mode: 'onChange',
    defaultValues: {
      nome: '',
      descricao: '',
      categoria_id: ''
    }
  })

  const categoriaId = watch('categoria_id')

  const onSubmitForm = (data: ProdutoFormData) => {
    criarProduto(data, {
      onSuccess: () => {
        reset()
        toast.success('Produto criado com sucesso!')
        onSuccess?.()
      },
      onError: () => {
        toast.error('Erro ao criar produto')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="bg-white space-y-4">
      <div>
        <label className="text-sm font-medium">Nome do Produto</label>
        <Input
          className="mt-2 placeholder:text-sm placeholder:text-gray-600 rounded-lg"
          placeholder="Ex: Mouse Gamer"
          {...register('nome')}
        />
        {errors.nome && <p className="text-red-500 text-xs mt-1">{errors.nome.message}</p>}
      </div>

      <div>
        <label className="text-sm font-medium">Descrição</label>
        <Input
          className="mt-2 placeholder:text-sm placeholder:text-gray-600 rounded-lg"
          placeholder="Descrição do produto"
          {...register('descricao')}
        />
        {errors.descricao && <p className="text-red-500 text-xs mt-1">{errors.descricao.message}</p>}
      </div>

      <div>
        <label className="text-sm font-medium">Preço</label>
        <Input
          className="mt-2 placeholder:text-sm placeholder:text-gray-600 rounded-lg"
          type="number"
          step="0.01"
          placeholder="0.00"
          {...register('preco')}
        />
        {errors.preco && <p className="text-red-500 text-xs mt-1">{errors.preco.message}</p>}
      </div>

      <div>
        <label className="text-sm font-medium">Quantidade em estoque</label>
        <Input
          className="mt-2 placeholder:text-sm placeholder:text-gray-600 rounded-lg"
          type="number"
          placeholder="0"
          {...register('quantidade_estoque')}
        />
        {errors.quantidade_estoque && <p className="text-red-500 text-xs mt-1">{errors.quantidade_estoque.message}</p>}
      </div>

      <div>
        <label className="text-sm font-medium">Categoria</label>
        <Select value={categoriaId} onValueChange={(value) => setValue('categoria_id', value, { shouldValidate: true })}>
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Selecione uma categoria" />
          </SelectTrigger>
          <SelectContent>
            {categorias.map((cat: any) => (
              <SelectItem key={cat.id} value={cat.id}>{cat.nome}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.categoria_id && <p className="text-red-500 text-xs mt-1">{errors.categoria_id.message}</p>}
      </div>

      <div className="flex justify-center">
        <Button
          type="submit"
          disabled={isPending}
          className="w-38 h-10 rounded-xl bg-[#FFFFFF] text-black items-center gap-2 p-3 border border-gray-300"
        >
          {isPending ? 'Enviando...' : 'Enviar Produto'}
        </Button>
      </div>
    </form>
  )
}
