'use client';

import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations('nav');

  const localePath = locale === 'zh' ? '' : `/${locale}`;

  // Check if we're on the home page (root or locale root)
  const isHomePage = pathname === '/' || pathname === `/${locale}` || pathname === localePath;

  // For hash links: if we're on home page, use relative hash. Otherwise navigate to home first.
  const getHashLink = (hash: string) => {
    if (isHomePage) {
      return hash;
    }
    return `${localePath}${hash}`;
  };

  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li><a href={getHashLink('#hero')}>{t('home')}</a></li>
            <li><a href={getHashLink('#tech')}>{t('tech')}</a></li>
            <li><a href={getHashLink('#projects')}>{t('projects')}</a></li>
            <li><a href={getHashLink('#timeline')}>{t('timeline')}</a></li>
          </ul>
        </div>
        <Link className="btn btn-ghost text-xl font-bold" href={localePath || '/'}>序言-xy</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-1">
          <li><a href={getHashLink('#hero')}>{t('home')}</a></li>
          <li><a href={getHashLink('#tech')}>{t('tech')}</a></li>
          <li><a href={getHashLink('#projects')}>{t('projects')}</a></li>
          <li><a href={getHashLink('#timeline')}>{t('timeline')}</a></li>
        </ul>
      </div>
      <div className="navbar-end gap-2">
        <div className="tooltip tooltip-left" data-tip="文档站点">
          <a href="https://doc.kskbl.com.cn" target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-circle" aria-label="文档站点">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </a>
        </div>
        <label htmlFor="theme-drawer" className="btn btn-ghost btn-circle" aria-label="切换主题">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
        </label>
        <LanguageSwitcher />
      </div>
    </div>
  );
}