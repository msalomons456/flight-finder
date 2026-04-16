import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "www.gstatic.com" },
    ],
  },
};

export default nextConfig;
