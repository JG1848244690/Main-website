import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

export const dynamic = 'force-dynamic';

interface CanvasPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: CanvasPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === 'zh';

  return {
    title: isZh ? 'Canvas 实验室 - 序言-xy' : 'Canvas Lab - Omen-xy',
    description: isZh ? 'Canvas 技术学习与实验' : 'Canvas technology learning and experimentation',
  };
}

export default async function CanvasPage({ params }: CanvasPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <canvas
        id="canvas"
        width={800}
        height={600}
        className="bg-white rounded-box shadow-lg"
      />
    </div>
  );
}