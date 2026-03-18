import { Photo, PhotoAlbum } from '@/types';

export const content = {
  metadata: {
    title: 'Adam & Jenny',
    description: 'Wedding reception details and RSVP information.',
    repoUrl: 'https://github.com/aegerita/wedding-site',
  },
  home: {
    title: 'Adam & Jenny',
    date: 'May 1, 2026',
    location: 'Toronto, Ontario',
    intro: 'We’re excited to celebrate with you.',
  },
  schedule: {
    ceremony: {
      time: '2:00 PM',
      venue: 'Toronto City Hall',
      address: '100 Queen St W, Toronto, ON',
    },
    reception: {
      time: '6:00 PM',
      venue: 'Reception Venue Name',
      address: 'Reception address here',
    },
    parking: [
      'Underground parking nearby',
      'Street parking is limited',
    ],
    dressCode: 'Cocktail / Semi-formal',
    faq: [
      {
        q: 'Can I bring a plus one?',
        a: 'Please indicate in the RSVP form.',
      },
    ],
  },
  photos: {
    eyebrow: 'Photo Highlights',
    title: 'A few frames from our story',
    description:
      'Oct 2022 - May 2026',
    albums: [
      {
        title: 'Current Photo Album',
        description: 'Our full running album of photos together, beyond the small set featured on the homepage.',
        url: 'https://photos.app.goo.gl/NsxzyHxXVBjYk8986',
        ctaLabel: 'View current album',
      },
      {
        title: 'Wedding Photo Album',
        description: 'The shared wedding album for guest uploads and everyone’s pictures from the celebration.',
        url: 'https://photos.app.goo.gl/7k6SWaLqjETzAff29',
        ctaLabel: 'Open wedding album',
      },
    ] satisfies PhotoAlbum[],
    highlights: [
      {
        src: '/images/SEHI0540.JPG',
        caption: 'Dancing at consin\'s wedding',
        description: 'Got drunk and danced at weddings. Will probably be drunk at ours as well :)',
      },
      {
        src: '/images/PXL_20240612_211311317.jpg',
        caption: 'Adam\'s graduation',
        description: 'Celebrated together with friends and family',
      },
      {
        src: '/images/IMG_8320.JPG',
        caption: 'Shanghai trip',
        description: 'A fun trip to Shanghai with visiting Jenny\'s family in 2024',
      },
    ] satisfies Photo[],
  },
  gifts: {
    etransferEmail: 'your@email.com',
    note: 'We are not doing a traditional registry...',
    projects: [
      { key: 'banff', title: 'Banff Honeymoon', description: '...' },
      { key: 'lego', title: 'LEGO Set', description: '...' },
      { key: 'home', title: 'Home Project', description: '...' },
    ],
  },
};
