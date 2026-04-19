"use client";

import { useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/shared/config/site-config";

function BurgerIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M8.33325 4.16669H16.6666"
        stroke="#070A0F"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.33325 10H16.6666"
        stroke="#070A0F"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.33325 15.8333H11.6666"
        stroke="#070A0F"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M15 5L5 15M5 5L15 15"
        stroke="#070A0F"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => setMounted(true));
    } else {
      setMounted(false);
    }
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-100 bg-white transition-all duration-200 hover:border-gray-200 hover:bg-gray-50"
      >
        <span className="transition-all duration-200" style={{ opacity: 1 }}>
          {isOpen ? <CloseIcon /> : <BurgerIcon />}
        </span>
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className="absolute left-0 top-[76px] z-50 w-full overflow-hidden border-b border-gray-100 bg-white shadow-sm transition-all duration-300 ease-out"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(-8px)",
          }}
        >
          <div className="px-5 pb-6 pt-2">
            <ul className="flex flex-col gap-1">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex cursor-pointer items-center py-3 text-base text-[#070A0F] transition-opacity hover:opacity-60"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 border-t border-gray-100 pt-4">
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="block w-full cursor-pointer rounded-full border border-gray-100 bg-white py-2.5 text-center text-sm text-[#070A0F] transition-all duration-200 hover:border-[#070A0F] hover:bg-[#070A0F] hover:text-white"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
