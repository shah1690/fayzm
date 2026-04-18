"use client";

import { useState } from "react";
import type { FaqItem } from "@/content/faq";

type AccordionProps = Readonly<{ items: ReadonlyArray<FaqItem> }>;

export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col divide-y divide-gray-200">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 py-6 text-left"
              style={{ color: "#070A0F" }}
            >
              <span className="text-base font-medium">{item.question}</span>
              <span className="flex-shrink-0 text-xl font-light">
                {isOpen ? "−" : "+"}
              </span>
            </button>
            <div
              className="grid transition-all duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="pb-6 text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
