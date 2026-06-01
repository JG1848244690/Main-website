import { setRequestLocale } from "next-intl/server";
import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/StatsBar";
import ArticlePreview from "@/components/home/ArticlePreview";
import TechStack from "@/components/home/TechStack";
import Expertise from "@/components/home/Expertise";
import ProjectGrid from "@/components/home/ProjectGrid";
import Timeline from "@/components/home/Timeline";
import CTA from "@/components/home/CTA";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <StatsBar />
      <ArticlePreview />
      <TechStack />
      <Expertise />
      <ProjectGrid />
      <Timeline />
      <CTA />
    </>
  );
}
