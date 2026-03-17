import { siteContent } from '@/content/site';

export default function SchedulePage() {
  const { schedule } = siteContent;

  return (
    <main className='min-h-screen bg-stone-100 px-6 py-20 text-stone-900 sm:pl-28'>
      <div className='mx-auto flex max-w-4xl flex-col gap-10'>
        <section className='space-y-4'>
          <p className='text-sm uppercase tracking-[0.35em] text-stone-500'>
            Schedule
          </p>
          <h1 className='text-4xl font-semibold tracking-tight sm:text-6xl'>
            Plan the day
          </h1>
          <p className='max-w-2xl text-lg leading-8 text-stone-600'>
            A simple overview of ceremony and reception timing so guests know
            where to be and when.
          </p>
        </section>

        <section className='grid gap-4 sm:grid-cols-2'>
          <article className='rounded-3xl border border-stone-200 bg-white p-8 shadow-sm'>
            <p className='text-sm uppercase tracking-[0.25em] text-stone-500'>
              Ceremony
            </p>
            <h2 className='mt-3 text-2xl font-semibold tracking-tight'>
              {schedule.ceremony.time}
            </h2>
            <p className='mt-2 text-lg text-stone-700'>{schedule.ceremony.venue}</p>
            <p className='mt-1 text-sm leading-7 text-stone-500'>
              {schedule.ceremony.address}
            </p>
          </article>

          <article className='rounded-3xl border border-stone-200 bg-white p-8 shadow-sm'>
            <p className='text-sm uppercase tracking-[0.25em] text-stone-500'>
              Reception
            </p>
            <h2 className='mt-3 text-2xl font-semibold tracking-tight'>
              {schedule.reception.time}
            </h2>
            <p className='mt-2 text-lg text-stone-700'>{schedule.reception.venue}</p>
            <p className='mt-1 text-sm leading-7 text-stone-500'>
              {schedule.reception.address}
            </p>
          </article>
        </section>

        <section className='rounded-3xl border border-stone-200 bg-white p-8 shadow-sm'>
          <div className='grid gap-8 sm:grid-cols-2'>
            <div>
              <p className='text-sm uppercase tracking-[0.25em] text-stone-500'>
                Parking
              </p>
              <ul className='mt-4 space-y-3 text-sm leading-7 text-stone-600'>
                {schedule.parking.map((item) => (
                  <li key={item} className='rounded-2xl bg-stone-50 px-4 py-3'>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className='text-sm uppercase tracking-[0.25em] text-stone-500'>
                Dress code
              </p>
              <p className='mt-4 rounded-2xl bg-stone-50 px-4 py-3 text-sm leading-7 text-stone-600'>
                {schedule.dressCode}
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
