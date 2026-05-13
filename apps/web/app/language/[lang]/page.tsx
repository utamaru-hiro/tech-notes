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
// eslint-disable-next-line @typescript-eslint/no-require-imports
const cppData: LanguageGuide = require('@tech-notes/content/language/cpp').default;
// eslint-disable-next-line @typescript-eslint/no-require-imports
const goData: LanguageGuide = require('@tech-notes/content/language/go').default;
// eslint-disable-next-line @typescript-eslint/no-require-imports
const jsData: LanguageGuide = require('@tech-notes/content/language/javascript').default;
// eslint-disable-next-line @typescript-eslint/no-require-imports
const tsData: LanguageGuide = require('@tech-notes/content/language/typescript').default;
// eslint-disable-next-line @typescript-eslint/no-require-imports
const javaData: LanguageGuide = require('@tech-notes/content/language/java').default;
// eslint-disable-next-line @typescript-eslint/no-require-imports
const kotlinData: LanguageGuide = require('@tech-notes/content/language/kotlin').default;
// eslint-disable-next-line @typescript-eslint/no-require-imports
const csharpData: LanguageGuide = require('@tech-notes/content/language/csharp').default;
// eslint-disable-next-line @typescript-eslint/no-require-imports
const swiftData: LanguageGuide = require('@tech-notes/content/language/swift').default;
// eslint-disable-next-line @typescript-eslint/no-require-imports
const dartData: LanguageGuide = require('@tech-notes/content/language/dart').default;
// eslint-disable-next-line @typescript-eslint/no-require-imports
const rubyData: LanguageGuide = require('@tech-notes/content/language/ruby').default;
// eslint-disable-next-line @typescript-eslint/no-require-imports
const phpData: LanguageGuide = require('@tech-notes/content/language/php').default;

const GUIDES: Record<string, LanguageGuide> = { c: cData, python: pythonData, rust: rustData, cpp: cppData, go: goData, javascript: jsData, typescript: tsData, java: javaData, kotlin: kotlinData, csharp: csharpData, swift: swiftData, dart: dartData, ruby: rubyData, php: phpData };

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
