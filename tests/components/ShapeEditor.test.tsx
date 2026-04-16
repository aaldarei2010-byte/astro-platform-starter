import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('../../src/utils', () => ({
    generateBlob: vi.fn(() => ({
        svgPath: 'M0 0',
        parameters: {
            seed: 1,
            size: 512,
            edges: 6,
            growth: 5,
            name: 'test-shape',
            colors: ['#000', '#fff'],
        },
    })),
    uploadDisabled: false,
    randomInt: vi.fn((min: number, max: number) => min),
}));

import ShapeEditor from '../../src/pages/blobs/_components/ShapeEditor';

describe('ShapeEditor', () => {
    it('renders NewShape and StoredShapes sections', async () => {
        global.fetch = vi.fn().mockResolvedValue({
            json: () => Promise.resolve({ keys: [] }),
        });

        render(<ShapeEditor />);

        expect(screen.getByText('New Random Shape')).toBeInTheDocument();
        expect(screen.getByText('Objects in Blob Store')).toBeInTheDocument();
    });
});
