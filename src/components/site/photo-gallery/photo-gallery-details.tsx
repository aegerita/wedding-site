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
    <div className='space-y-4'>
      <p className='text-xs uppercase tracking-[0.35em] text-primary/80'>
        {eyebrow}
      </p>

      <div className='space-y-3'>
        <h2 className='max-w-md text-3xl font-semibold tracking-tight sm:text-4xl'>
          {title}
        </h2>
        <p className='max-w-xl text-base leading-7 text-muted-foreground sm:text-lg'>
          {description}
        </p>
      </div>

      <PhotoAlbumLinks albums={albums} />
    </div>
  );
}
