"use client";

import { useRef, type RefObject } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export type RevealDirection = "up" | "down" | "left" | "right" | "none";

export interface RevealOptions {
  y?: number;
  x?: number;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  start?: string;
  once?: boolean;
  dependencies?: unknown[];
}

const dirOffset = (dir: RevealDirection, y: number, x: number) => {
  switch (dir) {
    case "up":
      return { y, x: 0 };
    case "down":
      return { y: -y, x: 0 };
    case "left":
      return { y: 0, x };
    case "right":
      return { y: 0, x: -x };
    default:
      return { y: 0, x: 0 };
  }
};

export function useReveal<T extends HTMLElement = HTMLElement>(
  options: RevealOptions = {},
): RefObject<T | null> {
  const ref = useRef<T | null>(null);
  const {
    y = 30,
    x = 30,
    direction = "up",
    delay = 0,
    duration = 0.6,
    start = "top 85%",
    once = true,
    dependencies = [],
  } = options;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const reduce = (ctx.conditions as { reduceMotion: boolean }).reduceMotion;
          const offset = dirOffset(direction, y, x);
          gsap.from(el, {
            autoAlpha: 0,
            y: offset.y,
            x: offset.x,
            duration: reduce ? 0 : duration,
            delay: reduce ? 0 : delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start,
              once,
            },
          });
        },
      );
      return () => mm.revert();
    },
    { scope: ref, dependencies },
  );

  return ref;
}
