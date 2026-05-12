import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // GitHub Pages: /tech-notes/ サブパス
  basePath: process.env.NODE_ENV === "production" ? "/tech-notes" : "",
  trailingSlash: true,
  images: { unoptimized: true },
  transpilePackages: ["@tech-notes/content"],
};

export default nextConfig;
