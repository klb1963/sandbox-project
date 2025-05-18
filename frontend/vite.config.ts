import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  console.log('🌍 Loaded env:', env);

  return {
    plugins: [react()],
    define: {
      'import.meta.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL),
    },
    server: {
      proxy: {
        '/api': 'http://127.0.0.1:8000', // 🔁 прокси на FastAPI
      },
    },
  }
})