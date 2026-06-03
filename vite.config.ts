import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Aqui configuramos a ponte de comunicação entre o Front e o Back
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // A porta onde o server.ts está escutando
        changeOrigin: true,
        secure: false,
      },
    },
  },
})