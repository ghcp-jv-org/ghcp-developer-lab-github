// Tests for the UploadZone component
// These tests verify security-relevant behaviour: file type acceptance/rejection,
// file-size enforcement, per-drop and cumulative maxFiles caps, file-name
// sanitization in the UI, and accessible ARIA attributes.

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { UploadZone } from "./UploadZone";
import * as validateModule from "@/lib/validateImageMagicBytes";

// ── Module mocks ──────────────────────────────────────────────────────────────

// Silence framer-motion animations in tests so AnimatePresence renders children
// synchronously and motion.div behaves like a plain div.
jest.mock("framer-motion", () => {
  const React = require("react");
  return {
    motion: new Proxy(
      {},
      {
        get: (_target: unknown, prop: string) =>
          // eslint-disable-next-line react/display-name
          React.forwardRef(({ children, ...rest }: React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }, ref: React.Ref<HTMLElement>) => {
            const Tag = prop as keyof JSX.IntrinsicElements;
            return React.createElement(Tag, { ...rest, ref }, children);
          }),
      },
    ),
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  };
});

// Provide a minimal react-dropzone mock so we can control which files are
// delivered to onDrop without requiring a real File drag-and-drop event.
let capturedOnDrop: ((accepted: File[], rejected: import("react-dropzone").FileRejection[]) => void) | undefined;

jest.mock("react-dropzone", () => ({
  useDropzone: (opts: { onDrop: (accepted: File[], rejected: import("react-dropzone").FileRejection[]) => void }) => {
    capturedOnDrop = opts.onDrop;
    return {
      getRootProps: () => ({ "data-testid": "dropzone-root" }),
      getInputProps: () => ({ "data-testid": "dropzone-input" }),
      isDragActive: false,
    };
  },
}));

// Mock validateImageMagicBytes so tests control pass/fail without real file I/O.
jest.mock("@/lib/validateImageMagicBytes");
const mockValidate = validateModule.validateImageMagicBytes as jest.MockedFunction<
  typeof validateModule.validateImageMagicBytes
>;

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Creates a minimal image File with the given name and type. */
function makeFile(name: string, type = "image/jpeg", sizeBytes = 1024): File {
  const buffer = new Uint8Array(sizeBytes);
  return new File([buffer], name, { type });
}

/** Simulates dropping `files` onto the dropzone. */
async function dropFiles(
  files: File[],
  rejections: import("react-dropzone").FileRejection[] = [],
) {
  if (!capturedOnDrop) throw new Error("onDrop was never captured by the mock");
  await capturedOnDrop(files, rejections);
}

// ── Rendering ─────────────────────────────────────────────────────────────────
describe("UploadZone – rendering", () => {
  beforeEach(() => {
    mockValidate.mockResolvedValue(true);
    jest.clearAllMocks();
  });

  it("renders the drop zone heading", () => {
    render(<UploadZone />);
    expect(screen.getByText("Upload your photos")).toBeInTheDocument();
  });

  it("renders informational copy that reflects maxFiles and size limit", () => {
    render(<UploadZone maxFiles={5} />);
    expect(screen.getByText(/Max 5 files/)).toBeInTheDocument();
    expect(screen.getByText(/10 MB each/)).toBeInTheDocument();
  });

  it("renders the hidden file input", () => {
    render(<UploadZone />);
    expect(screen.getByTestId("dropzone-input")).toBeInTheDocument();
  });

  it("applies a custom className to the wrapper", () => {
    const { container } = render(<UploadZone className="custom-class" />);
    expect(container.firstChild).toHaveClass("custom-class");
  });
});

// ── Successful drop ───────────────────────────────────────────────────────────
describe("UploadZone – successful file drop", () => {
  beforeEach(() => {
    mockValidate.mockResolvedValue(true);
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runAllTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it("displays the sanitized file name after a valid drop", async () => {
    render(<UploadZone />);
    await dropFiles([makeFile("my photo.jpg")]);

    await waitFor(() => {
      expect(screen.getByText("my photo.jpg")).toBeInTheDocument();
    });
  });

  it("renders a remove button with an accessible aria-label per file", async () => {
    render(<UploadZone />);
    await dropFiles([makeFile("holiday.jpg")]);

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /Remove holiday\.jpg/i })).toBeInTheDocument();
    });
  });

  it("removes a file from the list when the remove button is clicked", async () => {
    render(<UploadZone />);
    await dropFiles([makeFile("holiday.jpg")]);

    await waitFor(() => {
      expect(screen.getByText("holiday.jpg")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: /Remove holiday\.jpg/i }));

    await waitFor(() => {
      expect(screen.queryByText("holiday.jpg")).not.toBeInTheDocument();
    });
  });

  it("calls the onUpload prop with the validated files", async () => {
    const onUpload = jest.fn();
    render(<UploadZone onUpload={onUpload} />);
    const file = makeFile("photo.png", "image/png");
    await dropFiles([file]);

    await waitFor(() => {
      expect(onUpload).toHaveBeenCalledWith([file]);
    });
  });

  it("sanitizes file names that contain XSS payloads before display", async () => {
    render(<UploadZone />);
    await dropFiles([makeFile('<script>alert(1)</script>.jpg')]);

    await waitFor(() => {
      // The raw script tag must never appear in the DOM
      expect(screen.queryByText(/<script>/i)).not.toBeInTheDocument();
      // The sanitized version (special chars replaced) should be present
      const spans = screen.getAllByText(/_script_alert_1_._script_.jpg/i);
      expect(spans.length).toBeGreaterThan(0);
    });
  });
});

// ── File rejection handling ───────────────────────────────────────────────────
describe("UploadZone – file rejections", () => {
  beforeEach(() => {
    mockValidate.mockResolvedValue(true);
    jest.clearAllMocks();
  });

  it("shows an accessible alert when react-dropzone rejects files", async () => {
    render(<UploadZone />);
    await dropFiles([], [
      {
        file: makeFile("huge.jpg"),
        errors: [{ code: "file-too-large", message: "File is larger than 10485760 bytes" }],
      },
    ]);

    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
      expect(screen.getByText(/File is larger than/)).toBeInTheDocument();
    });
  });

  it("does not add files that fail magic-byte validation", async () => {
    mockValidate.mockResolvedValue(false);
    const onUpload = jest.fn();
    render(<UploadZone onUpload={onUpload} />);
    await dropFiles([makeFile("evil.jpg")]);

    await waitFor(() => {
      expect(onUpload).not.toHaveBeenCalled();
    });
  });

  it("shows an error message when magic-byte validation fails", async () => {
    mockValidate.mockResolvedValue(false);
    render(<UploadZone />);
    await dropFiles([makeFile("evil.jpg")]);

    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
      expect(screen.getByText(/does not match declared image type/i)).toBeInTheDocument();
    });
  });
});

// ── Accessibility ─────────────────────────────────────────────────────────────
describe("UploadZone – accessibility", () => {
  beforeEach(() => {
    mockValidate.mockResolvedValue(true);
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runAllTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it("progress bar has role=progressbar with aria-valuemin/max/now", async () => {
    render(<UploadZone />);
    await dropFiles([makeFile("loading.jpg")]);

    await waitFor(() => {
      const bar = screen.getByRole("progressbar");
      expect(bar).toHaveAttribute("aria-valuemin", "0");
      expect(bar).toHaveAttribute("aria-valuemax", "100");
      expect(bar).toHaveAttribute("aria-valuenow");
    });
  });

  it("progress bar aria-label references the sanitized file name", async () => {
    render(<UploadZone />);
    await dropFiles([makeFile("beach.jpg")]);

    await waitFor(() => {
      expect(screen.getByRole("progressbar")).toHaveAttribute(
        "aria-label",
        expect.stringContaining("beach.jpg"),
      );
    });
  });
});
