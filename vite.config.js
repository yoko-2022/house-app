import { defineConfig } from "vite";
import react from '@vitejs/plugin-react';
import laravel from "laravel-vite-plugin";

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/css/style.css', 'resources/js/index.jsx'],
      refresh: true,
    }),
    react(),
  ],
});
