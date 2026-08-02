import { ReactElement } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage.tsx'
import AuthPage from './pages/AuthPage.tsx'
import GalleryPage from './pages/GalleryPage.tsx'
import AboutPage from './pages/AboutPage.tsx'
import { AuthProvider, useAuth } from './context/AuthContext.tsx'

// Rota protegida: sem usuario logado, manda pro login.
// A validacao "de verdade" (o token e valido?) acontece no backend a
// cada chamada de API -- isso aqui e so a barreira de navegacao no frontend.
function PrivateRoute({ children }: { children: ReactElement }) {
  const { user, loading } = useAuth()
  if (loading) return null
  return user ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sobre" element={<AboutPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route
          path="/album"
          element={
            <PrivateRoute>
              <GalleryPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthProvider>
  )
}
