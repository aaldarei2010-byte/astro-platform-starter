import { describe, it, expect, vi, beforeEach } from 'vitest';

const { mockPurgeCache } = vi.hoisted(() => ({
    mockPurgeCache: vi.fn().mockResolvedValue(undefined),
}));
vi.mock('@netlify/functions', () => ({
    purgeCache: mockPurgeCache,
}));

import { POST } from '../../src/pages/api/revalidate';

function makeContext(body: unknown) {
    return {
        request: new Request('http://localhost/api/revalidate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        }),
    } as any;
}

describe('POST /api/revalidate', () => {
    beforeEach(() => {
        mockPurgeCache.mockClear();
    });

    it('purges cache with valid tags and returns 200', async () => {
        const response = await POST(makeContext({ tags: ['tag1', 'tag2'] }));
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.invalidated).toEqual(['tag1', 'tag2']);
        expect(mockPurgeCache).toHaveBeenCalledWith({ tags: ['tag1', 'tag2'] });
    });

    it('returns 400 when tags is a string', async () => {
        const response = await POST(makeContext({ tags: 'not-array' }));
        expect(response.status).toBe(400);
        const text = await response.text();
        expect(text).toContain('expected tags attribute with array of strings');
    });

    it('returns 400 when tags is a number', async () => {
        const response = await POST(makeContext({ tags: 42 }));
        expect(response.status).toBe(400);
    });

    it('returns 400 when tags is missing', async () => {
        const response = await POST(makeContext({}));
        expect(response.status).toBe(400);
    });

    it('does not call purgeCache on invalid input', async () => {
        await POST(makeContext({ tags: 'invalid' }));
        expect(mockPurgeCache).not.toHaveBeenCalled();
    });
});
