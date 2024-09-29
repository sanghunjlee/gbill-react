import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/gbill-react",
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@src', replacement: '/src'},
      { find: '@assets', replacement: '/src/assets'},
      { find: '@common', replacement: '/src/common'},
      { find: '@features', replacement: '/src/features'},
      { find: '@layouts', replacement: '/src/layouts'},
      { find: '@pages', replacement: '/src/pages'},
    ]
  }
})
