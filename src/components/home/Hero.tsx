"use client";

import { useRef } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { useGSAP, gsap } from "@/lib/gsap";
import { useParallax } from "@/hooks/useParallax";
import { useSplitText } from "@/hooks/useSplitText";
import { profile } from "@/data/portfolio";

export default function Hero() {
  const locale = useLocale();
  const isEn = locale === "en";
  const rootRef = useRef<HTMLElement | null>(null);
  const bgRef = useParallax<HTMLDivElement>({ yPercent: -15 });
  const titleRef = useSplitText<HTMLHeadingElement>({ y: 40, stagger: 0.08, duration: 0.8 });
  const arrowRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const mm = gsap.matchMedia();
      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const reduce = (ctx.conditions as { reduceMotion: boolean }).reduceMotion;
          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
          tl.from(".hero-sub", {
            y: 20,
            autoAlpha: 0,
            duration: reduce ? 0 : 0.6,
            delay: reduce ? 0 : 0.4,
          })
            .from(".hero-desc", {
              y: 20,
              autoAlpha: 0,
              duration: reduce ? 0 : 0.6,
            }, "-=0.4")
            .from(".hero-cta", {
              y: 30,
              autoAlpha: 0,
              stagger: reduce ? 0 : 0.08,
              duration: reduce ? 0 : 0.6,
            }, "-=0.4");

          if (!reduce) {
            gsap.to(arrowRef.current, {
              y: 8,
              duration: 1.2,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
            });
          }
        },
      );
      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [locale] },
  );

  return (
    <section
      ref={rootRef}
      id="hero"
      className="hero min-h-screen relative overflow-hidden"
    >
      <div ref={bgRef} className="absolute inset-0 -z-0 will-change-transform">
        <Image
          src="/hero-bg.jpg"
          alt="Hero background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-base-300/40 via-base-300/70 to-base-300/95" />
      </div>
      <div className="hero-content text-center relative z-10 max-w-2xl px-4">
        <div className="flex flex-col items-center">
          <h1
            ref={titleRef}
            className="text-5xl md:text-6xl font-bold mb-5 text-base-content leading-tight"
          >
            {isEn ? profile.name.en : profile.name.zh}
          </h1>
          <p className="hero-sub text-xl md:text-2xl opacity-90 mb-3 text-base-content">
            {isEn ? profile.subtitle.en : profile.subtitle.zh}
          </p>
          <p className="hero-desc text-base md:text-lg opacity-80 max-w-xl mb-8 text-base-content">
            {isEn ? profile.description.en : profile.description.zh}
          </p>
          <div className="hero-cta flex flex-wrap justify-center gap-3">
            <a className="btn btn-primary" href="#projects">
              {isEn ? "View Projects" : "查看项目"}
            </a>
            <a
              className="btn btn-outline btn-primary"
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {isEn ? "Download Resume" : "下载简历"}
            </a>
          </div>
        </div>
      </div>
      <div
        ref={arrowRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 opacity-70"
        aria-hidden="true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </section>
  );
}
