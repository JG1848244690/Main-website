export type Locale = "zh" | "en";

export type LocalizedString = { zh: string; en: string };
export type LocalizedList = { zh: string[]; en: string[] };
export type OptionalLocalizedString = { zh?: string; en?: string };

export type DaisyBadgeClass =
  | "badge-primary"
  | "badge-secondary"
  | "badge-accent"
  | "badge-info"
  | "badge-success"
  | "badge-warning";

export interface ProjectBadge {
  label: LocalizedString;
  class: DaisyBadgeClass;
}

export interface ProjectFeature {
  icon: string;
  title: LocalizedString;
  description: LocalizedString;
}

export interface ProjectStat {
  label: LocalizedString;
  value: string;
}

export interface ProjectLinks {
  github?: string;
  chromeStore?: string;
  download?: string;
}

export interface Project {
  slug: string;
  title: LocalizedString;
  description: LocalizedString;
  highlights: LocalizedList;
  tags: string[];
  badge?: ProjectBadge;
  thumbnail: string;
  screenshots: string[];
  links: ProjectLinks;
  stats?: ProjectStat[];
  features: ProjectFeature[];
}

export interface TechCategory {
  key: string;
  title: LocalizedString;
  badgeClass: DaisyBadgeClass;
  items: string[];
}

export interface StatsItem {
  value: string;
  label: LocalizedString;
}

export interface TimelineItem {
  id: string;
  year: LocalizedString;
  title: LocalizedString;
  description: LocalizedString;
  type: "work" | "project" | "edu";
}

export interface WechatArticle {
  title: LocalizedString;
  excerpt: OptionalLocalizedString;
  publishedAt: string;
  url: string;
}

export interface SocialLinks {
  email: string;
  github: string;
  juejin?: string;
  csdn?: string;
  twitter?: string;
  blog?: string;
  wechatQrcode: string;
}

export interface PortfolioProfile {
  name: LocalizedString;
  subtitle: LocalizedString;
  description: LocalizedString;
  resumeUrl?: string;
  social: SocialLinks;
  stats: StatsItem[];
  techCategories: TechCategory[];
  projects: Project[];
  timeline: TimelineItem[];
  wechatArticles: WechatArticle[];
  expertise: ExpertiseItem[];
}

export interface ExpertiseItem {
  icon: string;
  title: LocalizedString;
  description: LocalizedString;
}

const t = (zh: string, en: string): LocalizedString => ({ zh, en });

export const profile: PortfolioProfile = {
  name: t("序言-xy", "Omen"),
  subtitle: t("主前端 · 可全栈工程师", "Frontend-first · Fullstack capable engineer"),
  description: t(
    "主用 React 19 / Next.js 16，兼顾 Node 后端与浏览器扩展开发",
    "Mainly React 19 / Next.js 16, with Node backend & browser extension chops",
  ),
  resumeUrl: "https://example.com/resume.pdf",
  social: {
    email: "mailto:dxy1848244690@gmail.com",
    github: "https://github.com/JG1848244690/",
    juejin: "https://juejin.cn/user/placeholder",
    csdn: "https://blog.csdn.net/placeholder",
    blog: "https://doc.kskbl.com.cn",
    twitter: "https://twitter.com/placeholder",
    wechatQrcode: "/qrcode-placeholder.svg",
  },
  stats: [
    { value: "200+", label: t("Chrome 安装量", "Chrome installs") },
    { value: "Featured", label: t("Chrome 商店精选", "Chrome Web Store featured") },
    { value: "React 19", label: t("主用前端框架", "Primary frontend stack") },
    { value: "5+", label: t("完整项目", "Shipped projects") },
  ],
  techCategories: [
    {
      key: "frontend",
      title: t("前端框架", "Frontend"),
      badgeClass: "badge-primary",
      items: ["React 19", "Next.js 16", "TypeScript", "Vue 3", "Tailwind CSS v4"],
    },
    {
      key: "backend",
      title: t("后端 & 数据", "Backend & Data"),
      badgeClass: "badge-secondary",
      items: ["NestJS 11", "TanStack Query", "PostgreSQL", "Prisma", "REST API"],
    },
    {
      key: "media",
      title: t("媒体 & 性能", "Media & Performance"),
      badgeClass: "badge-accent",
      items: ["FFmpeg", "HLS", "Web Worker", "Monaco Editor", "Canvas"],
    },
    {
      key: "tooling",
      title: t("工具 & 测试", "Tooling & Testing"),
      badgeClass: "badge-info",
      items: ["Playwright", "Vitest", "WXT", "Git", "Webpack"],
    },
    {
      key: "ui",
      title: t("UI & 交互", "UI & Interaction"),
      badgeClass: "badge-success",
      items: ["daisyUI", "shadcn", "AntV-X6", "FullCalendar", "Framer Motion"],
    },
  ],
  projects: [
    {
      slug: "athena",
      title: t("Athena 学习平台", "Athena Learning Platform"),
      description: t(
        "全栈在线学习平台，覆盖视频播放 / 在线编程 / 月度计划 / 算法编排",
        "Full-stack online learning platform: video streaming, online coding, monthly planning, algorithm orchestration",
      ),
      highlights: {
        zh: [
          "基于 Next.js 16 App Router + NestJS 11 全栈架构",
          "Monaco Editor 深度集成，支持多语言在线编程与判题",
          "FFmpeg + HLS 自研视频流，支持进度追踪与断点续看",
          "AntV-X6 编排算法流程图，可视化拖拽",
          "Web Worker + TanStack Query 保证大数据量下的流畅",
        ],
        en: [
          "Next.js 16 App Router + NestJS 11 full-stack architecture",
          "Deep Monaco Editor integration with multi-language online coding & judge",
          "Custom FFmpeg + HLS video pipeline with progress tracking and resume",
          "AntV-X6 powered algorithm flow chart editor with drag-and-drop",
          "Web Worker + TanStack Query for smooth UX under heavy data",
        ],
      },
      tags: [
        "Next.js 16",
        "NestJS 11",
        "Monaco Editor",
        "AntV-X6",
        "FullCalendar",
        "FFmpeg",
        "HLS",
        "Web Worker",
        "TanStack Query",
      ],
      badge: {
        label: t("开源精选", "Featured OSS"),
        class: "badge-primary",
      },
      thumbnail: "/projects/athena/01-dashboard.svg",
      screenshots: [
        "/projects/athena/01-dashboard.svg",
        "/projects/athena/02-video.svg",
        "/projects/athena/03-algo.svg",
        "/projects/athena/04-plan.svg",
      ],
      links: {
        github: "https://github.com/placeholder/athena",
      },
      stats: [
        { label: t("覆盖功能", "Features"), value: "20+" },
        { label: t("技术栈", "Stack size"), value: "15+" },
        { label: t("页面", "Pages"), value: "30+" },
        { label: t("运行时间", "Uptime"), value: "1y+" },
      ],
      features: [
        {
          icon: "🎥",
          title: t("视频流媒体", "Video Streaming"),
          description: t("FFmpeg 转码 + HLS 分片，进度追踪", "FFmpeg + HLS with progress tracking"),
        },
        {
          icon: "💻",
          title: t("在线编程", "Online Coding"),
          description: t("Monaco Editor + 多语言判题", "Monaco Editor + multi-language judge"),
        },
        {
          icon: "🗓️",
          title: t("月度计划", "Monthly Planning"),
          description: t("FullCalendar 排课 + 提醒", "FullCalendar scheduling + reminders"),
        },
        {
          icon: "🔗",
          title: t("算法编排", "Algorithm Flow"),
          description: t("AntV-X6 节点编排", "AntV-X6 node-based editor"),
        },
        {
          icon: "⚡",
          title: t("性能优化", "Performance"),
          description: t("Web Worker + 虚拟滚动", "Web Worker + virtual scrolling"),
        },
        {
          icon: "🔐",
          title: t("权限管理", "RBAC"),
          description: t("NestJS JWT + 角色守卫", "NestJS JWT + role guards"),
        },
      ],
    },
    {
      slug: "tiktools",
      title: t("Tiktools Chrome 插件", "Tiktools Chrome Extension"),
      description: t(
        "TikTok 数据分析 Chrome 插件，40 天 200+ 安装、Chrome 商店精选",
        "TikTok analytics Chrome extension, 200+ installs in 40 days, Chrome Web Store featured",
      ),
      highlights: {
        zh: [
          "WXT 框架 + TypeScript 严格模式",
          "Playwright e2e 覆盖关键流程",
          "GA 埋点驱动产品迭代",
          "Claude Agent Team 协作开发工作流",
          "subagent code review 把关代码质量",
        ],
        en: [
          "WXT framework + TypeScript strict mode",
          "Playwright e2e covering key user flows",
          "GA events driving product iteration",
          "Claude Agent Team collaborative dev workflow",
          "subagent code review enforcing quality",
        ],
      },
      tags: ["Chrome Extension", "WXT", "TypeScript", "Playwright", "GA", "Claude Agent"],
      badge: {
        label: t("200+ 安装", "200+ installs"),
        class: "badge-secondary",
      },
      thumbnail: "/projects/tiktools/01-window.svg",
      screenshots: [
        "/projects/tiktools/01-window.svg",
        "/projects/tiktools/02-batch.svg",
        "/projects/tiktools/03-store.svg",
      ],
      links: {
        chromeStore: "https://chromewebstore.google.com/placeholder",
      },
      stats: [
        { label: t("安装量", "Installs"), value: "200+" },
        { label: t("上线天数", "Days live"), value: "40" },
        { label: t("周活", "WAU"), value: "100+" },
        { label: t("E2E 用例", "E2E cases"), value: "30+" },
      ],
      features: [
        {
          icon: "🪟",
          title: t("悬浮窗交互", "Floating Window"),
          description: t("侧边悬浮 + 快捷键唤起", "Side panel + hotkey activation"),
        },
        {
          icon: "📦",
          title: t("批量下载", "Batch Download"),
          description: t("并行下载 + 进度条", "Parallel download with progress bar"),
        },
        {
          icon: "📊",
          title: t("数据分析", "Analytics"),
          description: t("作者 / 视频 / 趋势多维统计", "Author / video / trend stats"),
        },
        {
          icon: "🧪",
          title: t("E2E 保障", "E2E Coverage"),
          description: t("Playwright 端到端测试", "Playwright end-to-end tests"),
        },
        {
          icon: "🤖",
          title: t("AI 工作流", "AI Workflow"),
          description: t("Claude Agent 协作", "Claude Agent collaboration"),
        },
      ],
    },
    {
      slug: "canvas-lab",
      title: t("Canvas Lab", "Canvas Lab"),
      description: t(
        "Canvas / WebGL 图形编程实验场",
        "Canvas / WebGL graphics playground",
      ),
      highlights: {
        zh: [
          "2D / WebGL 双引擎切换",
          "粒子系统与物理模拟",
          "可复用 shader 片段",
          "性能监控面板",
        ],
        en: [
          "Toggle between 2D / WebGL engines",
          "Particle system & physics simulation",
          "Reusable shader snippets",
          "Built-in performance HUD",
        ],
      },
      tags: ["Canvas", "WebGL", "TypeScript", "GLSL"],
      badge: {
        label: t("实验", "Experimental"),
        class: "badge-accent",
      },
      thumbnail: "/projects/canvas-lab/01-cover.svg",
      screenshots: ["/projects/canvas-lab/01-cover.svg"],
      links: {},
      stats: [
        { label: t("示例", "Demos"), value: "12+" },
        { label: t("Shader", "Shaders"), value: "8+" },
      ],
      features: [
        {
          icon: "🎨",
          title: t("2D Canvas", "2D Canvas"),
          description: t("滤镜 / 混合 / 路径", "Filters, blending, paths"),
        },
        {
          icon: "🌌",
          title: t("WebGL", "WebGL"),
          description: t("3D / shader / 缓冲", "3D / shader / buffers"),
        },
        {
          icon: "⚡",
          title: t("粒子系统", "Particles"),
          description: t("高性能粒子", "High-perf particles"),
        },
      ],
    },
  ],
  timeline: [
    {
      id: "work-current",
      year: t("2026-至今", "2026-Present"),
      title: t("前端开发工程师", "Frontend Engineer"),
      description: t(
        "负责 Athena 学习平台 / Tiktools 商业化迭代",
        "Owns Athena learning platform / Tiktools monetization iteration",
      ),
      type: "work",
    },
    {
      id: "work-intern",
      year: t("2025", "2025"),
      title: t("前端开发工程师（实习）", "Frontend Engineer (Intern)"),
      description: t(
        "负责可视化大屏与中后台系统",
        "Data-visualization dashboards & admin systems",
      ),
      type: "work",
    },
    {
      id: "project-athena",
      year: t("2025", "2025"),
      title: t("Athena 学习平台", "Athena Learning Platform"),
      description: t("全栈项目从 0 到 1", "Full-stack project from 0→1"),
      type: "project",
    },
    {
      id: "edu",
      year: t("2021-2025", "2021-2025"),
      title: t("软件工程 · 本科", "B.Sc. Software Engineering"),
      description: t("中北大学", "North University of China"),
      type: "edu",
    },
  ],
  wechatArticles: [
    {
      title: t("用 WXT 打造 Chrome 插件：从 0 到 Chrome 商店精选", "Building a Chrome extension with WXT: 0 → Featured"),
      excerpt: t(
        "40 天从想法到 Chrome 商店精选插件",
        "From idea to Chrome Web Store featured in 40 days",
      ),
      publishedAt: "2026-05-15",
      url: "https://mp.weixin.qq.com/s/placeholder-1",
    },
    {
      title: t("Next.js 16 实战：在 Athena 中用 RSC 重构首页", "Next.js 16 in production: rewriting Athena home with RSC"),
      excerpt: t(
        "RSC 缓存策略与流式渲染踩坑",
        "Caching strategies and streaming pitfalls",
      ),
      publishedAt: "2026-04-02",
      url: "https://mp.weixin.qq.com/s/placeholder-2",
    },
    {
      title: t("FFmpeg.wasm + HLS：在线视频秒开实践", "FFmpeg.wasm + HLS: fast video start in the browser"),
      excerpt: t(
        "从转码到分片的全链路实现",
        "Full pipeline from transcode to HLS",
      ),
      publishedAt: "2026-02-18",
      url: "https://mp.weixin.qq.com/s/placeholder-3",
    },
    {
      title: t("AntV-X6 实战：拖拽式算法编排", "AntV-X6 in action: drag-and-drop algorithm flow"),
      excerpt: t("节点自定义与序列化", "Node customization and serialization"),
      publishedAt: "2026-01-09",
      url: "https://mp.weixin.qq.com/s/placeholder-4",
    },
    {
      title: t("用 Claude Agent 写代码：我的 AI 协作流", "Coding with Claude Agent: my AI workflow"),
      excerpt: t(
        "subagent 分工与 review 流程",
        "Subagent division of labor & review",
      ),
      publishedAt: "2025-12-22",
      url: "https://mp.weixin.qq.com/s/placeholder-5",
    },
  ],
  expertise: [
    {
      icon: "🎥",
      title: t("视频流媒体", "Video Streaming"),
      description: t("FFmpeg / HLS / 进度追踪", "FFmpeg / HLS / progress tracking"),
    },
    {
      icon: "📊",
      title: t("数据可视化", "Data Visualization"),
      description: t("AntV-X6 / 图表性能优化", "AntV-X6 / chart perf tuning"),
    },
    {
      icon: "🛠️",
      title: t("大文件上传", "Large File Upload"),
      description: t("Web Worker / 分片 / 秒传", "Web Worker / chunked / dedup"),
    },
    {
      icon: "🤖",
      title: t("AI 工具链", "AI Toolchain"),
      description: t("Claude Agent / subagent / RAG", "Claude Agent / subagent / RAG"),
    },
    {
      icon: "🎨",
      title: t("图编辑引擎", "Diagram Engine"),
      description: t("X6 / 节点编排 / 右键菜单", "X6 / node editing / context menu"),
    },
    {
      icon: "🧪",
      title: t("质量保障", "Quality Assurance"),
      description: t("Playwright e2e / Vitest / GA", "Playwright e2e / Vitest / GA"),
    },
  ],
};

export const getProjectBySlug = (slug: string): Project | undefined =>
  profile.projects.find((p) => p.slug === slug);
