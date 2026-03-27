import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useCriarCategoria } from '@/hooks/useCategoria'
import { toast } from 'sonner'

const categoriaSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório').max(100, 'Nome deve ter no máximo 100 caracteres'),
  descricao: z.string().min(1, 'Descrição é obrigatória').max(500, 'Descrição deve ter no máximo 500 caracteres')
})

type CategoriaFormData = z.infer<typeof categoriaSchema>

interface CategoriaFormProps {
  onSuccess?: () => void
}

export function CategoriaForm({ onSuccess }: CategoriaFormProps) {
  const { mutate: criarCategoria, isPending } = useCriarCategoria()

  const { register, handleSubmit, formState: { errors }, reset } = useForm<CategoriaFormData>({
    resolver: zodResolver(categoriaSchema),
    mode: 'onChange',
    defaultValues: {
      nome: '',
      descricao: ''
    }
  })

  const onSubmitForm = (data: CategoriaFormData) => {
    criarCategoria(data, {
      onSuccess: () => {
        reset()
        toast.success('Categoria criada com sucesso!')
        onSuccess?.()
      },
      onError: () => {
        toast.error('Erro ao criar categoria')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="bg-white space-y-4">
      <div>
        <label className="text-sm font-medium">Nome da Categoria</label>
        <Input
          className="mt-2 placeholder:text-sm placeholder:text-gray-600 rounded-lg"
          placeholder="Ex: Eletrônicos"
          {...register('nome')}
        />
        {errors.nome && <p className="text-red-500 text-xs mt-1">{errors.nome.message}</p>}
      </div>

      <div>
        <label className="text-sm font-medium">Descrição</label>
        <Input
          className="mt-2 placeholder:text-sm placeholder:text-gray-600 rounded-lg"
          placeholder="Descrição da categoria"
          {...register('descricao')}
        />
        {errors.descricao && <p className="text-red-500 text-xs mt-1">{errors.descricao.message}</p>}
      </div>

      <div className="flex justify-center">
        <Button
          type="submit"
          disabled={isPending}
          className="w-38 h-10 rounded-xl bg-[#F8F8F8] text-black items-center gap-2 p-3 border border-gray-300"
        >
          {isPending ? 'Enviando...' : 'Enviar Categoria'}
        </Button>
      </div>
    </form>
  )
}
