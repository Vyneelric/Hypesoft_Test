import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, SunMedium, Bell, Tag, ChartColumnBig } from 'lucide-react'
import { CubeIcon } from '@phosphor-icons/react'
import knight from '@/assets/images/knight.webp'
import { useState, useEffect, useRef } from 'react'
import { useProdutos } from '@/hooks/useProduto'
import { useAuth } from '@/context/AuthContext'
import { LogOut } from 'lucide-react'

export function AppLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const [busca, setBusca] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const { data: produtos } = useProdutos()
  const { username, roles, logout } = useAuth()
  const dropdownRef = useRef<HTMLDivElement>(null)

  const produtosFiltrados = produtos?.filter((produto: any) => 
    produto.nome.toLowerCase().includes(busca.toLowerCase())
  ).slice(0, 5) || []

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setBusca(value)
    setShowDropdown(value.length > 0)
  }

  const handleSelectProduto = (produto: any) => {
    setBusca(produto.nome)
    setShowDropdown(false)
    navigate('/produtos')
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header - Desktop */}
      <header className="hidden lg:flex w-full h-20 px-6 pt-6 items-center justify-between">
        <div className="flex items-center">
          <img src="/shopsenseNB.png" alt="" className="w-14 h-14"/>
          <p className="text-2xl font-medium">
            <span className="text-[#5647CE]">Shop</span>
            <span className="text-[#000000]">Sense</span>
          </p>
        </div>

        <div className="relative w-auto" ref={dropdownRef}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 w-5 h-5 z-10" /> 
          <Input 
            className="pl-10 w-96 h-11 placeholder:text-sm placeholder:text-gray-600 border-none bg-[#F9F9F9] rounded-2xl" 
            placeholder="Search"
            value={busca}
            onChange={handleSearch}
            onFocus={() => busca.length > 0 && setShowDropdown(true)}
          />
          {showDropdown && produtosFiltrados.length > 0 && (
            <div className="absolute top-full mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-80 overflow-y-auto">
              {produtosFiltrados.map((produto: any) => (
                <div
                  key={produto.id}
                  className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                  onClick={() => handleSelectProduto(produto)}
                >
                  <p className="font-medium text-sm">{produto.nome}</p>
                  <p className="text-xs text-gray-500">R$ {produto.preco}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="h-12 flex gap-3">
          <div className="flex gap-6 items-center">
            <SunMedium fill="#545162" stroke="#545162" className="w-7 h-7" />
            <Bell fill="#545162" stroke="#545162" className="w-6 h-6" />
          </div>

          <div className="w-px h-12 bg-gray-100 items-center" />

          <div className="h-full flex items-center gap-2">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img
                src={knight}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </div>
              <div className="h-auto flex-column items-center mr-2">
                <p className="font-semibold">{username}</p>
                <p className="font-normal text-[12px] text-gray-400 text-left font-medium">
                  {roles.includes('admin') ? 'Admin' : 'User'}
                </p>
              </div>
              <button onClick={logout} title="Logout" className="ml-1 p-1 rounded-lg hover:bg-gray-100 transition-colors">
                <LogOut className="w-5 h-5 stroke-[#545162]" />
              </button> 
          </div>
        </div>
      </header>

      {/* Header Mobile */}
      <header className="lg:hidden w-full px-4 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <img src="/shopsenseNB.png" alt="" className="w-10 h-10"/>
            <p className="text-lg font-medium">
              <span className="text-[#5647CE]">Shop</span>
              <span className="text-[#000000]">Sense</span>
            </p>
          </div>
          <div className="flex gap-3 items-center">
            <Bell fill="#545162" stroke="#545162" className="w-5 h-5" />
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img src={knight} alt="avatar" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
        <div className="relative" ref={dropdownRef}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 w-4 h-4 z-10" /> 
          <Input 
            className="pl-9 w-full h-10 placeholder:text-sm placeholder:text-gray-600 border-none bg-[#F9F9F9] rounded-xl" 
            placeholder="Search"
            value={busca}
            onChange={handleSearch}
            onFocus={() => busca.length > 0 && setShowDropdown(true)}
          />
          {showDropdown && produtosFiltrados.length > 0 && (
            <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-60 overflow-y-auto">
              {produtosFiltrados.map((produto: any) => (
                <div
                  key={produto.id}
                  className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                  onClick={() => handleSelectProduto(produto)}
                >
                  <p className="font-medium text-sm">{produto.nome}</p>
                  <p className="text-xs text-gray-500">R$ {produto.preco}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex pb-20 lg:pb-0">
        {/* Sidebar Desktop */}
        <aside className="hidden lg:flex h-auto w-1/5 ml-8 flex-col pt-8">
          <p className="flex w-20 mb-4 text-xs text-gray-500 tracking-wider">G E R A L</p>
          <Link to="/">
            <Button className={`group flex w-5/6 h-14 ${location.pathname === '/' ? 'bg-[#F9F9F9]' : 'bg-white'} hover:bg-[#F9F9F9] transition-colors duration-300 rounded-2xl justify-start items-center gap-3 px-4`}>
              <ChartColumnBig className="!w-6 !h-6 stroke-[#4F4D5B] group-hover:stroke-[#4E36DF]" />
              <span className="text-[#4F4D5B] group-hover:text-[#4E36DF] transition-colors">
                Dashboard
              </span>
            </Button>
          </Link>

          <p className="flex w-auto mb-4 mt-6 text-xs text-gray-500 tracking-wider">F U N C I O N A L I D A D E S</p>

          <Link to="/produtos">
            <Button className={`group flex w-5/6 h-14 ${location.pathname === '/produtos' ? 'bg-[#F9F9F9]' : 'bg-white'} hover:bg-[#F9F9F9] transition-colors duration-300 rounded-2xl justify-start items-center gap-3 px-4 mt-4`}>
              <CubeIcon weight="fill" className="!w-6 !h-6 fill-[#4F4D5B] group-hover:fill-[#4E36DF]" />
              <span className="text-[#4F4D5B] group-hover:text-[#4E36DF] transition-colors">
                Produtos
              </span>
            </Button>
          </Link>

          <Link to="/categorias">
            <Button className={`group flex w-5/6 h-14 ${location.pathname === '/categorias' ? 'bg-[#F9F9F9]' : 'bg-white'} hover:bg-[#F9F9F9] transition-colors duration-300 rounded-2xl justify-start items-center gap-3 px-4 mt-4`}>
              <Tag className="!w-6 !h-6 stroke-[#4F4D5B] group-hover:stroke-[#4E36DF]" />
              <span className="text-[#4F4D5B] group-hover:text-[#4E36DF] transition-colors">
                Categorias
              </span>
            </Button>
          </Link>
        </aside>

        {/* Content */}
        <div className="w-full lg:w-4/5">
          <Outlet />
        </div>
      </main>

      {/* Bottom Navigation Mobile */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex justify-around items-center h-16 px-4">
          <Link to="/" className="flex flex-col items-center justify-center flex-1">
            <ChartColumnBig 
              className={`w-6 h-6 ${location.pathname === '/' ? 'stroke-[#4E36DF]' : 'stroke-[#4F4D5B]'}`}
            />
            <span className={`text-xs mt-1 ${location.pathname === '/' ? 'text-[#4E36DF]' : 'text-[#4F4D5B]'}`}>
              Dashboard
            </span>
          </Link>

          <Link to="/produtos" className="flex flex-col items-center justify-center flex-1">
            <CubeIcon 
              weight="fill"
              className={`w-6 h-6 ${location.pathname === '/produtos' ? 'fill-[#4E36DF]' : 'fill-[#4F4D5B]'}`}
            />
            <span className={`text-xs mt-1 ${location.pathname === '/produtos' ? 'text-[#4E36DF]' : 'text-[#4F4D5B]'}`}>
              Produtos
            </span>
          </Link>

          <Link to="/categorias" className="flex flex-col items-center justify-center flex-1">
            <Tag 
              className={`w-6 h-6 ${location.pathname === '/categorias' ? 'stroke-[#4E36DF]' : 'stroke-[#4F4D5B]'}`}
            />
            <span className={`text-xs mt-1 ${location.pathname === '/categorias' ? 'text-[#4E36DF]' : 'text-[#4F4D5B]'}`}>
              Categorias
            </span>
          </Link>
        </div>
      </nav>
    </div>
  )
}
