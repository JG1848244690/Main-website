import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getProjectBySlug, profile } from "@/data/portfolio";
import ProjectDetail from "@/components/project/ProjectDetail";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return profile.projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  return <ProjectDetail project={project} />;
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  const isEn = locale === "en";
  const title = isEn ? project.title.en : project.title.zh;
  const description = isEn ? project.description.en : project.description.zh;
  return {
    title: `${title} · 序言-xy`,
    description,
    openGraph: {
      title,
      description,
      images: [project.thumbnail],
    },
  };
}
