import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "sardor-birinchi-project-api.crmuz.uz",
      },
      {
        protocol: "https",
        hostname: "*.crmuz.uz",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
