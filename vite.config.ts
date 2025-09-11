import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from '@vitejs/plugin-react-swc'
import removeConsole from 'vite-plugin-remove-console';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

dotenv.config({
    path: '.env',
});

export default defineConfig({
    plugins: [
        react(),
        tsconfigPaths(),
        removeConsole(),
    ],
    server: {
        host: '0.0.0.0',
        port: 3333,
        cors: true,
        strictPort: true,
        allowedHosts: true,
        proxy: {
            '/api': {
                target: process.env.API_BASE_URL || 'http://localhost:4000',
                changeOrigin: true,
                // rewrite: (path) => path.replace(/^\/api/, ''),
            }
        }
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src/', import.meta.url)),
        },
    },
    define: {
        __API_BASE_URL__: JSON.stringify(process.env.API_BASE_URL || 'http://localhost:4000').trim(),
    },
});
