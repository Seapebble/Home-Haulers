import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // ✅ Ensures access from network (useful for Docker, VMs)
    port: parseInt(process.env.VITE_PORT || "5173", 10), 
    strictPort: true,
    open: true,
    proxy: {
      "/api": {
        target: process.env.VITE_BACKEND_URL || "http://localhost:5000",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    },
    cors: true,
  },
  define: {
    "import.meta.env": JSON.stringify(process.env),
  },
})
