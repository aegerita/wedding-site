import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { sendRsvpNotificationEmail } from '@/lib/email';
import { createClient } from '@/lib/supabase';
import {
  rsvpSchema,
  type FoodPreferencePayload,
  type VolunteerPayload,
} from '@/lib/validation';

const RSVP_TABLE_NAME = 'rsvps';
const INVALID_JSON_FIELD = Symbol('invalid-json-field');

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

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function normalizeStringArray(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((item): item is string => typeof item === 'string')
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

function normalizeOptionalJsonValue(value: unknown) {
  if (value === null || value === undefined) {
    return undefined;
  }

  if (typeof value !== 'string') {
    return value;
  }

  const trimmedValue = value.trim();

  if (trimmedValue.length === 0) {
    return undefined;
  }

  try {
    return JSON.parse(trimmedValue) as unknown;
  } catch {
    return INVALID_JSON_FIELD;
  }
}

function normalizeFoodPreference(
  value: unknown,
): FoodPreferencePayload | typeof INVALID_JSON_FIELD | undefined {
  const normalizedValue = normalizeOptionalJsonValue(value);

  if (normalizedValue === INVALID_JSON_FIELD) {
    return INVALID_JSON_FIELD;
  }

  if (normalizedValue === undefined) {
    return undefined;
  }

  if (!isRecord(normalizedValue)) {
    return INVALID_JSON_FIELD;
  }

  const preferences = normalizeStringArray(normalizedValue.preferences);
  const other = normalizeOptionalString(normalizedValue.other);

  if (preferences.length === 0 && !other) {
    return undefined;
  }

  return {
    preferences,
    ...(other ? { other } : {}),
  };
}

function normalizeVolunteer(
  value: unknown,
): VolunteerPayload | typeof INVALID_JSON_FIELD | undefined {
  const normalizedValue = normalizeOptionalJsonValue(value);

  if (normalizedValue === INVALID_JSON_FIELD) {
    return INVALID_JSON_FIELD;
  }

  if (normalizedValue === undefined) {
    return undefined;
  }

  if (!isRecord(normalizedValue)) {
    return INVALID_JSON_FIELD;
  }

  const interests = normalizeStringArray(normalizedValue.interests);
  const details = normalizeOptionalString(normalizedValue.details);

  if (interests.length === 0 && !details) {
    return undefined;
  }

  return {
    interests,
    ...(details ? { details } : {}),
  };
}

function normalizePayload(payload: Record<string, unknown>) {
  const rawFoodPreference =
    payload.foodPreference !== undefined ? payload.foodPreference : payload.foodPreferenceJson;
  const rawVolunteer =
    payload.volunteer !== undefined ? payload.volunteer : payload.volunteerJson;

  return {
    fullName: normalizeRequiredString(payload.fullName),
    email: normalizeRequiredString(payload.email),
    phone: normalizeOptionalString(payload.phone),
    attendingCityHall: payload.attendingCityHall,
    attendingParty: payload.attendingParty,
    plusOne: payload.plusOne,
    plusOneName: normalizeOptionalString(payload.plusOneName),
    foodPreference: normalizeFoodPreference(rawFoodPreference),
    allergies: normalizeOptionalString(payload.allergies),
    dietaryNotes: normalizeOptionalString(payload.dietaryNotes),
    notes: normalizeOptionalString(payload.notes),
    volunteer: normalizeVolunteer(rawVolunteer),
  };
}

export async function POST(request: Request) {
  const rawPayload = await request.json().catch(() => null);
  const payload =
    rawPayload && typeof rawPayload === 'object' && !Array.isArray(rawPayload)
      ? (rawPayload as Record<string, unknown>)
      : {};

  const normalizedPayload = normalizePayload(payload);

  if (normalizedPayload.volunteer === INVALID_JSON_FIELD) {
    return NextResponse.json(
      { error: 'Please review your volunteer details and try again.' },
      { status: 400 },
    );
  }

  if (normalizedPayload.foodPreference === INVALID_JSON_FIELD) {
    return NextResponse.json(
      { error: 'Please review your food preferences and try again.' },
      { status: 400 },
    );
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
      foodPreference,
      allergies,
      dietaryNotes,
      notes,
      volunteer,
    } = parsedPayload.data;

    const { error } = await supabase.from(RSVP_TABLE_NAME).insert({
      full_name: fullName,
      email,
      phone: phone ?? null,
      attending_city_hall: attendingCityHall,
      attending_party: attendingParty,
      plus_one: plusOne,
      plus_one_name: plusOneName ?? null,
      food_preference: foodPreference ?? null,
      allergies: allergies ?? null,
      dietary_notes: dietaryNotes ?? null,
      notes: notes ?? null,
      volunteer: volunteer ?? null,
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
