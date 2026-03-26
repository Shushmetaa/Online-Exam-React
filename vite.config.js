import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
       '/onlineexam': {
        target: 'https://localhost:8443',
        changeOrigin: true,
        secure: false,   // because OFBiz uses self-signed SSL
      }
    }
  }
})
