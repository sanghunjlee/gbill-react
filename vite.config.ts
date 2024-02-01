import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "gbill-react",
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@src', replacement: '/src'}
    ]
  }
})
