import { defineConfig } from 'vite';
import path from 'path';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                path.resolve(__dirname, 'resources', 'css', 'style.css'),
                path.resolve(__dirname, 'resources', 'js', 'index.jsx')
            ],
            refresh: true,
        }),
    ],
    server: {
        port: 3000,
        cors: true
    },
});
