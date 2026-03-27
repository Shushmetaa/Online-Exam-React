import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/exam': {
        target: 'https://localhost:8443',
        changeOrigin: true,
        secure: false
      }
    }
  },
//  build: {
//     rollupOptions: {
//       input: {
//         main: resolve(__dirname, 'index.html')
//       }
//     }
//   }
})