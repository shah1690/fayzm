export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");

  if (digits.startsWith("998") && digits.length === 12) {
    const country = digits.slice(0, 3);
    const operator = digits.slice(3, 5);
    const a = digits.slice(5, 8);
    const b = digits.slice(8, 10);
    const c = digits.slice(10, 12);
    return `+${country} ${operator} ${a} ${b} ${c}`;
  }

  return phone;
}
