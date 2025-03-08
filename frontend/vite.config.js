import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    headers:{
      "Cross-origin-embedder-policy": "require-corp",
      "Cross-origin-opener-policy": "same-origin",
    },
    proxy:{
      "/api":{
        target:"http://unpkg.com",
        changeOrigin:true,
        rewrite: (path) => path.replace(/^\/cdn/, '')
      }
    }
  }
})
