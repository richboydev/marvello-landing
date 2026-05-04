import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { locales, type Locale } from "@/i18n";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import StatsBar from "@/components/sections/StatsBar";
import CategoriesSection from "@/components/sections/CategoriesSection";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import AboutPreview from "@/components/sections/AboutPreview";
import ProcessSection from "@/components/sections/ProcessSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import FAQSection from "@/components/sections/FAQSection";
import RevealInit from "@/components/ui/RevealInit";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://marvellobrand.uz";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const t = await getTranslations({ locale });

  const alternateLanguages: Record<string, string> = {};
  locales.forEach((l) => { alternateLanguages[l] = `${siteUrl}/${l}`; });

  return {
    title: t("meta_home_title"),
    description: t("meta_home_desc"),
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: alternateLanguages,
    },
    openGraph: {
      title: t("meta_home_title"),
      description: t("meta_home_desc"),
      url: `${siteUrl}/${locale}`,
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
      title: t("meta_home_title"),
      description: t("meta_home_desc"),
    },
  };
}

export default function HomePage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  setRequestLocale(locale);
  return (
    <>
      <RevealInit />
      <Header />
      <main>
        <HeroSection />
        <StatsBar />
        <CategoriesSection />
        <FeaturedProducts />
        <AboutPreview />
        <ProcessSection />
        <TestimonialsSection />
        <ServicesSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
