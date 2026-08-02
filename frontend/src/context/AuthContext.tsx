import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import api from '../api/client.ts'
import { User, AuthFormData } from '../types.ts'

interface AuthContextValue {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<User>
  register: (data: AuthFormData) => Promise<User>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Ao carregar o app, tenta descobrir se ja existe uma sessao valida
  // (o cookie HttpOnly viaja sozinho, entao so precisamos perguntar pro backend).
  useEffect(() => {
    api
      .get<User>('/auth/me')
      .then((res) => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  async function login(email: string, password: string) {
    const res = await api.post<User>('/auth/login', { email, password })
    setUser(res.data)
    return res.data
  }

  async function register(data: AuthFormData) {
    const res = await api.post<User>('/auth/register', data)
    setUser(res.data)
    return res.data
  }

  async function logout() {
    await api.post('/auth/logout')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth precisa ser usado dentro de um AuthProvider')
  return ctx
}
