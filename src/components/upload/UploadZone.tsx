'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import { Upload, X, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sanitizeFileName } from '@/lib/sanitizeFileName';
import { validateImageMagicBytes } from '@/lib/validateImageMagicBytes';

// ─── Constants ────────────────────────────────────────────────────────────────

/** Maximum file size enforced both in the dropzone config and in onDrop. */
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB — matches UI copy

/**
 * Only the four types for which we have server-side magic-byte definitions.
 * GIF is intentionally kept but re-encoded to WebP on the server to strip
 * any polyglot payload (see API route).
 */
const ACCEPTED_TYPES = {
  'image/jpeg': ['.jpeg', '.jpg'],
  'image/png': ['.png'],
  'image/gif': ['.gif'],
  'image/webp': ['.webp'],
} as const;

// ─── Types ────────────────────────────────────────────────────────────────────

interface UploadedFile {
  id: string;
  file: File;
  /** Sanitized version of file.name — safe for display and storage. */
  sanitizedName: string;
  preview: string;
  status: 'uploading' | 'success' | 'error';
  /** Human-readable error message, set when status === 'error'. */
  errorMessage?: string;
  progress: number;
}

interface UploadZoneProps {
  onUpload?: (files: File[]) => void;
  maxFiles?: number;
  className?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function UploadZone({ onUpload, maxFiles = 10, className = '' }: UploadZoneProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [rejectionMessages, setRejectionMessages] = useState<string[]>([]);

  /**
   * Tracks active setInterval IDs separately from setTimeout IDs so that the
   * correct clear function is called on each, preventing unnecessary no-ops and
   * making intent explicit.
   */
  const intervalIds = useRef<Set<ReturnType<typeof setInterval>>>(new Set());
  const timeoutIds = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());

  /**
   * Holds the latest snapshot of uploadedFiles for use in the cleanup closure,
   * avoiding a stale-closure capture of the initial empty array.
   */
  const uploadedFilesRef = useRef<UploadedFile[]>([]);

  // Keep the ref in sync with state so the cleanup closure always sees current files
  useEffect(() => {
    uploadedFilesRef.current = uploadedFiles;
  }, [uploadedFiles]);

  // ── Cleanup on unmount ──────────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      // Revoke all object URLs to free browser memory — side effect runs outside
      // the state setter to avoid mixing effects with state transitions
      uploadedFilesRef.current.forEach((f) => URL.revokeObjectURL(f.preview));

      // Cancel all in-flight progress intervals
      intervalIds.current.forEach((id) => clearInterval(id));
      // Cancel all in-flight completion timeouts
      timeoutIds.current.forEach((id) => clearTimeout(id));
    };
  }, []);

  // ── Drop handler ────────────────────────────────────────────────────────────
  const onDrop = useCallback(
    async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      // Surface react-dropzone rejections (wrong type, too large, too many)
      if (fileRejections.length > 0) {
        const messages = fileRejections.flatMap(({ file, errors }) =>
          errors.map((e) => `${sanitizeFileName(file.name)}: ${e.message}`),
        );
        setRejectionMessages(messages);
      } else {
        setRejectionMessages([]);
      }

      if (acceptedFiles.length === 0) return;

      // ── Enforce cumulative maxFiles cap ──────────────────────────────────
      // react-dropzone's maxFiles only applies per-drop, not across drops.
      let filesToProcess = acceptedFiles;
      setUploadedFiles((prev) => {
        const remaining = maxFiles - prev.length;
        if (remaining <= 0) {
          setRejectionMessages((m) => [
            ...m,
            `Maximum of ${maxFiles} files already reached.`,
          ]);
          filesToProcess = [];
          return prev;
        }
        filesToProcess = acceptedFiles.slice(0, remaining);
        return prev;
      });

      if (filesToProcess.length === 0) return;

      // ── Magic-byte validation (client-side defence-in-depth) ─────────────
      // Server-side validation via sharp/file-type is the authoritative check.
      const validatedFiles: File[] = [];
      const magicByteErrors: string[] = [];

      await Promise.all(
        filesToProcess.map(async (file) => {
          const isValid = await validateImageMagicBytes(file);
          if (isValid) {
            validatedFiles.push(file);
          } else {
            magicByteErrors.push(
              `${sanitizeFileName(file.name)}: file content does not match declared image type`,
            );
          }
        }),
      );

      if (magicByteErrors.length > 0) {
        setRejectionMessages((prev) => [...prev, ...magicByteErrors]);
      }

      if (validatedFiles.length === 0) return;

      // ── Build state entries for validated files ───────────────────────────
      const newFiles: UploadedFile[] = validatedFiles.map((file) => ({
        // crypto.randomUUID() is available in all modern browsers (Chrome 92+,
        // Firefox 95+, Safari 15.4+) and Node.js 14.17+ — the minimum targets
        // for Next.js 14+.
        id: crypto.randomUUID(),
        file,
        sanitizedName: sanitizeFileName(file.name), // safe for display & storage
        preview: URL.createObjectURL(file),
        status: 'uploading' as const,
        progress: 0,
      }));

      setUploadedFiles((prev) => [...prev, ...newFiles]);

      // ── Simulate upload progress (replace with real fetch in production) ──
      // TODO: Replace this simulation with a real POST to /api/upload
      // using FormData. All server-side validation (size, MIME, magic bytes,
      // sharp re-encoding) must happen there.
      newFiles.forEach((fileObj) => {
        const interval = setInterval(() => {
          setUploadedFiles((prev) =>
            prev.map((f) =>
              f.id === fileObj.id
                ? { ...f, progress: Math.min(f.progress + 10, 100) }
                : f,
            ),
          );
        }, 200);
        intervalIds.current.add(interval); // track separately from timeouts

        const timeout = setTimeout(() => {
          clearInterval(interval);
          intervalIds.current.delete(interval);
          timeoutIds.current.delete(timeout);

          setUploadedFiles((prev) =>
            prev.map((f) =>
              f.id === fileObj.id ? { ...f, status: 'success', progress: 100 } : f,
            ),
          );
        }, 2000);
        timeoutIds.current.add(timeout); // track separately from intervals
      });

      onUpload?.(validatedFiles);
    },
    [onUpload, maxFiles],
  );

  // ── Dropzone config ─────────────────────────────────────────────────────────
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_TYPES,
    maxFiles,
    maxSize: MAX_FILE_SIZE_BYTES, // ✅ enforces the 10MB limit stated in the UI
    multiple: true,
  });

  // ── Remove handler ──────────────────────────────────────────────────────────
  const removeFile = (id: string) => {
    setUploadedFiles((prev) => {
      const file = prev.find((f) => f.id === id);
      if (file) {
        URL.revokeObjectURL(file.preview); // ✅ free memory immediately on removal
      }
      return prev.filter((f) => f.id !== id);
    });
  };

  // ─── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      {/* Drop Zone */}
      <div
        {...getRootProps()}
        className={`
          drop-zone hover-lift
          ${isDragActive ? 'drop-zone-active' : 'drop-zone-inactive'}
        `}
      >
        <input {...getInputProps()} />
        <div className="space-y-4">
          <div
            className={`transform transition-transform ${isDragActive ? 'scale-110' : 'scale-100'}`}
          >
            <Upload className="h-16 w-16 text-slate-400 mx-auto mb-4" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-2">
              {isDragActive ? 'Drop your images here!' : 'Upload your photos'}
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              Drag and drop your images here, or click to browse
            </p>
            <p className="text-sm text-slate-400 dark:text-slate-500 mt-2">
              Supports JPEG, PNG, GIF, WebP · Max {maxFiles} files · 10 MB each
            </p>
          </div>
        </div>
      </div>

      {/* Validation / Rejection Errors */}
      <AnimatePresence>
        {rejectionMessages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mt-4 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
            role="alert"
            aria-live="polite"
          >
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
              <div className="space-y-1">
                {rejectionMessages.map((msg, i) => (
                  <p key={i} className="text-sm text-red-700 dark:text-red-300">
                    {msg}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Progress */}
      <AnimatePresence>
        {uploadedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-8 space-y-4"
          >
            <h4 className="text-lg font-semibold">Uploading Files</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {uploadedFiles.map((fileObj) => (
                <motion.div
                  key={fileObj.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="relative card-base p-4"
                >
                  <button
                    type="button"
                    onClick={() => removeFile(fileObj.id)}
                    aria-label={`Remove ${fileObj.sanitizedName}`}
                    className="absolute top-2 right-2 p-1 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors z-10"
                  >
                    <X className="h-4 w-4" />
                  </button>

                  <div className="relative aspect-square mb-3 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-700">
                    {/* Preview uses a blob: URL — safe, never user-controlled href */}
                    {/* alt uses sanitizedName — special characters stripped */}
                    <img
                      src={fileObj.preview}
                      alt={fileObj.sanitizedName}
                      className="w-full h-full object-cover"
                    />
                    {fileObj.status === 'success' && (
                      <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                        <CheckCircle className="h-8 w-8 text-green-500" />
                      </div>
                    )}
                    {fileObj.status === 'error' && (
                      <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                        <AlertCircle className="h-8 w-8 text-red-500" />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      {/* sanitizedName is safe: special chars replaced with _ */}
                      <span className="text-sm font-medium truncate" title={fileObj.sanitizedName}>
                        {fileObj.sanitizedName}
                      </span>
                      <span className="text-xs text-slate-500 shrink-0">
                        {(fileObj.file.size / 1024 / 1024).toFixed(1)} MB
                      </span>
                    </div>

                    {fileObj.status === 'uploading' && (
                      <div
                        className="progress-bar"
                        role="progressbar"
                        aria-label={`Uploading ${fileObj.sanitizedName}`}
                        aria-valuenow={fileObj.progress}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      >
                        <motion.div
                          className="progress-fill"
                          initial={{ width: 0 }}
                          animate={{ width: `${fileObj.progress}%` }}
                          transition={{ duration: 0.2 }}
                        />
                      </div>
                    )}

                    {fileObj.status === 'success' && (
                      <div className="flex items-center gap-2 text-green-600 text-sm">
                        <CheckCircle className="h-4 w-4" />
                        <span>Upload complete</span>
                      </div>
                    )}

                    {fileObj.status === 'error' && (
                      <div className="flex items-center gap-2 text-red-600 text-sm">
                        <AlertCircle className="h-4 w-4" />
                        <span>{fileObj.errorMessage ?? 'Upload failed'}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
