"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { gsap, useGSAP } from "@/lib/gsap";
import { useParallax } from "@/hooks/useParallax";
import { useSplitText } from "@/hooks/useSplitText";
import type { Project } from "@/data/portfolio";

interface Props {
  project: Project;
}

export default function ProjectDetail({ project }: Props) {
  const locale = useLocale();
  const isEn = locale === "en";
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const coverRef = useParallax<HTMLDivElement>({ yPercent: -20 });
  const titleRef = useSplitText<HTMLHeadingElement>({ y: 50, stagger: 0.06, duration: 0.8 });

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const mm = gsap.matchMedia();
      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        () => {
          const sub = root.querySelector(".detail-sub");
          const meta = root.querySelector(".detail-meta");
          const cta = root.querySelector(".detail-cta");
          if (sub) gsap.from(sub, { y: 20, autoAlpha: 0, duration: 0.6, delay: 0.4 });
          if (meta) gsap.from(meta, { y: 20, autoAlpha: 0, duration: 0.6, delay: 0.6 });
          if (cta) gsap.from(cta, { y: 20, autoAlpha: 0, duration: 0.6, delay: 0.8 });

          const bullets = root.querySelectorAll<HTMLElement>(".detail-bullet");
          if (bullets.length > 0) {
            gsap.from(bullets, {
              x: -20,
              autoAlpha: 0,
              duration: 0.5,
              stagger: 0.08,
              ease: "power3.out",
              scrollTrigger: { trigger: bullets[0], start: "top 85%", once: true },
            });
          }

          const stats = root.querySelectorAll<HTMLElement>(".detail-stat");
          if (stats.length > 0) {
            gsap.from(stats, {
              scale: 0.85,
              autoAlpha: 0,
              duration: 0.5,
              stagger: 0.1,
              ease: "back.out(1.7)",
              scrollTrigger: { trigger: stats[0]?.parentElement ?? undefined, start: "top 85%", once: true },
            });
          }

          const features = root.querySelectorAll<HTMLElement>(".feature-card");
          if (features.length > 0) {
            gsap.from(features, {
              y: 30,
              autoAlpha: 0,
              duration: 0.5,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: { trigger: features[0], start: "top 85%", once: true },
            });
          }

          const shots = root.querySelectorAll<HTMLElement>(".shot-item");
          if (shots.length > 0) {
            gsap.from(shots, {
              y: 30,
              autoAlpha: 0,
              duration: 0.5,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: { trigger: shots[0], start: "top 85%", once: true },
            });
          }
        },
      );
      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [project.slug, locale] },
  );

  return (
    <div ref={rootRef} className="bg-base-100">
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <div ref={coverRef} className="absolute inset-0 -z-0 will-change-transform">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.screenshots[0]}
            alt={isEn ? project.title.en : project.title.zh}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-base-300/40 via-base-300/70 to-base-300" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto h-full flex flex-col justify-center px-4">
          <button
            type="button"
            onClick={() => router.push(`/${locale}#projects`)}
            className="btn btn-ghost btn-sm self-start mb-4"
          >
            ← {isEn ? "Back" : "返回"}
          </button>
          <div className="flex flex-wrap items-center gap-2 mb-2 detail-sub">
            {project.badge && (
              <span className={`badge ${project.badge.class}`}>
                {isEn ? project.badge.label.en : project.badge.label.zh}
              </span>
            )}
            {project.tags.slice(0, 4).map((t) => (
              <span key={t} className="badge badge-outline">
                {t}
              </span>
            ))}
          </div>
          <h1
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold text-base-content"
          >
            {isEn ? project.title.en : project.title.zh}
          </h1>
          <p className="detail-meta text-lg opacity-80 mt-3 max-w-2xl text-base-content">
            {isEn ? project.description.en : project.description.zh}
          </p>
          <div className="detail-cta flex flex-wrap gap-2 mt-5">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                {isEn ? "View Source" : "查看源码"}
              </a>
            )}
            {project.links.chromeStore && (
              <a
                href={project.links.chromeStore}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                {isEn ? "Chrome Store" : "Chrome 商店"}
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">
              {isEn ? "Highlights" : "技术亮点"}
            </h2>
            <ul className="space-y-2">
              {project.highlights[isEn ? "en" : "zh"].map((h) => (
                <li
                  key={h}
                  className="detail-bullet flex items-start gap-3 p-3 rounded-box bg-base-200"
                >
                  <span className="text-primary text-xl leading-none">✓</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">
              {isEn ? "Stats" : "成果数据"}
            </h2>
            {project.stats && project.stats.length > 0 ? (
              <div className="stats stats-vertical w-full bg-base-200">
                {project.stats.map((s) => (
                  <div key={s.label.zh} className="stat">
                    <div className="stat-title">
                      {isEn ? s.label.en : s.label.zh}
                    </div>
                    <div className="stat-value text-primary detail-stat">
                      {s.value}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="opacity-60 text-sm">—</p>
            )}
          </div>
        </div>
      </section>

      <section className="py-12 bg-base-200">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">
            {isEn ? "Features" : "功能模块"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {project.features.map((f) => (
              <div
                key={f.title.zh}
                className="feature-card card bg-base-100 shadow"
              >
                <div className="card-body">
                  <div className="text-3xl mb-2">{f.icon}</div>
                  <h3 className="card-title text-base">
                    {isEn ? f.title.en : f.title.zh}
                  </h3>
                  <p className="text-sm opacity-70">
                    {isEn ? f.description.en : f.description.zh}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {project.screenshots.length > 0 && (
        <section className="py-12">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 text-center">
              {isEn ? "Screenshots" : "截图"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.screenshots.map((src, i) => (
                <figure
                  key={src + i}
                  className="shot-item rounded-box overflow-hidden bg-base-200"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`${isEn ? project.title.en : project.title.zh} screenshot ${i + 1}`}
                    className="w-full h-auto"
                  />
                </figure>
              ))}
            </div>
            <p className="text-center text-xs opacity-50 mt-4">
              {isEn
                ? "Placeholder images · replace when assets are ready"
                : "占位图 · 素材到位后替换"}
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
