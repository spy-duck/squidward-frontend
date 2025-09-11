import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from '@vitejs/plugin-react-swc'
import removeConsole from 'vite-plugin-remove-console';
import { fileURLToPath } from 'node:url';

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
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src/', import.meta.url)),
        }
    }
});
