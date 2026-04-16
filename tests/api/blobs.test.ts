import { describe, it, expect, vi, beforeEach } from 'vitest';

const { mockSetJSON, mockList } = vi.hoisted(() => ({
    mockSetJSON: vi.fn().mockResolvedValue(undefined),
    mockList: vi.fn(),
}));
vi.mock('@netlify/blobs', () => ({
    getStore: vi.fn(() => ({ setJSON: mockSetJSON, list: mockList })),
}));

vi.mock('../../src/utils', async (importOriginal) => {
    const actual = await importOriginal<typeof import('../../src/utils')>();
    return { ...actual, uploadDisabled: false };
});

import { GET, POST } from '../../src/pages/api/blobs';

function makePostContext(body: unknown) {
    return {
        request: new Request('http://localhost/api/blobs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        }),
    } as any;
}

function makeGetContext() {
    return {
        request: new Request('http://localhost/api/blobs', { method: 'GET' }),
    } as any;
}

describe('GET /api/blobs', () => {
    beforeEach(() => {
        mockList.mockReset();
    });

    it('returns keys when store has blobs', async () => {
        mockList.mockResolvedValue({ blobs: [{ key: 'foo' }, { key: 'bar' }] });

        const response = await GET(makeGetContext());
        const data = await response.json();

        expect(data.keys).toEqual(['foo', 'bar']);
    });

    it('returns empty keys when store is empty', async () => {
        mockList.mockResolvedValue({ blobs: [] });

        const response = await GET(makeGetContext());
        const data = await response.json();

        expect(data.keys).toEqual([]);
    });

    it('returns error response when store throws', async () => {
        mockList.mockRejectedValue(new Error('Store unavailable'));

        const response = await GET(makeGetContext());
        const data = await response.json();

        expect(data.keys).toEqual([]);
        expect(data.error).toBe('Failed listing blobs');
    });
});

describe('POST /api/blobs', () => {
    beforeEach(() => {
        mockSetJSON.mockClear();
    });

    it('stores blob and returns success message', async () => {
        const params = { name: 'cool-shape', size: 512 };
        const response = await POST(makePostContext(params));
        const data = await response.json();

        expect(data.message).toBe('Stored shape "cool-shape"');
        expect(mockSetJSON).toHaveBeenCalledWith('cool-shape', params);
    });
});

describe('POST /api/blobs with uploads disabled', () => {
    it('throws when uploads are disabled', async () => {
        vi.resetModules();
        vi.doMock('../../src/utils', async (importOriginal) => {
            const actual = await importOriginal<typeof import('../../src/utils')>();
            return { ...actual, uploadDisabled: true };
        });

        const { POST: PostDisabled } = await import('../../src/pages/api/blobs');
        const params = { name: 'test', size: 512 };

        await expect(PostDisabled(makePostContext(params))).rejects.toThrow('Sorry, uploads are disabled');
    });
});
