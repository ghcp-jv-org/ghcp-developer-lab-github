export interface Photo {
  id: string;
  url: string;
  title: string;
  tags: string[];
  likes: number;
  downloads: number;
  views: number;
  photographer?: string;
  dateTaken?: string;
}

export const mockPhotos: Photo[] = [
  {
    id: '1',
    url: '/placeholder-1.jpg',
    title: 'Sunset Landscape',
    tags: ['landscape', 'sunset', 'nature'],
    likes: 124,
    downloads: 45,
    views: 1205,
    photographer: 'John Doe',
    dateTaken: '2024-01-15'
  },
  {
    id: '2',
    url: '/placeholder-2.jpg',
    title: 'Portrait Study',
    tags: ['portrait', 'studio', 'professional'],
    likes: 89,
    downloads: 23,
    views: 892,
    photographer: 'Jane Smith',
    dateTaken: '2024-01-10'
  },
  {
    id: '3',
    url: '/placeholder-3.jpg',
    title: 'Architecture',
    tags: ['architecture', 'building', 'city'],
    likes: 156,
    downloads: 67,
    views: 1543,
    photographer: 'Mike Johnson',
    dateTaken: '2024-01-08'
  },
  {
    id: '4',
    url: '/placeholder-4.jpg',
    title: 'Nature Close-up',
    tags: ['macro', 'nature', 'flowers'],
    likes: 203,
    downloads: 89,
    views: 2134,
    photographer: 'Sarah Wilson',
    dateTaken: '2024-01-05'
  },
  {
    id: '5',
    url: '/placeholder-5.jpg',
    title: 'Street Photography',
    tags: ['street', 'candid', 'urban'],
    likes: 91,
    downloads: 34,
    views: 765,
    photographer: 'Alex Brown',
    dateTaken: '2024-01-03'
  },
  {
    id: '6',
    url: '/placeholder-6.jpg',
    title: 'Wedding Moment',
    tags: ['wedding', 'love', 'ceremony'],
    likes: 267,
    downloads: 112,
    views: 3421,
    photographer: 'Emma Davis',
    dateTaken: '2024-01-01'
  },
  {
    id: '7',
    url: '/placeholder-7.jpg',
    title: 'Mountain Vista',
    tags: ['landscape', 'mountain', 'adventure'],
    likes: 189,
    downloads: 78,
    views: 1876,
    photographer: 'David Chen',
    dateTaken: '2023-12-28'
  },
  {
    id: '8',
    url: '/placeholder-8.jpg',
    title: 'Urban Nightscape',
    tags: ['night', 'city', 'lights'],
    likes: 234,
    downloads: 95,
    views: 2543,
    photographer: 'Lisa Martinez',
    dateTaken: '2023-12-25'
  },
  {
    id: '9',
    url: '/placeholder-9.jpg',
    title: 'Wildlife Portrait',
    tags: ['wildlife', 'nature', 'animal'],
    likes: 312,
    downloads: 143,
    views: 4321,
    photographer: 'Tom Anderson',
    dateTaken: '2023-12-20'
  },
  {
    id: '10',
    url: '/placeholder-10.jpg',
    title: 'Forest Path',
    tags: ['nature', 'forest', 'landscape'],
    likes: 178,
    downloads: 72,
    views: 1654,
    photographer: 'Claire Evans',
    dateTaken: '2023-12-15'
  },
  {
    id: '11',
    url: '/placeholder-11.jpg',
    title: 'Ocean Waves',
    tags: ['landscape', 'ocean', 'nature'],
    likes: 245,
    downloads: 98,
    views: 2876,
    photographer: 'James Turner',
    dateTaken: '2023-12-10'
  },
  {
    id: '12',
    url: '/placeholder-12.jpg',
    title: 'Desert Dunes',
    tags: ['landscape', 'desert', 'adventure'],
    likes: 134,
    downloads: 56,
    views: 1432,
    photographer: 'Nadia Hassan',
    dateTaken: '2023-12-05'
  },
  {
    id: '13',
    url: '/placeholder-13.jpg',
    title: 'City Skyline',
    tags: ['architecture', 'city', 'urban'],
    likes: 290,
    downloads: 121,
    views: 3210,
    photographer: 'Ryan Park',
    dateTaken: '2023-12-01'
  },
  {
    id: '14',
    url: '/placeholder-14.jpg',
    title: 'Golden Hour',
    tags: ['landscape', 'sunset', 'nature'],
    likes: 356,
    downloads: 167,
    views: 4890,
    photographer: 'Sophie Lee',
    dateTaken: '2023-11-28'
  },
  {
    id: '15',
    url: '/placeholder-15.jpg',
    title: 'Macro Botanics',
    tags: ['macro', 'nature', 'flowers'],
    likes: 115,
    downloads: 43,
    views: 987,
    photographer: 'Carlos Rivera',
    dateTaken: '2023-11-25'
  }
];

// Function that filters photos by tag name, sorts them by date in descending order,
// and returns only the top N results
export function getPhotosByTag(tag: string, limit: number = 5): Photo[] {
  return mockPhotos
    .filter(photo => photo.tags.includes(tag))
    .sort((a, b) => new Date(b.dateTaken || '').getTime() - new Date(a.dateTaken || '').getTime())
    .slice(0, limit);
} 

// Function that groups photos by their category and returns an object where
// keys are category names and values are arrays of photos
export function groupPhotosByCategory(): Record<string, Photo[]> {
  return mockPhotos.reduce((acc, photo) => {
    const category = photo.tags[0] || 'Uncategorized';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(photo);
    return acc;
  }, {} as Record<string, Photo[]>);
}

// Function to search photos by title with case-insensitive partial matching
export function searchPhotosByTitle(query: string, limit: number = 5): Photo[] {
  const lowerCaseQuery = query.toLowerCase();
  return mockPhotos
    .filter(photo => photo.title.toLowerCase().includes(lowerCaseQuery))
    .slice(0, limit);
}


