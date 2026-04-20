import Link from 'next/link';

import { Card } from '@/components/ui/card';
import { content } from '@/content/site';

export default function SchedulePage() {
  const { home, schedule } = content;

  return (
    <main className='min-h-screen px-6 py-20 text-foreground sm:pl-28 sm:pr-6'>
      <div className='mx-auto flex max-w-5xl flex-col gap-10'>
        <section className='space-y-4'>
          <p className='text-sm uppercase tracking-[0.35em] text-muted-foreground'>
            {schedule.eyebrow}
          </p>
          <h1 className='text-4xl font-semibold tracking-tight sm:text-6xl'>
            {schedule.title}
          </h1>
          <p className='max-w-3xl text-lg leading-8 text-muted-foreground'>
            {schedule.intro}
          </p>
          <p className='text-sm leading-6 text-muted-foreground'>
            {schedule.timezoneNote}
          </p>
        </section>

        <section aria-labelledby='at-a-glance' className='space-y-4'>
          <div className='flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between'>
            <div>
              <p className='text-sm uppercase tracking-[0.35em] text-muted-foreground'>
                At a glance
              </p>
              <h2 id='at-a-glance' className='mt-2 text-2xl font-semibold tracking-tight'>
                What to remember
              </h2>
            </div>
            <Link
              href={home.link.discordServer.url}
              target='_blank'
              rel='noreferrer'
              className='inline-flex w-fit rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted'
            >
              Open Discord
            </Link>
          </div>

          <div className='grid gap-4 md:grid-cols-2'>
            {schedule.quickFacts.map((fact) => (
              <Card key={fact.title} as='article' size='sm' title={fact.title}>
                <p className='text-sm leading-7 text-muted-foreground'>{fact.description}</p>
              </Card>
            ))}
          </div>
        </section>

        <section aria-labelledby='timeline' className='space-y-6'>
          <div>
            <p className='text-sm uppercase tracking-[0.35em] text-muted-foreground'>
              Timeline
            </p>
            <h2 id='timeline' className='mt-2 text-2xl font-semibold tracking-tight'>
              Where to be and when
            </h2>
          </div>

          <div className='space-y-8'>
            {schedule.days.map((day) => (
              <section key={day.date} className='space-y-4'>
                <div>
                  <h3 className='text-xl font-semibold tracking-tight'>{day.date}</h3>
                  <p className='text-sm leading-6 text-muted-foreground'>{day.title}</p>
                </div>

                <ol className='relative space-y-4 border-l border-border pl-5'>
                  {day.items.map((item) => (
                    <li key={`${day.date}-${item.time}-${item.title}`} className='relative'>
                      <div
                        aria-hidden='true'
                        className='absolute -left-[1.8rem] top-2 h-3 w-3 rounded-full border border-primary bg-background ring-4 ring-background'
                      />
                      <article className='rounded-3xl border border-border bg-card/50 p-5 shadow-sm'>
                        <div className='flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
                          <div>
                            <p className='text-sm font-medium text-primary'>{item.time}</p>
                            <h4 className='mt-1 text-xl font-semibold tracking-tight'>
                              {item.title}
                            </h4>
                          </div>
                          {item.location && (
                            <p className='max-w-sm text-sm leading-6 text-muted-foreground sm:text-right'>
                              {item.location}
                            </p>
                          )}
                        </div>

                        <p className='mt-4 text-sm leading-7 text-muted-foreground'>
                          {item.description}
                        </p>

                        {item.details && (
                          <ul className='mt-4 space-y-2 text-sm leading-6 text-muted-foreground'>
                            {item.details.map((detail) => (
                              <li key={detail} className='flex gap-2'>
                                <span aria-hidden='true' className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70' />
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </article>
                    </li>
                  ))}
                </ol>
              </section>
            ))}
          </div>
        </section>

        <section aria-labelledby='logistics' className='space-y-4'>
          <div>
            <p className='text-sm uppercase tracking-[0.35em] text-muted-foreground'>
              Logistics
            </p>
            <h2 id='logistics' className='mt-2 text-2xl font-semibold tracking-tight'>
              The practical details
            </h2>
          </div>

          <div className='grid gap-4 md:grid-cols-2'>
            {schedule.logistics.map((item) => (
              <Card key={item.title} as='article' size='sm' title={item.title}>
                <ul className='space-y-2 text-sm leading-6 text-muted-foreground'>
                  {item.details.map((detail) => (
                    <li key={detail} className='flex gap-2'>
                      <span aria-hidden='true' className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70' />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
