"use client";

import { useRef } from "react";
import { useLocale } from "next-intl";
import { gsap, useGSAP } from "@/lib/gsap";
import { profile } from "@/data/portfolio";

export default function BlogView() {
  const locale = useLocale();
  const isEn = locale === "en";
  const rootRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const cards = Array.from(root.querySelectorAll<HTMLElement>(".blog-item"));
      if (cards.length === 0) return;
      const mm = gsap.matchMedia();
      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const reduce = (ctx.conditions as { reduceMotion: boolean }).reduceMotion;
          gsap.set(cards, { y: 20, autoAlpha: 0 });
          gsap.to(cards, {
            y: 0,
            autoAlpha: 1,
            duration: reduce ? 0 : 0.5,
            stagger: reduce ? 0 : 0.06,
            ease: "power3.out",
            scrollTrigger: { trigger: root, start: "top 85%", once: true },
          });
        },
      );
      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [locale] },
  );

  const articles = [...profile.wechatArticles].sort((a, b) =>
    a.publishedAt < b.publishedAt ? 1 : -1,
  );

  return (
    <div ref={rootRef} className="max-w-3xl mx-auto px-4 py-16">
      <header className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold">
          {isEn ? "Tech Blog" : "技术博客"}
        </h1>
        <p className="opacity-70 mt-3">
          {isEn
            ? "Articles from the WeChat public account · sorted newest first"
            : "微信公众号文章 · 按时间倒序"}
        </p>
      </header>
      <ul className="space-y-4">
        {articles.map((a) => {
          const title = isEn ? a.title.en : a.title.zh;
          const excerpt = (isEn ? a.excerpt?.en : a.excerpt?.zh) ?? "";
          return (
            <li key={a.url}>
              <a
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className="blog-item card bg-base-100 shadow hover:shadow-xl transition-shadow block"
              >
                <div className="card-body">
                  <div className="text-xs opacity-60 font-mono">
                    {a.publishedAt} · {isEn ? "WeChat" : "公众号"}
                  </div>
                  <h2 className="card-title text-lg mt-1">{title}</h2>
                  {excerpt && (
                    <p className="opacity-70 text-sm">{excerpt}</p>
                  )}
                  <div className="card-actions justify-end mt-2">
                    <span className="link link-primary text-sm">
                      {isEn ? "Read on WeChat ↗" : "前往公众号阅读 ↗"}
                    </span>
                  </div>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
