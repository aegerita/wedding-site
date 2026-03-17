import { PhotoGallery } from '@/components/site/photo-gallery';
import { SuggestionForm } from '@/components/site/suggestion';
import { siteContent } from '@/content/site';

export default function Home() {
  const { home, photos } = siteContent;

  return (
    <main className='relative min-h-screen overflow-hidden py-20 text-foreground'>
      <div className='relative flex flex-col gap-14'>
        <div className='px-6 sm:pl-28 sm:pr-6'>
          <section className='mx-auto max-w-4xl space-y-4'>
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
        </div>

        <PhotoGallery {...photos} />

        <div className='px-6 sm:pl-28 sm:pr-6'>
          <section className='mx-auto max-w-4xl rounded-3xl border border-border bg-card p-8 shadow-sm'>
            <SuggestionForm />
          </section>
        </div>
      </div>
    </main>
  );
}
