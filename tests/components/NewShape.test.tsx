import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mockBlobData = {
    svgPath: 'M10 80 Q 95 10 180 80',
    parameters: {
        seed: 42,
        size: 512,
        edges: 6,
        growth: 5,
        name: 'happy-cat-123',
        colors: ['#2E3192', '#1BFFFF'],
    },
};

const { mockGenerateBlob } = vi.hoisted(() => ({
    mockGenerateBlob: vi.fn(() => mockBlobData),
}));

vi.mock('../../src/utils', () => ({
    generateBlob: mockGenerateBlob,
    uploadDisabled: false,
    randomInt: vi.fn((min: number, max: number) => min),
}));

import NewShape from '../../src/pages/blobs/_components/NewShape';

describe('NewShape', () => {
    beforeEach(() => {
        mockGenerateBlob.mockClear();
        vi.restoreAllMocks();
    });

    it('generates a blob on mount', async () => {
        render(<NewShape />);
        await waitFor(() => {
            expect(mockGenerateBlob).toHaveBeenCalled();
        });
    });

    it('displays the blob name', async () => {
        render(<NewShape />);
        await waitFor(() => {
            expect(screen.getByText('happy-cat-123')).toBeInTheDocument();
        });
    });

    it('renders Randomize and Upload buttons', () => {
        render(<NewShape />);
        expect(screen.getByText('Randomize')).toBeInTheDocument();
        expect(screen.getByText('Upload')).toBeInTheDocument();
    });

    it('generates a new blob when Randomize is clicked', async () => {
        render(<NewShape />);
        await waitFor(() => expect(mockGenerateBlob).toHaveBeenCalled());

        mockGenerateBlob.mockClear();
        await act(async () => {
            screen.getByText('Randomize').click();
        });

        expect(mockGenerateBlob).toHaveBeenCalled();
    });

    it('calls setLastMutationTime after upload', async () => {
        const mockSetMutationTime = vi.fn();
        global.fetch = vi.fn().mockResolvedValue({
            json: () => Promise.resolve({ message: 'Stored shape "happy-cat-123"' }),
        });

        render(<NewShape setLastMutationTime={mockSetMutationTime} />);
        await waitFor(() => expect(screen.getByText('happy-cat-123')).toBeInTheDocument());

        await act(async () => {
            screen.getByText('Upload').click();
        });

        await waitFor(() => {
            expect(mockSetMutationTime).toHaveBeenCalled();
        });
    });

    it('disables Upload button after successful upload', async () => {
        global.fetch = vi.fn().mockResolvedValue({
            json: () => Promise.resolve({ message: 'Stored' }),
        });
        const mockSetMutationTime = vi.fn();

        render(<NewShape setLastMutationTime={mockSetMutationTime} />);
        await waitFor(() => expect(screen.getByText('happy-cat-123')).toBeInTheDocument());

        await act(async () => {
            screen.getByText('Upload').click();
        });

        await waitFor(() => {
            expect(screen.getByText('Upload')).toBeDisabled();
        });
    });
});
