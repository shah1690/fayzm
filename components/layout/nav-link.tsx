"use client";

import { Link, usePathname } from "@/i18n/navigation";

type NavLinkProps = Readonly<{ href: string; label: string }>;

export function NavLink({ href, label }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === "/" : pathname === href;

  return (
    <div className="relative inline-flex flex-col items-center">
      <Link
        href={href}
        className={`cursor-pointer text-sm transition-all duration-200 ${!isActive ? "text-[#070A0F] hover:text-[#84CC16]" : ""}`}
        style={
          isActive
            ? {
                background: "linear-gradient(180deg, #070A0F 0%, #84CC16 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }
            : undefined
        }
      >
        {label}
      </Link>
      <span
        className="absolute -bottom-2 h-1.5 w-1.5 rounded-full transition-opacity duration-200"
        style={{ background: "#84CC16", opacity: isActive ? 1 : 0 }}
      />
    </div>
  );
}
