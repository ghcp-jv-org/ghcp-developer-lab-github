'use client';

import { useState } from 'react';
import { Tag, Layers } from 'lucide-react';
import { Hero, SectionContainer, SectionTitle } from '@/components/ui';
import { getPhotosByTag, groupPhotosByCategory, Photo } from '@/lib/mock-photo-data';
import { PhotoCard } from '@/components/gallery/PhotoCard';

export default function ExplorePage() {
  const categories = groupPhotosByCategory();
  const categoryNames = Object.keys(categories);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [tagResults, setTagResults] = useState<Photo[]>([]);

  const handleTagClick = (tag: string) => {
    if (selectedTag === tag) {
      setSelectedTag(null);
      setTagResults([]);
    } else {
      setSelectedTag(tag);
      setTagResults(getPhotosByTag(tag, 5));
    }
  };

  return (
    <div className="page-gradient">
      <Hero
        title="Explore by Category"
        description="Browse photos grouped by category or filter by tag to discover new work."
      />

      {/* Tag Filter Bar */}
      <SectionContainer>
        <SectionTitle title="Filter by Tag" />
        <div className="flex flex-wrap gap-2 mb-8">
          {categoryNames.map(tag => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedTag === tag
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700'
              }`}
            >
              <Tag className="h-3.5 w-3.5" />
              {tag}
              <span className={`ml-1 text-xs ${
                selectedTag === tag ? 'text-blue-200' : 'text-slate-400'
              }`}>
                ({categories[tag].length})
              </span>
            </button>
          ))}
        </div>

        {/* Tag Search Results */}
        {selectedTag && tagResults.length > 0 && (
          <div className="mb-12">
            <SectionTitle title={`Top results for "${selectedTag}"`} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tagResults.map((photo, index) => (
                <PhotoCard key={photo.id} photo={photo} index={index} />
              ))}
            </div>
          </div>
        )}

        {selectedTag && tagResults.length === 0 && (
          <div className="text-center py-8 mb-12">
            <p className="text-slate-500 dark:text-slate-400">No photos found for tag &ldquo;{selectedTag}&rdquo;</p>
          </div>
        )}
      </SectionContainer>

      {/* Categories Grid */}
      <SectionContainer bgColor="bg-white/30 dark:bg-slate-800/30">
        <SectionTitle title="All Categories" />
        <div className="space-y-12">
          {categoryNames.map(category => (
            <div key={category}>
              <div className="flex items-center gap-2 mb-4">
                <Layers className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {category}
                </h3>
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  ({categories[category].length} {categories[category].length === 1 ? 'photo' : 'photos'})
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories[category].map((photo, index) => (
                  <PhotoCard key={photo.id} photo={photo} index={index} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>
    </div>
  );
}
