import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'

// Instancia unica do axios pra toda a aplicacao.
// withCredentials: true e essencial -- e o que faz o navegador enviar o
// cookie HttpOnly do refresh token junto de cada requisicao.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true,
})

interface RetryableConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
}

// Interceptor de resposta: se o access token expirou (401), tenta renovar
// via /auth/refresh uma vez e repete a requisicao original.
// Isso evita deslogar o usuario so porque o token de 15min venceu.
let isRefreshing = false

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as RetryableConfig
    if (error.response?.status === 401 && !original._retry && !isRefreshing) {
      original._retry = true
      isRefreshing = true
      try {
        await api.post('/auth/refresh')
        isRefreshing = false
        return api(original)
      } catch (refreshError) {
        isRefreshing = false
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  }
)

export default api
