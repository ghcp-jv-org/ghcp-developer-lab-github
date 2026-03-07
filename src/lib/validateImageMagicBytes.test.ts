// Tests for the validateImageMagicBytes utility
import { validateImageMagicBytes } from "./validateImageMagicBytes";

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Creates a minimal File whose content starts with the given bytes,
 * optionally padded to ensure the slice reads correctly.
 */
function makeFile(bytes: number[], mimeType: string, name = "test"): File {
  const buffer = new Uint8Array([...bytes, ...new Array(20).fill(0)]);
  return new File([buffer], name, { type: mimeType });
}

// ── Valid signatures ───────────────────────────────────────────────────────────
describe("validateImageMagicBytes – valid signatures", () => {
  it("accepts a JPEG file with FF D8 FF header", async () => {
    const file = makeFile([0xff, 0xd8, 0xff, 0xe0], "image/jpeg", "photo.jpg");
    await expect(validateImageMagicBytes(file)).resolves.toBe(true);
  });

  it("accepts a PNG file with the full 8-byte PNG signature", async () => {
    const file = makeFile(
      [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a],
      "image/png",
      "image.png",
    );
    await expect(validateImageMagicBytes(file)).resolves.toBe(true);
  });

  it("accepts a WebP file with RIFF????WEBP header", async () => {
    const file = makeFile(
      // RIFF + arbitrary 4-byte size + WEBP
      [0x52, 0x49, 0x46, 0x46, 0x12, 0x34, 0x56, 0x78, 0x57, 0x45, 0x42, 0x50],
      "image/webp",
      "image.webp",
    );
    await expect(validateImageMagicBytes(file)).resolves.toBe(true);
  });

  it("accepts a GIF87a file", async () => {
    const file = makeFile(
      [0x47, 0x49, 0x46, 0x38, 0x37, 0x61],
      "image/gif",
      "image.gif",
    );
    await expect(validateImageMagicBytes(file)).resolves.toBe(true);
  });

  it("accepts a GIF89a file", async () => {
    const file = makeFile(
      [0x47, 0x49, 0x46, 0x38, 0x39, 0x61],
      "image/gif",
      "image.gif",
    );
    await expect(validateImageMagicBytes(file)).resolves.toBe(true);
  });
});

// ── Invalid / spoofed files ────────────────────────────────────────────────────
describe("validateImageMagicBytes – invalid files", () => {
  it("rejects a file whose bytes do not match its declared MIME type", async () => {
    // HTML content with a .jpg extension
    const htmlBytes = Array.from("<html><body></body></html>").map((c) =>
      c.charCodeAt(0),
    );
    const file = makeFile(htmlBytes, "image/jpeg", "evil.jpg");
    await expect(validateImageMagicBytes(file)).resolves.toBe(false);
  });

  it("rejects a PNG file declared as image/jpeg", async () => {
    const file = makeFile(
      [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a],
      "image/jpeg",
      "mislabelled.jpg",
    );
    await expect(validateImageMagicBytes(file)).resolves.toBe(false);
  });

  it("rejects a file with an unknown MIME type", async () => {
    const file = makeFile([0xff, 0xd8, 0xff], "application/octet-stream", "file.bin");
    await expect(validateImageMagicBytes(file)).resolves.toBe(false);
  });

  it("rejects a WebP file with wrong RIFF variant header", async () => {
    // Replace 'WEBP' with 'WAVE' — a different RIFF subtype
    const file = makeFile(
      [0x52, 0x49, 0x46, 0x46, 0x00, 0x00, 0x00, 0x00, 0x57, 0x41, 0x56, 0x45],
      "image/webp",
      "audio-disguised.webp",
    );
    await expect(validateImageMagicBytes(file)).resolves.toBe(false);
  });

  it("rejects a GIF file with an invalid version byte", async () => {
    // GIF8Xa — X is not 7 or 9
    const file = makeFile(
      [0x47, 0x49, 0x46, 0x38, 0x38, 0x61],
      "image/gif",
      "bad.gif",
    );
    await expect(validateImageMagicBytes(file)).resolves.toBe(false);
  });
});
