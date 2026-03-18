import { useEffect, useState } from 'react';

type UsePhotoViewerProps = {
  highlights: {
    src: string;
    alt?: string;
    caption?: string;
    description?: string;
  }[];
};

export function usePhotoViewer({ highlights }: UsePhotoViewerProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

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

  const closeViewer = () => {
    setActiveIndex(null);
  };

  const goTo = (nextIndex: number) => {
    const normalizedIndex = (nextIndex + highlights.length) % highlights.length;

    setActiveIndex(normalizedIndex);
  };

  const openPhoto = (index: number) => {
    setActiveIndex(index);
  };

  return {
    activePhoto,
    closeViewer,
    currentIndex,
    goTo,
    openPhoto,
    totalPhotos: highlights.length,
  };
}
