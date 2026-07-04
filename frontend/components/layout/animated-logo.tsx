"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, MouseEventHandler } from "react";
import { siteConfig } from "@/shared/config/site-config";

type AnimatedLogoProps = Readonly<{
  href: string;
  variant: "light" | "dark";
  size?: "nav" | "footer";
  priority?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}>;

const logoSizes = {
  nav: { width: 98, height: 31 },
  footer: { width: 142, height: 45 },
} as const;

const logoFallbackClass = {
  nav: "h-[31px] w-[98px] max-w-[98px]",
  footer: "h-[45px] w-[142px] max-w-[142px]",
} as const;

export function AnimatedLogo({
  href,
  variant,
  size = "nav",
  priority = false,
  className,
  onClick,
}: AnimatedLogoProps) {
  const dimensions = logoSizes[size];
  const src = variant === "dark" ? siteConfig.logo.dark : siteConfig.logo.light;
  const logoStyle = {
    "--logo-mask": `url(${src})`,
    "--logo-width": `${dimensions.width}px`,
    "--logo-height": `${dimensions.height}px`,
  } as CSSProperties;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={[
        "animated-logo",
        logoFallbackClass[size],
        `animated-logo--${variant}`,
        `animated-logo--${size}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label={siteConfig.name}
      style={logoStyle}
    >
      <span className="animated-logo__halo" aria-hidden="true" />
      <span className="animated-logo__shine" aria-hidden="true" />
      <span className="animated-logo__thread" aria-hidden="true" />
      <span className="animated-logo__spark" aria-hidden="true" />
      <Image
        src={src}
        alt={siteConfig.name}
        width={dimensions.width}
        height={dimensions.height}
        priority={priority}
        className="animated-logo__image"
        style={{ width: "100%", height: "100%" }}
      />
    </Link>
  );
}
