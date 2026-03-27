import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/services/api'

export function useProdutos() {
  return useQuery({
    queryKey: ['data'],
    queryFn: async () => {
      const { data } = await api.get('/products')
      return Array.isArray(data) ? data : data.content || data.data || []
    }
  })
}

export function useCriarProduto() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (produto: any) => {
      const { data } = await api.post('/products', produto)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['data'] })
    }
  })
}

export function useAtualizarProduto() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (produto: any) => {
      console.log('PUT body enviado:', produto)
      const { data } = await api.put(`/products/${produto.id}`, produto)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['data'] })
    }
  })
}

export function useDeletarProduto() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/products/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['data'] })
    }
  })
}

export function useValorTotalEstoque(){
  return useQuery({
    queryKey: ['valorTotalEstoque'],
    queryFn: async () => {
      const { data } = await api.get('/products/total_value_stock')
      return data.total_stock_value
    }
  })
}

export function useTotalProdutos() {
  return useQuery({
    queryKey: ['totalProdutos'],
    queryFn: async () => {
      const { data } = await api.get('/products')
      return data.total_products
    }
  })
}

export function useProdutosEstoqueBaixo() {
  return useQuery({
    queryKey: ['produtosEstoqueBaixo'],
    queryFn: async () => {
      const { data } = await api.get('/products?estoqueMenorQue=10')
      return data.total_products
    }
  })
}

export function useProdutosComEstoqueBaixo() {
  return useQuery({
    queryKey: ['produtosComEstoqueBaixo'],
    queryFn: async () => {
      const { data } = await api.get('/products?estoqueMenorQue=10')
      return data.data || []
    }
  })
}

export function useProdutosEstoqueBaixoLista() {
  return useQuery({
    queryKey: ['produtosEstoqueBaixoLista'],
    queryFn: async () => {
      const { data } = await api.get('/products?estoqueMenorQue=10')
      return data.data || []
    }
  })
}

export function useProdutosPorCategoria() {
  return useQuery({
    queryKey: ['produtosPorCategoria'],
    queryFn: async () => {
      const { data: categoriasData } = await api.get('/categories')
      const categorias = categoriasData.data || []

      const resultados = await Promise.all(
        categorias.map(async (categoria: any) => {
          const { data } = await api.get(`/products/categories/${categoria.id}`)
          return {
            categoria: categoria.nome,
            Quantidade: data.total_products || data.data?.length || 0
          }
        })
      )

      return resultados
    }
  })
}