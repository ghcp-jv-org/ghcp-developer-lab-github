import { Tag, Eye, Heart, Download } from 'lucide-react';
import { Photo } from '@/lib/mock-photo-data';

interface PhotoCardProps {
  photo: Photo;
  index: number;
}

export function PhotoCard({ photo, index }: PhotoCardProps) {
  const gradients = [
    'from-blue-400 to-blue-600',
    'from-green-400 to-green-600',
    'from-purple-400 to-purple-600',
    'from-pink-400 to-pink-600',
    'from-yellow-400 to-yellow-600',
    'from-red-400 to-red-600',
  ];

  return (
    <div className="card-elevated overflow-hidden">
      <div className={`aspect-[4/3] bg-gradient-to-br ${gradients[index % gradients.length]}`} />
      <div className="p-4">
        <h4 className="font-semibold text-slate-900 dark:text-white mb-1 truncate">
          {photo.title}
        </h4>
        {photo.photographer && (
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
            by {photo.photographer}
          </p>
        )}
        <div className="flex flex-wrap gap-1 mb-3">
          {photo.tags.map(tag => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded-full"
            >
              <Tag className="h-3 w-3" />
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1">
            <Heart className="h-4 w-4" />
            {photo.likes}
          </span>
          <span className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            {photo.views}
          </span>
          <span className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            {photo.downloads}
          </span>
        </div>
      </div>
    </div>
  );
}
