"use client";

import { useRef } from "react";
import { useLocale } from "next-intl";
import { gsap, useGSAP } from "@/lib/gsap";
import { profile } from "@/data/portfolio";

export default function Expertise() {
  const locale = useLocale();
  const isEn = locale === "en";
  const rootRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const cards = Array.from(root.querySelectorAll<HTMLElement>(".expertise-card"));
      if (cards.length === 0) return;
      const mm = gsap.matchMedia();
      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const reduce = (ctx.conditions as { reduceMotion: boolean }).reduceMotion;
          gsap.set(cards, { y: 30, autoAlpha: 0, scale: 0.9 });
          gsap.to(cards, {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            duration: reduce ? 0 : 0.6,
            stagger: reduce ? 0 : 0.08,
            ease: "back.out(1.4)",
            scrollTrigger: { trigger: root, start: "top 85%", once: true },
          });
        },
      );
      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [locale] },
  );

  return (
    <section className="py-16 bg-base-200">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-3">
          {isEn ? "What I Can Do" : "我能做"}
        </h2>
        <p className="text-center opacity-70 mb-10 max-w-2xl mx-auto">
          {isEn
            ? "Six core areas I can deliver end-to-end, with hands-on production experience."
            : "六个端到端能力方向，均有生产级落地经验。"}
        </p>
        <div
          ref={rootRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {profile.expertise.map((e) => (
            <div
              key={e.title.zh}
              className="expertise-card card bg-base-100 shadow hover:shadow-lg transition-shadow"
            >
              <div className="card-body flex-row items-start gap-4">
                <div className="text-4xl">{e.icon}</div>
                <div>
                  <h3 className="card-title text-base">
                    {isEn ? e.title.en : e.title.zh}
                  </h3>
                  <p className="text-sm opacity-70 mt-1">
                    {isEn ? e.description.en : e.description.zh}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
