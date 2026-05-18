const techStack = [
  { category: "前端", items: ["React", "Next.js", "Vue 3", "TypeScript", "Tailwind CSS", "daisyUI"] },
  { category: "后端", items: ["Node.js", "Python", "Go", "NestJS", "Express"] },
  { category: "数据库", items: ["PostgreSQL", "MongoDB", "Redis", "Prisma"] },
  { category: "DevOps", items: ["Docker", "GitHub Actions", "Vercel", "Nginx"] },
  { category: "探索中", items: ["Canvas", "WebGL", "Three.js", "WASM"] },
];

const projects = [
  {
    title: "TikTok Analytics",
    description: "TikTok 数据分析平台，提供视频数据追踪、创作者分析和趋势洞察",
    tags: ["Next.js", "TypeScript", "Prisma"],
    badge: "产品",
    badgeClass: "badge-primary",
  },
  {
    title: "Electron Chat",
    description: "基于 Electron 的桌面端聊天应用，支持多平台和端到端加密",
    tags: ["Electron", "React", "Node.js"],
    badge: "开源",
    badgeClass: "badge-secondary",
  },
  {
    title: "Canvas 实验室",
    description: "Canvas / WebGL 技术学习与实验项目，探索浏览器图形编程",
    tags: ["Canvas", "WebGL", "TypeScript"],
    badge: "实验",
    badgeClass: "badge-accent",
  },
];

const timelineItems = [
  { year: "2024", title: "全栈开发", desc: "深入 Next.js / React 全栈开发，构建多个生产级项目" },
  { year: "2023", title: "前端工程化", desc: "掌握 TypeScript、Monorepo、CI/CD 等工程化体系" },
  { year: "2022", title: "框架进阶", desc: "从 Vue 转向 React 生态，学习 Next.js 和服务端渲染" },
  { year: "2021", title: "入门开发", desc: "开始学习 Web 前端开发，掌握 HTML/CSS/JavaScript 基础" },
];

const badgeColors = [
  "badge-primary", "badge-secondary", "badge-accent", "badge-info",
  "badge-success", "badge-warning", "badge-ghost",
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section id="hero" className="hero bg-base-200 min-h-[80vh]">
        <div className="hero-content text-center">
          <div className="max-w-lg">
            <div className="avatar placeholder mb-6">
              <div className="bg-primary text-primary-content w-24 rounded-full">
                <span className="text-3xl">K</span>
              </div>
            </div>
            <h1 className="text-5xl font-bold">序言-xy</h1>
            <p className="py-6 text-lg opacity-80">
              全栈开发者 / 技术探索者 / 产品构建者
            </p>
            <p className="pb-6 opacity-70">
              热爱用代码解决实际问题，专注 Web 全栈开发与技术产品化
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a className="btn btn-primary" href="#projects">查看项目</a>
              <a className="btn btn-outline" href="#tech">技术栈</a>
              <a className="btn btn-ghost" href="/canvas">Canvas 实验室</a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 bg-base-100">
        <div className="stats stats-vertical sm:stats-horizontal shadow max-w-4xl mx-auto w-full">
          <div className="stat place-items-center">
            <div className="stat-title">技术栈</div>
            <div className="stat-value text-primary">20+</div>
          </div>
          <div className="stat place-items-center">
            <div className="stat-title">项目</div>
            <div className="stat-value text-secondary">6+</div>
          </div>
          <div className="stat place-items-center">
            <div className="stat-title">年经验</div>
            <div className="stat-value text-accent">4+</div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section id="tech" className="py-16 bg-base-200">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">技术栈</h2>
          <div className="flex flex-col gap-8">
            {techStack.map((group) => (
              <div key={group.category}>
                <h3 className="text-lg font-semibold mb-3 opacity-70">{group.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item, i) => (
                    <span key={item} className={`badge badge-lg ${badgeColors[i % badgeColors.length]}`}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-16 bg-base-100">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">项目与产品</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.title} className="card bg-base-200 shadow-sm">
                <div className="card-body">
                  <h3 className="card-title">
                    {project.title}
                    <div className={`badge ${project.badgeClass}`}>{project.badge}</div>
                  </h3>
                  <p className="opacity-70">{project.description}</p>
                  <div className="card-actions justify-end mt-2">
                    {project.tags.map((tag) => (
                      <div key={tag} className="badge badge-outline badge-sm">{tag}</div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section id="timeline" className="py-16 bg-base-200">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">成长历程</h2>
          <ul className="timeline timeline-vertical timeline-compact">
            {timelineItems.map((item, i) => {
              const isFirst = i === 0;
              const isLast = i === timelineItems.length - 1;
              const isLeft = i % 2 === 0;
              return (
                <li key={item.year}>
                  {!isFirst && <hr className="bg-primary" />}
                  {isFirst && <hr className="bg-primary" />}
                  <div className={`timeline-middle`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="text-primary h-5 w-5">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className={`${isLeft ? "timeline-start" : "timeline-end"} timeline-box mb-10`}>
                    <time className="font-mono italic">{item.year}</time>
                    <div className="text-lg font-black">{item.title}</div>
                    {item.desc}
                  </div>
                  {!isLast && <hr className="bg-primary" />}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Connect / CTA */}
      <section className="py-16 bg-neutral text-neutral-content">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">关注我</h2>
          <p className="mb-8 opacity-90">
            关注微信公众号，获取最新技术分享和产品动态
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a className="btn btn-primary" href="#">微信公众号</a>
            <a className="btn btn-outline btn-neutral-content" href="#">GitHub</a>
          </div>
        </div>
      </section>
    </>
  );
}
