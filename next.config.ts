import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fayzm.uz",
      },
    ],
  },
};

export default nextConfig;
