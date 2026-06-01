# 序言-xy 个人主页 优化方案

> 依据简历（Athena 学习平台 / Tiktools 谷歌扩展）反推当前网站缺什么、补什么。  
> 优先级：**P0 = 必做** / **P1 = 强烈建议** / **P2 = 锦上添花** / **P3 = 长期打磨**  
> 数据基准日：2026-06-01

---

## 〇、硬性约束（适用全部 P0~P3）

| 维度 | 约束 |
|---|---|
| **职业定位** | "**主前端 · 全栈工程师**"，主用 React 19 / Next.js 16，可兼顾 java 后端与浏览器扩展 |
| **组件库** | **仅使用 daisyUI 组件**（`hero` / `card` / `btn` / `badge` / `stat` / `divider` / `drawer` / `modal` / `collapse` / `timeline` / `tabs` / `alert` / `carousel` / `swap` / `kbd`），**禁止自写组件** |
| **颜色** | **全部走 daisyUI 主题变量**（`primary` / `secondary` / `accent` / `neutral` / `info` / `success` / `warning` / `error` / `base-100/200/300`），**禁止硬编码 `#hex` / `rgb()`** |
| **自定义 CSS** | 仅在 `globals.css` 写 reset + Tailwind 工具类，不写自定义 class |
| **主题** | 跟随 daisyUI 多主题（`data-theme` 切换），所有新增组件必须兼容浅 / 深色 |
| **响应式** | **mobile-first**；所有 grid 走 `grid-cols-1 md:grid-cols-2 lg:grid-cols-*`；`stats` 用 daisyUI 自带 `stats-vertical lg:stats-horizontal`；所有交互在触屏下可用 |
| **关键交互映射** | 微信二维码 → daisyUI `modal`；详情页画廊 → daisyUI `carousel` + `modal` lightbox；主题切换 → 已有抽屉（daisyUI `drawer`），不动 |

---

## 一、问题诊断（简历 ↔ 网站对比）

| 维度 | 简历中已有的亮点 | 当前网站状态 | 缺口 |
|---|---|---|---|
| **职业定位** | 主前端·全栈（React 19 / Next.js 16 / NestJS） | Hero 副标题：「前端开发工程师」 | "全栈"标签缺失、强调主前端 |
| **核心数据** | 40 天 200+ 安装 / 谷歌精选 / 周活 100+ | 无任何数字展示 | 缺「成就数据条」 |
| **Athena 技术栈** | Monaco / AntV-X6 / FullCalendar / FFmpeg·HLS / Web Worker / TanStack Query / NestJS 11 | 只露 4 个标签 | 10+ 关键能力未体现 |
| **Tiktools 技术栈** | WXT / Playwright e2e / Claude Agent Team / GA 埋点 / subagent code review | 只露 3 个标签 | e2e、AI 工作流、埋点全无 |
| **项目详情** | 5 个技术点 + 业绩数据 + 业务背景 | 一句话描述 + 标签 | 无详情页、无截图、无数据 |
| **技能组织** | 视频流媒体、图编辑、文件上传、性能优化、e2e 测试 | 4 个笼统分类 | 未按"专业领域"组织 |
| **技术博客** | 「喜欢分享前端团队作品」 | 无入口 | 缺 |
| **简历下载** | HR/面试场景刚需 | 无 | 缺 |
| **联系方式** | 微信、Email、GitHub | Email + GitHub | 微信 key 有、二维码未实现 |
| **i18n** | — | zh/en 同步但部分 key 不一致 | 需补齐 |
| **资产命名** | — | 背景图：`微信图片_20260531163536_157_9.jpg` | 不规范 |
| **SEO** | — | 用默认 metadata | 缺 og:image / description / keywords |
| **Footer 死链** | — | "关于我" 链接 `href="#"` | 缺 about 页面 |

---

## 二、优化方案

### 🔴 P0 — 必做（直接决定第一印象）

#### P0-1 Hero 区重做
- **用 daisyUI `<div className="hero">` 容器**（自带 overlay/background 处理）
- 副标题：「**主前端 · 全栈工程师**」
- 描述句加：「**主用 React 19 / Next.js 16**，兼顾 Node 后端与浏览器扩展开发」
- 按钮：「查看项目 / 下载简历 PDF」（去掉"技术栈"，主页已有）
- 背景图重命名 `public/hero-bg.jpg`，并补 alt / 渐变遮罩
- 移动端：hero 高度自适应，`hero-content text-center` 保证文字居中
- 文案同步中英 i18n

#### P0-2 成就数据条（新增组件）
- **用 daisyUI `<div className="stats stats-vertical lg:stats-horizontal shadow">`**
- 4 个数据卡片（移动端竖排，桌面端横排）：
  - **200+** Chrome 商店安装量
  - **精选** Chrome 商店精选插件
  - **React 19** 主用前端框架
  - **5+** 完整项目
- 数据写进 `src/data/portfolio.ts`，中英双份 key

#### P0-3 项目卡片重做
- **用 daisyUI `<div className="card card-side lg:card-side bg-base-100 shadow-xl">`**（移动端 `card-compact` 竖排，桌面端横排）
- 包含：缩略图（Athena 仪表盘 / Tiktools 悬浮窗）/ 项目名（中英）/ 业绩徽章（`badge badge-primary` / `badge-secondary` / `badge-accent`）/ 3-5 个技术亮点 bullet / 完整 tag 列表
- 整卡 hover 可点击 → 详情页
- 移动端：图在上、内容在下，触控热区 ≥ 44px

#### P0-4 项目详情页路由
- `/projects/athena` —— 5 大技术亮点 + 完整功能清单 + 截图 + 源码链接
- `/projects/tiktools` —— 5 个内容点 + Chrome 商店链接 + 安装量截图
- 布局：项目封面 / 技术栈 / 亮点列表 / 成果数据 / 截图画廊
- **画廊用 daisyUI `carousel` + `modal` lightbox**（移动端可滑动）
- 复用 `portfolio.ts` 数据，组件化渲染

#### P0-5 技术栈扩充与重组
补全：Next.js 16、NestJS 11、Monaco Editor、AntV-X6、FullCalendar、FFmpeg / HLS、Web Worker、TanStack Query、WXT、Playwright、Vitest、shadcn

按 5 维分类，**「前端框架」置顶**：
1. **前端框架**（视觉重头）—— React 19 / Next.js 16 / TypeScript / Vue 3
2. **后端 & 数据** —— NestJS 11 / TanStack Query / PostgreSQL
3. **媒体 & 性能** —— FFmpeg / HLS / Web Worker / Monaco Editor
4. **工具 & 测试** —— Playwright / Vitest / Git / WXT / Webpack
5. **UI & 交互** —— Tailwind CSS v4 / **daisyUI** / AntV-X6 / FullCalendar

每类用 daisyUI `card` + `badge badge-primary/secondary/accent/info/success` 区分视觉重量。

---

### 🟡 P1 — 强烈建议（提升转化与专业度）

#### P1-1 简历 PDF 下载
- **来源**：用户提供下载链接（先记录到 `portfolio.ts` 的 `resumeUrl` 字段，**不托管**）
- Hero CTA 与 Footer 各加一个「下载简历」按钮（`target="_blank"`）
- 先支持 1 份中文（`?lang=zh` query 可选英文）

#### P1-2 联系方式补全
- **微信二维码**：先用占位图 `public/qrcode-placeholder.png`（带"待替换"水印），CTA 区按钮 → daisyUI `modal` 弹窗显示二维码
- 补：掘金、CSDN、博客外链、Twitter/X（用户有则提供）
- CTA 区用 daisyUI `card-actions` + 4-6 卡片：Email / GitHub / 微信 / 简历 PDF / 博客
- 移动端：卡片堆叠为 `grid-cols-1 sm:grid-cols-2`

#### P1-3 `/about` 关于我页面
- 内容：个人介绍 / 教育背景 / 职业目标 / 价值观
- 修复 Footer "关于我" 死链 → 指向 `/about`
- 加 i18n

#### P1-4 SEO / 分享卡片
- `layout.tsx` 完善：
  - `title`：默认 + 各页面 template
  - `description`：基于简历重写（包含核心关键词：Next.js / NestJS / Chrome Extension / Athena）
  - `keywords`
  - `openGraph`：image / title / description
  - `twitter` card
- 详情页各自 `generateMetadata`

---

### 🟢 P2 — 锦上添花（差异化）

#### P2-1 公众号文章 / 博客区
- 数据源：`portfolio.ts` 里维护 `wechatArticles[]`，每条：title / excerpt / publishedAt / url
- 主页新增 **"精选文章"** 区（Hero 与 TechStack 之间），3 张卡片轮播/网格
- 新增 `/blog` 列表页，**所有** 公众号文章列表 + 公众号跳转按钮
- Footer 加 "技术博客" 链接 → `/blog`
- 设计要点：标题 + 摘要 + 发布时间 + 跳转公众号原文（小图标）

#### P2-2 专业领域 / 技能矩阵
- 新增「我能做」区，用图标 + 1-2 句描述展示 5-6 个能力维度：
  - 📺 视频流媒体（FFmpeg / HLS / 进度追踪）
  - 📊 数据可视化（AntV-X6 / 图表性能优化）
  - 🛠️ 大文件上传（Web Worker / 分片 / 秒传 / 断点续传）
  - 🤖 AI 工具链（Claude Agent / subagent / RAG）
  - 🎨 图编辑引擎（X6 / 节点编排 / 右键菜单）
  - 🧪 质量保障（Playwright e2e / Vitest / GA 埋点）

#### P2-3 项目演示动图/截图
- **来源**：用户提供素材（先做占位 + 标题占位，上线前替换）
- Athena：仪表盘 / 视频播放 / 算法编辑器 / 月度计划 各 1 张
- Tiktools：悬浮窗 / 批量下载 / Chrome 商店精选页 截图
- 放 `public/projects/{athena,tiktools}/` 下，命名 `01-dashboard.jpg` 等
- 主页项目卡 + 详情页画廊复用同一份图

#### P2-4 i18n 文案补齐
- 合并 `techStackItems`（已在 zh/en.json 但页面未用）
- 抽公共 `portfolio.ts` 一起 i18n
- 检查所有 key 双向对齐

#### P2-5 背景图 / 视觉资产清理
- 重命名 `微信图片_*.jpg` → `hero-bg.jpg`
- 优化多主题下的对比度（某些浅色主题文字可能看不清）
- 移动端单独裁切或替换

---

### 🔵 P3 — 长期打磨

- 暗/亮色模式跟随系统（目前硬编码深色）
- 键盘快捷键导航（`g h` / `g p` / `g t`）
- Vercel Analytics 接入
- 简历数据完全 JSON 化（取代页面里 hardcode 的 `projects / timelineItems / techCategories`）
- 简历变更时自动重新生成 PDF
- Lighthouse 性能 / A11y 持续 ≥ 95

---

## 三、推荐执行顺序

```
Phase 0（动效基建，先于所有 P0 业务组件）
  ├─ 装依赖：pnpm add gsap @gsap/react
  ├─ 建 src/lib/gsap.ts（注册 ScrollTrigger + useGSAP + defaults）
  ├─ 建 src/hooks/motion.ts（useReveal / useStaggerReveal / useCountUp / useParallax / useSplitText）
  └─ 写个 Reveal 包装器验证可用

Phase 1（P0 一次做完）
  ├─ 建 src/data/portfolio.ts 统一数据源
  ├─ P0-1 Hero 文案 & 按钮 + 字符入场 + 背景视差
  ├─ P0-2 成就数据条组件 + countUp + 弹性入场
  ├─ P0-5 技术栈重做 + stagger 入场 + hover 反馈
  └─ P0-3 + P0-4 项目卡片 + 详情页（一起做，hover 抬升 + 详情页 hero 视差）

Phase 2（P1 一次做完）
  ├─ P1-1 简历 PDF 下载
  ├─ P1-2 联系方式补全 + 微信二维码（弹窗 scale 动画）
  ├─ P1-3 /about 页面
  └─ P1-4 SEO metadata

Phase 3（按时间精力）
  ├─ P2-3 截图
  ├─ P2-2 技能矩阵
  ├─ P2-1 博客入口
  └─ P2-4 / P2-5 清理

Phase 4（持续）
  └─ P3 各项
```

---

## 四、文件结构建议（仅 P0 + P1 涉及）

```
src/
├─ data/
│  └─ portfolio.ts              # 统一数据源（projects / tech / stats / about / wechatArticles / resumeUrl / qrcode）
├─ app/
│  ├─ globals.css               # Tailwind reset + daisyUI themes
│  └─ [locale]/
│     ├─ page.tsx               # 主页（消费 portfolio）
│     ├─ about/
│     │  └─ page.tsx            # 关于我
│     ├─ blog/
│     │  └─ page.tsx            # 公众号文章列表
│     └─ projects/
│        └─ [slug]/
│           └─ page.tsx         # 项目详情
├─ components/
│  ├─ home/                     # 全部基于 daisyUI 组件拼装，不写自定义
│  │  ├─ Hero.tsx               # daisyUI hero
│  │  ├─ StatsBar.tsx           # daisyUI stats
│  │  ├─ ArticlePreview.tsx     # daisyUI card × 3
│  │  ├─ TechStack.tsx          # daisyUI card + badge
│  │  ├─ ProjectCard.tsx        # daisyUI card card-side
│  │  └─ Timeline.tsx           # daisyUI timeline
│  └─ project/
│     ├─ ProjectCover.tsx       # daisyUI hero
│     ├─ ProjectGallery.tsx     # daisyUI carousel + modal
│     ├─ ProjectFeatures.tsx    # daisyUI collapse（移动端友好）
│     └─ CTABar.tsx             # daisyUI btn-group
├─ messages/
│  ├─ zh.json                   # 仅导航/页脚/通用 UI 文案
│  └─ en.json
├─ tailwind.config.ts           # 注册 daisyUI plugin + themes
├─ lib/
│  └─ gsap.ts                    # GSAP 客户端注册（一次性）
├─ hooks/
│  └─ motion.ts                  # useReveal / useStaggerReveal / useCountUp / useParallax / useSplitText
├─ components/
│  └─ motion/                    # 动效相关组件
│     └─ Reveal.tsx              # 通用入场包装器
└─ public/
   ├─ hero-bg.jpg               # 重命名
   ├─ projects/
   │  ├─ athena/
   │  │  ├─ 01-dashboard.{jpg,png,webp}
   │  │  ├─ 02-video.jpg
   │  │  ├─ 03-algo.jpg
   │  │  └─ 04-plan.jpg
   │  └─ tiktools/
   │     ├─ 01-floating-window.jpg
   │     ├─ 02-batch-download.jpg
   │     └─ 03-store-featured.jpg
   ├─ qrcode-placeholder.png    # 微信占位
   └─ resume.pdf                # 暂不托管，用 URL 跳转
```

---

## 五、数据设计：`src/data/portfolio.ts`

### 5.1 类型定义

```typescript
type DaisyBadgeClass =
  | 'badge-primary'
  | 'badge-secondary'
  | 'badge-accent'
  | 'badge-info'
  | 'badge-success'
  | 'badge-warning';

interface Project {
  slug: string;                       // URL 路径，如 'athena'
  title: { zh: string; en: string };
  description: { zh: string; en: string };
  highlights: { zh: string[]; en: string[] };   // 3-5 个亮点 bullet
  tags: string[];
  badge?: { label: { zh: string; en: string }; class: DaisyBadgeClass };  // daisyUI 语义类
  thumbnail: string;                   // `projects/{slug}/01-thumb.jpg`
  screenshots: string[];               // 画廊图列表
  links: {
    github?: string;                   // GitHub 仓库
    chromeStore?: string;              // Tiktools 商店链接
    download?: string;                 // 简历 PDF
  };
  stats?: {                            // 成果数据
    label: { zh: string; en: string };
    value: string;
  }[];
  features: {                          // 详情页完整功能清单
    icon: string;                      // emoji
    title: { zh: string; en: string };
    description: { zh: string; en: string };
  }[];
}

interface TechCategory {
  key: string;                         // i18n key
  badgeClass: DaisyBadgeClass;         // daisyUI 语义 badge 类
  items: string[];
}

interface StatsItem {
  value: string;
  label: { zh: string; en: string };
}

interface WechatArticle {
  title: { zh: string; en: string };
  excerpt: { zh?: string; en?: string };
  publishedAt: string;                 // ISO date
  url: string;
}

interface PortfolioProfile {
  name: { zh: string; en: string };
  subtitle: { zh: string; en: string };
  description: { zh: string; en: string };
  resumeUrl?: string;
  social: {
    email: string;
    github: string;
    wechatQrcode: string;              // `qrcode-placeholder.png`（占位）
  };
  stats: StatsItem[];
  techCategories: TechCategory[];
  projects: Project[];
  timeline: TimelineItem[];
  wechatArticles: WechatArticle[];
}
```

### 5.2 数据来源说明

| 字段 | 来源 | 状态 |
|---|---|---|
| `projects[].screenshots` | 用户提供 | 占位 → 边改边加 |
| `projects[].links.github` | Athena GitHub URL | **待用户提供** |
| `projects[].links.chromeStore` | Tiktools 商店 URL | **待用户提供** |
| `profile.resumeUrl` | 用户提供 | **待用户提供** |
| `profile.social.wechatQrcode` | 用户提供 | 占位 |
| `wechatArticles` | 用户提供 | **待用户提供** |

### 5.3 i18n 策略

- 中英双份文案 **全部行内写在 `portfolio.ts`**（使用 `{ zh, en }` 对象），不再拆成 i18n JSON key
- 仅**导航/页脚/通用 UI** 保留 `next-intl` 的 `messages/*.json`
- 好处：数据与展示解耦，改简历数据只需改一个文件

---

## 六、组件设计草案

### 6.1 主页组件树

```
[locale]/page.tsx
├─ Navbar                           # 已有，不动
├─ Hero                             # 重写 — daisyUI hero
│  ├─ 背景图 (hero-bg.jpg) + 渐变遮罩
│  ├─ 标题 / 副标题「主前端 · 可全栈工程师」
│  ├─ 描述「主用 React 19 / Next.js 16...」
│  └─ CTA 按钮：「查看项目」「下载简历」
├─ StatsBar                         # 新增 P0-2 — daisyUI stats
│  └─ stats-vertical lg:stats-horizontal，4 卡片
├─ ArticlePreview                   # 新增 P2-1 — daisyUI card
│  └─ grid-cols-1 md:grid-cols-3，3 篇文章卡片
├─ TechStack                        # 重写 P0-5 — daisyUI card + badge
│  └─ grid-cols-1 md:grid-cols-2 lg:grid-cols-3，5 维分类
├─ ProjectCard / ProjectGrid        # 重写 P0-3 — daisyUI card card-side
│  └─ grid-cols-1 md:grid-cols-2，2 列卡片
├─ Timeline                         # 已有，小修 — daisyUI timeline
├─ CTA Contact                      # 扩写 P1-2 — daisyUI card
│  └─ grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
│  └─ 微信按钮 → daisyUI modal 弹二维码
└─ Footer                           # 小修
```

### 6.2 详情页组件树

```
projects/[slug]/page.tsx
├─ ProjectCover                     # daisyUI hero + badge
├─ ProjectHighlights                # daisyUI ul + check icon
├─ ProjectScreenshots               # daisyUI carousel + modal lightbox
├─ ProjectFeatures                  # daisyUI card × N
├─ TechBadgeList                    # daisyUI badge × N
├─ StatsRow                         # daisyUI stats stats-vertical lg:stats-horizontal
└─ CTABar                           # daisyUI btn × 2
```

### 6.3 daisyUI 组件映射总表

| 业务组件 | daisyUI 组件 | 关键 class |
|---|---|---|
| Hero | `hero` | `hero min-h-[60vh] bg-base-200` |
| StatsBar | `stats` | `stats stats-vertical lg:stats-horizontal shadow` |
| ProjectCard | `card` | `card lg:card-side bg-base-100 shadow-xl` |
| TechStack 卡片 | `card` | `card bg-base-200` |
| Tech 标签 | `badge` | `badge badge-primary` 等语义类 |
| 业绩徽章 | `badge` | `badge badge-secondary` |
| 微信二维码 | `modal` | `<dialog id="wechat-modal" className="modal">` |
| 画廊 | `carousel` | `carousel carousel-center` + `modal` lightbox |
| Timeline | `timeline` | `timeline timeline-vertical lg:timeline-horizontal` |
| CTA 卡片 | `card` + `card-actions` | `card-actions justify-end` |
| 项目功能 | `collapse` | `collapse collapse-arrow bg-base-200`（移动端友好） |
| 主题抽屉 | `drawer` | 已有，不动 |
| 移动端导航 | `dropdown` | `dropdown lg:hidden` |

### 6.4 关键交互

| 组件 | 交互 |
|---|---|
| Navbar | sticky + blur backdrop（已有，不动） |
| StatsBar | 滚动入场动画（`animate.css` fadeInUp） |
| ProjectCard | 整卡可点击 → push `/projects/:slug` |
| ArticlePreview | 卡片 → 新标签页打开公众号原文 |
| 微信二维码 | CTA 区按钮 → daisyUI `<dialog>` 弹出二维码图 |
| 详情页画廊 | 点击缩略图 → daisyUI `modal` 大图浏览 |
| 主题抽屉 | 已有，不动（daisyUI `drawer`） |
| 移动端 | 所有交互区触控热区 ≥ 44px，禁用 hover-only 提示 |

---

## 七、验收标准（Lighthouse 目标）

### 7.1 功能验收

| 检查项 | 通过标准 |
|---|---|
| Hero 文案 | 中英文切换各显示正确 |
| Hero 标题 | 字符级入场（`SplitText` 或行级 stagger） |
| Hero 背景 | 滚动视差平滑无抖动 |
| StatsBar 动画 | 滚动到视口时 4 卡片依次 fadeInUp + 数字 count-up 0→目标值 |
| StatsBar 弹性 | 数字到位时带 `back.out(1.7)` 弹性 |
| TechStack | stagger 入场 + badge 弹跳入场 |
| 项目卡片入场 | 滚动到 85% 视口时 stagger 0.15 入场 |
| 项目卡片 hover | `y: -8` 抬升 + `scale: 1.02`（daisyUI shadow 同步加深） |
| 项目卡片 → 详情页 | 点击后路由到 `/projects/:slug` |
| 详情页 Cover | 标题入场 + 背景视差 |
| 详情页画廊 | daisyUI `carousel` 切换带 GSAP 过渡 |
| Timeline | 进度轴随滚动填充，节点依次入场 |
| 鼠标光标 | 仅桌面端启用；移动端不渲染 |
| 详情页图片 | 占位图正常显示，不报 404 |
| 详情页 GitHub/商店按钮 | `target="_blank"` 打开，URL 正确 |
| 公众号文章区 | 卡片排版正确，原文链接新标签页打开 |
| /blog 页面 | 所有文章按时间倒序排列 |
| /about 页面 | 正常渲染，Footer 链接正确 |
| CTA 「下载简历」 | 新标签页打开用户提供的 URL |
| CTA 微信二维码 | 点击弹出 Modal + 二维码 scale 弹入 |
| **所有页面缺图状态** | 不报错、不 layout shift |
| i18n 切换 | 导航、Hero、Stats 等全部 UI 文案同步刷新 |
| **prefers-reduced-motion** | 所有动画降为 `duration: 0` 或直接跳过 |
| **移动端动画简化** | 视差 / 光标 / 大幅度 scale 全部禁用 |

### 7.2 性能 & 体验

| 指标 | 目标 |
|---|---|
| Lighthouse Performance | ≥ 90 |
| Lighthouse Accessibility | ≥ 95 |
| Lighthouse Best Practices | ≥ 95 |
| 移动端 Lighthouse | Performance ≥ 85，A11y ≥ 95 |
| 交互响应 | 主题切换 ≤ 50ms，路由切换 ≤ 200ms |
| 触控热区 | 所有可点击元素 ≥ 44×44px |
| 字体大小 | 移动端正文 ≥ 16px |
| 图片 | `next/image` + `placeholder="blur"`，无累积布局偏移，移动端显式指定 `sizes` |
| 字体 | Google Fonts（Caveat + Noto Sans SC）使用 `display=swap` |
| 主题切换 | 全部组件兼容 daisyUI `data-theme`，无样式失效 |

---

## 八、确认事项

### ✅ 已确认
- [x] 标题改为「**主前端 · 可全栈工程师**」
- [x] 主用 React 19 / Next.js 16，可兼顾 Node 后端与浏览器扩展
- [x] **仅用 daisyUI 组件**，禁止自写组件
- [x] 颜色全部走 daisyUI 主题变量，**禁止硬编码 `#hex` / `rgb()`**
- [x] 兼容 daisyUI 多主题（浅 / 深色）
- [x] **mobile-first**，所有 grid 自带响应式，触控热区 ≥ 44px
- [x] 项目可截图（**用户提供素材**）
- [x] 简历 PDF：用户后续**提供下载链接**，CTA 加「下载简历」按钮
- [x] 微信二维码：先用**占位图**（`public/qrcode-placeholder.png`），后续替换
- [x] 微信公众号文章：用户有**好几篇链接**，设计成文章卡片区
- [x] Tiktools：Chrome 商店链接（**无在线 demo**）
- [x] Athena：暂无在线 demo
- [x] **Athena 有 GitHub 仓库** → 详情页加「查看源码」按钮
- [x] **截图策略**：先占位，边改边加
- [x] **公众号文章**：全部时间倒序

### ❓ 仍需你提供（开工前）
- [ ] **简历 PDF** 下载链接
- [ ] **微信公众号文章**：标题 + 链接（按时间倒序，3-6 篇）
- [ ] **Tiktools** Chrome 商店 URL
- [ ] **Athena** GitHub 仓库 URL
- [ ] 微信二维码真实图片（先占位）
- [ ] 项目截图素材（**边改边加**，不必一次性给齐）

---

## 九、GSAP 动效设计

> 目标：**灵动、克制、可降级**。所有动效统一用 GSAP + ScrollTrigger，遵循 daisyUI 主题，兼容 `prefers-reduced-motion` 和移动端。

### 9.1 动效设计原则

| 原则 | 说明 |
|---|---|
| **快且短** | 入场动画 0.4-0.8s；缓动默认 `power2.out` / `power3.out`；不堆砌 |
| **只动 transform & opacity** | 不动 layout 属性（width/height/top/left），保证 60fps |
| **可降级** | `prefers-reduced-motion: reduce` 时全部 `duration: 0` 或跳过 |
| **可响应** | `gsap.matchMedia()` 区分移动端 / 桌面端（视差、光标仅桌面端） |
| **SSR 安全** | 所有 GSAP 代码用 `useGSAP()` 包，运行在 client only |
| **复用 hooks** | 抽 `useReveal` / `useStaggerReveal` / `useCountUp` / `useParallax` / `useSplitText` 通用 hook |
| **用 daisyUI 变量** | 颜色动画走 daisyUI 主题 token，不动 hex |

### 9.2 技术栈

```
pnpm add gsap @gsap/react
```

- `gsap` ^3.13（核心引擎 + ScrollTrigger plugin）
- `@gsap/react` ^2（`useGSAP()` hook）

### 9.3 全局基础设施

#### 9.3.1 客户端注册 — `src/lib/gsap.ts`

```ts
"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  gsap.defaults({ ease: "power2.out", duration: 0.6 });
}

export { gsap, ScrollTrigger, useGSAP };
```

- 只在客户端注册一次；避免 SSR 阶段 `window is not defined`
- `defaults` 统一缓动：后续 `gsap.to/from` 不再重复写 `ease`

#### 9.3.2 通用 Hooks — `src/hooks/motion.ts`

| Hook | 用途 | 关键 API |
|---|---|---|
| `useReveal(ref, opts?)` | 元素滚动入场 | `from({ y: 30, autoAlpha: 0 })` + ScrollTrigger |
| `useStaggerReveal(ref, selector, opts?)` | 批量 stagger 入场 | `ScrollTrigger.batch()` |
| `useCountUp(ref, endValue, opts?)` | 数字 0→target 滚动 | `gsap.to(obj, { val, snap, onUpdate })` |
| `useParallax(ref, distance, opts?)` | 视差 | `gsap.to + scrollTrigger { scrub: 1 }` |
| `useSplitText(ref, opts?)` | 标题字符级 | GSAP SplitText plugin |

> SplitText 是 **Club GreenSock 付费插件**，未授权时回退到**行级 stagger**（按 `word` / `line` 拆分 DOM），效果近似。

#### 9.3.3 matchMedia 响应式 + 无障碍

每个动效组件统一套 `gsap.matchMedia()`：

```ts
useGSAP(() => {
  const mm = gsap.matchMedia();
  mm.add({
    isMobile: "(max-width: 767px)",
    isDesktop: "(min-width: 768px)",
    reduceMotion: "(prefers-reduced-motion: reduce)",
  }, (ctx) => {
    const { isMobile, reduceMotion } = ctx.conditions as { isMobile: boolean; reduceMotion: boolean };
    const dur = reduceMotion ? 0 : isMobile ? 0.5 : 0.8;
    // ...动画
  });
  return () => mm.revert();
}, { scope: ref });
```

- `reduceMotion` → 所有 `duration: 0`
- `isMobile` → 视差 / 大幅度 scale 全部禁用，仅保留简单 fade

### 9.4 各组件动效清单

#### 9.4.1 Hero（P0-1）

| 元素 | 动画 | 触发 |
|---|---|---|
| 标题（行/字符） | `y: 40 → 0` + `autoAlpha: 0 → 1` + `stagger: 0.06` | 挂载即播 |
| 副标题 | `y: 20 → 0` + `autoAlpha`，`delay: 0.3` | 挂载即播 |
| 描述句 | `y: 20 → 0` + `autoAlpha`，`delay: 0.5` | 挂载即播 |
| CTA 按钮组 | `y: 30 → 0` + `autoAlpha`，`stagger: 0.08`，`delay: 0.7` | 挂载即播 |
| **背景图** | `yPercent: -15` 视差 | `scrub: 1` |
| 底部滚动提示 | `y: 0 ↔ 8` 无限循环 `yoyo` | 挂载即播（`reduceMotion` 时停） |

```ts
useGSAP(() => {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  tl.from(".hero-title-line", { y: 40, autoAlpha: 0, stagger: 0.06 })
    .from(".hero-sub", { y: 20, autoAlpha: 0 }, "-=0.3")
    .from(".hero-desc", { y: 20, autoAlpha: 0 }, "-=0.4")
    .from(".hero-cta", { y: 30, autoAlpha: 0, stagger: 0.08 }, "-=0.3");
}, { scope: heroRef, dependencies: [locale] });
```

> 关键：动画用 `gsap.from()`，避免初始闪烁；切语言时因 `dependencies: [locale]` 重放。

#### 9.4.2 StatsBar（P0-2）

| 元素 | 动画 |
|---|---|
| 4 个数据卡片 | `ScrollTrigger.batch()` + `stagger: 0.1` + `back.out(1.4)` |
| value 数字 | **count-up** `0 → 目标值`（snap: 1），同步播放 |
| 数字入场 | `scale: 0.8 → 1` + 弹性 `back.out(1.7)` |

```ts
useCountUp(statRef, targetValue, { duration: 1.2, ease: "power2.out", start: "top 80%" });
```

#### 9.4.3 TechStack（P0-5）

| 元素 | 动画 |
|---|---|
| 5 个分类卡片 | `gsap.utils.toArray()` + `from({ y: 40, autoAlpha: 0 })` |
| 单个 badge | `scale: 0 → 1` + `back.out(1.7)`，`stagger: 0.04` |
| hover（桌面端） | `scale: 1.03` + 阴影加深，`duration: 0.2` |

```ts
gsap.utils.toArray<HTMLElement>(".tech-card").forEach((card) => {
  gsap.from(card, {
    y: 40, autoAlpha: 0, duration: 0.7,
    scrollTrigger: { trigger: card, start: "top 85%" },
  });
  gsap.from(card.querySelectorAll(".tech-badge"), {
    scale: 0, stagger: 0.04, ease: "back.out(1.7)", duration: 0.4,
    scrollTrigger: { trigger: card, start: "top 80%" },
  });
});
```

#### 9.4.4 ProjectCard（P0-3）

| 元素 | 动画 | 触发 |
|---|---|---|
| 卡片整体 | `y: 50 → 0` + `autoAlpha: 0 → 1` + `stagger: 0.15` | ScrollTrigger batch `top 85%` |
| 缩略图 | `scale: 1.08 → 1`（zoom-in） | 卡片入场同步 |
| hover | `y: -8` + `scale: 1.02` + 阴影变深 | 鼠标 hover（移动端 tap 触发同效果） |

```ts
ScrollTrigger.batch(".project-card", {
  start: "top 85%",
  onEnter: (batch) => gsap.to(batch, {
    y: 0, autoAlpha: 1, scale: 1, stagger: 0.15, duration: 0.7, ease: "power3.out",
  }),
});
```

#### 9.4.5 ArticlePreview（P2-1）

- 3 篇文章卡片：`stagger: 0.1` 入场
- hover：`y: -6` + daisyUI shadow 变深
- 跳转：原生 `<a target="_blank">`，**不**做额外动画

#### 9.4.6 Timeline（已有，小修）

| 元素 | 动画 |
|---|---|
| 时间轴主线 | 滚动驱动 `scaleY: 0 → 1`，`transformOrigin: "top center"` |
| 时间节点 | `x: ±30 → 0` + `autoAlpha`，`stagger: 0.1` |

```ts
gsap.to(".timeline-line", {
  scaleY: 1, ease: "none",
  scrollTrigger: { trigger: ".timeline", start: "top 80%", end: "bottom 60%", scrub: 1 },
});
```

#### 9.4.7 CTA Contact（P1-2）

- 4-6 卡片：`stagger: 0.08` 弹簧入场（`back.out(1.4)`）
- **微信按钮点击**：daisyUI `modal` 打开 + **二维码图片** `scale: 0.8 → 1` + `back.out(1.7)`（`duration: 0.4`）

#### 9.4.8 详情页 `/projects/[slug]`

| 元素 | 动画 |
|---|---|
| ProjectCover 标题 | `SplitText` / 行级 `stagger` 入场 |
| ProjectCover 背景 | 视差 `yPercent: -20`（`scrub: 1`） |
| Highlights bullet | `x: -20 → 0` + `autoAlpha`，`stagger: 0.08` |
| 截图画廊 | daisyUI `carousel` 切换 + GSAP `x: 100% → 0` 过渡 |
| Features 列表 | `stagger: 0.1` 弹簧入场 |
| Stats 数字 | `useCountUp` 同步 |

#### 9.4.9 全局装饰

| 元素 | 动画 | 备注 |
|---|---|---|
| **鼠标光标追随** | `gsap.quickTo()` 跟随，仅 `isDesktop` 启用 | 移动端禁用，触控点击不触发 |
| **Navbar 滚动变色** | `data-theme` 不变；`bg-base-100` 的 `autoAlpha: 0 → 1` | 与 daisyUI 主题兼容 |
| **路由切换** | `<Link>` 配合 Next.js 过渡；可选 `useGSAP` 监听 `pathname` 变化做 fade | 默认依赖 Next.js 内置 |

### 9.5 ScrollTrigger 触发点速查

| 场景 | start | end | 行为 |
|---|---|---|---|
| 入场动画 | `top 80%` | — | `toggleActions: "play none none reverse"` |
| 批量卡片 | `top 85%` | — | `once: true` |
| 视差 | `top top` | `bottom top` | `scrub: 1` |
| 进度填充 | `top 80%` | `bottom 60%` | `scrub: 1` |
| 数字 count-up | `top 80%` | — | `once: true` |
| 鼠标光标 | — | — | 无 ScrollTrigger，纯事件 |

### 9.6 性能基线

| 指标 | 目标 |
|---|---|
| Bundle 增加 | gsap 核心 ~25KB gzip + ScrollTrigger ~10KB + `@gsap/react` ~2KB |
| 同时活跃 ScrollTrigger | ≤ 6 个；列表场景用 `ScrollTrigger.batch()` 合并 |
| will-change | 仅在动画期间生效；结束后 `gsap.set(el, { clearProps: "all" })` |
| 移动端 60fps | 通过 `matchMedia` 关闭视差 / 大幅度 scale / 光标 |
| LCP | Hero 标题用纯 CSS 渲染占位，GSAP 动画在 mount 后启动 |
| 主题切换兼容 | 所有动画不动 `data-theme` 属性本身，只动 transform/opacity |

### 9.7 新增文件结构

```
src/
├─ lib/
│  └─ gsap.ts                    # 客户端注册 + defaults
├─ hooks/
│  └─ motion.ts                  # 5 个通用动效 hook
└─ components/
   └─ motion/
      ├─ Reveal.tsx              # 通用入场包装组件
      └─ Cursor.tsx              # 鼠标光标追随（桌面端）
```

### 9.8 动效与 daisyUI / 移动端协同约束

- **颜色过渡**：daisyUI 主题切换本身走 CSS transition；GSAP 不抢主题切换动画
- **daisyUI modal**：modal 打开时给 `<dialog>` 加 `data-state` 监听，配合 `gsap.from(".qrcode-img", { scale: 0.8, ease: "back.out(1.7)", duration: 0.4 })`
- **移动端 hover**：用 `gsap.matchMedia({ isDesktop: "(hover: hover)" })` 严格区分，避免触屏误触
- **图片懒加载**：next/image 加载完成前 GSAP 不入场；用 `gsap.delayedCall` 监听 `img.onload` 或用 `useEffect` 钩子

### 9.9 不做的动效

- ❌ 文字粒子 / 字符级随机飞入（性能差，意义小）
- ❌ 鼠标点击粒子爆炸（干扰操作）
- ❌ 大范围全屏视差（移动端掉帧）
- ❌ 路由切换大过渡（与 Next.js App Router 冲突）
- ❌ 自动播放视频/音频（影响性能与可访问性）