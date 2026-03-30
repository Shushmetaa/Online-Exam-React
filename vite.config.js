import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
     historyApiFallback: true, 
    proxy: {
      '/exam/api': {
        target: 'https://localhost:8443',
        changeOrigin: true,
        secure: false
      }
    }
  },
})