import { stats } from "@/content/stats";
import type { Locale } from "@/shared/i18n/translations";

function StatValue({ value }: { value: string }) {
  const [base, ...rest] = value.split("+");
  return (
    <span>
      {base}
      {rest.length > 0 && <span style={{ opacity: 0.35 }}>+</span>}
    </span>
  );
}

function TshirtIcon() {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M4 14L14 8H20C20 11.314 23.134 14 28 14C32.866 14 36 11.314 36 8H42L52 14L44 22V50H12V22L4 14Z"
        stroke="#070A0F"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="24"
        y1="28"
        x2="32"
        y2="28"
        stroke="#070A0F"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <rect
        x="6"
        y="20"
        width="44"
        height="30"
        rx="4"
        stroke="#070A0F"
        strokeWidth="2.5"
      />
      <path
        d="M20 20V14C20 11.791 21.791 10 24 10H32C34.209 10 36 11.791 36 14V20"
        stroke="#070A0F"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line x1="6" y1="34" x2="50" y2="34" stroke="#070A0F" strokeWidth="2.5" />
    </svg>
  );
}

function HandshakeIcon() {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M4 22L16 14H24L28 18L32 14H40L52 22L44 30L38 24L28 34L18 24L12 30L4 22Z"
        stroke="#070A0F"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 24L22 28M28 34L32 38M38 24L34 28"
        stroke="#070A0F"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M32 6L12 32H28L24 50L44 24H28L32 6Z"
        stroke="#070A0F"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const icons = {
  tshirt: TshirtIcon,
  briefcase: BriefcaseIcon,
  handshake: HandshakeIcon,
  bolt: BoltIcon,
};

type StatsSectionProps = Readonly<{ locale: Locale }>;

export function StatsSection({ locale }: StatsSectionProps) {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-6">
          {stats.map((stat) => {
            const Icon = icons[stat.icon];
            return (
              <div
                key={stat.icon}
                className="flex flex-col items-center gap-4 text-center"
              >
                <Icon />
                <div>
                  <p className="text-3xl font-bold text-[#070A0F] md:text-4xl">
                    <StatValue value={stat.value} />
                  </p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-gray-400">
                    {stat.label[locale]}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
