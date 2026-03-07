/**
 * Maximum length (in characters) of a sanitized file name.
 * Exported so callers and tests can reference the same constant.
 */
export const MAX_FILENAME_LENGTH = 100;

/**
 * Sanitizes a user-supplied file name to prevent XSS, path traversal,
 * header injection, and oversized-name attacks.
 *
 * Rules applied (in order):
 *  1. Only alphanumeric characters, dots, hyphens, underscores, and spaces
 *     are kept — all other characters are replaced with underscores.
 *  2. Consecutive dots are collapsed to a single dot, blocking "../"-style
 *     path traversal sequences. Single dots are preserved so that file
 *     extensions (e.g. ".jpg") remain intact.
 *  3. Leading dots, slashes, and whitespace are stripped to prevent
 *     hidden-file names (Unix dotfiles) and absolute-path injection.
 *  4. The result is capped at MAX_FILENAME_LENGTH characters.
 *  5. Surrounding whitespace is trimmed from the final value.
 *
 * Note: The sanitized name is safe for display and for use as a storage key,
 * but server-side code must NEVER use it directly as a filesystem path
 * component without joining it to a fixed, trusted base directory.
 *
 * @param name - The raw file name from the browser File object.
 * @returns A safe file name string.
 */
export function sanitizeFileName(name: string): string {
  return name
    .replace(/[^a-zA-Z0-9._\-\s]/g, '_') // rule 1 — strip unsafe characters
    .replace(/\.{2,}/g, '.') // rule 2 — collapse ".." → prevents traversal
    .replace(/^[./\s]+/, '') // rule 3 — strip leading dots/slashes/whitespace
    .substring(0, MAX_FILENAME_LENGTH) // rule 4 — enforce max length
    .trim(); // rule 5 — trim surrounding whitespace
}
