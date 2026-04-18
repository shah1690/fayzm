"use client";

import { Link, usePathname } from "@/i18n/navigation";

type DropdownItem = Readonly<{ label: string; href: string }>;

type NavDropdownProps = Readonly<{
  label: string;
  href: string;
  items: ReadonlyArray<DropdownItem>;
}>;

function ChevronDown() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M3 5L7 9L11 5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function NavDropdown({ label, href, items }: NavDropdownProps) {
  const pathname = usePathname();
  const isActive =
    pathname === href || items.some((item) => pathname === item.href);

  return (
    <div className="group relative inline-flex flex-col items-center">
      <Link
        href={href}
        className="flex items-center gap-1 text-sm transition-opacity hover:opacity-60"
        style={
          isActive
            ? {
                background: "linear-gradient(180deg, #070A0F 0%, #84CC16 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }
            : { color: "#070A0F" }
        }
      >
        {label}
        <span className="transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180">
          <ChevronDown />
        </span>
      </Link>
      <span
        className="absolute -bottom-2 h-1.5 w-1.5 rounded-full transition-opacity duration-200"
        style={{ background: "#84CC16", opacity: isActive ? 1 : 0 }}
      />

      <div className="pointer-events-none absolute left-0 top-full z-50 min-w-[160px] translate-y-1 pt-4 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white py-1 shadow-lg">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-2.5 text-sm text-[#070A0F] transition-colors hover:bg-gray-50"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
