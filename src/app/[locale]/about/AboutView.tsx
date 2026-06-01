"use client";

import { useRef } from "react";
import { useLocale } from "next-intl";
import { gsap, useGSAP } from "@/lib/gsap";
import { profile } from "@/data/portfolio";

export default function AboutView() {
  const locale = useLocale();
  const isEn = locale === "en";
  const rootRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const blocks = Array.from(root.querySelectorAll<HTMLElement>(".about-block"));
      if (blocks.length === 0) return;
      const mm = gsap.matchMedia();
      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const reduce = (ctx.conditions as { reduceMotion: boolean }).reduceMotion;
          gsap.set(blocks, { y: 30, autoAlpha: 0 });
          gsap.to(blocks, {
            y: 0,
            autoAlpha: 1,
            duration: reduce ? 0 : 0.6,
            stagger: reduce ? 0 : 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: root, start: "top 80%", once: true },
          });
        },
      );
      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [locale] },
  );

  return (
    <div ref={rootRef} className="max-w-3xl mx-auto px-4 py-16 space-y-10">
      <header className="text-center about-block">
        <h1 className="text-4xl md:text-5xl font-bold">
          {isEn ? "About Me" : "关于我"}
        </h1>
        <p className="opacity-70 mt-3">
          {isEn ? profile.subtitle.en : profile.subtitle.zh}
        </p>
      </header>

      <section className="about-block card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="card-title">
            {isEn ? "Who I am" : "我是谁"}
          </h2>
          <p className="opacity-80 leading-relaxed">
            {isEn
              ? "I'm 序言-xy, a frontend-first fullstack engineer based in China. I primarily work with React 19, Next.js 16, and the modern web stack, with hands-on experience shipping a Chrome Web Store featured extension (Tiktools) and a full-stack learning platform (Athena)."
              : "我是序言-xy，一名主前端·可全栈工程师。主用 React 19、Next.js 16 等现代前端栈，曾从 0 到 1 主导 Athena 学习平台与 Chrome 商店精选插件 Tiktools。"}
          </p>
        </div>
      </section>

      <section className="about-block card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="card-title">
            {isEn ? "Education" : "教育背景"}
          </h2>
          <p className="opacity-80">
            {isEn
              ? "B.Sc. Software Engineering, North University of China (2021–2025)."
              : "软件工程本科，中北大学（2021–2025）。"}
          </p>
        </div>
      </section>

      <section className="about-block card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="card-title">
            {isEn ? "What I value" : "价值观"}
          </h2>
          <ul className="list-disc list-inside opacity-80 space-y-1">
            <li>{isEn ? "Ship working software, iterate fast" : "先跑起来，再迭代"}</li>
            <li>{isEn ? "Read the docs before asking" : "读文档优先"}</li>
            <li>{isEn ? "Tests and metrics drive decisions" : "测试与数据驱动决策"}</li>
            <li>{isEn ? "Share what you learn" : "分享所学"}</li>
          </ul>
        </div>
      </section>

      <section className="about-block card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="card-title">
            {isEn ? "Goal" : "职业目标"}
          </h2>
          <p className="opacity-80">
            {isEn
              ? "Build tools that help people, contribute to open-source, and grow into a tech lead who can shape product and engineering."
              : "打造真正解决问题的产品；持续参与开源；成长为能同时影响产品与工程的技术负责人。"}
          </p>
        </div>
      </section>
    </div>
  );
}
