// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Token Tinder',
        short_name: 'Tinder',
        description: 'Swipe through Solana tokens and trade instantly.',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
  server: {
    host: true, // Enables access from network IP (needed for ngrok)
    port: 5173, // Or your preferred port
    strictPort: true, // Avoids random port fallback
    cors: true, // Enables cross-origin requests
    hmr: {
      protocol: 'ws',
      host: '223a-2401-4900-4e0c-330b-84b3-545b-33f8-bcf4.ngrok-free.app',
    },
  },
});
