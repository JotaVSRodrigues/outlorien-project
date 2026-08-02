import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// A porta 5173 e a padrao do Vite; o proxy evita problema de CORS em dev,
// encaminhando /api direto para o backend Spring Boot (porta 8080).
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
