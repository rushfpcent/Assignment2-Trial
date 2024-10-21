import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build:{
    manifest:true,
    // Assets --> Images, Videos, Files, gifs
    rollupOptions:{
      input:"./src/main.jsx",
    }
  }
})
