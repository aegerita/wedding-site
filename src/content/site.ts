import type { Photo, PhotoAlbum, ScheduleContent } from '@/types';

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
      discordServer: {
        url: 'https://discord.gg/9f3xfM7V8g',
        ctaLabel: 'Discord',
      },
      googleSheet: {
        url: 'https://docs.google.com/spreadsheets/d/1VTRhLinp8E85dqlKdhBxpwtXPCTmSpD3Um4Qfsa12Tg/edit?usp=sharing',
        ctaLabel: 'Potluck sheet',
      },
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
    eyebrow: 'Schedule',
    title: 'Logistics for the big day',
    intro: 'Here’s where to be, when to arrive, and what to expect for Thursday night and Friday.',
    timezoneNote: 'All times are Toronto local time.',
    link: {
      url: '/schedule',
      ctaLabel: 'Full schedule',
    },
    quickFacts: [
      {
        title: 'Thursday, April 30',
        description: 'Board game night starts at 7:00 PM at Max and Eve’s apartment.',
      },
      {
        title: 'Friday ceremony',
        description: 'Ceremony guests should arrive at City Hall by 2:10 PM. The ceremony starts at 2:30 PM.',
      },
      {
        title: 'Friday reception',
        description: 'The reception starts around 3:30 PM. Please do not arrive before then.',
      },
      {
        title: 'Need help?',
        description: 'Use Discord if you cannot find the party room on Friday.',
      },
    ],
    locations: {
      cityHall: {
        name: 'Toronto City Hall',
        address: '100 Queen St. W., Toronto, ON M5H 2N2',
        details: [
          'Wedding Chambers, 3rd floor, East Tower.',
          'Enter through the wooden doors north of the Toronto sign.',
        ],
      },
      apartment: {
        name: 'Max and Eve’s apartment',
        address: '116 George St, Toronto, ON M5A 3S2, Unit N903',
        details: [
          'Buzz Max Odell or Evelyn Li on the intercom.',
          'The apartment is just down the hall from the reception room.',
        ],
      },
      reception: {
        name: '9th Floor Party Room',
        address: '116 George St, Toronto, ON M5A 3S2',
        details: [
          'The Thursday buzz-in instructions are only for the apartment.',
          'For the reception, go to the party room on the 9th floor. Ask in Discord if you cannot find it.',
        ],
      },
    },
    days: [
      {
        date: 'Thursday, April 30, 2026',
        title: 'Before the wedding',
        items: [
          {
            time: '7:00 PM',
            title: 'Board game night',
            location: 'Max and Eve’s apartment, 116 George St, Toronto, ON M5A 3S2, Unit N903',
            description:
              'All guests are welcome to come by, hang out, and play some games with us before the wedding day.',
            details: [
              'Buzz Max Odell or Evelyn Li on the intercom.',
              'The apartment is just down the hall from where the reception will be the next day.',
            ],
          },
        ],
      },
      {
        date: 'Friday, May 1, 2026',
        title: 'Wedding day',
        items: [
          {
            time: '2:10 PM',
            title: 'Arrive at Toronto City Hall',
            location: '100 Queen St. W., Toronto, ON M5H 2N2',
            description:
              'Please arrive by 2:10 PM so everyone can get settled before the ceremony starts.',
            details: [
              'The Wedding Chambers are on the 3rd floor in the East Tower.',
              'Enter City Hall through the wooden doors north of the Toronto sign, walk past the security desk, and follow the signs to the Wedding Chamber elevators.',
              'Use the East elevators. Elevators 1, 3, and 4 stop on the 3rd floor for the Wedding Chambers.',
            ],
          },
          {
            time: '2:30 PM',
            title: 'Ceremony',
            location: 'Wedding Chambers, 3rd floor, East Tower',
            description:
              'City Hall has a maximum attendance of 15 people for the ceremony. If you responded yes on the form and we did not tell you otherwise, you are welcome to attend.',
            details: [
              'We’ll also send out a reminder email to everyone.',
              'Dress code is business casual.',
              'Please feel free to take pictures during the ceremony.',
              'The ceremony is usually about 12 to 15 minutes, followed by the signing of the register.',
            ],
          },
          {
            time: 'After the ceremony',
            title: 'Group photos',
            location: 'Around Toronto City Hall',
            description:
              'After the ceremony and register signing, we’ll spend a little time taking group photos before heading to the reception.',
          },
          {
            time: '3:30 PM',
            title: 'Reception opens',
            location: '9th floor party room, 116 George St, Toronto, ON M5A 3S2',
            description:
              'Please do not arrive before 3:30 PM because we’ll still be on our way from City Hall.',
            details: [
              'Buzz Max Odell or Evelyn Li on the intercom.',
              'For the reception, you should be able to find the party room on the 9th floor.',
              'If you cannot find it, ask in the Discord server and we’ll attach the link.',
            ],
          },
          {
            time: '3:30 PM',
            title: 'Snacks and drinks',
            description:
              'Snacks will be available right away, including a shrimp platter, charcuterie, stuffed croissants, and cake.',
            details: [
              'We’ll also have wine and other drinks available.',
            ],
          },
          {
            time: '5:00 PM',
            title: 'Pizza',
            description: 'Later in the afternoon, around 5:00 PM, we’ll order pizza from Domino’s.',
          },
          {
            time: 'Evening',
            title: 'Games, drinks, and hanging out',
            description:
              'We’re mainly hoping for a relaxed afternoon and evening where people can eat, hang out, play board games, and maybe do Jackbox.',
            details: [
              'Later in the day Amir will be bartending some cocktails.',
              'People are welcome to head out whenever works for them.',
            ],
          },
        ],
      },
    ],
    logistics: [
      {
        title: 'City Hall',
        details: [
          'Address: 100 Queen St. W., Toronto, ON M5H 2N2.',
          'Arrive by 2:10 PM for the 2:30 PM ceremony.',
          'Use the East elevators. Elevators 1, 3, and 4 stop on the 3rd floor for the Wedding Chambers.',
          'There is a paid parking lot nearby, which is how we’ll be getting there ourselves, though the subway is probably the easiest option.',
        ],
      },
      {
        title: '116 George St',
        details: [
          'Buzz Max Odell or Evelyn Li on the intercom to get in.'
          'Thursday board game night is in Unit N903.',
          'Friday reception is in the party room on the 9th floor.',
          'Ask in Discord if you cannot find the party room.',
        ],
      },
      {
        title: 'Dress code',
        details: [
          'The ceremony dress code is business casual.',
          'There is not a strict dress code for the reception, though something not too far from business casual makes the most sense.',
        ],
      },
      {
        title: 'Food and drinks',
        details: [
          'Snacks will be ready when the reception starts, including shrimp platter, charcuterie, stuffed croissants, and cake.',
          'Pizza from Domino’s is planned around 5:00 PM.',
          'We’ll have wine and other drinks, with cocktails from Amir later in the day.',
        ],
      },
    ],
    ceremony: {
      time: 'Ceremony at 2:30 PM',
      arrivalTime: 'Arrive by 2:10 PM',
      venue: 'Toronto City Hall',
      address: '100 Queen St. W., Toronto, ON M5H 2N2',
      locationDetails: 'Wedding Chambers, 3rd floor, East Tower',
    },
    reception: {
      time: 'Starts around 3:30 PM',
      venue: '9th Floor Party Room',
      address: '116 George St, Toronto, ON M5A 3S2',
      arrivalNote: 'Please do not arrive before 3:30 PM.',
    },
    parking: [
      'Paid parking is available near City Hall.',
      'The subway is probably the easiest option for the ceremony.',
    ],
    dressCode: 'Ceremony business casual; reception close to business casual',
  } satisfies ScheduleContent,
  faq: {
    eyebrow: 'FAQ',
    title: 'The details people usually ask us for',
    intro:
      'A few answers on timing, logistics, and what to expect on May 1, 2026. We’ll keep this updated as plans firm up.',
    items: [
      {
        q: 'What time should I arrive for the ceremony?',
        a: 'Please arrive at Toronto City Hall by 2:10 PM. The ceremony starts at 2:30 PM in the Wedding Chambers on the 3rd floor of the East Tower.',
      },
      {
        q: 'What time should I arrive for the reception?',
        a: 'The reception starts around 3:30 PM in the 9th floor party room at 116 George St. Please do not arrive before then because we will still be coming from City Hall.',
      },
      {
        q: 'Do I need to attend?',
        a: 'We would love to see you there, but we understand if you can\'t make it. Please RSVP with your plans so we can have an accurate headcount.',
      },
      {
        q: 'Can I bring a plus one?',
        a: 'If your invitation includes a guest, add them in your RSVP. If you are unsure, check with us before submitting.',
      },
      {
        q: 'Is there a gift registry?',
        a: 'We are not doing a traditional registry, and we do not expect gifts, but if you would like to contribute, you can e-transfer us at jennytai3221@gmail.com, or give us a red envelope :)',
      },
      {
        q: 'Where should I park?',
        a: 'For the ceremony, there is a paid parking lot near City Hall, though the subway is probably the easiest option. For the reception, there is parking in the building at 116 George St, but it is limited and we recommend arriving early if you are driving.',
      },
      {
        q: 'What should I wear?',
        a: 'The ceremony dress code is business casual. There is not a strict dress code for the reception, though something not too far from business casual makes the most sense.',
      },
      {
        q: 'How do I update my plans later?',
        a: 'Use the RSVP form once it is live, or reach out to us directly if you need to change attendance, meal preferences, or accessibility details.',
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
        caption: 'Dancing',
        description: 'Got drunk and danced at my cousin \'s weddings. Will probably be drunk at ours as well :)',
      },
      {
        src: '/images/PXL_20240612_211311317.jpg',
        caption: 'Graduation',
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
