import { RsvpForm } from '@/components/site/rsvp-form';
import { content } from '@/content/site';

export default function RsvpPage() {
  const { home } = content;

  return (
    <main className='min-h-screen px-6 py-20 text-foreground sm:pl-28'>
      <div className='mx-auto flex max-w-5xl flex-col gap-10'>
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

        <section>
          <RsvpForm />
        </section>
      </div>
    </main>
  );
}
