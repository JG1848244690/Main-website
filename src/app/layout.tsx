import type { Metadata } from 'next';
import './globals.css';
import ThemeInit from '@/components/ThemeInit';

const siteUrl = 'https://kskbl.com.cn';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: '序言-xy · 主前端 · 可全栈工程师',
    template: '%s · 序言-xy',
  },
  description:
    '主前端·可全栈工程师。主用 React 19 / Next.js 16，兼顾 Node 后端与浏览器扩展。代表项目：Athena 学习平台、Tiktools Chrome 插件（精选 / 200+ 安装）。',
  keywords: [
    '序言-xy',
    '主前端',
    '全栈工程师',
    'Next.js 16',
    'React 19',
    'NestJS',
    'Chrome Extension',
    'Athena',
    'Tiktools',
    'AntV-X6',
    'FFmpeg',
    'WXT',
    'Playwright',
  ],
  authors: [{ name: '序言-xy' }],
  creator: '序言-xy',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    alternateLocale: 'en_US',
    url: siteUrl,
    siteName: '序言-xy',
    title: '序言-xy · 主前端 · 可全栈工程师',
    description:
      '主前端·可全栈工程师。主用 React 19 / Next.js 16，兼顾 Node 后端与浏览器扩展。',
    images: [
      {
        url: '/og-default.svg',
        width: 1200,
        height: 630,
        alt: '序言-xy 个人主页',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '序言-xy · 主前端 · 可全栈工程师',
    description:
      '主前端·可全栈工程师。React 19 / Next.js 16 / Chrome Extension / Athena / Tiktools',
    images: ['/og-default.svg'],
  },
  icons: {
    icon: '/128.png',
  },
  alternates: {
    canonical: '/',
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
