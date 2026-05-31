import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

const projects = [
  {
    title: 'Athena 学习平台',
    titleEn: 'Athena Learning Platform',
    descKey: 'athena',
    tags: ['Next.js', 'NestJS', 'Tailwind CSS', 'AntV-X6'],
    badgeKey: 'featured',
    badgeClass: 'badge-primary',
  },
  {
    title: 'Tiktools Chrome 插件',
    titleEn: 'Tiktools Chrome Extension',
    descKey: 'tiktools',
    tags: ['Chrome Extension', 'WXT', 'TypeScript'],
    badgeKey: 'featured',
    badgeClass: 'badge-secondary',
  },
];

const timelineItems = [
  { id: 'work-current', year: '2026-至今', titleKey: 'work1Title', descKey: 'work1Desc', type: 'work' },
  { id: 'work-intern', year: '2025', titleKey: 'work2Title', descKey: 'work2Desc', type: 'work' },
  { id: 'project-athena', year: '2025', titleKey: 'project1Title', descKey: 'project1Desc', type: 'project' },
  { id: 'edu', year: '2021-2025', titleKey: 'edu1Title', descKey: 'edu1Desc', type: 'edu' },
];

const techCategories = [
  { categoryKey: 'frontend', items: ['React', 'Next.js', 'Vue3', 'TypeScript', 'Tailwind CSS'] },
  { categoryKey: 'ui', items: ['shadcn', 'daisyUI', 'Ant Design', 'Vant'] },
  { categoryKey: 'tools', items: ['Git', 'Webpack', 'Vite', 'Playwright', 'Vitest'] },
  { categoryKey: 'ai', items: ['AI Agent', 'RAG', 'Chrome Extension', 'Electron', 'UniApp'] },
];

const badgeColors = ['badge-primary', 'badge-secondary', 'badge-accent', 'badge-info', 'badge-success'];

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations();
  const tech = await getTranslations('tech');
  const hero = await getTranslations('hero');
  const projectsT = await getTranslations('projects');
  const timelineT = await getTranslations('timeline');
  const cta = await getTranslations('cta');
  const projectsData = await getTranslations('projectsData');
  const timelineData = await getTranslations('timelineData');

  const localePath = locale === 'zh' ? '' : `/${locale}`;

  return (
    <>
      {/* Hero Section */}
      <section
        id="hero"
        className="hero min-h-screen"
        style={{
          backgroundImage: "url(/微信图片_20260531163536_157_9.jpg)",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-lg animate__animated animate__fadeInUp">
            <h1 className="mb-5 text-5xl font-bold animate__animated animate__fadeInUp animate__delay-100">{hero('title')}</h1>
            <p className="mb-4 text-xl opacity-90 animate__animated animate__fadeInUp animate__delay-200">{hero('subtitle')}</p>
            <p className="mb-8 opacity-80 max-w-md mx-auto animate__animated animate__fadeInUp animate__delay-300">{hero('description')}</p>
            <div className="flex flex-wrap justify-center gap-3 animate__animated animate__fadeInUp animate__delay-400">
              <a className="btn btn-primary" href="#projects">{hero('viewProjects')}</a>
              <a className="btn btn-outline btn-primary" href="#tech">{hero('viewTech')}</a>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section id="tech" className="py-16 bg-base-200">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">{tech('title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {techCategories.map((cat) => (
              <div key={cat.categoryKey} className="card bg-base-100 shadow">
                <div className="card-body">
                  <h3 className="card-title text-lg mb-4">{tech(`categories.${cat.categoryKey}`)}</h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((item, i) => (
                      <span key={item} className={`badge badge-lg ${badgeColors[i % badgeColors.length]}`}>{item}</span>
                    ))}
                  </div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div key={project.title} className="card bg-base-200 shadow hover:shadow-lg transition-shadow">
                <div className="card-body">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="card-title text-lg">{locale === 'zh' ? project.title : project.titleEn}</h3>
                    <div className={`badge ${project.badgeClass}`}>{t(`badges.${project.badgeKey}`)}</div>
                  </div>
                  <p className="opacity-70 text-sm">{projectsData(project.descKey)}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
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
                <li key={item.id}>
                  {!isFirst && <hr />}
                  <div className="timeline-middle">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="text-primary h-5 w-5">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className={`${isLeft ? 'timeline-start' : 'timeline-end'} timeline-box mb-8 bg-base-100 shadow`}>
                    <time className="font-mono italic text-sm opacity-60">{item.year}</time>
                    <div className="text-lg font-bold mt-1">{timelineData(item.titleKey)}</div>
                    <p className="text-sm opacity-70 mt-1">{timelineData(item.descKey)}</p>
                  </div>
                  {!isLast && <hr />}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-neutral">
        <div className="max-w-2xl mx-auto px-4 text-center text-neutral-content">
          <h2 className="text-3xl font-bold mb-4">{cta('title')}</h2>
          <p className="mb-8 opacity-90">{cta('description')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a className="btn btn-primary" href="mailto:dxy1848244690@gmail.com">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email
            </a>
            <a className="btn btn-outline btn-neutral-content" href="https://github.com/JG1848244690/" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </section>
    </>
  );
}