import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ThemeGrid from "./components/ThemeGrid";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "kskbl - 全栈开发者",
  description: "kskbl.com.cn 个人主页 — 技术栈展示、项目集、产品引流",
  keywords: "kskbl, 全栈开发, React, Next.js, TypeScript, Canvas, 前端",
  openGraph: {
    title: "kskbl - 全栈开发者",
    description: "kskbl.com.cn 个人主页 — 技术栈展示、项目集、产品引流",
    url: "https://kskbl.com.cn",
    siteName: "kskbl",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme')||'light';document.documentElement.setAttribute('data-theme',t)}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-screen">
        <div className="drawer drawer-end">
          <input id="theme-drawer" type="checkbox" className="drawer-toggle" />

          {/* Main content */}
          <div className="drawer-content flex flex-col min-h-screen">
            {/* Navbar */}
            <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
              <div className="navbar-start">
                <div className="dropdown">
                  <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                  </div>
                  <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                    <li><a href="#hero">首页</a></li>
                    <li><a href="#tech">技术栈</a></li>
                    <li><a href="#projects">项目</a></li>
                    <li><a href="#timeline">历程</a></li>
                    <li><a href="/canvas">Canvas</a></li>
                  </ul>
                </div>
                <a className="btn btn-ghost text-xl font-bold" href="/">kskbl</a>
              </div>
              <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-1">
                  <li><a href="#hero">首页</a></li>
                  <li><a href="#tech">技术栈</a></li>
                  <li><a href="#projects">项目</a></li>
                  <li><a href="#timeline">历程</a></li>
                  <li><a href="/canvas">Canvas</a></li>
                </ul>
              </div>
              <div className="navbar-end gap-2">
                <label htmlFor="theme-drawer" className="btn btn-ghost btn-circle" aria-label="切换主题">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </label>
              </div>
            </div>

            <main className="flex-1">{children}</main>

            {/* Footer */}
            <footer className="bg-base-300 text-base-content">
              <div className="footer sm:footer-horizontal p-10 max-w-6xl mx-auto">
                <nav>
                  <h6 className="footer-title">导航</h6>
                  <a className="link link-hover" href="#hero">首页</a>
                  <a className="link link-hover" href="#tech">技术栈</a>
                  <a className="link link-hover" href="#projects">项目</a>
                  <a className="link link-hover" href="#timeline">历程</a>
                </nav>
                <nav>
                  <h6 className="footer-title">社交</h6>
                  <a className="link link-hover" href="#">微信公众号</a>
                  <a className="link link-hover" href="#">GitHub</a>
                  <a className="link link-hover" href="#">掘金</a>
                </nav>
                <nav>
                  <h6 className="footer-title">更多</h6>
                  <a className="link link-hover" href="/canvas">Canvas 实验室</a>
                  <a className="link link-hover" href="#">关于我</a>
                </nav>
              </div>
              <div className="footer sm:footer-horizontal footer-center p-4 border-t border-base-content/10">
                <aside>
                  <p>Copyright © {new Date().getFullYear()} kskbl.com.cn — All rights reserved</p>
                </aside>
              </div>
            </footer>
          </div>

          {/* Drawer side */}
          <div className="drawer-side z-[60]">
            <label htmlFor="theme-drawer" aria-label="close sidebar" className="drawer-overlay" />
            <div className="bg-base-100 h-full overflow-y-auto w-[85vw] sm:w-96 max-w-md">
              <ThemeGrid />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
