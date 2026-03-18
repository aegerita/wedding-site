import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { sendRsvpNotificationEmail } from '@/lib/email';
import { createClient } from '@/lib/supabase';
import { rsvpSchema } from '@/lib/validation';

const RSVP_TABLE_NAME = 'rsvps';

function normalizeRequiredString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function normalizeOptionalString(value: unknown) {
  if (typeof value !== 'string') {
    return undefined;
  }

  const trimmedValue = value.trim();

  return trimmedValue.length > 0 ? trimmedValue : undefined;
}

function normalizePayload(payload: Record<string, unknown>) {
  return {
    fullName: normalizeRequiredString(payload.fullName),
    email: normalizeRequiredString(payload.email),
    phone: normalizeOptionalString(payload.phone),
    attendingCityHall: payload.attendingCityHall,
    attendingParty: payload.attendingParty,
    plusOne: payload.plusOne,
    plusOneName: normalizeOptionalString(payload.plusOneName),
    foodPreferenceJson: normalizeOptionalString(payload.foodPreferenceJson),
    allergies: normalizeOptionalString(payload.allergies),
    dietaryNotes: normalizeOptionalString(payload.dietaryNotes),
    notes: normalizeOptionalString(payload.notes),
    volunteerJson: normalizeOptionalString(payload.volunteerJson),
  };
}

export async function POST(request: Request) {
  const rawPayload = await request.json().catch(() => null);
  const payload =
    rawPayload && typeof rawPayload === 'object' && !Array.isArray(rawPayload)
      ? (rawPayload as Record<string, unknown>)
      : {};

  const normalizedPayload = normalizePayload(payload);

  if (normalizedPayload.volunteerJson) {
    try {
      JSON.parse(normalizedPayload.volunteerJson);
    } catch {
      return NextResponse.json(
        { error: 'Please review your volunteer details and try again.' },
        { status: 400 },
      );
    }
  }

  if (normalizedPayload.foodPreferenceJson) {
    try {
      JSON.parse(normalizedPayload.foodPreferenceJson);
    } catch {
      return NextResponse.json(
        { error: 'Please review your food preferences and try again.' },
        { status: 400 },
      );
    }
  }

  const parsedPayload = rsvpSchema.safeParse(normalizedPayload);

  if (!parsedPayload.success) {
    return NextResponse.json(
      { error: 'Please check your name, email, and RSVP details.' },
      { status: 400 },
    );
  }

  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const {
      fullName,
      email,
      phone,
      attendingCityHall,
      attendingParty,
      plusOne,
      plusOneName,
      foodPreferenceJson,
      allergies,
      dietaryNotes,
      notes,
      volunteerJson,
    } = parsedPayload.data;

    const { error } = await supabase.from(RSVP_TABLE_NAME).insert({
      full_name: fullName,
      email,
      phone: phone ?? null,
      attending_city_hall: attendingCityHall,
      attending_party: attendingParty,
      plus_one: plusOne,
      plus_one_name: plusOneName ?? null,
      food_preference: foodPreferenceJson ?? null,
      allergies: allergies ?? null,
      dietary_notes: dietaryNotes ?? null,
      notes: notes ?? null,
      volunteer: volunteerJson ?? null,
    });

    if (error) {
      return NextResponse.json(
        { error: error.message || 'Unable to save your RSVP right now.' },
        { status: 500 },
      );
    }

    let notificationSent = true;

    try {
      await sendRsvpNotificationEmail(parsedPayload.data);
    } catch (notificationError) {
      notificationSent = false;
      console.error('Failed to send RSVP notification email:', notificationError);
    }

    return NextResponse.json({ ok: true, notificationSent }, { status: 201 });
  } catch (error) {
    console.error('Failed to save RSVP:', error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Unable to save your RSVP right now.',
      },
      { status: 500 },
    );
  }
}
