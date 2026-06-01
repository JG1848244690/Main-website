import { setRequestLocale } from "next-intl/server";
import AboutView from "./AboutView";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AboutView />;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const isEn = locale === "en";
  return {
    title: isEn ? "About · 序言-xy" : "关于我 · 序言-xy",
    description: isEn
      ? "About 序言-xy — frontend-first fullstack engineer, React / Next.js / Chrome extension"
      : "关于序言-xy — 主前端可全栈工程师，React / Next.js / Chrome 扩展",
  };
}
