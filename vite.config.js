import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/portfolio/', // ← Remplace "portfolio" par le nom de ton repo GitHub
})
