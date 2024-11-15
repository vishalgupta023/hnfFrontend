import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  skipTrailingSlashRedirect: true,
  trailingSlashes: undefined ,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
