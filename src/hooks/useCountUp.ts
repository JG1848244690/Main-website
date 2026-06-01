"use client";

import { useRef, type RefObject } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export interface CountUpOptions {
  end: number;
  duration?: number;
  start?: string;
  once?: boolean;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  dependencies?: unknown[];
}

export function useCountUp<T extends HTMLElement = HTMLElement>(
  options: CountUpOptions,
): RefObject<T | null> {
  const ref = useRef<T | null>(null);
  const {
    end,
    duration = 1.2,
    start = "top 80%",
    once = true,
    suffix = "",
    prefix = "",
    decimals = 0,
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
        () => {
          const proxy = { val: 0 };
          const obj = { val: 0 };
          const factor = Math.pow(10, decimals);
          gsap.to(obj, {
            val: end,
            duration,
            ease: "power2.out",
            onUpdate: () => {
              const v = Math.round(obj.val * factor) / factor;
              el.textContent = `${prefix}${v}${suffix}`;
            },
            scrollTrigger: {
              trigger: el,
              start,
              once,
            },
          });
          void proxy;
        },
      );
      return () => mm.revert();
    },
    { scope: ref, dependencies },
  );

  return ref;
}
