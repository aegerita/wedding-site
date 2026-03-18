import { ArrowUpRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import type { PhotoAlbum } from '@/types';

type PhotoAlbumLinksProps = {
  albumsIntro?: string;
  albums: PhotoAlbum[];
};

export function PhotoAlbumLinks({
  albums,
}: PhotoAlbumLinksProps) {
  if (!albums.length) {
    return null;
  }

  return (
    <div className='grid gap-4'>
        {albums.map((album) => (
          <article
            key={album.url}
            className='rounded-3xl border border-border bg-card p-5 shadow-sm'
          >
            <div className='flex h-full flex-col gap-4'>
              <div className='space-y-2'>
                  <h3 className='text-lg font-semibold tracking-tight text-foreground'>
                    {album.title}
                  </h3>
                  <p className='text-sm leading-6 text-muted-foreground'>
                    {album.description}
                  </p>
              </div>

              <div>
                <Button asChild variant='outline' size='sm'>
                  <a href={album.url} target='_blank' rel='noreferrer'>
                    {album.ctaLabel}
                    <ArrowUpRight className='size-4' />
                  </a>
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
  );
}
