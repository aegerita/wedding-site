'use client';

import { type FormEvent, useState } from 'react';

import { Button } from '@/components/ui/button';

const initialFormValues = {
  name: '',
  message: '',
};

const fieldClassName =
  'w-full rounded-2xl border border-input bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none';

type SubmitState =
  | { tone: 'success'; message: string }
  | { tone: 'error'; message: string }
  | null;

export function SuggestionForm() {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [submitState, setSubmitState] = useState<SubmitState>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitState(null);

    try {
      const response = await fetch('/api/suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      const result = (await response.json().catch(() => null)) as
        | { error?: string }
        | null;

      if (!response.ok) {
        throw new Error(result?.error ?? 'Unable to send your suggestion.');
      }

      setFormValues(initialFormValues);
      setSubmitState({
        tone: 'success',
        message: 'Thanks. Your suggestion has been sent.',
      });
    } catch (error) {
      setSubmitState({
        tone: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Unable to send your suggestion.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <div className='flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between'>
        <div className='space-y-2'>
          <p className='text-sm uppercase tracking-[0.25em] text-muted-foreground'>
            Feedback
          </p>
          <h2 className='text-2xl font-semibold tracking-tight'>
            Suggestion Box
          </h2>
          <p className='text-sm leading-7 text-muted-foreground'>
            If you have ideas to improve the website or our wedding plans,
            we would love to hear from you.
          </p>
        </div>
      </div>
      <form className='mt-4 space-y-5' onSubmit={handleSubmit}>
        <label className='block text-sm text-muted-foreground'>
          <textarea
            className={`${fieldClassName} min-h-36 resize-y`}
            name='message'
            onChange={(event) =>
              setFormValues((currentValues) => ({
                ...currentValues,
                message: event.target.value,
              }))
            }
            placeholder='Share an idea, a correction, or anything we should know.'
            required
            value={formValues.message}
          />
        </label>

        <div className='flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
          <label className='space-y-2 text-sm text-muted-foreground'>
            <span className='font-medium text-foreground'>Name (Optional)</span>
            <input
              autoComplete='name'
              className={fieldClassName}
              name='name'
              onChange={(event) =>
                setFormValues((currentValues) => ({
                  ...currentValues,
                  name: event.target.value,
                }))
              }
              placeholder='Your name'
              type='text'
              value={formValues.name}
            />
          </label>

          <Button
            className='h-11 rounded-full px-6'
            disabled={isSubmitting}
            size='lg'
            type='submit'
          >
            {isSubmitting ? 'Sending...' : 'Submit suggestion'}
          </Button>
        </div>

        <p
          aria-live='polite'
          className={`text-sm ${
            submitState?.tone === 'error'
              ? 'text-rose-700 dark:text-rose-400'
              : 'text-emerald-700 dark:text-emerald-400'
          }`}
        >
          {submitState?.message ?? ''}
        </p>
      </form>
    </div>
  );
}
