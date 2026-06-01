"use client";

import { useRef } from "react";
import { useLocale } from "next-intl";
import { gsap, useGSAP } from "@/lib/gsap";
import { profile } from "@/data/portfolio";

export default function ArticlePreview() {
  const locale = useLocale();
  const isEn = locale === "en";
  const rootRef = useRef<HTMLDivElement | null>(null);
  const preview = profile.wechatArticles.slice(0, 3);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const cards = Array.from(root.querySelectorAll<HTMLElement>(".article-card"));
      if (cards.length === 0) return;
      const mm = gsap.matchMedia();
      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const reduce = (ctx.conditions as { reduceMotion: boolean }).reduceMotion;
          gsap.set(cards, { y: 30, autoAlpha: 0 });
          gsap.to(cards, {
            y: 0,
            autoAlpha: 1,
            duration: reduce ? 0 : 0.6,
            stagger: reduce ? 0 : 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: root, start: "top 85%", once: true },
          });
        },
      );
      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [locale] },
  );

  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-wrap items-end justify-between gap-3 mb-8">
          <div>
            <h2 className="text-3xl font-bold">
              {isEn ? "Featured Articles" : "精选文章"}
            </h2>
            <p className="text-sm opacity-70 mt-1">
              {isEn
                ? "Latest from the WeChat blog"
                : "来自公众号的最新分享"}
            </p>
          </div>
          <a
            href={`/${locale}/blog`}
            className="btn btn-ghost btn-sm"
          >
            {isEn ? "All articles →" : "查看全部 →"}
          </a>
        </div>
        <div
          ref={rootRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {preview.map((a, i) => {
            const title = isEn ? a.title.en : a.title.zh;
            const excerpt =
              (isEn ? a.excerpt?.en : a.excerpt?.zh) ?? "";
            return (
              <a
                key={a.url}
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className="article-card card bg-base-200 hover:shadow-xl transition-shadow"
              >
                <div className="card-body">
                  <div className="text-xs opacity-60 font-mono">
                    {a.publishedAt} · {isEn ? "WeChat" : "公众号"} #{i + 1}
                  </div>
                  <h3 className="card-title text-base mt-1">{title}</h3>
                  {excerpt && (
                    <p className="text-sm opacity-70 line-clamp-2">{excerpt}</p>
                  )}
                  <div className="card-actions justify-end mt-2">
                    <span className="link link-primary text-sm">
                      {isEn ? "Read on WeChat ↗" : "前往公众号阅读 ↗"}
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
