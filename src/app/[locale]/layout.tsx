import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { locales, type Locale } from "@/i18n";
import ProgressProvider from "@/components/providers/ProgressProvider";
import "../globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://marvellobrand.uz";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "" });

  const alternates: Record<string, string> = {};
  locales.forEach((l) => {
    alternates[l] = `${siteUrl}/${l}`;
  });

  return {
    title: {
      default: t("meta_home_title"),
      template: `%s | Marvello Mebel`,
    },
    description: t("meta_home_desc"),
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: alternates,
    },
    openGraph: {
      type: "website",
      locale:
        locale === "uz" ? "uz_UZ" : locale === "ru" ? "ru_RU" : "en_US",
      url: `${siteUrl}/${locale}`,
      siteName: "Marvello Mebel",
      title: t("meta_home_title"),
      description: t("meta_home_desc"),
      images: [
        {
          url: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&q=80",
          width: 1200,
          height: 630,
          alt: "Marvello Mebel – Premium Furniture",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("meta_home_title"),
      description: t("meta_home_desc"),
      images: [
        "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&q=80",
      ],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    icons: {
      icon: "/favicon.ico",
    },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as Locale)) notFound();

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Jost:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        {locales.map((l) => (
          <link
            key={l}
            rel="alternate"
            hrefLang={l}
            href={`${siteUrl}/${l}`}
          />
        ))}
        <link rel="alternate" hrefLang="x-default" href={`${siteUrl}/uz`} />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ProgressProvider>{children}</ProgressProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
