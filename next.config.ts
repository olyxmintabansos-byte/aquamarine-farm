import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/aquamarine-farm",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
