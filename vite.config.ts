// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'custom-dist', // Specify a custom output directory
    sourcemap: true,       // Generate source maps
    rollupOptions: {       // Advanced Rollup options
      input: 'index.html',
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost/train_sim_sunr/server/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  // server: {
  //   host: '192.168.1.24',
  //   port: 3000
  // }

});

