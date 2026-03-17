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
    sharedAlbumUrl: 'https://drive.google.com/...',
    highlights: [
      { src: '/images/couple-1.jpg', alt: 'Highlight 1' },
      { src: '/images/couple-2.jpg', alt: 'Highlight 2' },
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
