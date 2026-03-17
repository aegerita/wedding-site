import { SuggestionForm } from '@/components/site/suggestion';
import { siteContent } from '@/content/site';

export default async function Home() {
  const { home } = siteContent;

  return (
    <main className='min-h-screen bg-stone-100 px-6 py-20 text-stone-900 sm:pl-28'>
      <div className='mx-auto flex max-w-4xl flex-col gap-12'>
        <section className='space-y-4'>
          <p className='text-sm uppercase tracking-[0.35em] text-stone-500'>
            {home.date} · {home.location}
          </p>
          <h1 className='text-5xl font-semibold tracking-tight sm:text-7xl'>
            {home.title}
          </h1>
          <p className='max-w-2xl text-lg leading-8 text-stone-600'>
            {home.intro}
          </p>
        </section>

        <section className='rounded-3xl border border-stone-200 bg-white p-8 shadow-sm'>
          <SuggestionForm />
        </section>
      </div>
    </main>
  );
}
