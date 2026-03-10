'use client';

import { useCallback, useState } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import { Upload, X, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/** Maximum allowed file size: 10 MB */
const MAX_FILE_SIZE = 10 * 1024 * 1024;

/** Explicitly allowed image MIME types (defense-in-depth beyond the dropzone accept filter) */
const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
]);

/**
 * Strip characters that could be misused in an HTML context from a filename.
 * React's JSX already escapes text content, but we sanitize proactively as a
 * defense-in-depth measure against future refactors that might use the name
 * in an unsafe context (e.g. dangerouslySetInnerHTML, data attributes, etc.).
 * The forward-slash is included so that closing-tag remnants like `/script`
 * cannot survive after angle brackets are stripped.
 */
export function sanitizeFileName(name: string): string {
  return name.replace(/[<>&"'`/]/g, '');
}

interface UploadedFile {
  id: string;
  file: File;
  preview: string;
  status: 'uploading' | 'success' | 'error';
  progress: number;
  errorMessage?: string;
}

interface UploadZoneProps {
  onUpload?: (files: File[]) => void;
  maxFiles?: number;
  className?: string;
}

export function UploadZone({ onUpload, maxFiles = 10, className = "" }: UploadZoneProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Defense-in-depth: re-validate type and size even though the dropzone
    // accept/maxSize options already filter these at the UI level.
    const validFiles = acceptedFiles.filter(
      file => ALLOWED_MIME_TYPES.has(file.type) && file.size <= MAX_FILE_SIZE
    );

    const newFiles = validFiles.map(file => ({
      id: Math.random().toString(36).substring(2),
      file,
      preview: URL.createObjectURL(file),
      status: 'uploading' as const,
      progress: 0,
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);

    // Simulate upload progress
    newFiles.forEach(fileObj => {
      const interval = setInterval(() => {
        setUploadedFiles(prev => 
          prev.map(f => 
            f.id === fileObj.id 
              ? { ...f, progress: Math.min(f.progress + 10, 100) }
              : f
          )
        );
      }, 200);

      setTimeout(() => {
        clearInterval(interval);
        setUploadedFiles(prev => 
          prev.map(f => 
            f.id === fileObj.id 
              ? { ...f, status: 'success', progress: 100 }
              : f
          )
        );
      }, 2000);
    });

    onUpload?.(validFiles);
  }, [onUpload]);

  const onDropRejected = useCallback((rejectedFiles: FileRejection[]) => {
    const errorFiles: UploadedFile[] = rejectedFiles.map(({ file, errors }) => ({
      id: Math.random().toString(36).substring(2),
      file,
      preview: '',
      status: 'error' as const,
      progress: 0,
      errorMessage: errors[0]?.message ?? 'File rejected',
    }));
    setUploadedFiles(prev => [...prev, ...errorFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'image/gif': ['.gif'],
      'image/webp': ['.webp'],
    },
    maxFiles,
    maxSize: MAX_FILE_SIZE,
    multiple: true,
  });

  const removeFile = (id: string) => {
    setUploadedFiles(prev => {
      const file = prev.find(f => f.id === id);
      if (file?.preview) {
        URL.revokeObjectURL(file.preview);
      }
      return prev.filter(f => f.id !== id);
    });
  };

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      {/* Drop Zone */}
      <div
        {...getRootProps()}
        className={`
          drop-zone hover-lift
          ${isDragActive 
            ? 'drop-zone-active' 
            : 'drop-zone-inactive'
          }
        `}
      >
        <input {...getInputProps()} />
          <div className="space-y-4">
            <div className={`transform transition-transform ${isDragActive ? 'scale-110' : 'scale-100'}`}>
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
              Supports JPEG, PNG, GIF, WebP up to 10MB each
            </p>
            </div>
          </div>
        </div>

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
                    onClick={() => removeFile(fileObj.id)}
                    className="absolute top-2 right-2 p-1 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors z-10"
                    aria-label="Remove file"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  
                  <div className="relative aspect-square mb-3 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-700">
                    {fileObj.status === 'error' ? (
                      <div className="w-full h-full flex items-center justify-center bg-red-50 dark:bg-red-900/20">
                        <AlertCircle className="h-8 w-8 text-red-500" />
                      </div>
                    ) : (
                      <>
                        <img 
                          src={fileObj.preview} 
                          alt={sanitizeFileName(fileObj.file.name)}
                          className="w-full h-full object-cover"
                        />
                        {fileObj.status === 'success' && (
                          <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                            <CheckCircle className="h-8 w-8 text-green-500" />
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium truncate">
                        {sanitizeFileName(fileObj.file.name)}
                      </span>
                      <span className="text-xs text-slate-500">
                        {(fileObj.file.size / 1024 / 1024).toFixed(1)}MB
                      </span>
                    </div>
                    
                    {fileObj.status === 'uploading' && (
                      <div className="progress-bar">
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
