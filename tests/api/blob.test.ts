import { describe, it, expect, vi, beforeEach } from 'vitest';

const { mockGet } = vi.hoisted(() => ({
    mockGet: vi.fn(),
}));
vi.mock('@netlify/blobs', () => ({
    getStore: vi.fn(() => ({ get: mockGet })),
}));

import { GET } from '../../src/pages/api/blob';

function makeContext(url: string) {
    return {
        url: new URL(url),
    } as any;
}

describe('GET /api/blob', () => {
    beforeEach(() => {
        mockGet.mockReset();
    });

    it('returns 400 when key query param is missing', async () => {
        const response = await GET(makeContext('http://localhost/api/blob'));
        expect(response.status).toBe(400);
        const text = await response.text();
        expect(text).toBe('Bad Request');
    });

    it('returns blob data for a valid key', async () => {
        const blobData = { name: 'test-blob', size: 512 };
        mockGet.mockResolvedValue(blobData);

        const response = await GET(makeContext('http://localhost/api/blob?key=test-blob'));
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.blob).toEqual(blobData);
        expect(mockGet).toHaveBeenCalledWith('test-blob', { type: 'json' });
    });

    it('returns null blob when key is not found', async () => {
        mockGet.mockResolvedValue(null);

        const response = await GET(makeContext('http://localhost/api/blob?key=nonexistent'));
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.blob).toBeNull();
    });
});
