"use client";

import { useRef, type RefObject } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export interface SplitTextOptions {
  y?: number;
  stagger?: number;
  duration?: number;
  delay?: number;
  dependencies?: unknown[];
}

const splitLines = (el: HTMLElement): HTMLSpanElement[] => {
  const original = el.textContent ?? "";
  el.setAttribute("data-split-original", original);
  el.textContent = "";
  const lines = original.split(/(\r?\n)/);
  const lineEls: HTMLSpanElement[] = [];
  lines.forEach((segment) => {
    if (segment === "\n" || segment === "\r\n") {
      el.appendChild(document.createElement("br"));
      return;
    }
    if (segment === "") return;
    const span = document.createElement("span");
    span.className = "split-line inline-block overflow-hidden align-bottom";
    const inner = document.createElement("span");
    inner.className = "split-line-inner inline-block";
    inner.textContent = segment;
    span.appendChild(inner);
    el.appendChild(span);
    lineEls.push(span);
  });
  return lineEls;
};

const restoreText = (el: HTMLElement) => {
  const original = el.getAttribute("data-split-original");
  if (original == null) return;
  el.textContent = original;
  el.removeAttribute("data-split-original");
};

export function useSplitText<T extends HTMLElement = HTMLElement>(
  options: SplitTextOptions = {},
): RefObject<T | null> {
  const ref = useRef<T | null>(null);
  const {
    y = 40,
    stagger = 0.06,
    duration = 0.7,
    delay = 0,
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
          const lineEls = splitLines(el);
          const inners = lineEls.map((s) => s.firstElementChild).filter(Boolean) as HTMLElement[];
          if (reduce) {
            gsap.set(inners, { y: 0 });
            return;
          }
          gsap.set(inners, { y });
          gsap.to(inners, {
            y: 0,
            duration,
            delay,
            stagger,
            ease: "power3.out",
          });
        },
      );
      return () => {
        mm.revert();
        restoreText(el);
      };
    },
    { scope: ref, dependencies },
  );

  return ref;
}
