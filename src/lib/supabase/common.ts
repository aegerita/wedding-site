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
