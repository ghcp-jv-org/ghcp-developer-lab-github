// React component InfoCard that displays a title, description, and an optional image.
// Uses Tailwind CSS for styling with dark mode support.
// Props: title (string), description (string), imageUrl (optional string) 

import Image from "next/image";
import { Photo } from "@/lib/mock-photo-data";

interface InfoCardProps {
  title: string;
  description: string;
  imageUrl?: string;
}   

// Interface for a photo gallery album containing id, name, description, coverImage, photos array, and creation date
export interface Album {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  photos: Photo[];
  createdAt: string;
}

export function InfoCard({ title, description, imageUrl }: InfoCardProps) {
  return (
    <div className="card-info bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-lg shadow-md p-6">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={title}
          width={400}
          height={192}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
      )}
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-slate-600 dark:text-slate-300">
        {description}
      </p>
    </div>
  );
}       
