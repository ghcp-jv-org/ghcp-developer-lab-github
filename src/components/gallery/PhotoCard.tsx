'use client';

import { Heart, Download, Share2, Eye, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import { Photo } from '@/lib/mock-photo-data';

export interface PhotoCardProps {
  photo: Photo;
  index?: number;
  isLiked?: boolean;
  onLike?: (photoId: string) => void;
  onViewDetails?: (photo: Photo) => void;
  onDownload?: (photoId: string) => void;
  onShare?: (photoId: string) => void;
}

const GRADIENT_CLASSES = [
  'bg-gradient-to-br from-blue-400 to-blue-600',
  'bg-gradient-to-br from-green-400 to-green-600',
  'bg-gradient-to-br from-purple-400 to-purple-600',
  'bg-gradient-to-br from-pink-400 to-pink-600',
  'bg-gradient-to-br from-yellow-400 to-yellow-600',
  'bg-gradient-to-br from-red-400 to-red-600',
];

export function PhotoCard({
  photo,
  index = 0,
  isLiked = false,
  onLike,
  onViewDetails,
  onDownload,
  onShare,
}: PhotoCardProps) {
  const gradientClass = GRADIENT_CLASSES[index % GRADIENT_CLASSES.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative card-elevated overflow-hidden"
    >
      {/* Photo Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <div className={`w-full h-full ${gradientClass}`} aria-hidden="true" />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300">
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={() => onViewDetails?.(photo)}
              className="btn-secondary"
              aria-label={`View details for ${photo.title}`}
            >
              View Details
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => onLike?.(photo.id)}
            className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
              isLiked
                ? 'bg-red-500 text-white'
                : 'bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700'
            }`}
            aria-label={isLiked ? `Unlike ${photo.title}` : `Like ${photo.title}`}
            aria-pressed={isLiked}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={() => onDownload?.(photo.id)}
            className="p-2 rounded-full bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 backdrop-blur-sm transition-colors"
            aria-label={`Download ${photo.title}`}
          >
            <Download className="h-4 w-4" />
          </button>
          <button
            onClick={() => onShare?.(photo.id)}
            className="p-2 rounded-full bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 backdrop-blur-sm transition-colors"
            aria-label={`Share ${photo.title}`}
          >
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Photo Info */}
      <div className="p-4">
        <h3 className="font-semibold text-slate-900 dark:text-white mb-2 truncate">
          {photo.title}
        </h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {photo.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded-full"
            >
              <Tag className="h-3 w-3" />
              {tag}
            </span>
          ))}
          {photo.tags.length > 3 && (
            <span className="text-xs text-slate-500 px-2 py-1">
              +{photo.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Heart className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">Likes:</span>
              {photo.likes + (isLiked ? 1 : 0)}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">Views:</span>
              {photo.views}
            </span>
            <span className="flex items-center gap-1">
              <Download className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">Downloads:</span>
              {photo.downloads}
            </span>
          </div>
        </div>

        {/* Photographer */}
        {photo.photographer && (
          <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            by {photo.photographer}
          </div>
        )}
      </div>
    </motion.div>
  );
}
