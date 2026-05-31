'use client';

import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations('footer');
  const nav = useTranslations('nav');

  const localePath = locale === 'zh' ? '' : `/${locale}`;

  const isHomePage = pathname === '/' || pathname === `/${locale}` || pathname === localePath;

  const getHashLink = (hash: string) => {
    if (isHomePage) {
      return hash;
    }
    return `${localePath}${hash}`;
  };

  return (
    <footer className="bg-base-300 text-base-content">
      <div className="footer sm:footer-horizontal p-10 max-w-6xl mx-auto">
        <nav>
          <h6 className="footer-title">{t('nav')}</h6>
          <a className="link link-hover" href={getHashLink('#hero')}>{nav('home')}</a>
          <a className="link link-hover" href={getHashLink('#tech')}>{nav('tech')}</a>
          <a className="link link-hover" href={getHashLink('#projects')}>{nav('projects')}</a>
          <a className="link link-hover" href={getHashLink('#timeline')}>{nav('timeline')}</a>
        </nav>
        <nav>
          <h6 className="footer-title">{t('social')}</h6>
          <a className="link link-hover" href="https://github.com/JG1848244690/" target="_blank" rel="noopener noreferrer">{t('github')}</a>
        </nav>
        <nav>
          <h6 className="footer-title">{t('more')}</h6>
                    <a className="link link-hover" href="#">{t('about')}</a>
        </nav>
      </div>
      <div className="footer sm:footer-horizontal footer-center p-4 border-t border-base-content/10">
        <aside className="flex flex-col gap-1 items-center w-full text-sm opacity-80">
          <p>{t('copyright', { year: new Date().getFullYear() })}</p>
          <span>{t('disclaimer')}</span>
          <span>
            {t('email')}：<a href="mailto:dxy1848244690@gmail.com" className="link link-hover">dxy1848244690@gmail.com</a>
          </span>
          <a href="https://beian.miit.gov.cn" target="_blank" rel="noopener noreferrer" className="link link-hover">
            {t('icp')}
          </a>
        </aside>
      </div>
    </footer>
  );
}