"use client";

import { useRef } from "react";
import { useLocale } from "next-intl";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { profile } from "@/data/portfolio";

export default function StatsBar() {
  const locale = useLocale();
  const isEn = locale === "en";
  const rootRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const cards = Array.from(root.querySelectorAll<HTMLElement>(".stat"));
      if (cards.length === 0) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const reduce = (ctx.conditions as { reduceMotion: boolean }).reduceMotion;
          gsap.set(cards, { y: 24, autoAlpha: 0 });
          ScrollTrigger.batch(cards, {
            start: "top 80%",
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, {
                y: 0,
                autoAlpha: 1,
                duration: reduce ? 0 : 0.6,
                stagger: reduce ? 0 : 0.1,
                ease: "back.out(1.4)",
                overwrite: true,
              }),
          });
        },
      );
      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [locale] },
  );

  return (
    <section className="py-10 md:py-14 bg-base-200">
      <div className="max-w-5xl mx-auto px-4">
        <div
          ref={rootRef}
          className="stats stats-vertical lg:stats-horizontal shadow w-full bg-base-100"
        >
          {profile.stats.map((s) => (
            <div key={s.label.zh} className="stat">
              <div className="stat-value text-primary text-2xl md:text-3xl">
                {s.value}
              </div>
              <div className="stat-desc text-sm md:text-base">
                {isEn ? s.label.en : s.label.zh}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
