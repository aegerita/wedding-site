'use client';

import { type FormEvent, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { content } from '@/content/site';
import { cn } from '@/lib/utils';

const foodPreferenceOptions = [
  'Pizza',
  'Fried chicken',
  'Sandwich platter',
  'Chacuterie board',
  'Sushi platter',
  'I can bring something',
];

const volunteerOptions = [
  'Bring alcohol',
  'Bartend',
  'Take photos and videos',
  'Bring food',
  'Help with decorations',
  'Help clean up',
  'Make PR for this website',
  'Other (add details)',
];

const initialFormValues = {
  fullName: '',
  email: '',
  phone: '',
  attendingCityHall: false,
  attendingParty: false,
  plusOne: false,
  plusOneName: '',
  foodPreferenceOther: '',
  foodPreferences: [] as string[],
  allergies: '',
  notes: '',
  volunteerInterests: [] as string[],
  volunteerDetails: '',
};

const selectionCardClassName =
  'rounded-2xl border border-border bg-background/70 p-4 transition hover:border-primary/40 hover:bg-muted/60';

type SubmitState = { tone: 'success'; message: string } | { tone: 'error'; message: string } | null;

type RsvpFormValues = typeof initialFormValues;

function buildVolunteerJson(values: RsvpFormValues) {
  const details = values.volunteerDetails.trim();

  if (values.volunteerInterests.length === 0 && details.length === 0) {
    return undefined;
  }

  return JSON.stringify({
    interests: values.volunteerInterests,
    details: details.length > 0 ? details : undefined,
  });
}

function buildFoodPreferenceJson(values: RsvpFormValues) {
  const other = values.foodPreferenceOther.trim();

  if (values.foodPreferences.length === 0 && other.length === 0) {
    return undefined;
  }

  return JSON.stringify({
    preferences: values.foodPreferences,
    other: other.length > 0 ? other : undefined,
  });
}

export function RsvpForm() {
  const { schedule } = content;
  const [formValues, setFormValues] = useState(initialFormValues);
  const [submitState, setSubmitState] = useState<SubmitState>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField<Key extends keyof RsvpFormValues>(field: Key, value: RsvpFormValues[Key]) {
    setFormValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
  }

  function toggleVolunteerInterest(interest: string) {
    setFormValues((currentValues) => {
      const alreadySelected = currentValues.volunteerInterests.includes(interest);

      return {
        ...currentValues,
        volunteerInterests: alreadySelected
          ? currentValues.volunteerInterests.filter((item) => item !== interest)
          : [...currentValues.volunteerInterests, interest],
      };
    });
  }

  function toggleFoodPreference(preference: string) {
    setFormValues((currentValues) => {
      const alreadySelected = currentValues.foodPreferences.includes(preference);

      return {
        ...currentValues,
        foodPreferences: alreadySelected
          ? currentValues.foodPreferences.filter((item) => item !== preference)
          : [...currentValues.foodPreferences, preference],
      };
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitState(null);

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formValues.fullName,
          email: formValues.email,
          phone: formValues.phone,
          attendingCityHall: formValues.attendingCityHall,
          attendingParty: formValues.attendingParty,
          plusOne: formValues.plusOne,
          plusOneName: formValues.plusOneName,
          foodPreferenceJson: buildFoodPreferenceJson(formValues),
          allergies: formValues.allergies,
          notes: formValues.notes,
          volunteerJson: buildVolunteerJson(formValues),
        }),
      });

      const result = (await response.json().catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        throw new Error(result?.error ?? 'Unable to submit your RSVP.');
      }

      setFormValues(initialFormValues);
      setSubmitState({
        tone: 'success',
        message: 'Thanks. Your RSVP has been submitted.',
      });
    } catch (error) {
      setSubmitState({
        tone: 'error',
        message: error instanceof Error ? error.message : 'Unable to submit your RSVP.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className='space-y-8' onSubmit={handleSubmit}>
      <section className='space-y-4'>
        <div>
          <h3 className='text-lg font-medium text-foreground'>Contact details</h3>
          <p className='mt-1 text-sm leading-6 text-muted-foreground'>
            We only need the basics so we can follow up if anything changes.
          </p>
        </div>

        <div className='grid gap-4 sm:grid-cols-2'>
          <div className='space-y-2'>
            <Label htmlFor='rsvp-full-name'>Full name</Label>
            <Input
              autoComplete='name'
              id='rsvp-full-name'
              name='fullName'
              onChange={(event) => updateField('fullName', event.target.value)}
              placeholder='Your full name'
              required
              type='text'
              value={formValues.fullName}
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='rsvp-email'>Email</Label>
            <Input
              autoComplete='email'
              id='rsvp-email'
              name='email'
              onChange={(event) => updateField('email', event.target.value)}
              placeholder='name@example.com'
              required
              type='email'
              value={formValues.email}
            />
          </div>

          <div className='space-y-2 sm:col-span-2'>
            <Label htmlFor='rsvp-phone'>Phone (Optional)</Label>
            <Input
              autoComplete='tel'
              id='rsvp-phone'
              name='phone'
              onChange={(event) => updateField('phone', event.target.value)}
              placeholder='Best number to reach you'
              type='tel'
              value={formValues.phone}
            />
          </div>
        </div>
      </section>

      <section className='space-y-4'>
        <div>
          <h3 className='text-lg font-medium text-foreground'>Attendance</h3>
          <p className='mt-1 text-sm leading-6 text-muted-foreground'>
            Check each part of the day you can make. Leave both unchecked if you cannot attend.
          </p>
        </div>

        <div className='grid gap-4 lg:grid-cols-2'>
          <label
            htmlFor='rsvp-attending-city-hall'
            className={cn(
              `${selectionCardClassName} block cursor-pointer`,
              formValues.attendingCityHall && 'border-primary/60 bg-muted',
            )}
          >
            <div className='flex items-start gap-3'>
              <Checkbox
                checked={formValues.attendingCityHall}
                id='rsvp-attending-city-hall'
                name='attendingCityHall'
                onCheckedChange={(checked) => updateField('attendingCityHall', checked === true)}
              />

              <div className='space-y-1'>
                <p className='text-base leading-6 font-medium text-foreground'>City Hall ceremony</p>
                <p className='text-sm text-muted-foreground'>
                  {schedule.ceremony.time} · {schedule.ceremony.venue}
                </p>
                <span className='text-sm text-destructive'>Limited capacity</span>
              </div>
            </div>
          </label>

          <label
            htmlFor='rsvp-attending-party'
            className={cn(
              `${selectionCardClassName} block cursor-pointer`,
              formValues.attendingParty && 'border-primary/60 bg-muted',
            )}
          >
            <div className='flex items-start gap-3'>
              <Checkbox
                checked={formValues.attendingParty}
                id='rsvp-attending-party'
                name='attendingParty'
                onCheckedChange={(checked) => updateField('attendingParty', checked === true)}
              />

              <div className='space-y-1'>
                <p className='text-base leading-6 font-medium text-foreground'>Reception / party</p>
                <p className='text-sm text-muted-foreground'>
                  {schedule.reception.time} · {schedule.reception.venue}
                </p>
              </div>
            </div>
          </label>
        </div>
        <p className='mt-4 text-destructive text-sm'>
          We have a very limited number of spots for the City Hall ceremony. After RSVP process is closed,
          we will reach out to those who can partake in the ceremony.
        </p>
      </section>

      <section className='space-y-4'>
        <div>
          <h3 className='text-lg font-medium text-foreground'>Guest details</h3>
          <p className='mt-1 text-sm leading-6 text-muted-foreground'>
            If your invitation includes a guest, add them here.
          </p>
        </div>

        <label
          htmlFor='rsvp-plus-one'
          className={cn(
            `${selectionCardClassName} block cursor-pointer`,
            formValues.plusOne && 'border-primary/60 bg-muted',
          )}
        >
          <div className='flex items-start gap-3'>
            <Checkbox
              checked={formValues.plusOne}
              id='rsvp-plus-one'
              name='plusOne'
              onCheckedChange={(checked) => updateField('plusOne', checked === true)}
            />

            <div className='space-y-1'>
              <p className='text-base leading-6 font-medium text-foreground'>I have a plus one</p>
              <p className='text-sm text-muted-foreground'>
                Add their name below if you already know who is coming with you.
              </p>
            </div>
          </div>
        </label>

        <div className='space-y-2'>
          <Label htmlFor='rsvp-plus-one-name'>Plus-one name (Optional)</Label>
          <Input
            autoComplete='off'
            id='rsvp-plus-one-name'
            name='plusOneName'
            onChange={(event) => updateField('plusOneName', event.target.value)}
            placeholder='Guest name'
            type='text'
            value={formValues.plusOneName}
          />
        </div>
      </section>

      <section className='space-y-4'>
        <div>
          <h3 className='text-lg font-medium text-foreground'>Food and accessibility</h3>
          <p className='mt-1 text-sm leading-6 text-muted-foreground'>
            Tell us about dietary restrictions, allergies,
            or anything we should plan for ahead of time.
          </p>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='rsvp-allergies'>Allergies & dietary restrictions (Optional)</Label>
          <Input
            id='rsvp-allergies'
            name='allergies'
            onChange={(event) => updateField('allergies', event.target.value)}
            placeholder='Nuts, shellfish, dairy, etc.'
            type='text'
            value={formValues.allergies}
          />
        </div>

        <p className='text-sm font-medium leading-6 text-foreground'>
          What are you okay with us serving? Check all that apply, and leave your suggestions.
        </p>
        <div className='grid gap-3 sm:grid-cols-2'>
          {foodPreferenceOptions.map((option, index) => {
            const optionId = `rsvp-food-preference-${index}`;

            return (
              <label
                key={option}
                htmlFor={optionId}
                className={cn(
                  `${selectionCardClassName} block cursor-pointer`,
                  formValues.foodPreferences.includes(option) && 'border-primary/60 bg-muted',
                )}
              >
                <div className='flex items-start gap-3'>
                  <Checkbox
                    checked={formValues.foodPreferences.includes(option)}
                    id={optionId}
                    name='foodPreferences'
                    onCheckedChange={() => toggleFoodPreference(option)}
                  />

                  <p className='leading-6 text-foreground'>{option}</p>
                </div>
              </label>
            );
          })}
        </div>
        <div className='space-y-2'>
          <Label htmlFor='rsvp-food-preference-other'>Food suggestions (Optional)</Label>
          <Textarea
            className='resize-y'
            id='rsvp-food-preference-other'
            name='foodPreferenceOther'
            onChange={(event) => updateField('foodPreferenceOther', event.target.value)}
            placeholder='Please we are desperate for ideas.'
            value={formValues.foodPreferenceOther}
          />
        </div>
      </section>

      <section className='space-y-4'>
        <div>
          <h3 className='text-lg font-medium text-foreground'>Optional notes</h3>
          <p className='mt-1 text-sm leading-6 text-muted-foreground'>
            Leave a message if plans are flexible, you are arriving late,
            or there is context we should keep in mind.
          </p>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='rsvp-notes'>Notes (Optional)</Label>
          <Textarea
            className='min-h-32 resize-y'
            id='rsvp-notes'
            name='notes'
            onChange={(event) => updateField('notes', event.target.value)}
            placeholder='Anything else you want us to know.'
            value={formValues.notes}
          />
        </div>
      </section>

      <section className='space-y-4'>
        <div>
          <h3 className='text-lg font-medium text-foreground'>Want to help?</h3>
          <p className='mt-1 text-sm leading-6 text-muted-foreground'>
            We would love help with setup, cleanup, and anything in between.
            Check any areas you are interested in
            helping out with, and we will follow up
            with more details as the day approaches.
          </p>
        </div>

        <div className='grid gap-3 sm:grid-cols-2'>
          {volunteerOptions.map((option, index) => {
            const optionId = `rsvp-volunteer-${index}`;

            return (
              <label
                key={option}
                htmlFor={optionId}
                className={cn(
                  `${selectionCardClassName} block cursor-pointer`,
                  formValues.volunteerInterests.includes(option) && 'border-primary/60 bg-muted',
                )}
              >
                <div className='flex items-start gap-3'>
                  <Checkbox
                    checked={formValues.volunteerInterests.includes(option)}
                    id={optionId}
                    name='volunteerInterests'
                    onCheckedChange={() => toggleVolunteerInterest(option)}
                  />

                  <p className='leading-6 text-foreground'>{option}</p>
                </div>
              </label>
            );
          })}
        </div>

        <div className='space-y-2'>
          <Label htmlFor='rsvp-volunteer-details'>Volunteer details (Optional)</Label>
          <Textarea
            className='resize-y'
            id='rsvp-volunteer-details'
            name='volunteerDetails'
            onChange={(event) => updateField('volunteerDetails', event.target.value)}
            placeholder='Anything else about how you would like to help.'
            value={formValues.volunteerDetails}
          />
        </div>
      </section>

      <div className='flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between'>
        <p className='text-sm leading-6 text-muted-foreground'>
          Submit once and reach out directly later if your plans change.
        </p>

        <Button className='h-11 rounded-full px-6' disabled={isSubmitting} size='lg' type='submit'>
          {isSubmitting ? 'Submitting...' : 'Submit RSVP'}
        </Button>
      </div>

      <p
        aria-live='polite'
        className={`text-sm ${
          submitState?.tone === 'error' ? 'text-rose-700 dark:text-rose-400' : 'text-emerald-700 dark:text-emerald-400'
        }`}
      >
        {submitState?.message ?? ''}
      </p>
    </form>
  );
}
