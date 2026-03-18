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
    link: {
      weddingAlbum: {
        url: 'https://photos.app.goo.gl/7k6SWaLqjETzAff29',
        ctaLabel: 'Open album',
      },
      musicPlaylist: {
        url: 'https://open.spotify.com/playlist/1KFTX8tNy9YlvqK4IbQkM5?si=6cae275b0f13489a&pt=ca18ef282c6df2577753071fe992d76a',
        ctaLabel: 'Open playlist',
      },
    },
  },
  schedule: {
    ceremony: {
      time: '2:30 PM',
      venue: 'Toronto City Hall',
      address: '100 Queen St W, Toronto, ON',
    },
    reception: {
      time: '3:00 PM',
      venue: 'Max and Eve\'s Party Room',
      address: '116 George St, Toronto, ON',
    },
    parking: [
      'Contact us for parking at our place or friends\' visitor parking.',
    ],
    dressCode: 'Business casual. Whatever you wear to work is perfect.',
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'The details people usually ask us for',
    intro:
      'A few answers on timing, logistics, and what to expect on May 1, 2026. We’ll keep this updated as plans firm up.',
    items: [
      {
        q: 'What time should I arrive?',
        a: 'Please plan to arrive 15 to 20 minutes before the 2:00 PM ceremony so everyone can get settled before things begin.',
      },
      {
        q: 'Can I bring a plus one?',
        a: 'If your invitation includes a guest, add them in your RSVP. If you are unsure, check with us before submitting.',
      },
      {
        q: 'Where should I park?',
        a: 'There is underground parking nearby, but street parking is limited. Give yourself a few extra minutes in case the closest lot is full.',
      },
      {
        q: 'What should I wear?',
        a: 'Cocktail / semi-formal is perfect for both the ceremony and reception.',
      },
      {
        q: 'Will there be a shared photo album?',
        a: 'Yes. We have a shared wedding album linked on the home page, and we would love your candid photos from the day.',
      },
      {
        q: 'How do I update my plans later?',
        a: 'Use the RSVP flow once it is live, or reach out to us directly if you need to change attendance, meal preferences, or accessibility details.',
      },
    ],
    note: 'Website is UP and RUNNING! Don\'t forget to RSVP!',
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
