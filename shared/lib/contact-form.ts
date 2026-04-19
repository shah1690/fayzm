export type ContactSubmissionPayload = {
  fullName: string;
  email: string;
  phone?: string;
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

export function truncate(value: string, maxLength: number): string {
  return value.length > maxLength ? `${value.slice(0, maxLength - 1)}…` : value;
}
