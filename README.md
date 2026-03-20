# Wedding Site

A Next.js wedding website with a homepage, FAQ page, RSVP flow, photo gallery, and a suggestion box backed by Supabase.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Supabase

## What This App Includes

- `/` homepage with wedding details, schedule highlights, photo gallery links, and a suggestion form
- `/rsvp` page with an RSVP form that submits to `/api/rsvp`
- `/faq` page driven by shared site content
- Centralized editable copy in `src/content/site.ts`
- Supabase-backed API routes for RSVP and suggestion submissions

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Copy the environment template:

```bash
cp .env.template .env.local
```

3. Set these variables in `.env.local`:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `RESEND_API_KEY`
- `RSVP_NOTIFICATION_FROM_EMAIL`
- `RSVP_NOTIFICATION_EMAIL`

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run lint:fix
```

## Supabase

The app uses this helper:

- `createClient()` in `src/lib/supabase.ts`

The API routes currently expect these tables:

### `rsvps`

Inserted by `src/app/api/rsvp/route.ts` with these columns:

- `full_name`
- `email`
- `phone`
- `attending_city_hall`
- `attending_party`
- `plus_one`
- `plus_one_name`
- `food_preference` (`jsonb`)
- `allergies`
- `dietary_notes`
- `notes`
- `volunteer` (`jsonb`)

### `suggestions`

Inserted by `src/app/api/suggestions/route.ts` with these columns:

- `name`
- `message`

## RSVP Email Notifications

RSVP submissions now also trigger an email notification from `src/lib/rsvp-notification.ts`.

- `RESEND_API_KEY`: your Resend API key
- `RSVP_NOTIFICATION_FROM_EMAIL`: the verified sender used by Resend, for example `Wedding RSVP <rsvp@yourdomain.com>`
- `RSVP_NOTIFICATION_EMAIL`: Adam's email address, or any inbox that should receive RSVP copies

If those variables are missing, the RSVP still saves to Supabase, but the notification email is skipped.
