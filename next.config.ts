import type { NextConfig } from "next";
const config: NextConfig = {
  output: process.env.STATIC_EXPORT === "true" ? "export" : undefined,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  trailingSlash: true,
  images: { unoptimized: true },
};
export default config;
