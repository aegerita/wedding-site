import type { Photo } from '@/types';

export const photoTileClasses = [
  'md:col-span-7 md:row-span-2',
  'md:col-span-5',
  'md:col-span-5',
];

export function getPhotoAltText(photo: Photo, fallback: string) {
  return photo.alt ?? photo.caption ?? photo.description ?? fallback;
}
