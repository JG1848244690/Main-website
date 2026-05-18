import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

const techStack = [
  { categoryKey: 'frontend', items: ['React', 'Next.js', 'Vue 3', 'TypeScript', 'Tailwind CSS', 'daisyUI'] },
  { categoryKey: 'backend', items: ['Node.js', 'Python', 'Go', 'NestJS', 'Express'] },
  { categoryKey: 'database', items: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma'] },
  { categoryKey: 'devops', items: ['Docker', 'GitHub Actions', 'Vercel', 'Nginx'] },
  { categoryKey: 'exploring', items: ['Canvas', 'WebGL', 'Three.js', 'WASM'] },
];

const projects = [
  {
    title: 'TikTok Analytics',
    descKey: 'tiktok',
    tags: ['Next.js', 'TypeScript', 'Prisma'],
    badgeKey: 'product',
    badgeClass: 'badge-primary',
  },
  {
    title: 'Electron Chat',
    descKey: 'electron',
    tags: ['Electron', 'React', 'Node.js'],
    badgeKey: 'opensource',
    badgeClass: 'badge-secondary',
  },
  {
    title: 'Canvas 实验室',
    descKey: 'canvasLab',
    tags: ['Canvas', 'WebGL', 'TypeScript'],
    badgeKey: 'experimental',
    badgeClass: 'badge-accent',
  },
];

const timelineItems = [
  { year: '2024', titleKey: 'fullstackTitle', descKey: 'fullstackDesc' },
  { year: '2023', titleKey: 'engineeringTitle', descKey: 'engineeringDesc' },
  { year: '2022', titleKey: 'frameworkTitle', descKey: 'frameworkDesc' },
  { year: '2021', titleKey: 'beginnerTitle', descKey: 'beginnerDesc' },
];

const badgeColors = [
  'badge-primary', 'badge-secondary', 'badge-accent', 'badge-info',
  'badge-success', 'badge-warning', 'badge-ghost',
];

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations();
  const tech = await getTranslations('tech');
  const hero = await getTranslations('hero');
  const stats = await getTranslations('stats');
  const projectsT = await getTranslations('projects');
  const timelineT = await getTranslations('timeline');
  const cta = await getTranslations('cta');
  const projectsData = await getTranslations('projectsData');
  const timelineData = await getTranslations('timelineData');

  const localePath = locale === 'zh' ? '' : `/${locale}`;

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
            <h1 className="text-5xl font-bold">{hero('title')}</h1>
            <p className="py-6 text-lg opacity-80">
              {hero('subtitle')}
            </p>
            <p className="pb-6 opacity-70">
              {hero('description')}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a className="btn btn-primary" href="#projects">{hero('viewProjects')}</a>
              <a className="btn btn-outline" href="#tech">{hero('viewTech')}</a>
              <Link className="btn btn-ghost" href={`${localePath}/canvas`}>{hero('canvasLab')}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 bg-base-100">
        <div className="stats stats-vertical sm:stats-horizontal shadow max-w-4xl mx-auto w-full">
          <div className="stat place-items-center">
            <div className="stat-title">{stats('techStack')}</div>
            <div className="stat-value text-primary">20+</div>
          </div>
          <div className="stat place-items-center">
            <div className="stat-title">{stats('projects')}</div>
            <div className="stat-value text-secondary">6+</div>
          </div>
          <div className="stat place-items-center">
            <div className="stat-title">{stats('years')}</div>
            <div className="stat-value text-accent">4+</div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section id="tech" className="py-16 bg-base-200">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">{tech('title')}</h2>
          <div className="flex flex-col gap-8">
            {techStack.map((group) => (
              <div key={group.categoryKey}>
                <h3 className="text-lg font-semibold mb-3 opacity-70">{tech(`categories.${group.categoryKey}`)}</h3>
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
          <h2 className="text-3xl font-bold text-center mb-10">{projectsT('title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.title} className="card bg-base-200 shadow-sm">
                <div className="card-body">
                  <h3 className="card-title">
                    {project.title}
                    <div className={`badge ${project.badgeClass}`}>{t(`badges.${project.badgeKey}`)}</div>
                  </h3>
                  <p className="opacity-70">{projectsData(project.descKey)}</p>
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
          <h2 className="text-3xl font-bold text-center mb-10">{timelineT('title')}</h2>
          <ul className="timeline timeline-vertical timeline-compact">
            {timelineItems.map((item, i) => {
              const isFirst = i === 0;
              const isLast = i === timelineItems.length - 1;
              const isLeft = i % 2 === 0;
              return (
                <li key={item.year}>
                  {!isFirst && <hr className="bg-primary" />}
                  {isFirst && <hr className="bg-primary" />}
                  <div className="timeline-middle">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="text-primary h-5 w-5">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className={`${isLeft ? 'timeline-start' : 'timeline-end'} timeline-box mb-10`}>
                    <time className="font-mono italic">{item.year}</time>
                    <div className="text-lg font-black">{timelineData(item.titleKey)}</div>
                    {timelineData(item.descKey)}
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
          <h2 className="text-3xl font-bold mb-4">{cta('title')}</h2>
          <p className="mb-8 opacity-90">
            {cta('description')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a className="btn btn-primary" href="#">{t('social.wechat')}</a>
            <a className="btn btn-outline btn-neutral-content" href="#">GitHub</a>
          </div>
        </div>
      </section>
    </>
  );
}