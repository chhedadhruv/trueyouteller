import { defineConfig } from 'vite'
import { reactRouter } from '@react-router/dev/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [reactRouter()],
  optimizeDeps: {
    // Pre-bundle every runtime dependency at dev-server start. Several are only
    // reached lazily (dynamic imports, route-specific pages); if Vite discovers them
    // mid-session it re-optimizes, and an already-open tab ends up mixing two React
    // copies ("Cannot read properties of null (reading 'useContext')").
    include: [
      '@emailjs/browser',
      'canvas-confetti',
      'firebase/app',
      'firebase/firestore',
      'jspdf',
      'react-hook-form',
      'react-icons/fa',
      'react-icons/fa6',
      'react-icons/gi',
    ],
  },
})
