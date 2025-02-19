import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/


export default defineConfig({
  plugins: [react()],
})

// export default defineConfig({
//   plugins: [react()],
//   define: {
//     'process.env': process.env, // Make env variables available in the app
//   },
//   server: {
//     proxy: {
//       '/api': {
//         target: 'https://bpipoc-backend.1or6bcghlays.jp-tok.codeengine.appdomain.cloud',
//         // target: process.env.VITE_API_URL,
//         changeOrigin: true, // Required for virtual hosted sites
//         secure: false,      // If the target uses an invalid SSL certificate
//         rewrite: (path) => path.replace(/^\/api/, ''), // Rewrite /api to the base path
//       },
//     },
//   },
// });