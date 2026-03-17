'use client';

import { ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Highlight = {
  src: string;
  alt?: string;
  caption?: string;
  description?: string;
};

type PhotoGalleryProps = {
  eyebrow: string;
  title: string;
  description: string;
  sharedAlbumUrl?: string;
  highlights: Highlight[];
};

const tileClasses = [
  'md:col-span-7 md:row-span-2',
  'md:col-span-5',
  'md:col-span-5',
];

export function PhotoGallery({
  eyebrow,
  title,
  description,
  sharedAlbumUrl,
  highlights,
}: PhotoGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const hasHighlights = highlights.length > 0;
  const activePhoto = activeIndex === null ? null : highlights[activeIndex];
  const currentIndex = activeIndex ?? 0;

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveIndex(null);
        return;
      }

      if (event.key === 'ArrowRight') {
        setActiveIndex((current) =>
          current === null ? 0 : (current + 1) % highlights.length,
        );
      }

      if (event.key === 'ArrowLeft') {
        setActiveIndex((current) =>
          current === null
            ? highlights.length - 1
            : (current - 1 + highlights.length) % highlights.length,
        );
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeIndex, highlights.length]);

  if (!hasHighlights) {
    return null;
  }

  const getAltText = (photo: Highlight) =>
    photo.alt ?? photo.caption ?? photo.description ?? 'Photo highlight';

  const goTo = (nextIndex: number) => {
    const normalizedIndex = (nextIndex + highlights.length) % highlights.length;

    setActiveIndex(normalizedIndex);
  };

  return (
    <>
      <section className='relative py-4'>
        <div
          className='pointer-events-none absolute inset-0'
          style={{
            backgroundImage: [
              'linear-gradient(180deg, transparent,',
              'rgba(255, 255, 255, 0.07) 12%,',
              'rgba(107, 165, 201, 0.08) 34%,',
              'rgba(242, 190, 159, 0.08) 68%,',
              'transparent)',
            ].join(' '),
          }}
        />
        <div className='px-6 sm:pl-28 sm:pr-6'>
          <div
            className={cn(
              'relative mx-auto grid max-w-4xl gap-10',
              'lg:grid-cols-[minmax(18rem,0.7fr)_minmax(0,1.3fr)] lg:items-center',
            )}
          >
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
              <p className='text-sm leading-6 text-muted-foreground'>
                  Upload photos to the shared wedding album:
                </p>
              {sharedAlbumUrl && (
                <Button asChild variant='outline' size='lg' className='mt-2'>
                  <a
                    href={sharedAlbumUrl}
                    target='_blank'
                    rel='noreferrer'
                  >
                    Open shared album
                    <ArrowUpRight className='size-4' />
                  </a>
                </Button>
              )}
            </div>

            <div className='grid auto-rows-[220px] gap-4 sm:auto-rows-[280px] md:grid-cols-12'>
              {highlights.map((photo, index) => (
                <button
                  key={photo.src}
                  type='button'
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    'group relative overflow-hidden rounded-[1.75rem] border border-white/60 bg-muted text-left shadow-[0_24px_65px_-32px_rgba(24,24,27,0.45)] transition duration-300 hover:z-10 hover:-translate-y-1 hover:shadow-[0_36px_90px_-36px_rgba(24,24,27,0.5)]',
                    tileClasses[index] ?? 'md:col-span-4',
                  )}
                >
                  <Image
                    src={photo.src}
                    alt={getAltText(photo)}
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
          </div>
        </div>
      </section>

      {activePhoto ? (
        <div
          role='dialog'
          aria-modal='true'
          aria-label='Photo viewer'
          className='fixed inset-0 z-[70] bg-black/78 px-4 py-6 backdrop-blur-sm sm:px-8'
          onClick={() => setActiveIndex(null)}
        >
          <div
            className='mx-auto flex h-full max-w-6xl flex-col gap-4'
            onClick={(event) => event.stopPropagation()}
          >
            <div className='flex items-start justify-between gap-4 text-white'>
              <div className='space-y-2'>
                <p className='text-xs uppercase tracking-[0.35em] text-white/55'>
                  Photo {currentIndex + 1} of {highlights.length}
                </p>
                <p className='text-lg font-medium sm:text-2xl'>
                  {activePhoto.caption ?? 'Photo highlight'}
                </p>
              </div>
              <Button
                type='button'
                variant='ghost'
                size='icon'
                onClick={() => setActiveIndex(null)}
                className='rounded-full border border-white/15 bg-white/8 text-white hover:bg-white/14 hover:text-white'
              >
                <X className='size-4' />
                <span className='sr-only'>Close viewer</span>
              </Button>
            </div>

            <div className='relative min-h-0 flex-1 overflow-hidden rounded-[2rem] border border-white/10 bg-black/25 shadow-[0_30px_90px_-40px_rgba(0,0,0,0.65)]'>
              <Image
                src={activePhoto.src}
                alt={getAltText(activePhoto)}
                fill
                sizes='100vw'
                className='object-contain p-4 sm:p-8'
              />
            </div>

            <div className='flex items-center justify-between gap-3 text-white'>
              <Button
                type='button'
                variant='ghost'
                size='lg'
                onClick={() => goTo(currentIndex - 1)}
                className='border border-white/15 bg-white/8 text-white hover:bg-white/14 hover:text-white'
              >
                <ChevronLeft className='size-4' />
                Previous
              </Button>

              <p className='hidden text-sm text-white/60 sm:block'>
                  {activePhoto.description}
              </p>

              <Button
                type='button'
                variant='ghost'
                size='lg'
                onClick={() => goTo(currentIndex + 1)}
                className='border border-white/15 bg-white/8 text-white hover:bg-white/14 hover:text-white'
              >
                Next
                <ChevronRight className='size-4' />
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
