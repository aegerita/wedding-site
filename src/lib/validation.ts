import { z } from 'zod';

export const rsvpSchema = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  attendingCityHall: z.boolean(),
  attendingParty: z.boolean(),
  plusOne: z.boolean(),
  plusOneName: z.string().optional(),
  foodPreference: z.string().optional(),
  allergies: z.string().optional(),
  dietaryNotes: z.string().optional(),
  notes: z.string().optional(),
  volunteerJson: z.string().optional(),
});

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
