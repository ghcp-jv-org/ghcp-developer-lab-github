import { render, screen } from '@testing-library/react';
import { UploadZone, sanitizeFileName } from './UploadZone';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeFile(name: string, type: string, sizeBytes: number): File {
  const content = new Array(sizeBytes).fill('a').join('');
  return new File([content], name, { type });
}

// ---------------------------------------------------------------------------
// sanitizeFileName
// ---------------------------------------------------------------------------

describe('sanitizeFileName', () => {
  it('removes angle brackets', () => {
    // Forward slash is also stripped so closing-tag remnants like /script cannot survive
    expect(sanitizeFileName('<script>evil</script>.jpg')).toBe('scriptevilscript.jpg');
  });

  it('removes ampersands', () => {
    expect(sanitizeFileName('a&b.png')).toBe('ab.png');
  });

  it('removes double-quotes', () => {
    expect(sanitizeFileName('"quoted".jpg')).toBe('quoted.jpg');
  });

  it('removes single-quotes', () => {
    expect(sanitizeFileName("it's.jpg")).toBe('its.jpg');
  });

  it('removes backticks', () => {
    expect(sanitizeFileName('`cmd`.jpg')).toBe('cmd.jpg');
  });

  it('leaves normal filenames unchanged', () => {
    expect(sanitizeFileName('my-photo_2024.jpg')).toBe('my-photo_2024.jpg');
  });

  it('strips all dangerous characters in one pass', () => {
    expect(sanitizeFileName('<a>&"\'`</a>.png')).toBe('aa.png');
  });
});

// ---------------------------------------------------------------------------
// UploadZone rendering
// ---------------------------------------------------------------------------

// Mock framer-motion to avoid animation issues in jsdom
jest.mock('framer-motion', () => {
  const React = require('react');
  return {
    motion: {
      div: React.forwardRef(
        ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>, ref: React.Ref<HTMLDivElement>) =>
          React.createElement('div', { ...props, ref }, children)
      ),
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe('UploadZone component', () => {
  it('renders the upload prompt text', () => {
    render(<UploadZone />);
    expect(screen.getByText('Upload your photos')).toBeInTheDocument();
    expect(screen.getByText(/Supports JPEG, PNG, GIF, WebP up to 10MB/)).toBeInTheDocument();
  });

  it('renders a file input element', () => {
    render(<UploadZone />);
    const input = document.querySelector('input[type="file"]');
    expect(input).toBeInTheDocument();
  });

  it('accepts only allowed image MIME types via the input accept attribute', () => {
    render(<UploadZone />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    // react-dropzone serialises the accept map into an HTML accept attribute
    const accept = input?.getAttribute('accept') ?? '';
    expect(accept).toContain('image/jpeg');
    expect(accept).toContain('image/png');
    expect(accept).toContain('image/gif');
    expect(accept).toContain('image/webp');
    // No catch-all wildcard that would accept arbitrary file types
    expect(accept).not.toContain('image/*');
  });

  it('renders without errors when maxFiles prop is provided', () => {
    expect(() => render(<UploadZone maxFiles={5} />)).not.toThrow();
  });
});

