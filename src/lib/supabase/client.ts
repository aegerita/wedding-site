import { createBrowserClient } from '@supabase/ssr';

import { getSupabaseConfig } from './common';

export function createBrowserSupabaseClient() {
  const { url, publishableKey } = getSupabaseConfig();

  return createBrowserClient(url, publishableKey);
}
