"use client";

import { useContext, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  MapContext,
  Marker,
} from "react-simple-maps";
import type { Locale } from "@/shared/i18n/translations";

const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

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
  { name: "Poland", coords: [19.94, 52.22] as [number, number], iso: "616" },
  { name: "Ukraine", coords: [30.52, 50.45] as [number, number], iso: "804" },
  { name: "Italy", coords: [12.5, 41.9] as [number, number], iso: "380" },
];

const HIGHLIGHT_ISOS = new Set(DESTINATIONS.map((d) => d.iso));
const UZB_ISO = "860";

function ArcLines({ hovered }: { hovered: string | null }) {
  // biome-ignore lint/suspicious/noExplicitAny: react-simple-maps MapContext
  const ctx = useContext(MapContext as any);
  // biome-ignore lint/suspicious/noExplicitAny: react-simple-maps MapContext
  const projection = (ctx as any)?.projection;
  if (!projection) return null;

  const op = projection(ORIGIN) as [number, number] | null;
  if (!op) return null;
  const [ox, oy] = op;

  return (
    <>
      {DESTINATIONS.map((d) => {
        const dp = projection(d.coords) as [number, number] | null;
        if (!dp) return null;
        const [dx, dy] = dp;
        const isHov = hovered === d.name;
        const isVisible = hovered === null || isHov;

        // Quadratic bezier control point — arched upward
        const mx = (ox + dx) / 2;
        const my = (oy + dy) / 2 - Math.abs(dx - ox) * 0.32;

        return (
          <path
            key={d.name}
            d={`M ${ox} ${oy} Q ${mx} ${my} ${dx} ${dy}`}
            fill="none"
            stroke={
              isHov
                ? "#5DA016"
                : isVisible
                  ? "#84CC16"
                  : "rgba(132,204,22,0.18)"
            }
            strokeWidth={isHov ? 2 : 1}
            strokeLinecap="round"
            strokeDasharray={isHov ? undefined : "5 4"}
            style={{ transition: "stroke 0.25s, stroke-width 0.25s" }}
          />
        );
      })}
    </>
  );
}

type Props = Readonly<{ locale: Locale }>;

export function WorldMapSection({ locale: _locale }: Props) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="overflow-hidden bg-white px-5 py-8 md:px-10 md:py-12">
      <div className="mx-auto max-w-[1440px]">
        {/* Map container */}
        <div
          className="relative w-full overflow-hidden"
          style={{ background: "#F0F2EA", borderRadius: 40 }}
        >
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ scale: 460, center: [58, 33] }}
            style={{ width: "100%", height: "auto" }}
            viewBox="0 0 800 420"
          >
            <Geographies geography={GEO_URL}>
              {/* biome-ignore lint/suspicious/noExplicitAny: react-simple-maps internal type */}
              {({ geographies }: { geographies: any[] }) =>
                // biome-ignore lint/suspicious/noExplicitAny: react-simple-maps
                geographies.map((geo: any) => {
                  const iso = geo.id?.toString();
                  const isUzb = iso === UZB_ISO;
                  const isPartner = HIGHLIGHT_ISOS.has(iso ?? "");
                  const dest = DESTINATIONS.find((d) => d.iso === iso);
                  const isHovered = dest ? hovered === dest.name : false;

                  if (!isUzb && !isPartner) {
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        style={{
                          default: {
                            fill: "rgba(160,175,150,0.12)",
                            stroke: "rgba(140,155,130,0.2)",
                            strokeWidth: 0.3,
                            outline: "none",
                          },
                          hover: {
                            fill: "rgba(160,175,150,0.12)",
                            outline: "none",
                          },
                          pressed: { outline: "none" },
                        }}
                      />
                    );
                  }

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => dest && setHovered(dest.name)}
                      onMouseLeave={() => setHovered(null)}
                      style={{
                        default: {
                          fill: isUzb
                            ? "#84CC16"
                            : isHovered
                              ? "rgba(132,204,22,0.45)"
                              : "rgba(132,204,22,0.22)",
                          stroke: isUzb
                            ? "#5DA016"
                            : isHovered
                              ? "#84CC16"
                              : "rgba(132,204,22,0.4)",
                          strokeWidth: isUzb ? 1 : 0.6,
                          outline: "none",
                          transition: "fill 0.2s",
                        },
                        hover: {
                          fill: isUzb ? "#84CC16" : "rgba(132,204,22,0.45)",
                          stroke: isUzb ? "#5DA016" : "#84CC16",
                          strokeWidth: isUzb ? 1 : 0.6,
                          outline: "none",
                        },
                        pressed: { outline: "none" },
                      }}
                    />
                  );
                })
              }
            </Geographies>

            {/* Curved arc lines from Andijan to destinations */}
            <ArcLines hovered={hovered} />

            {/* Uzbekistan country label */}
            <Marker coordinates={[63.5, 41.4] as [number, number]}>
              <text
                textAnchor="middle"
                y={0}
                transform="rotate(40)"
                style={{
                  fontSize: 6.5,
                  fill: "#ffffff",
                  fontWeight: 800,
                  fontFamily: "Manrope,sans-serif",
                  letterSpacing: 1,
                  pointerEvents: "none",
                }}
              >
                UZBEKISTAN
              </text>
            </Marker>

            {/* Origin — Andijan */}
            <Marker coordinates={ORIGIN}>
              <circle r={6} fill="#84CC16" stroke="white" strokeWidth={2} />
              <circle r={13} fill="rgba(132,204,22,0.18)" />
              <text
                textAnchor="middle"
                y={-14}
                style={{
                  fontSize: 7.5,
                  fill: "#2a4a10",
                  fontWeight: 800,
                  fontFamily: "Manrope,sans-serif",
                  letterSpacing: 0.3,
                }}
              >
                Andijan
              </text>
            </Marker>

            {/* Destination markers */}
            {DESTINATIONS.map((d) => {
              const isHov = hovered === d.name;
              return (
                <Marker
                  key={d.name}
                  coordinates={d.coords}
                  onMouseEnter={() => setHovered(d.name)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <circle
                    r={isHov ? 5.5 : 3.5}
                    fill={isHov ? "#84CC16" : "rgba(93,160,22,0.75)"}
                    stroke="white"
                    strokeWidth={1.5}
                    style={{ transition: "all 0.2s" }}
                  />
                  <text
                    textAnchor="middle"
                    y={-10}
                    style={{
                      fontSize: isHov ? 7.5 : 6.5,
                      fill: isHov ? "#2a4a10" : "#5a6a50",
                      fontWeight: isHov ? 800 : 500,
                      fontFamily: "Manrope,sans-serif",
                      transition: "all 0.2s",
                    }}
                  >
                    {d.name}
                  </text>
                </Marker>
              );
            })}
          </ComposableMap>

          {/* Country pill filters */}
          <div className="flex flex-wrap justify-center gap-2 px-6 pb-5 pt-1">
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
                        background: "rgba(0,0,0,0.06)",
                        color: "#6b7a5f",
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
