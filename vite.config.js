import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Subpath deploy: VITE_BASE_PATH=/property/ npm run build
const base = process.env.VITE_BASE_PATH || '/'

export default defineConfig({
  plugins: [react()],
  base,
})
