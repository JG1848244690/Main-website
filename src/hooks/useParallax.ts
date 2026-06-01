"use client";

import { useRef, type RefObject } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export interface ParallaxOptions {
  yPercent?: number;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  dependencies?: unknown[];
}

export function useParallax<T extends HTMLElement = HTMLElement>(
  options: ParallaxOptions = {},
): RefObject<T | null> {
  const ref = useRef<T | null>(null);
  const {
    yPercent = -15,
    start = "top top",
    end = "bottom top",
    scrub = 1,
    dependencies = [],
  } = options;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const c = ctx.conditions as { isDesktop: boolean; reduceMotion: boolean };
          if (!c.isDesktop || c.reduceMotion) return;
          gsap.to(el, {
            yPercent,
            ease: "none",
            scrollTrigger: { trigger: el, start, end, scrub },
          });
        },
      );
      return () => mm.revert();
    },
    { scope: ref, dependencies },
  );

  return ref;
}
