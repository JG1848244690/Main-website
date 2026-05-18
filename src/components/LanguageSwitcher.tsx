'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations('language');
  const router = useRouter();

  const toggleLanguage = () => {
    const newLocale = locale === 'zh' ? 'en' : 'zh';
    router.push(`/${newLocale}`);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="btn btn-ghost btn-circle"
      aria-label={t('switch')}
      title={t('switch')}
    >
      <span className="text-sm font-medium">{locale === 'zh' ? 'EN' : '中'}</span>
    </button>
  );
}