export const siteContent = {
  metadata: {
    title: 'Adam & Jenny',
    description: 'Wedding reception details and RSVP information.',
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
    sharedAlbumUrl: 'https://photos.app.goo.gl/7k6SWaLqjETzAff29',
    highlights: [
      {
        src: '/images/gallery-1.svg',
        caption: 'Soft light',
        description: 'Replace the placeholder files with real photos to make this feel finished.',
      },
      {
        src: '/images/gallery-2.svg',
        caption: 'City evenings',
        description: 'Replace the placeholder files with real photos to make this feel finished.',
      },
      {
        src: '/images/gallery-3.svg',
        caption: 'Favourite moments',
        description: 'Replace the placeholder files with real photos to make this feel finished.',
      },
    ],
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
