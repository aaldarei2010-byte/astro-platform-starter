import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ShapePreview from '../../src/pages/blobs/_components/ShapePreview';
import type { BlobProps } from '../../src/types';

const mockProps: BlobProps = {
    svgPath: 'M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80',
    parameters: {
        seed: 12345,
        size: 512,
        edges: 6,
        growth: 5,
        name: 'test-blob',
        colors: ['#2E3192', '#1BFFFF'],
    },
};

describe('ShapePreview', () => {
    it('renders an SVG element', () => {
        const { container } = render(<ShapePreview {...mockProps} />);
        const svg = container.querySelector('svg');
        expect(svg).toBeInTheDocument();
    });

    it('sets viewBox based on parameters.size', () => {
        const { container } = render(<ShapePreview {...mockProps} />);
        const svg = container.querySelector('svg');
        expect(svg).toHaveAttribute('viewBox', '0 0 512 512');
    });

    it('renders path with correct d attribute', () => {
        const { container } = render(<ShapePreview {...mockProps} />);
        const path = container.querySelector('path');
        expect(path).toHaveAttribute('d', mockProps.svgPath);
    });

    it('renders gradient with correct stop colors', () => {
        const { container } = render(<ShapePreview {...mockProps} />);
        const stops = container.querySelectorAll('stop');
        expect(stops).toHaveLength(2);
        expect(stops[0]).toHaveStyle({ stopColor: '#2E3192' });
        expect(stops[1]).toHaveStyle({ stopColor: '#1BFFFF' });
    });

    it('uses gradient id in path fill', () => {
        const { container } = render(<ShapePreview {...mockProps} />);
        const path = container.querySelector('path');
        const gradient = container.querySelector('linearGradient');
        const gradientId = gradient?.getAttribute('id');
        expect(path).toHaveAttribute('fill', `url(#${gradientId})`);
    });
});
