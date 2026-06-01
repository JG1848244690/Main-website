"use client";

import { useRef } from "react";
import { useLocale } from "next-intl";
import { gsap, useGSAP } from "@/lib/gsap";
import { profile } from "@/data/portfolio";

export default function Timeline() {
  const locale = useLocale();
  const isEn = locale === "en";
  const rootRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const items = Array.from(root.querySelectorAll<HTMLLIElement>(".timeline-item"));
      const line = root.querySelector<HTMLDivElement>(".timeline-line-fill");
      if (items.length === 0) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const reduce = (ctx.conditions as { reduceMotion: boolean }).reduceMotion;
          items.forEach((item, i) => {
            gsap.from(item, {
              x: i % 2 === 0 ? -30 : 30,
              autoAlpha: 0,
              duration: reduce ? 0 : 0.6,
              ease: "power3.out",
              scrollTrigger: { trigger: item, start: "top 85%", once: true },
            });
          });
          if (line) {
            gsap.fromTo(
              line,
              { scaleY: 0 },
              {
                scaleY: 1,
                ease: "none",
                transformOrigin: "top center",
                scrollTrigger: {
                  trigger: root,
                  start: "top 70%",
                  end: "bottom 60%",
                  scrub: reduce ? false : 1,
                },
              },
            );
          }
        },
      );
      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [locale] },
  );

  return (
    <section id="timeline" className="py-16 bg-base-200">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">
          {isEn ? "Journey" : "成长历程"}
        </h2>
        <div ref={rootRef} className="relative">
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-base-300">
            <div className="timeline-line-fill h-full w-full bg-primary origin-top" />
          </div>
          <ul className="space-y-8 md:space-y-0">
            {profile.timeline.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <li
                  key={item.id}
                  className={`timeline-item relative md:grid md:grid-cols-2 md:gap-8 ${
                    isLeft ? "" : "md:[&>*:first-child]:col-start-2"
                  }`}
                >
                  <div
                    className={`bg-base-100 rounded-box shadow p-5 ${
                      isLeft ? "md:text-right" : ""
                    }`}
                  >
                    <div className="font-mono italic text-sm opacity-60">
                      {isEn ? item.year.en : item.year.zh}
                    </div>
                    <div className="text-lg font-bold mt-1">
                      {isEn ? item.title.en : item.title.zh}
                    </div>
                    <p className="text-sm opacity-70 mt-1">
                      {isEn ? item.description.en : item.description.zh}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
