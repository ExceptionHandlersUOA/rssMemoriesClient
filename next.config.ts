import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL('https://upload.wikimedia.org/**')]
  },
  output: "standalone",
};

export default nextConfig;
