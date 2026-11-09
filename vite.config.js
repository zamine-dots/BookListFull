import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const searchProxy = {
  '/api/search': {
    target: 'https://openlibrary.org',
    changeOrigin: true,
    rewrite: path => path.replace(/^\/api\/search/, '/search.json'),
  },
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { proxy: searchProxy },
  preview: { proxy: searchProxy },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
  },
})
