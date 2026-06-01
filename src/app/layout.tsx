import type { Metadata } from 'next';
import './globals.css';
import ThemeInit from '@/components/ThemeInit';

export const metadata: Metadata = {
  title: '序言-xy - 全栈开发者',
  description: 'kskbl.com.cn 个人主页 — 技术栈展示、项目集、产品引流',
  icons: {
    icon: '/128.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=Noto+Sans+SC:wght@400;500;700&display=swap" rel="stylesheet" />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{document.documentElement.setAttribute('data-theme',localStorage.getItem('theme')||'dark')}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-screen">
        <ThemeInit />
        {children}
      </body>
    </html>
  );
}