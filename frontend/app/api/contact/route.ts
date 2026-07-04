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

const AMO_FORM_ID = process.env.AMOCRM_FORM_ID ?? "1680078";
const AMO_FORM_HASH =
  process.env.AMOCRM_FORM_HASH ?? "e49bc714257388f413c0b4ba99275e09";
const AMO_QUEUE_URL = "https://forms.amocrm.ru/queue/add";
const AMO_FIELD_PHONE = "fields[1510028_1][1384384]";
const AMO_FIELD_EMAIL = "fields[1510030_1][1384396]";

function buildAmoNote(payload: ContactSubmissionPayload): string {
  return [
    payload.service ? `Service: ${payload.service}` : null,
    payload.product ? `Product: ${payload.product}` : null,
    payload.message,
  ]
    .filter(Boolean)
    .join("\n");
}

// Submits the lead to the amoCRM web form's ingest endpoint server-side,
// replicating the iframe widget's multipart POST so no amoCRM UI is shown.
async function sendAmoCrmLead(payload: ContactSubmissionPayload) {
  const form = new FormData();
  form.append("form_id", AMO_FORM_ID);
  form.append("hash", AMO_FORM_HASH);
  form.append("fields[name_1]", payload.fullName);
  form.append(AMO_FIELD_PHONE, payload.phone ?? "");
  form.append(AMO_FIELD_EMAIL, payload.email);
  form.append("fields[note_2]", buildAmoNote(payload));
  form.append("user_origin", "");

  const response = await fetch(AMO_QUEUE_URL, {
    method: "POST",
    body: form,
    headers: {
      Referer: `https://forms.amocrm.ru/forms/html/form_${AMO_FORM_ID}_${AMO_FORM_HASH}.html`,
      Origin: "https://forms.amocrm.ru",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`amoCRM send failed: ${response.status}`);
  }

  const data = (await response.json().catch(() => null)) as {
    error_code?: number;
  } | null;

  if (data && typeof data.error_code === "number" && data.error_code !== 0) {
    throw new Error(`amoCRM rejected lead: error_code ${data.error_code}`);
  }
}

function backendBase(): string {
  return (
    process.env.BACKEND_INTERNAL_URL ??
    process.env.NEXT_PUBLIC_API_URL ??
    "http://localhost:8000"
  ).replace(/\/$/, "");
}

type Delivery = PromiseSettledResult<unknown>;
const deliveryStatus = (r: Delivery) =>
  r.status === "fulfilled" ? "sent" : "failed";
const deliveryError = (r: Delivery) =>
  r.status === "rejected" ? String(r.reason ?? "").slice(0, 2000) : "";

// Record the lead (and each channel's delivery status) in the Django backend
// so it shows up in the admin. Best-effort: never fails the user's request.
async function persistLead(
  payload: ContactSubmissionPayload,
  telegram: Delivery,
  amo: Delivery,
) {
  try {
    await fetch(`${backendBase()}/api/v1/leads/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        full_name: payload.fullName,
        email: payload.email,
        phone: payload.phone ?? "",
        service: payload.service ?? "",
        product: payload.product ?? "",
        message: payload.message,
        telegram_status: deliveryStatus(telegram),
        telegram_error: deliveryError(telegram),
        amocrm_status: deliveryStatus(amo),
        amocrm_error: deliveryError(amo),
      }),
      cache: "no-store",
    });
  } catch (error) {
    console.error("Lead persist to backend failed", error);
  }
}

// Resolved once per server process, then reused. Only TELEGRAM_BOT_TOKEN is
// required in the env; the chat id is auto-detected from the group the bot was
// added to (via getUpdates). TELEGRAM_CHAT_ID, if set, overrides detection.
let cachedTelegramChatId: string | null = null;

type TelegramChat = { id: number; type: string };
type TelegramUpdate = {
  message?: { chat?: TelegramChat };
  my_chat_member?: { chat?: TelegramChat };
  channel_post?: { chat?: TelegramChat };
};

async function loadStoredChatId(): Promise<string | null> {
  try {
    const res = await fetch(`${backendBase()}/api/v1/telegram/chat/`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { chatId?: string | null };
    return data.chatId ?? null;
  } catch {
    return null;
  }
}

async function storeChatId(chatId: string): Promise<void> {
  try {
    await fetch(`${backendBase()}/api/v1/telegram/chat/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chatId }),
      cache: "no-store",
    });
  } catch {
    /* best effort */
  }
}

async function detectChatId(botToken: string): Promise<string | null> {
  // Clear any webhook so getUpdates works (a webhook makes getUpdates 409).
  await fetch(`https://api.telegram.org/bot${botToken}/deleteWebhook`, {
    cache: "no-store",
  }).catch(() => {});

  const res = await fetch(
    `https://api.telegram.org/bot${botToken}/getUpdates`,
    { cache: "no-store" },
  );
  if (!res.ok) return null;
  const data = (await res.json()) as { ok: boolean; result?: TelegramUpdate[] };
  let groupId: string | null = null;
  let anyId: string | null = null;
  for (const update of data.result ?? []) {
    // my_chat_member fires when the bot is added/promoted — it reaches the bot
    // even with privacy mode on, so it's the most reliable detection signal.
    const chat =
      update.my_chat_member?.chat ??
      update.message?.chat ??
      update.channel_post?.chat;
    if (!chat) continue;
    anyId = String(chat.id);
    if (chat.type === "group" || chat.type === "supergroup") {
      groupId = String(chat.id);
    }
  }
  return groupId ?? anyId;
}

async function resolveTelegramChatId(botToken: string): Promise<string> {
  const override = process.env.TELEGRAM_CHAT_ID?.trim();
  if (override) return override;
  if (cachedTelegramChatId) return cachedTelegramChatId;

  // Durable value stored by a previous detection (survives redeploys).
  const stored = await loadStoredChatId();
  if (stored) {
    cachedTelegramChatId = stored;
    return stored;
  }

  const detected = await detectChatId(botToken);
  if (!detected) {
    throw new Error(
      "Telegram chat not found — add the bot to the group (send/@mention once), then submit again.",
    );
  }
  cachedTelegramChatId = detected;
  await storeChatId(detected);
  return detected;
}

async function sendTelegramMessage(message: string) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN?.trim();
  if (!botToken) {
    throw new Error("TELEGRAM_BOT_TOKEN is not configured.");
  }
  const chatId = await resolveTelegramChatId(botToken);

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
    // A stale cached chat id (bot removed/re-added) — drop it so the next
    // attempt re-detects.
    cachedTelegramChatId = null;
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

  const submission: ContactSubmissionPayload = {
    fullName,
    email,
    phone,
    service,
    message,
    product,
  };

  // Send to both sinks concurrently. Telegram is the primary lead capture and
  // must succeed; an amoCRM failure is logged but does not fail the request so
  // a CRM hiccup never drops the notification.
  const [telegramResult, amoResult] = await Promise.allSettled([
    sendTelegramMessage(buildTelegramMessage(submission)),
    sendAmoCrmLead(submission),
  ]);

  const telegramOk = telegramResult.status === "fulfilled";
  const amoOk = amoResult.status === "fulfilled";

  if (!amoOk) {
    console.error("Contact form amoCRM submit failed", amoResult.reason);
  }
  if (!telegramOk) {
    console.error("Contact form Telegram submit failed", telegramResult.reason);
  }

  // Store the lead + delivery statuses (also records failures).
  await persistLead(submission, telegramResult, amoResult);

  // The lead is captured as long as at least one channel accepted it. Only
  // report failure to the visitor if BOTH sinks rejected.
  if (!telegramOk && !amoOk) {
    return NextResponse.json(
      {
        ok: false,
        message: "Could not submit form.",
        telegramError: deliveryError(telegramResult),
        amocrmError: deliveryError(amoResult),
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
