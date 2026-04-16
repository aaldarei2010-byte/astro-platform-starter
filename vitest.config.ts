import { getViteConfig } from 'astro/config';

export default getViteConfig({
    test: {
        globals: true,
        environment: 'jsdom',
        coverage: {
            provider: 'v8',
            include: ['src/**/*.{ts,tsx}'],
            exclude: ['src/**/*.astro', 'src/types.ts'],
        },
        setupFiles: ['./tests/setup.ts'],
    },
});
