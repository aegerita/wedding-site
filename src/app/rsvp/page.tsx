import { siteContent } from '@/content/site';

export default function RsvpPage() {
  const { home } = siteContent;

  return (
    <main className='min-h-screen bg-stone-100 px-6 py-20 text-stone-900 sm:pl-28'>
      <div className='mx-auto flex max-w-4xl flex-col gap-10'>
        <section className='space-y-4'>
          <p className='text-sm uppercase tracking-[0.35em] text-stone-500'>
            RSVP
          </p>
          <h1 className='text-4xl font-semibold tracking-tight sm:text-6xl'>
            Let us know if you can make it
          </h1>
          <p className='max-w-2xl text-lg leading-8 text-stone-600'>
            We’re saving a seat for you on {home.date} in {home.location}. A
            proper RSVP form can slot in here once you are ready to collect
            responses.
          </p>
        </section>

        <section className='rounded-3xl border border-stone-200 bg-white p-8 shadow-sm'>
          <div className='grid gap-4 text-sm leading-7 text-stone-600 sm:grid-cols-2'>
            <div className='rounded-2xl bg-stone-50 p-5'>
              <p className='font-medium text-stone-900'>What guests should share</p>
              <p className='mt-2'>
                Attendance, meal preferences, plus-one details, and any
                accessibility needs.
              </p>
            </div>

            <div className='rounded-2xl bg-stone-50 p-5'>
              <p className='font-medium text-stone-900'>Suggested next step</p>
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
