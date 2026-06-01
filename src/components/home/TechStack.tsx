"use client";

import { useRef } from "react";
import { useLocale } from "next-intl";
import { gsap, useGSAP } from "@/lib/gsap";
import { profile, type TechCategory } from "@/data/portfolio";

export default function TechStack() {
  const locale = useLocale();
  const isEn = locale === "en";
  const rootRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const cards = Array.from(root.querySelectorAll<HTMLElement>(".tech-card"));
      if (cards.length === 0) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const reduce = (ctx.conditions as { reduceMotion: boolean }).reduceMotion;
          cards.forEach((card) => {
            gsap.from(card, {
              y: 40,
              autoAlpha: 0,
              duration: reduce ? 0 : 0.7,
              ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 85%", once: true },
            });
            const badges = card.querySelectorAll<HTMLElement>(".tech-badge");
            if (badges.length > 0) {
              gsap.from(badges, {
                scale: 0,
                stagger: reduce ? 0 : 0.04,
                ease: "back.out(1.7)",
                duration: reduce ? 0 : 0.4,
                scrollTrigger: { trigger: card, start: "top 80%", once: true },
              });
            }
          });
        },
      );
      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [locale] },
  );

  return (
    <section id="tech" className="py-16 bg-base-200">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">
          {isEn ? "Tech Stack" : "技术栈"}
        </h2>
        <div
          ref={rootRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {profile.techCategories.map((cat) => (
            <TechCard key={cat.key} category={cat} isEn={isEn} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TechCard({ category, isEn }: { category: TechCategory; isEn: boolean }) {
  return (
    <div className="tech-card card bg-base-100 shadow hover:shadow-xl transition-shadow">
      <div className="card-body">
        <h3 className="card-title text-lg">
          {isEn ? category.title.en : category.title.zh}
        </h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {category.items.map((item) => (
            <span
              key={item}
              className={`tech-badge badge badge-lg ${category.badgeClass}`}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
