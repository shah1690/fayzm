"use client";

import { useId, useRef, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";

type DropdownItem = Readonly<{ label: string; href: string }>;

type NavDropdownProps = Readonly<{
  label: string;
  href: string;
  children: ReadonlyArray<DropdownItem>;
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

export function NavDropdown({ label, href, children }: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelId = useId();
  const pathname = usePathname();
  const isActiveParent =
    pathname === href ||
    children.some((child) => pathname.startsWith(child.href));

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: hover trigger for nav dropdown
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative inline-flex flex-col items-center">
        <button
          type="button"
          aria-expanded={open}
          aria-haspopup="true"
          aria-controls={panelId}
          onClick={() => setOpen((prev) => !prev)}
          onFocus={handleMouseEnter}
          className="flex items-center gap-1 text-sm transition-all duration-200"
          style={
            isActiveParent
              ? {
                  background:
                    "linear-gradient(180deg, #070A0F 0%, #003566 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }
              : { color: "#070A0F" }
          }
        >
          {label}
          <span
            className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            style={isActiveParent ? { color: "#003566" } : {}}
          >
            <ChevronDown />
          </span>
        </button>
        <span
          className="absolute -bottom-2 h-1.5 w-1.5 rounded-full transition-opacity duration-200"
          style={{ background: "#003566", opacity: isActiveParent ? 1 : 0 }}
        />
      </div>

      {open && (
        <div className="absolute left-0 top-full z-50 min-w-[160px] pt-2">
          <div
            id={panelId}
            className="overflow-hidden rounded-xl border border-gray-100 bg-white py-1 shadow-lg"
            style={{
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(-4px)",
              transition: "opacity 200ms ease, transform 200ms ease",
            }}
          >
            {children.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-gray-50"
                  style={
                    isActive
                      ? {
                          background:
                            "linear-gradient(180deg, #070A0F 0%, #003566 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                          fontWeight: 500,
                        }
                      : { color: "#070A0F" }
                  }
                >
                  {item.label}
                  {isActive && (
                    <span
                      className="ml-2 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                      style={{ background: "#003566" }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
