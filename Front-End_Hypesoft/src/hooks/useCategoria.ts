import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/services/api'

export function useCategorias() {
  return useQuery({
    queryKey: ['categorias'],
    queryFn: async () => {
      const { data } = await api.get('/categories')
      return data.data || []
    }
  })
}

export function useCriarCategoria() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (categoria: any) => {
      const { data } = await api.post('/categories', categoria)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categorias'] })
    }
  })
}

export function useDeletarCategoria() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/categories/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categorias'] })
    }
  })
}
