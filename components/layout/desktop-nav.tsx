"use client";

import { useRef, useState } from "react";
import { BusinessesMegaMenu } from "@/components/layout/businesses-mega-menu";
import { CollectionsMegaMenu } from "@/components/layout/collections-mega-menu";
import { NavLink } from "@/components/layout/nav-link";
import { siteConfig } from "@/shared/config/site-config";
import type { Locale } from "@/shared/i18n/translations";

type Props = Readonly<{ locale: Locale }>;
type ActiveMenu = "collections" | "businesses" | null;

export function DesktopNav({ locale }: Props) {
  const [activeMenu, setActiveMenu] = useState<ActiveMenu>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMenuEnter = (menu: NonNullable<ActiveMenu>) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setActiveMenu(menu);
  };

  const handleMenuLeave = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => setActiveMenu(null), 250);
  };

  return (
    <ul className="hidden items-center gap-8 md:flex">
      {siteConfig.nav.map((item) => (
        <li key={item.href}>
          {"children" in item ? (
            <BusinessesMegaMenu
              label={item.label}
              locale={locale}
              open={activeMenu === "businesses"}
              onMouseEnter={() => handleMenuEnter("businesses")}
              onMouseLeave={handleMenuLeave}
            />
          ) : item.href === "/collections" ? (
            <CollectionsMegaMenu
              label={item.label}
              locale={locale}
              open={activeMenu === "collections"}
              onMouseEnter={() => handleMenuEnter("collections")}
              onMouseLeave={handleMenuLeave}
            />
          ) : (
            <NavLink href={item.href} label={item.label} />
          )}
        </li>
      ))}
    </ul>
  );
}
