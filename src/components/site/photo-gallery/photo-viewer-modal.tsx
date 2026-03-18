import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import type { Photo } from '@/types';

import { getPhotoAltText } from './shared';

type PhotoViewerModalProps = {
  photo: Photo;
  currentIndex: number;
  totalPhotos: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
};

export function PhotoViewerModal({
  photo,
  currentIndex,
  totalPhotos,
  onClose,
  onPrevious,
  onNext,
}: PhotoViewerModalProps) {
  return (
    <div
      role='dialog'
      aria-modal='true'
      aria-label='Photo viewer'
      className='fixed inset-0 z-[70] bg-black/78 px-4 py-6 backdrop-blur-sm sm:px-8'
      onClick={onClose}
    >
      <div
        className='mx-auto flex h-full max-w-6xl flex-col gap-4'
        onClick={(event) => event.stopPropagation()}
      >
        <div className='flex items-start justify-between gap-4 text-white'>
          <div className='space-y-2'>
            <p className='text-xs uppercase tracking-[0.35em] text-white/55'>
              Photo {currentIndex + 1} of {totalPhotos}
            </p>
            <p className='text-lg font-medium sm:text-2xl'>
              {photo.caption ?? `Photo ${currentIndex + 1}`}
            </p>
          </div>

          <Button
            type='button'
            variant='ghost'
            size='icon'
            onClick={onClose}
            className='rounded-full border border-white/15 bg-white/8 text-white hover:bg-white/14 hover:text-white'
          >
            <X className='size-4' />
            <span className='sr-only'>Close viewer</span>
          </Button>
        </div>

        <div className='relative min-h-0 flex-1 overflow-hidden rounded-[2rem] border border-white/10 bg-black/25 shadow-[0_30px_90px_-40px_rgba(0,0,0,0.65)]'>
          <Image
            src={photo.src}
            alt={getPhotoAltText(photo, `Photo ${currentIndex + 1}`)}
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
            onClick={onPrevious}
            className='border border-white/15 bg-white/8 text-white hover:bg-white/14 hover:text-white'
          >
            <ChevronLeft className='size-4' />
            Previous
          </Button>

          <div className='hidden min-w-0 flex-1 px-4 sm:block'>
            {photo.description ? (
              <p className='text-center text-sm text-white/60'>
                {photo.description}
              </p>
            ) : null}
          </div>

          <Button
            type='button'
            variant='ghost'
            size='lg'
            onClick={onNext}
            className='border border-white/15 bg-white/8 text-white hover:bg-white/14 hover:text-white'
          >
            Next
            <ChevronRight className='size-4' />
          </Button>
        </div>
      </div>
    </div>
  );
}
