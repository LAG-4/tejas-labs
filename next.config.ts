import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep source maps out of production assets. Client-side code must still be
  // delivered to browsers, but this prevents publishing the original source
  // files alongside its compiled bundles.
  productionBrowserSourceMaps: false,
  experimental: {
    serverSourceMaps: false,
  },
};

export default nextConfig;
