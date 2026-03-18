import Image from 'next/image';

import { cn } from '@/lib/utils';
import type { Photo } from '@/types';

import { getPhotoAltText, photoTileClasses } from './shared';

type PhotoHighlightGridProps = {
  highlights: Photo[];
  onOpen: (index: number) => void;
};

export function PhotoHighlightGrid({
  highlights,
  onOpen,
}: PhotoHighlightGridProps) {
  return (
    <div className='grid auto-rows-[220px] gap-4 sm:auto-rows-[280px] md:grid-cols-12'>
      {highlights.map((photo, index) => (
        <button
          key={photo.src}
          type='button'
          onClick={() => onOpen(index)}
          className={cn(
            'group relative overflow-hidden rounded-[1.75rem] border border-border/70 bg-card text-left shadow-[0_24px_65px_-32px_rgba(24,24,27,0.45)] transition duration-300 hover:z-10 hover:-translate-y-1 hover:shadow-[0_36px_90px_-36px_rgba(24,24,27,0.5)]',
            photoTileClasses[index] ?? 'md:col-span-4',
          )}
        >
          <Image
            src={photo.src}
            alt={getPhotoAltText(photo, `Photo highlight ${index + 1}`)}
            fill
            priority={index === 0}
            sizes='(min-width: 1024px) 42vw, (min-width: 768px) 50vw, 100vw'
            className='object-cover transition duration-500 group-hover:scale-[1.03]'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-white/5' />
          {index === 0 ? (
            <span className='absolute left-4 top-4 rounded-full border border-white/30 bg-black/20 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/80 backdrop-blur-sm'>
              Featured
            </span>
          ) : null}
          <div className='absolute inset-x-0 bottom-0 space-y-1 p-4 text-white'>
            <p className='text-base font-medium tracking-tight'>
              {photo.caption ?? 'Open image'}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}
