import CryptoGuideView from '@/components/CryptoGuideView';
import type { LanguageGuide } from '@tech-notes/content';
import type { Metadata } from 'next';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const cryptoData: LanguageGuide = require('@tech-notes/content/crypto').default;

export const metadata: Metadata = {
  title: '暗号技術ガイド | Tech Notes',
  description: '暗号技術キーワード200を、既存の言語仕様ガイドと同じUIで体系的に学ぶページです。',
};

export default async function CryptoPage() {
  const basePath = process.env.NODE_ENV === 'production' ? '/tech-notes' : '';
  return (
    <CryptoGuideView
      guide={cryptoData}
      homeHref={`${basePath}/`}
      assetBasePath={basePath}
    />
  );
}
