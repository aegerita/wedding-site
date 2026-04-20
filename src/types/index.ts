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

export type SiteLink = {
  url: string;
  ctaLabel: string;
};

export type ScheduleLocation = {
  name: string;
  address: string;
  details?: string[];
};

export type ScheduleQuickFact = {
  title: string;
  description: string;
};

export type ScheduleItem = {
  time: string;
  title: string;
  location?: string;
  description: string;
  details?: string[];
};

export type ScheduleDay = {
  date: string;
  title: string;
  items: ScheduleItem[];
};

export type ScheduleLogisticsItem = {
  title: string;
  details: string[];
};

export type ScheduleContent = {
  eyebrow: string;
  title: string;
  intro: string;
  timezoneNote: string;
  link: SiteLink;
  quickFacts: ScheduleQuickFact[];
  days: ScheduleDay[];
  logistics: ScheduleLogisticsItem[];
  locations: {
    cityHall: ScheduleLocation;
    apartment: ScheduleLocation;
    reception: ScheduleLocation;
  };
  ceremony: {
    time: string;
    arrivalTime: string;
    venue: string;
    address: string;
    locationDetails: string;
  };
  reception: {
    time: string;
    venue: string;
    address: string;
    arrivalNote: string;
  };
  parking: string[];
  dressCode: string;
};
