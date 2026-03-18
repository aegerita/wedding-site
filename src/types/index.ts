export type Photo = {
  src: string;
  alt?: string;
  caption?: string;
  description?: string;
};

export type PhotoAlbum = {
  title: string;
  description: string;
  url: string;
  ctaLabel: string;
};
