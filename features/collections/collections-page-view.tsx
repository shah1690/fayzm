import Link from "next/link";

export function CollectionsPageView() {
  return (
    <main>
      {/* Hero: 2-column card layout */}
      <section className="px-5 py-6 md:px-10">
        <div
          className="flex flex-col gap-4 md:flex-row"
          style={{ minHeight: "calc(100vh - 124px)" }}
        >
          {/* Left: large image card with quote */}
          <div
            className="relative min-h-[480px] flex-1 overflow-hidden md:min-h-0"
            style={{ borderRadius: 32 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/g1.jpg"
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(160deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.45) 100%)",
              }}
            />
            <div className="relative z-10 flex h-full flex-col justify-between p-8 md:p-10">
              <div className="max-w-md">
                <p className="text-3xl font-bold uppercase leading-tight text-white md:text-4xl">
                  &ldquo;Quality at every stitch.&rdquo;
                </p>
                <p className="mt-3 text-sm text-white/70">
                  Premium Textile &amp; Garment Collections
                </p>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    d="M8 1L9.5 6.5L15 8L9.5 9.5L8 15L6.5 9.5L1 8L6.5 6.5L8 1Z"
                    fill="white"
                  />
                </svg>
                <span className="text-sm text-white/60">
                  Made in Uzbekistan
                </span>
              </div>
            </div>
          </div>

          {/* Right: two stacked cards */}
          <div className="flex w-full flex-col gap-4 md:w-[42%]">
            {/* Top: brand info card */}
            <div
              className="flex flex-1 flex-col justify-between bg-[#F5F5F5] p-8 md:p-10"
              style={{ borderRadius: 32 }}
            >
              <div>
                <p className="text-2xl font-bold text-[#070A0F]">FAYZ-M</p>
                <p className="mt-1 text-sm text-gray-400">
                  Textile Collections
                </p>
              </div>
              <p className="text-sm leading-relaxed text-gray-500">
                Crafted in Khodjaabad, Uzbekistan — premium knitwear and
                garments produced by 700+ skilled workers, exported to 5+
                countries worldwide.
              </p>
            </div>

            {/* Bottom: dark CTA card */}
            <div
              className="relative overflow-hidden bg-[#070A0F]"
              style={{ borderRadius: 32, minHeight: 200 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/g-cta.jpg"
                alt=""
                className="absolute right-0 top-0 h-full w-2/3 object-cover"
                style={{
                  maskImage:
                    "linear-gradient(to left, rgba(0,0,0,0.6) 0%, transparent 80%)",
                  WebkitMaskImage:
                    "linear-gradient(to left, rgba(0,0,0,0.6) 0%, transparent 80%)",
                }}
              />
              <div
                className="relative z-10 flex h-full flex-col justify-between p-8 md:p-10"
                style={{ minHeight: 200 }}
              >
                <h2 className="max-w-[200px] text-xl font-bold uppercase leading-tight text-white md:text-2xl">
                  Explore Our Product Range
                </h2>
                <Link
                  href="/contact"
                  className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[#070A0F] transition-all hover:bg-[#84CC16]"
                >
                  Request Catalogue →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories row */}
      <section className="px-5 pb-16 md:px-10">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                label: "Women's Knitwear",
                href: "/collections/women",
                image: "/images/k2.jpg",
                count: "2,800+ items/month",
              },
              {
                label: "Men's Knitwear",
                href: "/collections/men",
                image: "/images/k3.jpg",
                count: "1,200+ items/month",
              },
              {
                label: "Export Collections",
                href: "/contact",
                image: "/images/g2.jpg",
                count: "7M+ units/year",
              },
            ].map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="group relative overflow-hidden"
                style={{ borderRadius: 24, minHeight: 260 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-base font-semibold text-white">
                    {cat.label}
                  </p>
                  <p className="mt-0.5 text-xs text-white/60">{cat.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
