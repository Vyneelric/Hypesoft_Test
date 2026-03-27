import { useRouteError, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function ErrorBoundary() {
  const error = useRouteError() as any

  return (
    <div className="w-full h-screen flex items-center justify-center flex-col gap-4">
      <h1 className="text-4xl font-bold">Oops!</h1>
      <p className="text-xl">Algo deu errado.</p>
      <p className="text-gray-500">{error?.message || 'Erro desconhecido'}</p>
      <Link to="/">
        <Button>Voltar para o Dashboard</Button>
      </Link>
    </div>
  )
}
