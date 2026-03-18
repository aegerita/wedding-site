import 'server-only';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

type SupabaseConfig = {
  url: string;
  publishableKey: string;
};

function getRequiredEnv(name: string, value: string | undefined) {
  if (!value) {
    throw new Error(`Missing required Supabase environment variable: ${name}`);
  }

  return value;
}

export function getSupabaseConfig(): SupabaseConfig {
  const url = getRequiredEnv(
    'NEXT_PUBLIC_SUPABASE_URL',
    process.env.NEXT_PUBLIC_SUPABASE_URL,
  );

  const publishableKey = getRequiredEnv(
    'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY', process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );

  return { url, publishableKey };
}

export const createClient = (cookieStore: Awaited<ReturnType<typeof cookies>>) => {
  const { url, publishableKey } = getSupabaseConfig();
  return createServerClient(
    url!,
    publishableKey!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options));
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  );
};
