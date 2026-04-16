import { describe, it, expect, vi, beforeEach } from 'vitest';
import { randomInt, uniqueName, generateBlob, cacheHeaders } from '../../src/utils';

describe('randomInt', () => {
    it('returns an integer', () => {
        const result = randomInt(1, 10);
        expect(Number.isInteger(result)).toBe(true);
    });

    it('returns values within [min, max] inclusive', () => {
        for (let i = 0; i < 100; i++) {
            const result = randomInt(5, 15);
            expect(result).toBeGreaterThanOrEqual(5);
            expect(result).toBeLessThanOrEqual(15);
        }
    });

    it('works when min equals max', () => {
        expect(randomInt(7, 7)).toBe(7);
    });

    it('works with negative numbers', () => {
        for (let i = 0; i < 50; i++) {
            const result = randomInt(-10, -5);
            expect(result).toBeGreaterThanOrEqual(-10);
            expect(result).toBeLessThanOrEqual(-5);
        }
    });

    it('works with zero', () => {
        expect(randomInt(0, 0)).toBe(0);
    });
});

describe('uniqueName', () => {
    it('returns a string matching adjective-animal-digits pattern', () => {
        const name = uniqueName();
        expect(name).toMatch(/^[a-z]+-[a-z]+-\d{3}$/);
    });

    it('has a numeric suffix in range [100, 999]', () => {
        for (let i = 0; i < 20; i++) {
            const name = uniqueName();
            const suffix = parseInt(name.split('-').pop()!);
            expect(suffix).toBeGreaterThanOrEqual(100);
            expect(suffix).toBeLessThanOrEqual(999);
        }
    });

    it('generates different names on consecutive calls', () => {
        const names = new Set(Array.from({ length: 10 }, () => uniqueName()));
        expect(names.size).toBeGreaterThan(1);
    });
});

describe('generateBlob', () => {
    it('returns an object with parameters and svgPath', () => {
        const result = generateBlob();
        expect(result).toHaveProperty('parameters');
        expect(result).toHaveProperty('svgPath');
    });

    it('has all expected parameter keys', () => {
        const { parameters } = generateBlob();
        expect(parameters).toHaveProperty('seed');
        expect(parameters).toHaveProperty('size');
        expect(parameters).toHaveProperty('edges');
        expect(parameters).toHaveProperty('growth');
        expect(parameters).toHaveProperty('name');
        expect(parameters).toHaveProperty('colors');
    });

    it('defaults size to 512', () => {
        const { parameters } = generateBlob();
        expect(parameters.size).toBe(512);
    });

    it('generates edges in range [3, 20]', () => {
        for (let i = 0; i < 20; i++) {
            const { parameters } = generateBlob();
            expect(parameters.edges).toBeGreaterThanOrEqual(3);
            expect(parameters.edges).toBeLessThanOrEqual(20);
        }
    });

    it('generates growth in range [2, 9]', () => {
        for (let i = 0; i < 20; i++) {
            const { parameters } = generateBlob();
            expect(parameters.growth).toBeGreaterThanOrEqual(2);
            expect(parameters.growth).toBeLessThanOrEqual(9);
        }
    });

    it('assigns a 2-element color array', () => {
        const { parameters } = generateBlob();
        expect(parameters.colors).toHaveLength(2);
        expect(parameters.colors[0]).toMatch(/^#[0-9A-Fa-f]{6}$/);
        expect(parameters.colors[1]).toMatch(/^#[0-9A-Fa-f]{6}$/);
    });

    it('returns a non-empty svgPath string', () => {
        const { svgPath } = generateBlob();
        expect(typeof svgPath).toBe('string');
        expect(svgPath.length).toBeGreaterThan(0);
    });

    it('populates seed in returned parameters', () => {
        const { parameters } = generateBlob();
        expect(parameters.seed).not.toBeNull();
    });

    it('allows parameter overrides', () => {
        const { parameters } = generateBlob({ size: 256 });
        expect(parameters.size).toBe(256);
    });

    it('preserves other defaults when overriding one parameter', () => {
        const { parameters } = generateBlob({ size: 256 });
        expect(parameters.name).toBeDefined();
        expect(parameters.colors).toHaveLength(2);
    });
});

describe('cacheHeaders', () => {
    it('returns Cache-Control and Netlify-CDN-Cache-Control headers', () => {
        const headers = cacheHeaders();
        expect(headers).toHaveProperty('Cache-Control');
        expect(headers).toHaveProperty('Netlify-CDN-Cache-Control');
    });

    it('sets Cache-Control to always revalidate', () => {
        const headers = cacheHeaders();
        expect(headers['Cache-Control']).toBe('public, max-age=0, must-revalidate');
    });

    it('calculates Netlify-CDN-Cache-Control max-age from days', () => {
        const headers = cacheHeaders(1);
        expect(headers['Netlify-CDN-Cache-Control']).toBe('public, max-age=86400, must-revalidate');
    });

    it('uses default of 365 days', () => {
        const headers = cacheHeaders();
        expect(headers['Netlify-CDN-Cache-Control']).toBe(`public, max-age=${365 * 86400}, must-revalidate`);
    });

    it('includes Cache-Tag header when cacheTags is non-empty', () => {
        const headers = cacheHeaders(1, ['tag1', 'tag2']);
        expect(headers['Cache-Tag']).toBe('tag1,tag2');
    });

    it('omits Cache-Tag header when cacheTags is empty', () => {
        const headers = cacheHeaders(1, []);
        expect(headers).not.toHaveProperty('Cache-Tag');
    });

    it('omits Cache-Tag header when cacheTags is undefined', () => {
        const headers = cacheHeaders(1);
        expect(headers).not.toHaveProperty('Cache-Tag');
    });
});

describe('uploadDisabled', () => {
    beforeEach(() => {
        vi.resetModules();
    });

    it('is false when env var is not set', async () => {
        vi.stubEnv('PUBLIC_DISABLE_UPLOADS', '');
        const { uploadDisabled } = await import('../../src/utils');
        expect(uploadDisabled).toBe(false);
    });

    it('is true when env var is "true"', async () => {
        vi.stubEnv('PUBLIC_DISABLE_UPLOADS', 'true');
        const { uploadDisabled } = await import('../../src/utils');
        expect(uploadDisabled).toBe(true);
    });

    it('is true when env var is "TRUE" (case insensitive)', async () => {
        vi.stubEnv('PUBLIC_DISABLE_UPLOADS', 'TRUE');
        const { uploadDisabled } = await import('../../src/utils');
        expect(uploadDisabled).toBe(true);
    });

    it('is false when env var is "false"', async () => {
        vi.stubEnv('PUBLIC_DISABLE_UPLOADS', 'false');
        const { uploadDisabled } = await import('../../src/utils');
        expect(uploadDisabled).toBe(false);
    });
});
