import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3001,
    hmr: {
      protocol: 'ws'
    },
    allowedHosts: [
      '9188b150-baa6-4d5d-bf04-e18483d9fd79-00-1dlz7pm8sks3c.picard.replit.dev'
    ]
  }
});