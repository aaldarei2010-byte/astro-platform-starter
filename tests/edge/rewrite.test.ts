import { describe, it, expect } from 'vitest';
import edgeFunction, { config } from '../../netlify/edge-functions/rewrite';

function makeContext(countryCode?: string) {
    const geo = countryCode !== undefined ? { country: { code: countryCode } } : undefined;
    return { geo };
}

describe('edge function: rewrite', () => {
    it('redirects Australian visitors to /edge/australia', async () => {
        const request = new Request('https://example.com/edge');
        const response = await edgeFunction(request, makeContext('AU'));

        expect(response.status).toBe(302);
        expect(new URL(response.headers.get('location')!).pathname).toBe('/edge/australia');
    });

    it('redirects non-Australian visitors to /edge/not-australia', async () => {
        const request = new Request('https://example.com/edge');
        const response = await edgeFunction(request, makeContext('US'));

        expect(response.status).toBe(302);
        expect(new URL(response.headers.get('location')!).pathname).toBe('/edge/not-australia');
    });

    it('redirects to /edge/not-australia when geo is undefined', async () => {
        const request = new Request('https://example.com/edge');
        const response = await edgeFunction(request, {});

        expect(response.status).toBe(302);
        expect(new URL(response.headers.get('location')!).pathname).toBe('/edge/not-australia');
    });

    it('has config.path set to /edge', () => {
        expect(config.path).toBe('/edge');
    });
});
