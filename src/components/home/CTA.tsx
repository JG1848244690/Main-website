"use client";

import { useRef } from "react";
import { useLocale } from "next-intl";
import { gsap, useGSAP } from "@/lib/gsap";
import { profile } from "@/data/portfolio";

interface Card {
  key: string;
  href: string;
  label: { zh: string; en: string };
  desc: { zh: string; en: string };
  icon: React.ReactNode;
  external: boolean;
  kind: "link" | "modal";
}

export default function CTA() {
  const locale = useLocale();
  const isEn = locale === "en";
  const rootRef = useRef<HTMLDivElement | null>(null);
  const qrRef = useRef<HTMLImageElement | null>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const cards = Array.from(root.querySelectorAll<HTMLElement>(".cta-card"));
      if (cards.length === 0) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const reduce = (ctx.conditions as { reduceMotion: boolean }).reduceMotion;
          gsap.set(cards, { y: 30, autoAlpha: 0 });
          gsap.to(cards, {
            y: 0,
            autoAlpha: 1,
            duration: reduce ? 0 : 0.6,
            stagger: reduce ? 0 : 0.08,
            ease: "back.out(1.4)",
            scrollTrigger: { trigger: root, start: "top 80%", once: true },
          });
        },
      );
      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [locale] },
  );

  const handleWechatClick = () => {
    const modal = document.getElementById("wechat-modal") as HTMLDialogElement | null;
    if (!modal) return;
    modal.showModal();
    requestAnimationFrame(() => {
      if (qrRef.current) {
        gsap.fromTo(
          qrRef.current,
          { scale: 0.7, autoAlpha: 0 },
          { scale: 1, autoAlpha: 1, duration: 0.4, ease: "back.out(1.7)" },
        );
      }
    });
  };

  const cards: Card[] = [
    {
      key: "email",
      href: profile.social.email,
      label: { zh: "Email", en: "Email" },
      desc: { zh: "随时联系", en: "Drop me a line" },
      icon: <EmailIcon />,
      external: true,
      kind: "link",
    },
    {
      key: "github",
      href: profile.social.github,
      label: { zh: "GitHub", en: "GitHub" },
      desc: { zh: "查看源码", en: "Browse my code" },
      icon: <GitHubIcon />,
      external: true,
      kind: "link",
    },
    {
      key: "wechat",
      href: "#",
      label: { zh: "微信公众号", en: "WeChat" },
      desc: { zh: "扫码关注", en: "Scan QR code" },
      icon: <WeChatIcon />,
      external: false,
      kind: "modal",
    },
    {
      key: "resume",
      href: profile.resumeUrl ?? "#",
      label: { zh: "简历 PDF", en: "Resume PDF" },
      desc: { zh: "下载简历", en: "Download" },
      icon: <DownloadIcon />,
      external: true,
      kind: "link",
    },
    {
      key: "blog",
      href: profile.social.blog ?? "#",
      label: { zh: "技术博客", en: "Tech Blog" },
      desc: { zh: "doc.kskbl.com.cn", en: "Knowledge base" },
      icon: <BookIcon />,
      external: true,
      kind: "link",
    },
    {
      key: "juejin",
      href: profile.social.juejin ?? "#",
      label: { zh: "掘金", en: "Juejin" },
      desc: { zh: "前端文章", en: "Frontend articles" },
      icon: <ArticleIcon />,
      external: true,
      kind: "link",
    },
  ];

  return (
    <section className="py-16 bg-neutral text-neutral-content">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-3">
          {isEn ? "Contact Me" : "联系我"}
        </h2>
        <p className="mb-8 opacity-90">
          {isEn
            ? "If you're interested in tech discussion or project collaboration, reach out via any channel below."
            : "如果你对技术交流或项目合作感兴趣，欢迎通过以下任意方式联系我。"}
        </p>
        <div
          ref={rootRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {cards.map((c) => (
            <CardButton key={c.key} card={c} isEn={isEn} onWechat={handleWechatClick} />
          ))}
        </div>
      </div>

      <dialog id="wechat-modal" className="modal">
        <div className="modal-box bg-base-100 text-base-content max-w-sm">
          <h3 className="text-lg font-bold text-center mb-3">
            {isEn ? "Scan WeChat QR" : "扫码关注微信公众号"}
          </h3>
          <div className="flex justify-center p-4 bg-base-200 rounded-box">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={qrRef}
              src={profile.social.wechatQrcode}
              alt="WeChat QR code"
              width={240}
              height={240}
              className="rounded-md"
            />
          </div>
          <p className="text-xs text-center opacity-60 mt-3">
            {isEn ? "Placeholder image · replace later" : "占位图 · 稍后替换"}
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">{isEn ? "Close" : "关闭"}</button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </section>
  );
}

function CardButton({
  card,
  isEn,
  onWechat,
}: {
  card: Card;
  isEn: boolean;
  onWechat: () => void;
}) {
  const label = isEn ? card.label.en : card.label.zh;
  const desc = isEn ? card.desc.en : card.desc.zh;
  const baseClass =
    "cta-card card bg-base-100 text-base-content hover:shadow-xl transition-shadow";

  if (card.kind === "modal") {
    return (
      <button
        type="button"
        onClick={onWechat}
        className={`${baseClass} text-left`}
      >
        <div className="card-body flex-row items-center gap-4">
          <div className="text-primary">{card.icon}</div>
          <div>
            <div className="card-title text-base">{label}</div>
            <div className="text-xs opacity-70">{desc}</div>
          </div>
        </div>
      </button>
    );
  }

  return (
    <a
      href={card.href}
      target={card.external ? "_blank" : undefined}
      rel={card.external ? "noopener noreferrer" : undefined}
      className={`${baseClass} text-left`}
    >
      <div className="card-body flex-row items-center gap-4">
        <div className="text-primary">{card.icon}</div>
        <div>
          <div className="card-title text-base">{label}</div>
          <div className="text-xs opacity-70">{desc}</div>
        </div>
      </div>
    </a>
  );
}

function EmailIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
    </svg>
  );
}

function WeChatIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8.69 11.52a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm6.62 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM12 4C6.48 4 2 7.58 2 12c0 1.96.92 3.75 2.45 5.11L4 19l2.36-.97A11.07 11.07 0 0 0 12 20c5.52 0 10-3.58 10-8s-4.48-8-10-8Z" opacity="0.4" />
      <circle cx="8.69" cy="10.52" r="1" />
      <circle cx="15.31" cy="10.52" r="1" />
      <path d="M16 14.13c-.45-.27-1.04-.4-1.66-.4-1.5 0-2.72.78-2.72 1.74 0 .96 1.22 1.74 2.72 1.74.62 0 1.21-.13 1.66-.4l1.32.4-.45-1.18c.39-.4.62-.92.62-1.5Z" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function ArticleIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="9" y1="13" x2="15" y2="13" />
      <line x1="9" y1="17" x2="15" y2="17" />
    </svg>
  );
}
