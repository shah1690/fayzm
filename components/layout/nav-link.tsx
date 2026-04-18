"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = Readonly<{ href: string; label: string }>;

export function NavLink({ href, label }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <div className="relative flex flex-col items-center gap-1">
      <Link
        href={href}
        className="text-sm transition-all duration-200"
        style={isActive ? {
          background: "linear-gradient(90deg, #070A0F 0%, #84CC16 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        } : { color: "#070A0F" }}
      >
        {label}
      </Link>
      {isActive && (
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#84CC16" }} />
      )}
    </div>
  );
}
