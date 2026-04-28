import { type NextRequest, NextResponse } from "next/server";
import {
  type ContactSubmissionPayload,
  cleanValue,
  isValidEmail,
  MIN_FORM_FILL_MS,
  parseValidInternationalPhone,
  truncate,
} from "@/shared/lib/contact-form";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function formatLine(label: string, value?: string | null) {
  if (!value) return null;
  return `<b>${escapeHtml(label)}:</b> ${escapeHtml(value)}`;
}

function buildTelegramMessage(payload: ContactSubmissionPayload) {
  const lines = [
    "<b>📩 New contact form lead</b>",
    "",
    formatLine("Full name", truncate(payload.fullName, 120)),
    formatLine("Email", truncate(payload.email, 160)),
    formatLine("Phone", truncate(payload.phone ?? "", 60)),
    formatLine("Service", truncate(payload.service ?? "", 120)),
    formatLine("Product", truncate(payload.product ?? "", 120)),
    formatLine("Message", truncate(payload.message, 1500)),
  ].filter(Boolean);

  return lines.join("\n");
}

async function sendTelegramMessage(message: string) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    throw new Error("Telegram environment variables are not configured.");
  }

  const response = await fetch(
    `https://api.telegram.org/bot${botToken}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Telegram send failed: ${errorText}`);
  }
}

export async function POST(request: NextRequest) {
  let payload: Partial<ContactSubmissionPayload>;

  try {
    payload = (await request.json()) as Partial<ContactSubmissionPayload>;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid JSON body." },
      { status: 400 },
    );
  }

  if (cleanValue(payload.honeypot) !== "") {
    return NextResponse.json({ ok: true });
  }

  const fullName = cleanValue(payload.fullName);
  const email = cleanValue(payload.email);
  const phone = parseValidInternationalPhone(cleanValue(payload.phone));
  const service = cleanValue(payload.service);
  const message = cleanValue(payload.message);
  const product = cleanValue(payload.product);
  const startedAt = Number(payload.startedAt ?? 0);

  if (!fullName || !email || !phone || !message) {
    return NextResponse.json(
      { ok: false, message: "Required fields are missing." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, message: "Email is invalid." },
      { status: 400 },
    );
  }

  if (startedAt > 0 && Date.now() - startedAt < MIN_FORM_FILL_MS) {
    return NextResponse.json(
      { ok: false, message: "Form submitted too quickly." },
      { status: 400 },
    );
  }

  try {
    await sendTelegramMessage(
      buildTelegramMessage({
        fullName,
        email,
        phone,
        service,
        message,
        product,
      }),
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form submit failed", error);

    return NextResponse.json(
      { ok: false, message: "Could not submit form." },
      { status: 500 },
    );
  }
}
