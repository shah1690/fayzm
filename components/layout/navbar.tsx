import Image from "next/image";
import Link from "next/link";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { NavDropdown } from "@/components/layout/nav-dropdown";
import { NavLink } from "@/components/layout/nav-link";
import { getLocale } from "@/shared/lib/get-locale";
import { siteConfig } from "@/shared/config/site-config";

function PhoneIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.09322 8.78442L6.29358 6.58407C6.74243 6.13522 6.89774 5.47202 6.7162 4.86377C6.57425 4.38814 6.41432 3.81637 6.30801 3.32743C6.20969 2.87522 5.81288 2.5 5.3501 2.5H4.09322C3.16767 2.5 2.40759 3.2532 2.50912 4.17317C3.28091 11.1663 8.83367 16.7191 15.8268 17.4909C16.7468 17.5924 17.5 16.8323 17.5 15.9067V14.6499C17.5 14.1872 17.1233 13.8075 16.6679 13.7247C16.1657 13.6333 15.6343 13.4837 15.1897 13.3419C14.5509 13.1382 13.8409 13.2814 13.3669 13.7554L11.2156 15.9067"
        fill="currentColor"
      />
      <path
        d="M4.09322 8.78442L6.29358 6.58407C6.74243 6.13522 6.89774 5.47202 6.7162 4.86377C6.57425 4.38814 6.41432 3.81637 6.30801 3.32743C6.20969 2.87522 5.81288 2.5 5.3501 2.5H4.09322C3.16767 2.5 2.40759 3.2532 2.50912 4.17317C3.28091 11.1663 8.83367 16.7191 15.8268 17.4909C16.7468 17.5924 17.5 16.8323 17.5 15.9068V14.6499C17.5 14.1872 17.1233 13.8075 16.6679 13.7247C16.1657 13.6333 15.6343 13.4837 15.1897 13.3419C14.5509 13.1382 13.8409 13.2814 13.3669 13.7554L11.2156 15.9068"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}


export async function Navbar() {
  const locale = await getLocale();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white">
      <nav className="grid h-[76px] grid-cols-[1fr_auto_1fr] items-center px-5 py-4 md:px-10">
        <Link href="/" className="flex items-center">
          <Image
            src={siteConfig.logo.light}
            alt={siteConfig.name}
            width={100}
            height={32}
            priority
            className="h-8 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {siteConfig.nav.map((item) => (
            <li key={item.href}>
              {"children" in item ? (
                <NavDropdown label={item.label} href={item.href} children={item.children} />
              ) : (
                <NavLink href={item.href} label={item.label} />
              )}
            </li>
          ))}
        </ul>

        {/* Desktop actions */}
        <div className="hidden items-center justify-end gap-3 md:flex">
          <LanguageSwitcher current={locale} />
          <Link
            href="/contact"
            className="rounded-full border border-gray-100 bg-white px-5 py-2 text-sm text-[#070A0F] transition-all duration-200 hover:border-[#070A0F] hover:bg-[#070A0F] hover:text-white"
          >
            Contact Us
          </Link>
          <a
            href={siteConfig.footer.phones[0].href}
            aria-label="Call us"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-100 bg-white text-[#070A0F] transition-all duration-200 hover:border-[#070A0F] hover:bg-[#070A0F] hover:text-white"
          >
            <PhoneIcon />
          </a>
        </div>

        {/* Mobile burger */}
        <div className="justify-self-end md:hidden">
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}
