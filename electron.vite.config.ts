import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    plugins: [svelte()],
    server: {
      headers: {
        'Content-Security-Policy':
          "default-src 'self'; media-src 'self' blob: file:; style-src 'self' 'unsafe-inline'; script-src 'self'; img-src 'self' data:; connect-src *;"
      }
    }
  }
})
