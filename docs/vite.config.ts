import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { viteMockServe } from 'vite-plugin-mock';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), viteMockServe({
    mockPath: 'mock',
    enable: true,
  })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
})
