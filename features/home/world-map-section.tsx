"use client";

import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Line,
  Marker,
} from "react-simple-maps";
import type { Locale } from "@/shared/i18n/translations";

const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const t = {
  tag: { en: "Global Reach", uz: "Jahon miqyosi", ru: "Мировой охват" },
  heading: {
    en: "Shipped from Andijan\nto the World.",
    uz: "Andijondan\nbutun dunyoga.",
    ru: "Из Андижана\nв весь мир.",
  },
  sub: {
    en: "Our knitwear reaches partners across Europe, Central Asia, and the Middle East.",
    uz: "Trikotajimiz Yevropa, Markaziy Osiyo va Yaqin Sharq hamkorlariga yetib boradi.",
    ru: "Наш трикотаж доставляется партнёрам по всей Европе, Центральной Азии и Ближнему Востоку.",
  },
};

// Andijan, Uzbekistan
const ORIGIN = [72.3442, 40.7821] as [number, number];

const DESTINATIONS = [
  { name: "Russia", coords: [37.62, 55.75] as [number, number], iso: "643" },
  { name: "Belarus", coords: [27.56, 53.9] as [number, number], iso: "112" },
  { name: "Turkey", coords: [32.85, 39.92] as [number, number], iso: "792" },
  {
    name: "Kazakhstan",
    coords: [71.45, 51.18] as [number, number],
    iso: "398",
  },
  { name: "UAE", coords: [55.27, 25.2] as [number, number], iso: "784" },
  { name: "Germany", coords: [13.4, 52.52] as [number, number], iso: "276" },
  { name: "France", coords: [2.35, 48.85] as [number, number], iso: "250" },
  { name: "China", coords: [116.39, 39.9] as [number, number], iso: "156" },
];

const HIGHLIGHT_ISOS = new Set(DESTINATIONS.map((d) => d.iso));
const UZB_ISO = "860";

type Props = Readonly<{ locale: Locale }>;

export function WorldMapSection({ locale }: Props) {
  const [hovered, setHovered] = useState<string | null>(null);

  const headingLines = t.heading[locale].split("\n");

  return (
    <section className="overflow-hidden bg-[#070A0F] py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
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

        {/* Map */}
        <div
          className="relative w-full overflow-hidden rounded-3xl"
          style={{ background: "#0a0f1a" }}
        >
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ scale: 140, center: [55, 45] }}
            style={{ width: "100%", height: "auto" }}
            viewBox="0 0 800 420"
          >
            <Geographies geography={GEO_URL}>
              {/* biome-ignore lint/suspicious/noExplicitAny: react-simple-maps internal type */}
              {(
                { geographies }: { geographies: any[] }, // biome-ignore lint/suspicious/noExplicitAny: react-simple-maps
              ) =>
                geographies.map((geo: any) => {
                  // biome-ignore lint/suspicious/noExplicitAny: react-simple-maps
                  const iso = geo.id?.toString();
                  const isUzb = iso === UZB_ISO;
                  const isPartner = HIGHLIGHT_ISOS.has(iso ?? "");
                  const dest = DESTINATIONS.find((d) => d.iso === iso);
                  const isHovered = dest ? hovered === dest.name : false;

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => dest && setHovered(dest.name)}
                      onMouseLeave={() => setHovered(null)}
                      style={{
                        default: {
                          fill: isUzb
                            ? "rgba(132,204,22,0.5)"
                            : isHovered
                              ? "rgba(132,204,22,0.4)"
                              : isPartner
                                ? "rgba(132,204,22,0.12)"
                                : "rgba(255,255,255,0.04)",
                          stroke: isUzb
                            ? "#84CC16"
                            : isPartner
                              ? "rgba(132,204,22,0.35)"
                              : "rgba(255,255,255,0.06)",
                          strokeWidth: isUzb ? 1.2 : isPartner ? 0.6 : 0.3,
                          outline: "none",
                          transition: "fill 0.2s",
                        },
                        hover: {
                          fill: isPartner
                            ? "rgba(132,204,22,0.4)"
                            : "rgba(255,255,255,0.06)",
                          stroke: isPartner
                            ? "#84CC16"
                            : "rgba(255,255,255,0.1)",
                          strokeWidth: isPartner ? 0.8 : 0.3,
                          outline: "none",
                        },
                        pressed: { outline: "none" },
                      }}
                    />
                  );
                })
              }
            </Geographies>

            {/* Connection lines */}
            {DESTINATIONS.map((d) => (
              <Line
                key={d.name}
                from={ORIGIN}
                to={d.coords}
                stroke={
                  hovered === null || hovered === d.name
                    ? "#84CC16"
                    : "rgba(132,204,22,0.12)"
                }
                strokeWidth={hovered === d.name ? 1.5 : 0.8}
                strokeLinecap="round"
                strokeDasharray={hovered === d.name ? "none" : "4 4"}
                style={{ transition: "stroke 0.2s, stroke-width 0.2s" }}
              />
            ))}

            {/* Origin dot — Andijan */}
            <Marker coordinates={ORIGIN}>
              <circle r={5} fill="#84CC16" stroke="#070A0F" strokeWidth={2} />
              <circle r={10} fill="rgba(132,204,22,0.2)" />
              <text
                textAnchor="middle"
                y={-14}
                style={{
                  fontSize: 7,
                  fill: "#84CC16",
                  fontWeight: 700,
                  fontFamily: "Manrope,sans-serif",
                }}
              >
                Andijan
              </text>
            </Marker>

            {/* Destination dots */}
            {DESTINATIONS.map((d) => (
              <Marker
                key={d.name}
                coordinates={d.coords}
                onMouseEnter={() => setHovered(d.name)}
                onMouseLeave={() => setHovered(null)}
              >
                <circle
                  r={hovered === d.name ? 5 : 3}
                  fill={hovered === d.name ? "#84CC16" : "rgba(132,204,22,0.6)"}
                  stroke="#070A0F"
                  strokeWidth={1}
                  style={{ transition: "all 0.2s" }}
                />
                {hovered === d.name && (
                  <text
                    textAnchor="middle"
                    y={-10}
                    style={{
                      fontSize: 7,
                      fill: "#ffffff",
                      fontWeight: 600,
                      fontFamily: "Manrope,sans-serif",
                    }}
                  >
                    {d.name}
                  </text>
                )}
              </Marker>
            ))}
          </ComposableMap>

          {/* Edge fades */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-16"
            style={{
              background: "linear-gradient(to right, #0a0f1a, transparent)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-16"
            style={{
              background: "linear-gradient(to left, #0a0f1a, transparent)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-12"
            style={{
              background: "linear-gradient(to top, #0a0f1a, transparent)",
            }}
          />

          {/* Country list overlay — bottom */}
          <div className="absolute bottom-4 left-0 right-0 flex flex-wrap justify-center gap-2 px-6">
            {DESTINATIONS.map((d) => (
              <button
                key={d.name}
                type="button"
                onMouseEnter={() => setHovered(d.name)}
                onMouseLeave={() => setHovered(null)}
                className="rounded-full px-3 py-1 text-xs font-semibold transition-all duration-200"
                style={
                  hovered === d.name
                    ? { background: "#84CC16", color: "#070A0F" }
                    : {
                        background: "rgba(255,255,255,0.06)",
                        color: "rgba(255,255,255,0.5)",
                      }
                }
              >
                {d.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
