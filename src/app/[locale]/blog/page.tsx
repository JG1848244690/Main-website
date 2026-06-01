import { setRequestLocale } from "next-intl/server";
import BlogView from "./BlogView";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <BlogView />;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const isEn = locale === "en";
  return {
    title: isEn ? "Blog · 序言-xy" : "博客 · 序言-xy",
    description: isEn
      ? "Articles from 序言-xy's WeChat blog, sorted newest first"
      : "序言-xy 公众号文章，按时间倒序",
  };
}
