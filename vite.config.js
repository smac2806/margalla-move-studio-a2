import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// The site is served from /margalla-move-studio-a2/ on GitHub Pages.
export default defineConfig({
  base: '/margalla-move-studio-a2/',
  plugins: [react()],
})
