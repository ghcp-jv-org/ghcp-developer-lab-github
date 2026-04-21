import { render, screen } from '@testing-library/react';
import { PhotoCard } from './PhotoCard';
import { Photo } from '@/lib/mock-photo-data';

const basePhoto: Photo = {
  id: 'test-id',
  url: '/test.jpg',
  title: 'Mountain Sunrise',
  tags: ['nature', 'sunrise'],
  likes: 10,
  downloads: 5,
  views: 200,
};

// Rendering and prop handling
describe('PhotoCard', () => {
  it('renders title, tags, and stats from props', () => {
    render(<PhotoCard photo={basePhoto} index={0} />);

    expect(screen.getByRole('heading', { name: 'Mountain Sunrise', level: 4 })).toBeInTheDocument();
    expect(screen.getByText('nature')).toBeInTheDocument();
    expect(screen.getByText('sunrise')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('200')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('renders photographer line when photographer is provided', () => {
    render(<PhotoCard photo={{ ...basePhoto, photographer: 'Alex Doe' }} index={1} />);

    expect(screen.getByText('by Alex Doe')).toBeInTheDocument();
  });

  it('does not render photographer line when photographer is missing', () => {
    render(<PhotoCard photo={basePhoto} index={1} />);

    expect(screen.queryByText(/^by /)).not.toBeInTheDocument();
  });

  it('applies gradient class based on wrapped index values', () => {
    const { container } = render(<PhotoCard photo={basePhoto} index={7} />);
    const gradientBlock = container.querySelector('.bg-gradient-to-br');

    expect(gradientBlock).toHaveClass('from-green-400', 'to-green-600');
  });

  it('renders correctly for edge-case content and empty tags', () => {
    const edgeCasePhoto: Photo = {
      ...basePhoto,
      title: 'A'.repeat(200) + ' © & <script>',
      tags: [],
      likes: 0,
      views: 0,
      downloads: 0,
    };

    render(<PhotoCard photo={edgeCasePhoto} index={2} />);

    expect(screen.getByRole('heading', { name: edgeCasePhoto.title, level: 4 })).toBeInTheDocument();
    expect(screen.queryByText('nature')).not.toBeInTheDocument();
    expect(screen.getAllByText('0')).toHaveLength(3);
  });

  it('includes expected dark-mode utility classes', () => {
    const { container } = render(<PhotoCard photo={basePhoto} index={0} />);

    expect(container.querySelector('h4')).toHaveClass('dark:text-white');
    expect(container.querySelector('.text-sm')).toHaveClass('dark:text-slate-400');
  });
});
