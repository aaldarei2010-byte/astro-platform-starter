import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// Static config used only by the GitHub Pages workflow.
// The site is served from https://<user>.github.io/astro-platform-starter/
export default defineConfig({
    site: 'https://aaldarei2010-byte.github.io',
    base: '/astro-platform-starter',
    output: 'static',
    vite: {
        plugins: [tailwindcss()],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        }
    },
    integrations: [react()]
});
