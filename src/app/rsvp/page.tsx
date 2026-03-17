import { siteContent } from '@/content/site';

export default function RsvpPage() {
  const { home } = siteContent;

  return (
    <main className='min-h-screen px-6 py-20 text-foreground sm:pl-28'>
      <div className='mx-auto flex max-w-4xl flex-col gap-10'>
        <section className='space-y-4'>
          <p className='text-sm uppercase tracking-[0.35em] text-muted-foreground'>
            RSVP
          </p>
          <h1 className='text-4xl font-semibold tracking-tight sm:text-6xl'>
            Let us know if you can make it
          </h1>
          <p className='max-w-2xl text-lg leading-8 text-muted-foreground'>
            We’re expecting you on {home.date} in {home.location}.
          </p>
        </section>

        <section className='rounded-3xl border border-border bg-card p-8 shadow-sm'>
          <div className='grid gap-4 text-sm leading-7 text-muted-foreground sm:grid-cols-2'>
            <div className='rounded-2xl bg-muted p-5'>
              <p className='font-medium text-foreground'>What guests should share</p>
              <p className='mt-2'>
                Attendance, meal preferences, plus-one details, and any
                accessibility needs.
              </p>
            </div>

            <div className='rounded-2xl bg-muted p-5'>
              <p className='font-medium text-foreground'>Suggested next step</p>
              <p className='mt-2'>
                Replace this placeholder with your real RSVP flow or linked form
                when you are ready.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
