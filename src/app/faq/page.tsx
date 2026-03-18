import { ContentCard } from '@/components/ui/content-card';
import { content } from '@/content/site';

export default function FaqPage() {
  const { faq } = content;

  return (
    <main className='min-h-screen px-6 py-20 text-foreground sm:pl-28'>
      <div className='mx-auto flex max-w-5xl flex-col gap-10'>
        <section className='space-y-4'>
          <p className='text-sm uppercase tracking-[0.35em] text-muted-foreground'>
            {faq.eyebrow}
          </p>
          <h1 className='text-4xl font-semibold tracking-tight sm:text-6xl'>
            {faq.title}
          </h1>
          <p className='max-w-3xl text-lg leading-8 text-muted-foreground'>
            {faq.intro}
          </p>
        </section>

        <section className='grid gap-4 md:grid-cols-2'>
          {faq.items.map((item, index) => (
            <ContentCard
              key={item.q}
              as='article'
              size='sm'
              eyebrow={String(index + 1).padStart(2, '0')}
              title={item.q}
              description={item.a}
            />
          ))}
        </section>
      </div>
    </main>
  );
}
