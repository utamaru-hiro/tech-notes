import LanguageGuideView from '@/components/LanguageGuideView';
import type { LanguageGuide } from '@tech-notes/content';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const cData: LanguageGuide = require('@tech-notes/content/language/c').default;
// eslint-disable-next-line @typescript-eslint/no-require-imports
const pythonData: LanguageGuide = require('@tech-notes/content/language/python').default;
// eslint-disable-next-line @typescript-eslint/no-require-imports
const rustData: LanguageGuide = require('@tech-notes/content/language/rust').default;

const GUIDES: Record<string, LanguageGuide> = { c: cData, python: pythonData, rust: rustData };

export function generateStaticParams() {
  return Object.keys(GUIDES).map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const guide = GUIDES[lang];
  return { title: guide ? `${guide.lang} 言語仕様ガイド | Tech Notes` : 'Not Found' };
}

export default async function LanguagePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const guide = GUIDES[lang];
  if (!guide) notFound();

  const basePath = process.env.NODE_ENV === 'production' ? '/tech-notes' : '';
  return <LanguageGuideView guide={guide} homeHref={`${basePath}/`} />;
}
