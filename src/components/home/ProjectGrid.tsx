"use client";

import { useLocale } from "next-intl";
import { profile } from "@/data/portfolio";
import ProjectCard from "./ProjectCard";

export default function ProjectGrid() {
  const locale = useLocale();
  const isEn = locale === "en";

  return (
    <section id="projects" className="py-16 bg-base-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">
          {isEn ? "Projects" : "项目展示"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {profile.projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
