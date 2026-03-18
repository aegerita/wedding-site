import 'server-only';

import type { RsvpPayload } from '@/lib/validation';

const RESEND_API_URL = 'https://api.resend.com/emails';

type FoodPreferenceDetails = {
  preferences: string[];
  other?: string;
};

type VolunteerDetails = {
  interests: string[];
  details?: string;
};

function getOptionalEnv(name: string) {
  const value = process.env[name]?.trim();

  return value && value.length > 0 ? value : undefined;
}

function getNotificationConfig() {
  const resendApiKey = getOptionalEnv('RESEND_API_KEY');
  const from = getOptionalEnv('RSVP_NOTIFICATION_FROM_EMAIL');
  const to = getOptionalEnv('RSVP_NOTIFICATION_EMAIL');

  if (!resendApiKey || !from || !to) {
    console.warn(
      'RSVP notification email skipped because RESEND_API_KEY, RSVP_NOTIFICATION_FROM_EMAIL, or RSVP_NOTIFICATION_EMAIL is missing.',
    );

    return null;
  }

  return { resendApiKey, from, to };
}

function parseFoodPreferenceJson(foodPreferenceJson?: string): FoodPreferenceDetails {
  if (!foodPreferenceJson) {
    return { preferences: [] };
  }

  try {
    const parsedValue = JSON.parse(foodPreferenceJson) as {
      preferences?: unknown;
      other?: unknown;
    };

    return {
      preferences: Array.isArray(parsedValue.preferences)
        ? parsedValue.preferences.filter(
            (value): value is string => typeof value === 'string' && value.trim().length > 0,
          )
        : [],
      other:
        typeof parsedValue.other === 'string' && parsedValue.other.trim().length > 0
          ? parsedValue.other.trim()
          : undefined,
    };
  } catch {
    return { preferences: [] };
  }
}

function parseVolunteerJson(volunteerJson?: string): VolunteerDetails {
  if (!volunteerJson) {
    return { interests: [] };
  }

  try {
    const parsedValue = JSON.parse(volunteerJson) as {
      interests?: unknown;
      details?: unknown;
    };

    return {
      interests: Array.isArray(parsedValue.interests)
        ? parsedValue.interests.filter(
            (value): value is string => typeof value === 'string' && value.trim().length > 0,
          )
        : [],
      details:
        typeof parsedValue.details === 'string' && parsedValue.details.trim().length > 0
          ? parsedValue.details.trim()
          : undefined,
    };
  } catch {
    return { interests: [] };
  }
}

function formatBoolean(value: boolean) {
  return value ? 'Yes' : 'No';
}

function formatOptionalValue(value?: string) {
  return value && value.trim().length > 0 ? value.trim() : 'Not provided';
}

function buildRsvpNotificationText(payload: RsvpPayload) {
  const foodPreferences = parseFoodPreferenceJson(payload.foodPreferenceJson);
  const volunteerDetails = parseVolunteerJson(payload.volunteerJson);

  return [
    'New RSVP submission',
    '',
    `Submitted at: ${new Date().toISOString()}`,
    '',
    'Contact details',
    `Full name: ${payload.fullName}`,
    `Email: ${payload.email}`,
    `Phone: ${formatOptionalValue(payload.phone)}`,
    '',
    'Attendance',
    `City Hall ceremony: ${formatBoolean(payload.attendingCityHall)}`,
    `Reception / party: ${formatBoolean(payload.attendingParty)}`,
    `Plus one: ${formatBoolean(payload.plusOne)}`,
    `Plus-one name: ${formatOptionalValue(payload.plusOneName)}`,
    '',
    'Food and accessibility',
    `Allergies / dietary restrictions: ${formatOptionalValue(payload.allergies)}`,
    `Dietary notes: ${formatOptionalValue(payload.dietaryNotes)}`,
    `Food preferences: ${
      foodPreferences.preferences.length > 0
        ? foodPreferences.preferences.join(', ')
        : 'Not provided'
    }`,
    `Food suggestions: ${formatOptionalValue(foodPreferences.other)}`,
    '',
    'Volunteer',
    `Interests: ${
      volunteerDetails.interests.length > 0
        ? volunteerDetails.interests.join(', ')
        : 'Not provided'
    }`,
    `Details: ${formatOptionalValue(volunteerDetails.details)}`,
    '',
    'Notes',
    formatOptionalValue(payload.notes),
  ].join('\n');
}

export async function sendRsvpNotificationEmail(payload: RsvpPayload) {
  const config = getNotificationConfig();

  if (!config) {
    return;
  }

  const response = await fetch(RESEND_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: config.from,
      to: [config.to],
      subject: `New RSVP from ${payload.fullName}`,
      reply_to: payload.email,
      text: buildRsvpNotificationText(payload),
    }),
  });

  if (!response.ok) {
    const errorMessage = await response.text();

    throw new Error(
      `Resend email request failed with status ${response.status}: ${errorMessage}`,
    );
  }
}
