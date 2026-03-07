import { render, screen, fireEvent } from '@testing-library/react';
import { PhotoCard } from './PhotoCard';
import { Photo } from '@/lib/mock-photo-data';

// Mock framer-motion to avoid animation side-effects in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div {...props}>{children}</div>
    ),
  },
}));

const basePhoto: Photo = {
  id: '1',
  url: '/placeholder-1.jpg',
  title: 'Sunset Landscape',
  tags: ['landscape', 'sunset', 'nature'],
  likes: 124,
  downloads: 45,
  views: 1205,
  photographer: 'John Doe',
  dateTaken: '2024-01-15',
};

// Rendering with default and required props
describe('PhotoCard – rendering', () => {
  it('renders the photo title', () => {
    render(<PhotoCard photo={basePhoto} />);
    expect(screen.getByText('Sunset Landscape')).toBeInTheDocument();
  });

  it('renders up to three tags', () => {
    render(<PhotoCard photo={basePhoto} />);
    expect(screen.getByText('landscape')).toBeInTheDocument();
    expect(screen.getByText('sunset')).toBeInTheDocument();
    expect(screen.getByText('nature')).toBeInTheDocument();
  });

  it('renders the photographer name when provided', () => {
    render(<PhotoCard photo={basePhoto} />);
    expect(screen.getByText('by John Doe')).toBeInTheDocument();
  });

  it('does not render photographer section when photographer is absent', () => {
    const photoWithoutPhotographer: Photo = { ...basePhoto, photographer: undefined };
    render(<PhotoCard photo={photoWithoutPhotographer} />);
    expect(screen.queryByText(/^by /)).not.toBeInTheDocument();
  });

  it('renders like, view, and download counts', () => {
    render(<PhotoCard photo={basePhoto} />);
    expect(screen.getByText('124')).toBeInTheDocument();
    expect(screen.getByText('1205')).toBeInTheDocument();
    expect(screen.getByText('45')).toBeInTheDocument();
  });

  it('renders the View Details button', () => {
    render(<PhotoCard photo={basePhoto} />);
    expect(screen.getByRole('button', { name: /view details for sunset landscape/i })).toBeInTheDocument();
  });

  it('renders the like, download, and share action buttons', () => {
    render(<PhotoCard photo={basePhoto} />);
    expect(screen.getByRole('button', { name: /like sunset landscape/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /download sunset landscape/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /share sunset landscape/i })).toBeInTheDocument();
  });
});

// Props and variants
describe('PhotoCard – props', () => {
  it('shows liked state when isLiked is true', () => {
    render(<PhotoCard photo={basePhoto} isLiked />);
    const likeButton = screen.getByRole('button', { name: /unlike sunset landscape/i });
    expect(likeButton).toBeInTheDocument();
    expect(likeButton).toHaveAttribute('aria-pressed', 'true');
    expect(likeButton).toHaveClass('bg-red-500');
  });

  it('shows unliked state when isLiked is false', () => {
    render(<PhotoCard photo={basePhoto} isLiked={false} />);
    const likeButton = screen.getByRole('button', { name: /like sunset landscape/i });
    expect(likeButton).toHaveAttribute('aria-pressed', 'false');
    expect(likeButton).not.toHaveClass('bg-red-500');
  });

  it('increments like count by 1 when isLiked is true', () => {
    render(<PhotoCard photo={basePhoto} isLiked />);
    expect(screen.getByText('125')).toBeInTheDocument();
  });

  it('does not increment like count when isLiked is false', () => {
    render(<PhotoCard photo={basePhoto} isLiked={false} />);
    expect(screen.getByText('124')).toBeInTheDocument();
  });
});

// User interactions
describe('PhotoCard – interactions', () => {
  it('calls onLike with the photo id when the like button is clicked', () => {
    const onLike = jest.fn();
    render(<PhotoCard photo={basePhoto} onLike={onLike} />);
    fireEvent.click(screen.getByRole('button', { name: /like sunset landscape/i }));
    expect(onLike).toHaveBeenCalledTimes(1);
    expect(onLike).toHaveBeenCalledWith('1');
  });

  it('calls onViewDetails with the photo when View Details is clicked', () => {
    const onViewDetails = jest.fn();
    render(<PhotoCard photo={basePhoto} onViewDetails={onViewDetails} />);
    fireEvent.click(screen.getByRole('button', { name: /view details for sunset landscape/i }));
    expect(onViewDetails).toHaveBeenCalledTimes(1);
    expect(onViewDetails).toHaveBeenCalledWith(basePhoto);
  });

  it('calls onDownload with the photo id when the download button is clicked', () => {
    const onDownload = jest.fn();
    render(<PhotoCard photo={basePhoto} onDownload={onDownload} />);
    fireEvent.click(screen.getByRole('button', { name: /download sunset landscape/i }));
    expect(onDownload).toHaveBeenCalledTimes(1);
    expect(onDownload).toHaveBeenCalledWith('1');
  });

  it('calls onShare with the photo id when the share button is clicked', () => {
    const onShare = jest.fn();
    render(<PhotoCard photo={basePhoto} onShare={onShare} />);
    fireEvent.click(screen.getByRole('button', { name: /share sunset landscape/i }));
    expect(onShare).toHaveBeenCalledTimes(1);
    expect(onShare).toHaveBeenCalledWith('1');
  });

  it('does not throw when optional callbacks are omitted and buttons are clicked', () => {
    render(<PhotoCard photo={basePhoto} />);
    expect(() => {
      fireEvent.click(screen.getByRole('button', { name: /like sunset landscape/i }));
      fireEvent.click(screen.getByRole('button', { name: /download sunset landscape/i }));
      fireEvent.click(screen.getByRole('button', { name: /share sunset landscape/i }));
      fireEvent.click(screen.getByRole('button', { name: /view details for sunset landscape/i }));
    }).not.toThrow();
  });
});

// Edge cases
describe('PhotoCard – edge cases', () => {
  it('shows "+N more" label when the photo has more than 3 tags', () => {
    const photoWithManyTags: Photo = {
      ...basePhoto,
      tags: ['landscape', 'sunset', 'nature', 'travel', 'adventure'],
    };
    render(<PhotoCard photo={photoWithManyTags} />);
    expect(screen.getByText('+2 more')).toBeInTheDocument();
  });

  it('does not render "+N more" when there are exactly 3 tags', () => {
    render(<PhotoCard photo={basePhoto} />);
    expect(screen.queryByText(/more/i)).not.toBeInTheDocument();
  });

  it('renders correctly when tags array is empty', () => {
    const photoNoTags: Photo = { ...basePhoto, tags: [] };
    render(<PhotoCard photo={photoNoTags} />);
    expect(screen.getByText('Sunset Landscape')).toBeInTheDocument();
    expect(screen.queryByText(/more/i)).not.toBeInTheDocument();
  });

  it('handles a very long title without crashing', () => {
    const longTitle = 'A'.repeat(200);
    const photoLongTitle: Photo = { ...basePhoto, title: longTitle };
    render(<PhotoCard photo={photoLongTitle} />);
    expect(screen.getByText(longTitle)).toBeInTheDocument();
  });

  it('handles special characters in title and tags', () => {
    const specialPhoto: Photo = {
      ...basePhoto,
      title: '<script>alert("xss")</script>',
      tags: ['tag & "quoted"'],
    };
    render(<PhotoCard photo={specialPhoto} />);
    expect(screen.getByText('<script>alert("xss")</script>')).toBeInTheDocument();
    expect(screen.getByText('tag & "quoted"')).toBeInTheDocument();
  });

  it('renders with zero likes, views, and downloads', () => {
    const zeroStatsPhoto: Photo = { ...basePhoto, likes: 0, downloads: 0, views: 0 };
    render(<PhotoCard photo={zeroStatsPhoto} />);
    // All three stats should show "0"
    const zeros = screen.getAllByText('0');
    expect(zeros).toHaveLength(3);
  });
});

// Accessibility
describe('PhotoCard – accessibility', () => {
  it('like button has correct aria-pressed attribute', () => {
    render(<PhotoCard photo={basePhoto} isLiked={false} />);
    expect(screen.getByRole('button', { name: /like sunset landscape/i })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
  });

  it('like button has aria-label reflecting liked state', () => {
    const { rerender } = render(<PhotoCard photo={basePhoto} isLiked={false} />);
    expect(screen.getByRole('button', { name: /like sunset landscape/i })).toBeInTheDocument();

    rerender(<PhotoCard photo={basePhoto} isLiked />);
    expect(screen.getByRole('button', { name: /unlike sunset landscape/i })).toBeInTheDocument();
  });

  it('action buttons each have a descriptive aria-label', () => {
    render(<PhotoCard photo={basePhoto} />);
    expect(screen.getByRole('button', { name: /like sunset landscape/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /download sunset landscape/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /share sunset landscape/i })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /view details for sunset landscape/i }),
    ).toBeInTheDocument();
  });

  it('stat icons are hidden from screen readers', () => {
    render(<PhotoCard photo={basePhoto} />);
    // sr-only labels for stats are present
    expect(screen.getByText('Likes:')).toBeInTheDocument();
    expect(screen.getByText('Views:')).toBeInTheDocument();
    expect(screen.getByText('Downloads:')).toBeInTheDocument();
  });
});

// Dark mode class validation
describe('PhotoCard – dark mode', () => {
  it('like button applies dark mode classes when not liked', () => {
    render(<PhotoCard photo={basePhoto} isLiked={false} />);
    const likeButton = screen.getByRole('button', { name: /like sunset landscape/i });
    expect(likeButton).toHaveClass('dark:bg-slate-800/80');
  });

  it('photographer text applies dark mode class', () => {
    render(<PhotoCard photo={basePhoto} />);
    const photographer = screen.getByText('by John Doe');
    expect(photographer).toHaveClass('dark:text-slate-400');
  });

  it('title applies dark mode text class', () => {
    render(<PhotoCard photo={basePhoto} />);
    const title = screen.getByText('Sunset Landscape');
    expect(title).toHaveClass('dark:text-white');
  });
});
