import Image from "next/image";
import Link from "next/link";
import { translations } from "@/shared/i18n/translations";
import { formatPhone } from "@/shared/lib/format-phone";
import { getLocale } from "@/shared/lib/get-locale";
import { siteConfig } from "@/shared/config/site-config";

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.54 6.42C22.4212 5.94541 22.1793 5.51057 21.8387 5.15941C21.498 4.80824 21.0708 4.55318 20.6 4.42C18.88 4 12 4 12 4C12 4 5.12 4 3.4 4.46C2.92925 4.59318 2.50198 4.84824 2.16135 5.19941C1.82072 5.55057 1.57879 5.98541 1.46 6.46C1.14521 8.20556 0.991235 9.97631 1 11.75C0.988787 13.537 1.14277 15.3213 1.46 17.08C1.59096 17.5398 1.83831 17.9581 2.17814 18.2945C2.51798 18.6308 2.93882 18.8738 3.4 19C5.12 19.46 12 19.46 12 19.46C12 19.46 18.88 19.46 20.6 19C21.0708 18.8668 21.498 18.6118 21.8387 18.2606C22.1793 17.9094 22.4212 17.4746 22.54 17C22.8524 15.2676 23.0063 13.5103 23 11.75C23.0112 9.96295 22.8573 8.1787 22.54 6.42Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9.75 15.02L15.5 11.75L9.75 8.48V15.02Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

const socialIcons = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
};

function QuickLinksCol() {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-base font-medium text-white">Quick Links</h3>
      <ul className="flex flex-col gap-3">
        {siteConfig.footer.quickLinks.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="text-sm text-white/60 transition-colors duration-200 hover:text-white">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CompanyCol() {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-base font-medium text-white">Company</h3>
      <ul className="flex flex-col gap-3">
        {siteConfig.footer.company.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="text-sm text-white/60 transition-colors duration-200 hover:text-white">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContactCol() {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-base font-medium text-white">Contact Us</h3>
      <div className="flex flex-col gap-3">
        {siteConfig.footer.phones.map((phone) => (
          <div key={phone.href} className="flex flex-col gap-0.5">
            <span className="text-xs text-white/40">{phone.label}</span>
            <a href={phone.href} className="text-sm text-white/60 transition-colors duration-200 hover:text-white">
              {formatPhone(phone.value)}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function Footer() {
  const locale = await getLocale();
  const year = new Date().getFullYear();

  const logoSection = (
    <div className="flex flex-col gap-6">
      <Link href="/">
        <Image src={siteConfig.logo.dark} alt={siteConfig.name} width={100} height={32} className="h-8 w-auto" />
      </Link>
      <p className="max-w-xs text-sm leading-relaxed text-white/50">
        {translations.footer.tagline[locale]}
      </p>
      <div className="flex items-center gap-3">
        {siteConfig.footer.social.map((item) => {
          const Icon = socialIcons[item.icon as keyof typeof socialIcons];
          return (
            <Link key={item.label} href={item.href} aria-label={item.label} target="_blank" rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/70 transition-all duration-200 hover:border-white hover:text-white">
              <Icon />
            </Link>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="bg-white p-3 md:p-5">
      <footer className="bg-gray-950 px-5 py-10 text-white md:px-10 md:py-12" style={{ borderRadius: "40px" }}>

        {/* Mobile layout */}
        <div className="flex flex-col gap-8 md:hidden">
          <div className="grid grid-cols-2 gap-6">
            <QuickLinksCol />
            <CompanyCol />
          </div>
          <ContactCol />
          {logoSection}
        </div>

        {/* Desktop layout */}
        <div className="hidden md:grid md:grid-cols-[1fr_auto] md:items-start md:gap-16">
          {logoSection}
          <div className="grid grid-cols-3 gap-16">
            <QuickLinksCol />
            <CompanyCol />
            <ContactCol />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="text-sm text-white/40">
            Copyright &copy; {year} {siteConfig.name}. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
