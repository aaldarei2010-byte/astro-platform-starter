import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act, waitFor } from '@testing-library/react';

vi.mock('../../src/utils', () => ({
    generateBlob: vi.fn((params) => ({
        svgPath: 'M0 0',
        parameters: {
            seed: 1,
            size: 512,
            edges: 6,
            growth: 5,
            name: 'test',
            colors: ['#000', '#fff'],
            ...params,
        },
    })),
    randomInt: vi.fn((min: number, max: number) => min),
}));

import StoredShapes from '../../src/pages/blobs/_components/StoredShapes';

describe('StoredShapes', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it('shows empty message when no shapes exist', async () => {
        global.fetch = vi.fn().mockResolvedValue({
            json: () => Promise.resolve({ keys: [] }),
        });

        render(<StoredShapes lastMutationTime={0} />);

        await waitFor(() => {
            expect(screen.getByText('Please upload some shapes!')).toBeInTheDocument();
        });
    });

    it('renders a button for each stored shape key', async () => {
        global.fetch = vi.fn().mockResolvedValue({
            json: () => Promise.resolve({ keys: ['blob-a', 'blob-b'] }),
        });

        render(<StoredShapes lastMutationTime={0} />);

        await waitFor(() => {
            expect(screen.getByText('blob-a')).toBeInTheDocument();
            expect(screen.getByText('blob-b')).toBeInTheDocument();
        });
    });

    it('fetches and previews a shape when clicked', async () => {
        global.fetch = vi.fn()
            .mockResolvedValueOnce({
                json: () => Promise.resolve({ keys: ['blob-a'] }),
            })
            .mockResolvedValueOnce({
                json: () => Promise.resolve({ blob: { name: 'blob-a', size: 256 } }),
            });

        render(<StoredShapes lastMutationTime={0} />);

        await waitFor(() => {
            expect(screen.getByText('blob-a')).toBeInTheDocument();
        });

        await act(async () => {
            screen.getByText('blob-a').click();
        });

        await waitFor(() => {
            const svg = document.querySelector('svg');
            expect(svg).toBeInTheDocument();
        });
    });

    it('re-fetches keys when lastMutationTime changes', async () => {
        global.fetch = vi.fn().mockResolvedValue({
            json: () => Promise.resolve({ keys: [] }),
        });

        const { rerender } = render(<StoredShapes lastMutationTime={0} />);

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledTimes(1);
        });

        rerender(<StoredShapes lastMutationTime={Date.now()} />);

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledTimes(2);
        });
    });
});
