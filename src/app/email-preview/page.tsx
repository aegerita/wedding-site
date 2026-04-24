import { Card } from '@/components/ui/card';
import { buildGuestEmailTemplates } from '@/lib/guest-email-templates';

const previewWebsiteUrl = 'https://adam-and-jenny.vercel.app';

export default function EmailPreviewPage() {
  const emails = buildGuestEmailTemplates({
    guestName: 'Alex',
    websiteUrl: previewWebsiteUrl,
  });

  return (
    <main className='min-h-screen px-6 py-20 text-foreground sm:pl-28 sm:pr-6'>
      <div className='mx-auto flex max-w-5xl flex-col gap-10'>
        <section className='space-y-4'>
          <p className='text-sm uppercase tracking-[0.35em] text-muted-foreground'>
            Email drafts
          </p>
          <h1 className='text-4xl font-semibold tracking-tight sm:text-6xl'>
            Guest reminders
          </h1>
          <p className='max-w-3xl text-lg leading-8 text-muted-foreground'>
            Styled reminder drafts for ceremony guests and reception-only guests. The sample name
            here is Alex; the template can personalize the greeting when you send it.
          </p>
        </section>

        <div className='grid gap-8'>
          {emails.map((email) => (
            <Card key={email.variant} as='article' title={email.label}>
              <div className='space-y-5'>
                <div className='rounded-2xl border border-border bg-muted p-5'>
                  <p className='text-sm font-medium text-foreground'>Subject</p>
                  <p className='mt-2 text-sm leading-7 text-muted-foreground'>{email.subject}</p>
                </div>

                <div className='rounded-2xl border border-border bg-muted p-5'>
                  <p className='text-sm font-medium text-foreground'>Plain text</p>
                  <pre className='mt-3 whitespace-pre-wrap break-words font-mono text-xs leading-6 text-muted-foreground'>
                    {email.text}
                  </pre>
                </div>

                <div>
                  <p className='mb-3 text-sm font-medium text-foreground'>HTML preview</p>
                  <iframe
                    title={`${email.label} HTML preview`}
                    srcDoc={email.html}
                    className='h-[720px] w-full rounded-2xl border border-border bg-background'
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
