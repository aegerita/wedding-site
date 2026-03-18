'use client';

import { type FormEvent, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const initialFormValues = {
  name: '',
  message: '',
};

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
    <Card
      description='If you have ideas to improve the website or our wedding plans, we would love to hear from you.'
      eyebrow='Feedback'
      title='Suggestion Box'
    >
      <form className='space-y-4' onSubmit={handleSubmit}>
        <div className='space-y-2'>
          <Label htmlFor='suggestion-message'>Message</Label>
          <Textarea
            className='min-h-36 resize-y'
            id='suggestion-message'
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
        </div>

        <div className='flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
          <div className='space-y-2'>
            <Label htmlFor='suggestion-name'>Name (Optional)</Label>
            <Input
              autoComplete='name'
              id='suggestion-name'
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
          </div>

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
    </Card>
  );
}
