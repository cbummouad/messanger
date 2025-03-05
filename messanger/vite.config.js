import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            index: 'public/index.html', // Specify the index file
            refresh: true,
        }),
        react(),
    ],
});
