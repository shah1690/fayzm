"use client";

import { usePathname } from "@/i18n/navigation";

type PageTransitionProps = Readonly<{ children: React.ReactNode }>;

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="page-transition-shell">
      <div aria-hidden="true" className="page-transition-overlay" />
      <div className="page-transition-content">{children}</div>
    </div>
  );
}
