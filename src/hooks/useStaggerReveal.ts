"use client";

import { useRef, type RefObject } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export interface StaggerRevealOptions {
  selector: string;
  y?: number;
  x?: number;
  stagger?: number;
  duration?: number;
  start?: string;
  once?: boolean;
  ease?: string;
  dependencies?: unknown[];
}

export function useStaggerReveal<T extends HTMLElement = HTMLElement>(
  options: StaggerRevealOptions,
): RefObject<T | null> {
  const ref = useRef<T | null>(null);
  const {
    selector,
    y = 30,
    x = 0,
    stagger = 0.1,
    duration = 0.6,
    start = "top 85%",
    once = true,
    ease = "power3.out",
    dependencies = [],
  } = options;

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const targets = root.querySelectorAll(selector);
      if (targets.length === 0) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          isMobile: "(max-width: 767px)",
        },
        (ctx) => {
          const c = ctx.conditions as { reduceMotion: boolean; isMobile: boolean };
          const dur = c.reduceMotion ? 0 : c.isMobile ? Math.min(duration, 0.5) : duration;
          const stg = c.reduceMotion ? 0 : stagger;
          ScrollTrigger.batch(Array.from(targets), {
            start,
            once,
            onEnter: (batch) =>
              gsap.to(batch, {
                autoAlpha: 1,
                y: 0,
                x: 0,
                duration: dur,
                stagger: stg,
                ease,
                overwrite: true,
              }),
          });
          gsap.set(targets, { autoAlpha: 0, y, x });
        },
      );
      return () => mm.revert();
    },
    { scope: ref, dependencies },
  );

  return ref;
}
