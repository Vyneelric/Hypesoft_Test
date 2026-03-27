import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import keycloak from '@/lib/keycloak'

interface AuthContextType {
  authenticated: boolean
  username: string
  roles: string[]
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    keycloak
      .init({ onLoad: 'login-required', checkLoginIframe: false })
      .then((auth) => {
        setAuthenticated(auth)
        setReady(true)
      })
  }, [])

  if (!ready) return null

  const roles: string[] = keycloak.realmAccess?.roles ?? []
  const username: string = keycloak.tokenParsed?.preferred_username ?? ''

  return (
    <AuthContext.Provider value={{ authenticated, username, roles, logout: () => keycloak.logout() }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
