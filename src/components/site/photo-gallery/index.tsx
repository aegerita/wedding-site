'use client';

import { cn } from '@/lib/utils';
import type { Photo, PhotoAlbum } from '@/types';

import { PhotoGalleryDetails } from './photo-gallery-details';
import { PhotoHighlightGrid } from './photo-highlight-grid';
import { PhotoViewerModal } from './photo-viewer-modal';
import { usePhotoViewer } from './use-photo-viewer';

type PhotoGalleryProps = {
  eyebrow: string;
  title: string;
  description: string;
  albums?: PhotoAlbum[];
  highlights: Photo[];
};

export function PhotoGallery({
  eyebrow,
  title,
  description,
  albums = [],
  highlights,
}: PhotoGalleryProps) {
  const hasHighlights = highlights.length > 0;
  const {
    activePhoto,
    closeViewer,
    currentIndex,
    goTo,
    openPhoto,
    totalPhotos,
  } = usePhotoViewer({ highlights });

  if (!hasHighlights) {
    return null;
  }

  return (
    <>
      <section className='relative py-4'>
        <div
          className='pointer-events-none absolute inset-0 blur-3xl'
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
            <PhotoGalleryDetails
              eyebrow={eyebrow}
              title={title}
              description={description}
              albums={albums}
            />

            <PhotoHighlightGrid highlights={highlights} onOpen={openPhoto} />
          </div>
        </div>
      </section>

      {activePhoto ? (
        <PhotoViewerModal
          photo={activePhoto}
          currentIndex={currentIndex}
          totalPhotos={totalPhotos}
          onClose={closeViewer}
          onPrevious={() => goTo(currentIndex - 1)}
          onNext={() => goTo(currentIndex + 1)}
        />
      ) : null}
    </>
  );
}
