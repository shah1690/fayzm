import { AsYouType, parsePhoneNumberFromString } from "libphonenumber-js";

export type ContactSubmissionPayload = {
  fullName: string;
  email: string;
  phone: string;
  service?: string;
  message: string;
  product?: string;
  honeypot?: string;
  startedAt?: number;
};

export const MIN_FORM_FILL_MS = 1500;

export function cleanValue(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function normalizePhoneInput(value: string): string {
  const cleaned = value.replace(/[^\d+]/g, "");
  const digits = cleaned.replace(/\D/g, "");

  return digits ? `+${digits}` : "+";
}

export function parseValidInternationalPhone(value: string): string | null {
  const normalized = normalizePhoneInput(value);
  const phoneNumber = parsePhoneNumberFromString(normalized);

  return phoneNumber?.isValid() ? phoneNumber.number : null;
}

export function formatInternationalPhone(value: string): string {
  const normalized = normalizePhoneInput(value);
  const phoneNumber = parsePhoneNumberFromString(normalized);

  return phoneNumber?.isValid()
    ? phoneNumber.formatInternational()
    : normalized;
}

export function formatPhoneAsYouType(value: string): string {
  const normalized = normalizePhoneInput(value);

  return new AsYouType().input(normalized);
}

export function truncate(value: string, maxLength: number): string {
  return value.length > maxLength ? `${value.slice(0, maxLength - 1)}…` : value;
}
