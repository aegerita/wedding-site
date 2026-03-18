import { ArrowUpRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { PhotoAlbum } from '@/types';

type PhotoAlbumLinksProps = {
  albumsIntro?: string;
  albums: PhotoAlbum[];
};

export function PhotoAlbumLinks({ albums }: PhotoAlbumLinksProps) {
  if (!albums.length) {
    return null;
  }

  return (
    <div className='grid gap-4'>
      {albums.map((album) => (
        <Card title={album.title} description={album.description} size='sm' key={album.url}>
          <Button asChild variant='outline'>
            <a href={album.url} target='_blank' rel='noreferrer'>
              {album.ctaLabel}
              <ArrowUpRight className='size-4' />
            </a>
          </Button>
        </Card>
      ))}
    </div>
  );
}
