import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FAYZ-M",
    short_name: "FAYZ-M",
    description: "FAYZ-M textile cluster in Uzbekistan.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#003566",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
    ],
  };
}
