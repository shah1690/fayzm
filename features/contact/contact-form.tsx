"use client";

import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import type { ContactSubmissionPayload } from "@/shared/lib/contact-form";

function NameIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="flex-shrink-0 text-gray-400"
      aria-hidden="true"
      focusable="false"
    >
      <rect
        x="3"
        y="1"
        width="10"
        height="8"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <path
        d="M1 15C1 12.239 4.134 10 8 10C11.866 10 15 12.239 15 15"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="flex-shrink-0 text-gray-400"
      aria-hidden="true"
      focusable="false"
    >
      <rect
        x="1"
        y="3"
        width="14"
        height="10"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <path
        d="M1 5L8 9.5L15 5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="flex-shrink-0 text-gray-400"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M3 1.5H6L7.5 5L5.5 6.5C6.5 8.5 7.5 9.5 9.5 10.5L11 8.5L14.5 10V13C14.5 13.828 13.828 14.5 13 14.5C6.649 14.5 1.5 9.351 1.5 3C1.5 2.172 2.172 1.5 3 1.5Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const inputBase =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-[#070A0F] outline-none transition-all placeholder:text-gray-400 focus:border-[#070A0F]";

type SubmitState = "idle" | "submitting" | "success" | "error";

type FormValues = {
  fullName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  honeypot: string;
};

const initialFormValues: FormValues = {
  fullName: "",
  email: "",
  phone: "",
  service: "",
  message: "",
  honeypot: "",
};

export function ContactForm() {
  const t = useTranslations("ContactForm");
  const startedAtRef = useRef(Date.now());
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const services = [
    t("services.knitting"),
    t("services.yarnProduction"),
    t("services.garmentProduction"),
    t("services.flour"),
    t("services.cottonseedOil"),
    t("services.petrol"),
    t("services.farm"),
    t("services.other"),
  ];

  function updateField<Key extends keyof FormValues>(
    key: Key,
    value: FormValues[Key],
  ) {
    setFormValues((current) => ({
      ...current,
      [key]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitState("submitting");
    setSubmitError(null);

    const payload: ContactSubmissionPayload = {
      fullName: formValues.fullName,
      email: formValues.email,
      phone: formValues.phone,
      service: formValues.service,
      message: formValues.message,
      product:
        new URLSearchParams(window.location.search).get("product") ?? undefined,
      honeypot: formValues.honeypot,
      startedAt: startedAtRef.current,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setSubmitState("success");
      setFormValues(initialFormValues);
      startedAtRef.current = Date.now();
    } catch {
      setSubmitState("error");
      setSubmitError(t("submitError"));
    }
  }

  if (submitState === "success") {
    return (
      <div className="flex h-full min-h-[400px] flex-col items-center justify-center gap-4 rounded-2xl border border-gray-100 bg-white p-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#070A0F] text-2xl text-white">
          ✓
        </div>
        <h3 className="text-xl font-semibold text-[#070A0F]">
          {t("messageSent")}
        </h3>
        <p className="text-sm text-gray-500">{t("replyWithin")}</p>
        <button
          type="button"
          onClick={() => {
            setSubmitState("idle");
            setSubmitError(null);
          }}
          className="mt-2 rounded-full border border-gray-200 px-5 py-2 text-sm text-[#070A0F] transition-all hover:bg-[#070A0F] hover:text-white"
        >
          {t("sendAnother")}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 bg-[#FAFAFA] p-6 md:p-8"
      style={{ borderRadius: 40 }}
    >
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company-name">Company</label>
        <input
          id="company-name"
          tabIndex={-1}
          autoComplete="off"
          value={formValues.honeypot}
          onChange={(e) => updateField("honeypot", e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="full-name"
          className="text-sm font-medium text-[#070A0F]"
        >
          {t("fullName")}
        </label>
        <div className="relative flex items-center">
          <span className="pointer-events-none absolute left-3">
            <NameIcon />
          </span>
          <input
            id="full-name"
            required
            type="text"
            placeholder={t("fullNamePlaceholder")}
            value={formValues.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
            className={`${inputBase} pl-9`}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-[#070A0F]">
            {t("email")}
          </label>
          <div className="relative flex items-center">
            <span className="pointer-events-none absolute left-3">
              <EmailIcon />
            </span>
            <input
              id="email"
              required
              type="email"
              placeholder={t("emailPlaceholder")}
              value={formValues.email}
              onChange={(e) => updateField("email", e.target.value)}
              className={`${inputBase} pl-9`}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="phone" className="text-sm font-medium text-[#070A0F]">
            {t("phone")}
          </label>
          <div className="relative flex items-center">
            <span className="pointer-events-none absolute left-3">
              <PhoneIcon />
            </span>
            <input
              id="phone"
              type="tel"
              placeholder={t("phonePlaceholder")}
              value={formValues.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              className={`${inputBase} pl-9`}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="service" className="text-sm font-medium text-[#070A0F]">
          {t("selectService")}
        </label>
        <div className="relative">
          <select
            id="service"
            value={formValues.service}
            onChange={(e) => updateField("service", e.target.value)}
            className={`${inputBase} cursor-pointer appearance-none pr-10`}
          >
            <option value="">{t("chooseService")}</option>
            {services.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-medium text-[#070A0F]">
          {t("message")}
        </label>
        <textarea
          id="message"
          required
          placeholder={t("messagePlaceholder")}
          rows={5}
          value={formValues.message}
          onChange={(e) => updateField("message", e.target.value)}
          className={`${inputBase} resize-none`}
        />
      </div>

      <div className="flex flex-col items-start gap-3">
        <button
          type="submit"
          disabled={submitState === "submitting"}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-medium text-[#070A0F] transition-all duration-200 hover:border-[#070A0F] hover:bg-[#070A0F] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitState === "submitting" ? t("sending") : t("sendMessage")}
        </button>
        {submitError ? (
          <p className="text-sm text-red-500">{submitError}</p>
        ) : null}
      </div>
    </form>
  );
}
