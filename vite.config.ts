import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  base: 'wiki-searcher',
  resolve: {
    alias: {
      '@components': '/src/components',
      '@assets': '/src/assets',
      '@styles': '/src/styles',
      '@pages': '/src/pages',
      '@layout': '/src/layout',
      '@store': '/src/store',
      '@customTypes': '/src/customTypes',
      '@utils': '/src/utils'
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  }
})
