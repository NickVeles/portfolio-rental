import * as z from "zod";
import {
  PHONE_NUMBER_LENGTH,
  PropertyTypeEnum,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
} from "@/lib/constants";

export const propertySchema = z.object({
  name: z.string().min(1, "Name is required."),
  description: z.string().min(1, "Description is required."),
  pricePerMonth: z.coerce.number().positive().min(0).int(),
  securityDeposit: z.coerce.number().positive().min(0).int(),
  applicationFee: z.coerce.number().positive().min(0).int(),
  isPetsAllowed: z.boolean(),
  isParkingIncluded: z.boolean(),
  photoUrls: z
    .array(z.instanceof(File))
    .min(1, "At least one photo is required."),
  amenities: z.string().min(1, "Amenities are required."),
  highlights: z.string().min(1, "Highlights are required."),
  beds: z.coerce.number().positive().min(0).max(10).int(),
  baths: z.coerce.number().positive().min(0).max(10).int(),
  squareFeet: z.coerce.number().int().positive(),
  propertyType: PropertyTypeEnum,
  address: z.string().min(1, "Address is required."),
  city: z.string().min(1, "City is required."),
  state: z.string().min(1, "State is required."),
  country: z.string().min(1, "Country is required."),
  postalCode: z.string().min(1, "Postal code is required."),
});

export type PropertyFormData = z.infer<typeof propertySchema>;

export const applicationSchema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z.email("Invalid email address."),
  phoneNumber: z
    .string()
    .min(
      PHONE_NUMBER_LENGTH,
      `Phone number must be at least ${PHONE_NUMBER_LENGTH} digits.`,
    ),
  message: z.string().optional(),
});

export type ApplicationFormData = z.infer<typeof applicationSchema>;

export const settingsSchema = z.object({
  name: z
    .string()
    .min(
      USERNAME_MIN_LENGTH,
      `Username must have at least ${USERNAME_MIN_LENGTH} characters`,
    )
    .max(
      USERNAME_MAX_LENGTH,
      `Username must have ${USERNAME_MAX_LENGTH} or less.`,
    ),
  email: z.email("Invalid email address."),
  phoneNumber: z
    .string()
    .min(
      PHONE_NUMBER_LENGTH,
      `Phone number must be at least ${PHONE_NUMBER_LENGTH} digits.`,
    )
    .or(z.literal("")),
});

export type SettingsFormData = z.infer<typeof settingsSchema>;
