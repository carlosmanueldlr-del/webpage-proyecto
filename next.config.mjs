// GITHUB_PAGES=true is set only by .github/workflows/deploy-pages.yml when
// building the static export for GitHub Pages. Local dev/build (npm run dev
// / npm run build) is unaffected.
const isGithubPages = process.env.GITHUB_PAGES === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  ...(isGithubPages
    ? {
        output: "export",
        basePath: "/webpage-proyecto",
        assetPrefix: "/webpage-proyecto/",
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;
