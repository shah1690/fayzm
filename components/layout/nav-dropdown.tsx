"use client";

import Link from "next/link";
import { useRef, useState } from "react";

type DropdownItem = Readonly<{ label: string; href: string }>;

type NavDropdownProps = Readonly<{
  label: string;
  href: string;
  children: ReadonlyArray<DropdownItem>;
}>;

function ChevronDown() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 5L7 9L11 5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function NavDropdown({ label, href, children }: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Link
        href={href}
        className="flex items-center gap-1 text-sm text-[#070A0F] transition-opacity hover:opacity-60"
      >
        {label}
        <span className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
          <ChevronDown />
        </span>
      </Link>

      {open && (
        <div className="absolute left-0 top-full z-50 min-w-[160px] pt-2">
          <div
            className="overflow-hidden rounded-xl border border-gray-100 bg-white py-1 shadow-lg"
            style={{
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(-4px)",
              transition: "opacity 200ms ease, transform 200ms ease",
            }}
          >
            {children.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 text-sm text-[#070A0F] transition-colors hover:bg-gray-50"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
