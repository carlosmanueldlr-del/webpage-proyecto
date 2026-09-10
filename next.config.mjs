// GITHUB_PAGES=true is set only by .github/workflows/deploy-pages.yml when
// building the static export for GitHub Pages. Local dev/build (npm run dev
// / npm run build) is unaffected.
const isGithubPages = process.env.GITHUB_PAGES === "true";

// This branch is a design-variant preview, deployed under a subpath of the
// main site instead of the root (see .github/workflows/deploy-pages.yml).
const basePath = isGithubPages ? "/webpage-proyecto/bold-editorial" : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Exposed to client code so hand-written asset paths (plain <img src="/images/...">,
  // which Next does NOT rewrite the way it rewrites next/link or next/image) can be
  // prefixed correctly when the site is served from a GitHub Pages subpath.
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  ...(isGithubPages
    ? {
        output: "export",
        basePath,
        assetPrefix: `${basePath}/`,
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;
