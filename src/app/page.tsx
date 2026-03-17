import { SuggestionForm } from '@/components/site/suggestion';
import { siteContent } from '@/content/site';

export default async function Home() {
  const { home } = siteContent;

  return (
    <main className='min-h-screen bg-background px-6 py-20 text-foreground sm:pl-28'>
      <div className='mx-auto flex max-w-4xl flex-col gap-12'>
        <section className='space-y-4'>
          <p className='text-sm uppercase tracking-[0.35em] text-muted-foreground'>
            {home.date} · {home.location}
          </p>
          <h1 className='text-5xl font-semibold tracking-tight sm:text-7xl'>
            {home.title}
          </h1>
          <p className='max-w-2xl text-lg leading-8 text-muted-foreground'>
            {home.intro}
          </p>
        </section>

        <section className='rounded-3xl border border-border bg-card p-8 shadow-sm'>
          <SuggestionForm />
        </section>
      </div>
    </main>
  );
}
