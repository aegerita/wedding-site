import { ContentCard } from '@/components/ui/content-card';
import type { PhotoAlbum } from '@/types';

import { PhotoAlbumLinks } from './photo-album-links';

type PhotoGalleryDetailsProps = {
  eyebrow: string;
  title: string;
  description: string;
  albums: PhotoAlbum[];
};

export function PhotoGalleryDetails({
  eyebrow,
  title,
  description,
  albums,
}: PhotoGalleryDetailsProps) {
  return (
    <div>
      <ContentCard
        eyebrow={eyebrow}
        title={title}
        description={description}
        size='lg'
        className='bg-transparent border-0 p-0 mb-8 shadow-none'
      />

      <PhotoAlbumLinks albums={albums} />
    </div>
  );
}
