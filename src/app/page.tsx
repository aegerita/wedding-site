import Link from 'next/link';

import { PhotoGallery } from '@/components/site/photo-gallery';
import { SuggestionForm } from '@/components/site/suggestion';
import { Card } from '@/components/ui/card';
import { content } from '@/content/site';

export default function Home() {
  const { home, schedule, photos } = content;
  const updateLinks = [
    schedule.link,
    home.link.discordServer,
    home.link.googleSheet,
    home.link.weddingAlbum,
    home.link.musicPlaylist,
  ];

  return (
    <main className='relative min-h-screen overflow-hidden py-20 text-foreground'>
      <div className='relative flex flex-col gap-10'>
        <div className='px-6 sm:pl-28 sm:pr-6'>
          <section className='mx-auto max-w-5xl space-y-4'>
            <p className='text-sm uppercase tracking-[0.35em] text-muted-foreground'>
              {home.date} · {home.location}
            </p>
            <h1 className='text-5xl font-semibold tracking-tight sm:text-7xl'>{home.title}</h1>
            <p className='max-w-2xl text-lg leading-8 text-muted-foreground'>{home.intro}</p>
          </section>
        </div>

        <PhotoGallery {...photos} />

        <div className='px-6 sm:pl-28 sm:pr-6'>
          <div className='mx-auto flex max-w-5xl flex-col gap-10'>
            <section className='grid gap-4 lg:grid-cols-[1.30fr_0.70fr]'>
              <Card
                eyebrow='Quick facts'
                title='The essentials'
                description='The key logistics at a glance if you just need the short version.'
              >
                <div className='grid gap-4 text-sm leading-7 text-muted-foreground sm:grid-cols-2'>
                  <div className='rounded-2xl bg-muted p-5'>
                    <p className='font-medium text-foreground'>Ceremony</p>
                    <p className='mt-2'>{schedule.ceremony.arrivalTime}</p>
                    <p>{schedule.ceremony.time}</p>
                    <p>{schedule.ceremony.venue}</p>
                    <p>{schedule.ceremony.address}</p>
                  </div>

                  <div className='rounded-2xl bg-muted p-5'>
                    <p className='font-medium text-foreground'>Reception</p>
                    <p className='mt-2'>{schedule.reception.time}</p>
                    <p>{schedule.reception.arrivalNote}</p>
                    <p>{schedule.reception.venue}</p>
                    <p>{schedule.reception.address}</p>
                  </div>

                  <div className='rounded-2xl bg-muted p-5'>
                    <p className='font-medium text-foreground'>Parking</p>
                    <p className='mt-2'>{schedule.parking[0]}</p>
                    <p>{schedule.parking[1]}</p>
                  </div>

                  <div className='rounded-2xl bg-muted p-5'>
                    <p className='font-medium text-foreground'>Dress code</p>
                    <p className='mt-2'>{schedule.dressCode}</p>
                  </div>
                </div>
                <Link
                  href={schedule.link.url}
                  className='inline-flex w-fit rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted'
                >
                  {schedule.link.ctaLabel}
                </Link>
              </Card>

              <Card eyebrow='Updates' title='Keep an eye here'>
                <div className='space-y-4 text-sm leading-7 text-muted-foreground'>
                  <p>
                    We added a full schedule page with the Thursday board game night, Friday
                    ceremony arrival details, reception timing, addresses, and entry
                    instructions.
                  </p>
                  <p>
                    You can also join the Discord, add to the potluck sheet, and keep dropping
                    songs and photos into the shared playlist and album.
                  </p>
                  <div className='flex flex-wrap gap-3'>
                    {updateLinks.map((link) => (
                      <Link
                        key={link.url}
                        href={link.url}
                        target={link.url.startsWith('http') ? '_blank' : undefined}
                        rel={link.url.startsWith('http') ? 'noreferrer' : undefined}
                        className='inline-flex rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted'
                      >
                        {link.ctaLabel}
                      </Link>
                    ))}
                  </div>
                </div>
              </Card>
            </section>

            <SuggestionForm />
          </div>
        </div>
      </div>
    </main>
  );
}
