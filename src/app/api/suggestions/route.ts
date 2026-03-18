import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase';
import { suggestionSchema } from '@/lib/validation';

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsedPayload = suggestionSchema.safeParse(payload);

  if (!parsedPayload.success) {
    return NextResponse.json(
      { error: 'Please provide a valid message.' },
      { status: 400 },
    );
  }

  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { name, message } = parsedPayload.data;
    const { error } = await supabase.from('suggestions').insert({
      name: name ?? null,
      message,
    });

    if (error) {
      return NextResponse.json(
        {
          error: error?.message || 'Unable to save your suggestion right now.',
        },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error('Failed to save suggestion:', error);

    return NextResponse.json(
      {
        error: error instanceof Error
          ? error.message
          : 'Unable to save your suggestion right now.',
      },
      { status: 500 },
    );
  }
}
