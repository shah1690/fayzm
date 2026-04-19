"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/shared/i18n/translations";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

const t = {
  tag: { en: "Global Reach", uz: "Jahon miqyosi", ru: "Мировой охват" },
  heading: {
    en: "Made in Uzbekistan.\nWorn worldwide.",
    uz: "O'zbekistonda ishlab chiqarilgan.\nButun dunyoda kiyiladi.",
    ru: "Сделано в Узбекистане.\nНосят по всему миру.",
  },
  sub: {
    en: "Our knitwear ships to partners across Europe, Central Asia, and the Middle East.",
    uz: "Trikotajimiz Yevropa, Markaziy Osiyo va Yaqin Sharqdagi hamkorlarimizga yetkaziladi.",
    ru: "Наш трикотаж поставляется партнёрам по всей Европе, Центральной Азии и Ближнему Востоку.",
  },
};

const UZB = { lat: 40.7821, lng: 72.3442, label: "Uzbekistan" };

const DESTINATIONS = [
  { lat: 55.75, lng: 37.62, label: "Russia", geoName: "Russia" },
  { lat: 53.9, lng: 27.56, label: "Belarus", geoName: "Belarus" },
  { lat: 39.92, lng: 32.85, label: "Turkey", geoName: "Turkey" },
  { lat: 51.18, lng: 71.45, label: "Kazakhstan", geoName: "Kazakhstan" },
  { lat: 25.2, lng: 55.27, label: "UAE", geoName: "United Arab Emirates" },
  { lat: 52.52, lng: 13.4, label: "Germany", geoName: "Germany" },
  { lat: 48.85, lng: 2.35, label: "France", geoName: "France" },
  { lat: 39.9, lng: 116.39, label: "China", geoName: "China" },
];

const HIGHLIGHT_NAMES = new Set([
  "Uzbekistan",
  ...DESTINATIONS.map((d) => d.geoName),
]);

const GEO_NAME_TO_LABEL: Record<string, string> = {
  Uzbekistan: "Uzbekistan",
  ...Object.fromEntries(DESTINATIONS.map((d) => [d.geoName, d.label])),
};

const ARCS = DESTINATIONS.map((d) => ({
  startLat: UZB.lat,
  startLng: UZB.lng,
  endLat: d.lat,
  endLng: d.lng,
  label: d.label,
}));

const worldLabels = {
  origin: { en: "Origin", uz: "Manba", ru: "Источник" },
  countries: {
    Uzbekistan: { en: "Uzbekistan", uz: "O'zbekiston", ru: "Узбекистан" },
    Russia: { en: "Russia", uz: "Rossiya", ru: "Россия" },
    Belarus: { en: "Belarus", uz: "Belarus", ru: "Беларусь" },
    Turkey: { en: "Turkey", uz: "Turkiya", ru: "Турция" },
    Kazakhstan: { en: "Kazakhstan", uz: "Qozog'iston", ru: "Казахстан" },
    UAE: { en: "UAE", uz: "BAA", ru: "ОАЭ" },
    "United Arab Emirates": {
      en: "United Arab Emirates",
      uz: "Birlashgan Arab Amirliklari",
      ru: "Объединённые Арабские Эмираты",
    },
    Germany: { en: "Germany", uz: "Germaniya", ru: "Германия" },
    France: { en: "France", uz: "Fransiya", ru: "Франция" },
    China: { en: "China", uz: "Xitoy", ru: "Китай" },
  },
} as const;

function getCountryLabel(name: string, locale: Locale): string {
  const entry =
    worldLabels.countries[name as keyof typeof worldLabels.countries];
  return entry ? entry[locale] : name;
}

type GeoFeature = { properties: { name: string } };
type Props = Readonly<{ locale: Locale }>;

export function WorldReachSection({ locale }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  // biome-ignore lint/suspicious/noExplicitAny: react-globe.gl ref type
  const globeRef = useRef<any>(null);
  const [size, setSize] = useState(900);
  const [ready, setReady] = useState(false);
  const [hovered, setHovered] = useState<string>("Uzbekistan");
  const [countries, setCountries] = useState<{ features: GeoFeature[] }>({
    features: [],
  });

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson",
    )
      .then((r) => r.json())
      .then(setCountries)
      .catch(() => {});
  }, []);

  useEffect(() => {
    const update = () => {
      if (containerRef.current) setSize(containerRef.current.offsetWidth);
    };
    update();
    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const id = setTimeout(() => setReady(true), 100);
    return () => clearTimeout(id);
  }, []);

  const hoveredGeoName =
    DESTINATIONS.find((d) => d.label === hovered)?.geoName ?? hovered;

  const points = [
    { lat: UZB.lat, lng: UZB.lng, label: UZB.label, isOrigin: true },
    ...DESTINATIONS.map((d) => ({ ...d, isOrigin: false })),
  ];

  const headingLines = t.heading[locale].split("\n");

  return (
    <section className="overflow-hidden bg-[#070A0F] py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#84CC16]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#84CC16]">
                {t.tag[locale]}
              </span>
            </div>
            <h2
              className="font-black leading-tight text-white"
              style={{ fontSize: "clamp(2rem,4vw,3.5rem)" }}
            >
              {headingLines[0]}
              <br />
              <span
                style={{
                  WebkitTextStroke: "1.5px white",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {headingLines[1]}
              </span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/40 md:text-right">
            {t.sub[locale]}
          </p>
        </div>

        {/* Globe + list */}
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center">
          {/* Globe */}
          <div
            ref={containerRef}
            className="relative w-full lg:w-[85%]"
            style={{ height: 1100 }}
          >
            {ready && (
              <Globe
                width={size}
                height={1100}
                backgroundColor="rgba(0,0,0,0)"
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                showAtmosphere={false}
                polygonsData={countries.features.filter((f) =>
                  HIGHLIGHT_NAMES.has(f.properties.name),
                )}
                // biome-ignore lint/suspicious/noExplicitAny: react-globe.gl internal API
                polygonCapColor={(f: any) => {
                  const name = f.properties.name;
                  if (name === "Uzbekistan") return "rgba(132,204,22,0.4)";
                  if (hoveredGeoName === name) return "rgba(132,204,22,0.35)";
                  return "rgba(255,255,255,0.04)";
                }}
                polygonSideColor={() => "rgba(0,0,0,0)"}
                // biome-ignore lint/suspicious/noExplicitAny: react-globe.gl internal API
                polygonStrokeColor={(f: any) => {
                  const name = f.properties.name;
                  if (name === "Uzbekistan") return "#84CC16";
                  if (hoveredGeoName === name) return "#84CC16";
                  return "rgba(132,204,22,0.2)";
                }}
                // biome-ignore lint/suspicious/noExplicitAny: react-globe.gl internal API
                polygonAltitude={(f: any) => {
                  const name = f.properties.name;
                  if (name === "Uzbekistan") return 0.02;
                  if (hoveredGeoName === name) return 0.015;
                  return 0.005;
                }}
                // biome-ignore lint/suspicious/noExplicitAny: react-globe.gl internal API
                polygonLabel={(f: any) =>
                  `<div style="font-family:Manrope,sans-serif;background:#070A0F;color:white;padding:6px 12px;border-radius:8px;font-size:13px;font-weight:600;border:1px solid rgba(132,204,22,0.3)">${getCountryLabel(GEO_NAME_TO_LABEL[f.properties.name] ?? f.properties.name, locale)}</div>`
                }
                arcsData={ARCS}
                // biome-ignore lint/suspicious/noExplicitAny: react-globe.gl internal API
                arcColor={(arc: any) =>
                  hovered === "Uzbekistan" || hovered === arc.label
                    ? "#84CC16"
                    : "rgba(132,204,22,0.12)"
                }
                // biome-ignore lint/suspicious/noExplicitAny: react-globe.gl internal API
                arcAltitude={(arc: any) =>
                  hovered === arc.label ? 0.35 : 0.22
                }
                // biome-ignore lint/suspicious/noExplicitAny: react-globe.gl internal API
                arcStroke={(arc: any) => (hovered === arc.label ? 1.2 : 0.35)}
                arcDashLength={0.4}
                arcDashGap={0.2}
                arcDashAnimateTime={2000}
                pointsData={points}
                // biome-ignore lint/suspicious/noExplicitAny: react-globe.gl internal API
                pointColor={(p: any) =>
                  p.isOrigin
                    ? "#84CC16"
                    : hovered === p.label
                      ? "#ffffff"
                      : "rgba(255,255,255,0.4)"
                }
                pointAltitude={0.01}
                // biome-ignore lint/suspicious/noExplicitAny: react-globe.gl internal API
                pointRadius={(p: any) =>
                  p.isOrigin ? 0.9 : hovered === p.label ? 0.85 : 0.4
                }
                enablePointerInteraction={false}
                ref={globeRef}
                onGlobeReady={() => {
                  const globe = globeRef.current;
                  if (!globe) return;
                  globe.pointOfView(
                    { lat: 40.7821, lng: 72.3442, altitude: 0.9 },
                    0,
                  );
                  const ctrl = globe.controls();
                  ctrl.autoRotate = true;
                  ctrl.autoRotateSpeed = 0.35;
                  ctrl.enableZoom = false;
                  ctrl.enablePan = false;
                  ctrl.enableRotate = false;
                }}
              />
            )}
            <div
              className="pointer-events-none absolute inset-y-0 left-0 w-20"
              style={{
                background: "linear-gradient(to right, #070A0F, transparent)",
              }}
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 w-20"
              style={{
                background: "linear-gradient(to left, #070A0F, transparent)",
              }}
            />
          </div>

          {/* Destination list */}
          <div className="flex w-full flex-col lg:w-[30%]">
            <div className="mb-3 flex items-center gap-3 rounded-2xl bg-[#84CC16]/10 px-4 py-3 ring-1 ring-[#84CC16]/30">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#84CC16]">
                <span className="text-xs font-black text-[#070A0F]">UZ</span>
              </div>
              <div>
                <p className="text-sm font-bold text-white">
                  {getCountryLabel("Uzbekistan", locale)}
                </p>
                <p className="text-xs text-white/30">
                  {worldLabels.origin[locale]}
                </p>
              </div>
            </div>

            <div className="mb-3 h-px bg-white/5" />

            {DESTINATIONS.map((d) => {
              const isActive = hovered === d.label;
              return (
                <button
                  key={d.label}
                  type="button"
                  onMouseEnter={() => setHovered(d.label)}
                  onMouseLeave={() => setHovered("Uzbekistan")}
                  className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition-all duration-200"
                  style={
                    isActive
                      ? {
                          background: "rgba(132,204,22,0.08)",
                          outline: "1px solid rgba(132,204,22,0.25)",
                        }
                      : undefined
                  }
                >
                  <span
                    className="h-2 w-2 flex-shrink-0 rounded-full transition-all duration-200"
                    style={{
                      background: isActive ? "#84CC16" : "rgba(132,204,22,0.3)",
                      boxShadow: isActive ? "0 0 8px #84CC16" : undefined,
                      transform: isActive ? "scale(1.4)" : "scale(1)",
                    }}
                  />
                  <span
                    className="flex-1 text-sm font-semibold transition-colors duration-200"
                    style={{
                      color: isActive ? "#ffffff" : "rgba(255,255,255,0.5)",
                    }}
                  >
                    {getCountryLabel(d.label, locale)}
                  </span>
                  <span
                    className="text-xs transition-all duration-200"
                    style={{
                      color: isActive ? "#84CC16" : "rgba(255,255,255,0.15)",
                      transform: isActive ? "translateX(3px)" : "none",
                    }}
                  >
                    →
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
