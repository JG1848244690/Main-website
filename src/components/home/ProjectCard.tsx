"use client";

import { useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { gsap, useGSAP } from "@/lib/gsap";
import { type Project } from "@/data/portfolio";

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  const locale = useLocale();
  const isEn = locale === "en";
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const el = cardRef.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const reduce = (ctx.conditions as { reduceMotion: boolean }).reduceMotion;
          gsap.from(el, {
            y: 50,
            autoAlpha: 0,
            duration: reduce ? 0 : 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          });
        },
      );

      const onEnter = () =>
        gsap.to(el, { y: -8, scale: 1.02, duration: 0.3, ease: "power2.out" });
      const onLeave = () =>
        gsap.to(el, { y: 0, scale: 1, duration: 0.3, ease: "power2.out" });
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);

      return () => {
        mm.revert();
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: cardRef, dependencies: [project.slug] },
  );

  const onActivate = () => router.push(`/${locale}/projects/${project.slug}`);

  return (
    <div
      ref={cardRef}
      role="link"
      tabIndex={0}
      onClick={onActivate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onActivate();
        }
      }}
      className="project-card card lg:card-side bg-base-100 shadow-xl hover:shadow-2xl cursor-pointer overflow-hidden"
    >
      <figure className="lg:w-2/5 relative aspect-video lg:aspect-auto bg-base-300">
        <Image
          src={project.thumbnail}
          alt={isEn ? project.title.en : project.title.zh}
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover"
        />
      </figure>
      <div className="card-body">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="card-title text-lg">
            {isEn ? project.title.en : project.title.zh}
          </h3>
          {project.badge && (
            <span className={`badge ${project.badge.class}`}>
              {isEn ? project.badge.label.en : project.badge.label.zh}
            </span>
          )}
        </div>
        <p className="opacity-70 text-sm">
          {isEn ? project.description.en : project.description.zh}
        </p>
        <ul className="mt-2 space-y-1 text-sm">
          {project.highlights[isEn ? "en" : "zh"].slice(0, 3).map((h) => (
            <li key={h} className="flex items-start gap-2">
              <span className="text-primary mt-0.5">▸</span>
              <span className="opacity-80">{h}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {project.tags.slice(0, 5).map((tag) => (
            <span key={tag} className="badge badge-outline badge-sm">
              {tag}
            </span>
          ))}
          {project.tags.length > 5 && (
            <span className="badge badge-ghost badge-sm">
              +{project.tags.length - 5}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
