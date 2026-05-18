import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/config';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThemeGrid from '@/app/components/ThemeGrid';

export const dynamic = 'force-dynamic';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'en' | 'zh')) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <div className="drawer drawer-end">
        <input id="theme-drawer" type="checkbox" className="drawer-toggle" />

        {/* Main content */}
        <div className="drawer-content flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>

        {/* Drawer side */}
        <div className="drawer-side z-60">
          <label htmlFor="theme-drawer" aria-label="close sidebar" className="drawer-overlay" />
          <div className="bg-base-100 h-full overflow-y-auto w-[85vw] sm:w-96 max-w-md">
            <ThemeGrid />
          </div>
        </div>
      </div>
    </NextIntlClientProvider>
  );
}