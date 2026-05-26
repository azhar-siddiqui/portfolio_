/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Mermaid v11 ships ESM with internal dynamic imports for diagram parsers.
  // Letting Next/Turbopack transpile the package guarantees those chunks
  // resolve in production where module graph layout differs from dev.
  transpilePackages: ["mermaid"],
};

if(process.env.NODE_ENV === "development") {
  nextConfig.allowedDevOrigins = [
    "192.168.1.35"
  ]
}

export default nextConfig;
