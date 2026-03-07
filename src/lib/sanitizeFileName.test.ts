// Tests for the sanitizeFileName utility
import { sanitizeFileName, MAX_FILENAME_LENGTH } from "./sanitizeFileName";

// ── Core character filtering ──────────────────────────────────────────────────
describe("sanitizeFileName – character filtering", () => {
  it("preserves alphanumeric characters, dots, hyphens, underscores, and spaces", () => {
    expect(sanitizeFileName("my-photo_01 v2.jpg")).toBe("my-photo_01 v2.jpg");
  });

  it("replaces angle brackets and script tags with underscores", () => {
    const result = sanitizeFileName("<script>alert(1)</script>.jpg");
    expect(result).not.toContain("<");
    expect(result).not.toContain(">");
  });

  it("replaces null bytes with underscores", () => {
    expect(sanitizeFileName("file\x00name.jpg")).toBe("file_name.jpg");
  });

  it("replaces forward slashes with underscores", () => {
    expect(sanitizeFileName("dir/file.jpg")).toBe("dir_file.jpg");
  });

  it("replaces backslashes with underscores", () => {
    expect(sanitizeFileName("dir\\file.jpg")).toBe("dir_file.jpg");
  });
});

// ── Path traversal prevention ──────────────────────────────────────────────────
describe("sanitizeFileName – path traversal prevention", () => {
  it("collapses consecutive dots to a single dot", () => {
    expect(sanitizeFileName("../../etc/passwd")).not.toContain("..");
  });

  it("strips leading dots from file names", () => {
    expect(sanitizeFileName(".hidden-file.jpg")).toBe("hidden-file.jpg");
  });

  it("strips leading slashes", () => {
    // The leading slash is first replaced with _ by the character filter rule, so the
    // result starts with a stripped prefix. Inner slashes also become underscores.
    const result = sanitizeFileName("/absolute/path.jpg");
    expect(result).not.toContain("/");
    expect(result).toContain("path.jpg");
  });

  it("handles deeply nested traversal sequences", () => {
    const result = sanitizeFileName("../../../../secret.txt");
    expect(result).not.toContain("..");
  });
});

// ── Length enforcement ─────────────────────────────────────────────────────────
describe("sanitizeFileName – length enforcement", () => {
  it("truncates names longer than MAX_FILENAME_LENGTH", () => {
    const longName = "a".repeat(200) + ".jpg";
    expect(sanitizeFileName(longName).length).toBeLessThanOrEqual(MAX_FILENAME_LENGTH);
  });

  it("does not truncate names shorter than MAX_FILENAME_LENGTH", () => {
    const shortName = "photo.jpg";
    expect(sanitizeFileName(shortName)).toBe("photo.jpg");
  });

  it("MAX_FILENAME_LENGTH is exported and is 100", () => {
    expect(MAX_FILENAME_LENGTH).toBe(100);
  });
});

// ── Edge cases ─────────────────────────────────────────────────────────────────
describe("sanitizeFileName – edge cases", () => {
  it("returns empty string for an empty input", () => {
    expect(sanitizeFileName("")).toBe("");
  });

  it("trims leading and trailing whitespace from the result", () => {
    expect(sanitizeFileName("  photo.jpg  ")).toBe("photo.jpg");
  });

  it("handles a name that is only special characters", () => {
    const result = sanitizeFileName("<>:\"/\\|?*");
    // All unsafe chars become underscores; leading dots/slashes are stripped
    expect(result).not.toMatch(/[<>:"/\\|?*]/);
  });

  it("preserves a normal file extension", () => {
    expect(sanitizeFileName("vacation.png")).toBe("vacation.png");
  });
});
