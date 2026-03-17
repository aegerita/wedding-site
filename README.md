## Getting Started

Install dependencies and run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Linting

Lint the whole project:

```bash
npm run lint
```

Automatically apply lint fixes across the project:

```bash
npm run lint:fix
```

## Supabase Setup

Copy `.env.template` to `.env.local` and set:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`

The app exposes:

- `createServerSupabaseClient()` for server components and server actions
- `createBrowserSupabaseClient()` for client components
- `checkSupabaseConnection()` for a schema-agnostic connectivity check

The homepage uses the connection check to confirm that the configured Supabase project is reachable.

## Next Steps

- Replace placeholder wedding content in `src/content/site.ts`
- Use the Supabase helpers when wiring RSVP submissions or guest list reads
