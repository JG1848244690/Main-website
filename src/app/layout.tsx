import type { Metadata } from 'next';
import './globals.css';
import ThemeInit from '@/components/ThemeInit';

export const metadata: Metadata = {
  title: '序言-xy - 全栈开发者',
  description: 'kskbl.com.cn 个人主页 — 技术栈展示、项目集、产品引流',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body className="min-h-screen">
        <ThemeInit />
        {children}
      </body>
    </html>
  );
}