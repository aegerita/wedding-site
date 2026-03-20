import { z } from 'zod';

const optionalTrimmedStringField = z
  .string()
  .trim()
  .min(1)
  .optional();

const trimmedStringArrayField = z.array(z.string().trim()).default([]).transform((values) =>
  values.filter((value) => value.length > 0),
);

export const foodPreferenceSchema = z.object({
  preferences: trimmedStringArrayField,
  other: optionalTrimmedStringField,
});

export type FoodPreferencePayload = z.infer<typeof foodPreferenceSchema>;

export const volunteerSchema = z.object({
  interests: trimmedStringArrayField,
  details: optionalTrimmedStringField,
});

export type VolunteerPayload = z.infer<typeof volunteerSchema>;

export const rsvpSchema = z.object({
  fullName: z.string().min(1),
  email: z.email(),
  phone: z.string().optional(),
  attendingCityHall: z.boolean(),
  attendingParty: z.boolean(),
  plusOne: z.boolean(),
  plusOneName: z.string().optional(),
  foodPreference: foodPreferenceSchema.optional(),
  allergies: z.string().optional(),
  dietaryNotes: z.string().optional(),
  notes: z.string().optional(),
  volunteer: volunteerSchema.optional(),
});

export type RsvpPayload = z.infer<typeof rsvpSchema>;

const optionalSuggestionField = z
  .string()
  .trim()
  .max(200)
  .optional()
  .transform((value) => (value && value.length > 0 ? value : undefined));

export const suggestionSchema = z.object({
  name: optionalSuggestionField,
  message: z.string().trim().min(1).max(2000),
});
