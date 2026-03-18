import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cilo-orange': {
          light: '#FFF3E0',
          DEFAULT: '#FF9800',
          dark: '#F57C00',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'display': ['Poppins', 'sans-serif'],
      }
    },
  },

})
