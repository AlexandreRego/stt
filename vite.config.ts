import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Essa é a ponte que conecta o Front ao Back
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // A porta do seu server.ts
        changeOrigin: true,
        secure: false,
      }
    }
  }
})