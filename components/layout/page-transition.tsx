"use client";

import { useLayoutEffect, useRef } from "react";
import { usePathname } from "@/i18n/navigation";

type PageTransitionProps = Readonly<{ children: React.ReactNode }>;

const revealSelector = "main > section, main > div, main > article, main > h1";

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = contentRef.current;

    if (!root || typeof window === "undefined") {
      return;
    }

    root.setAttribute("data-route", pathname);

    const targets = Array.from(
      root.querySelectorAll<HTMLElement>(revealSelector),
    );

    if (!targets.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("scroll-reveal-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -12% 0px",
      },
    );

    targets.forEach((target, index) => {
      target.classList.add("scroll-reveal-target");
      target.style.setProperty("--reveal-order", String(index % 6));

      if (
        index === 0 ||
        target.getBoundingClientRect().top < window.innerHeight * 0.8
      ) {
        target.classList.add("scroll-reveal-visible");
        return;
      }

      observer.observe(target);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return (
    <div key={pathname} className="page-transition-shell">
      <div aria-hidden="true" className="page-transition-overlay" />
      <div ref={contentRef} className="page-transition-content">
        {children}
      </div>
    </div>
  );
}
