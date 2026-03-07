/**
 * Validates that a File's binary content matches the magic bytes (file signature)
 * expected for its declared MIME type.
 *
 * This is a client-side defence-in-depth measure. Server-side validation via
 * a library such as `file-type` or `sharp` is still required and must not be
 * omitted.
 *
 * Supported types and their signatures:
 *  - image/jpeg  : FF D8 FF
 *  - image/png   : 89 50 4E 47 0D 0A 1A 0A  (‰PNG\r\n\x1a\n)
 *  - image/webp  : 52 49 46 46 ?? ?? ?? ?? 57 45 42 50  (RIFF????WEBP)
 *  - image/gif   : GIF87a  or  GIF89a
 */

/**
 * A byte value in a magic-byte signature.
 * Use `null` as an explicit wildcard to indicate that any byte is acceptable
 * at that position (e.g., the 4-byte size field in a RIFF/WebP header).
 */
type MagicByte = number | null;
type MagicSignature = MagicByte[];

const MAGIC_BYTES: Record<string, MagicSignature[]> = {
  'image/jpeg': [
    [0xff, 0xd8, 0xff],
  ],
  'image/png': [
    [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a],
  ],
  'image/webp': [
    // RIFF (4 bytes) + size (4 wildcard bytes) + WEBP (4 bytes)
    [0x52, 0x49, 0x46, 0x46, null, null, null, null, 0x57, 0x45, 0x42, 0x50],
  ],
  'image/gif': [
    [0x47, 0x49, 0x46, 0x38, 0x37, 0x61], // GIF87a
    [0x47, 0x49, 0x46, 0x38, 0x39, 0x61], // GIF89a
  ],
};

/**
 * Returns true if the file's leading bytes match one of the known signatures
 * for its declared MIME type.
 *
 * @param file - The File object to inspect.
 * @returns A Promise resolving to true if the magic bytes are valid.
 */
export async function validateImageMagicBytes(file: File): Promise<boolean> {
  const signatures = MAGIC_BYTES[file.type];
  if (!signatures || signatures.length === 0) {
    // Unknown MIME type — reject conservatively
    return false;
  }

  const maxSignatureLength = Math.max(...signatures.map((s) => s.length));
  const headerBuffer = await file.slice(0, maxSignatureLength).arrayBuffer();
  const view = new Uint8Array(headerBuffer);

  return signatures.some((sig) =>
    sig.every((byte, i) => byte === null || view[i] === byte),
  );
}
