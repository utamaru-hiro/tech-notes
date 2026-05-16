export interface CodeBlock {
  lang: string;   // 'C' | 'Python' | 'Rust' | ...
  code: string;
}

export interface DiagramAsset {
  src: string;
  alt: string;
  caption?: string;
}

export interface Item {
  id: string;
  title?: string;     // 技術ガイド向けの表示名
  name?: string;      // 言語ガイド向けの表示名
  level: 'basic' | 'advanced';
  keywords: string;   // スペース区切り
  desc: string;       // プレーンテキスト（インラインコードはバッククォート）
  diagram?: DiagramAsset;
  code?: CodeBlock[];
  output?: string;
  warn?: string;
}

export interface Section {
  id: string;         // 's1' | 's2' | ...
  num: number;
  title: string;
  lead?: string;
  keywords?: string[];
  level: 'basic' | 'advanced';
  items: Item[];
}

export interface NavGroup {
  label: string;
  lead?: string;
  sections: string[]; // Section.id の配列
}

export interface LanguageGuide {
  lang: string;           // 'C' | 'Python' | 'Rust'
  langSlug: string;       // 'c' | 'python' | 'rust'
  version: string;        // 'C11/C17' | 'Python 3.12' | ...
  lead: string;
  accent: string;           // '#4a6fa5'
  accent2: string;          // '#e8f0fb'
  bgGradientTop: string;    // '#eef2f8' — body 背景グラデーションの上端色
  bgRadialLeft: string;     // 'rgba(74,111,165,0.15)' — 左上の輬射グラデーション
  bgRadialRight: string;    // 'rgba(168,180,200,0.18)' — 右上の輬射グラデーション
  badgeGradient: string;    // 'linear-gradient(135deg, #1e3a5f, #4a6fa5)'
  heroEmoji: string;        // '⚙️'
  navGroups: NavGroup[];
  sections: Section[];
}

export interface TechGuide {
  title: string;
  slug: string;
  lead: string;
  accent: string;
  accent2: string;
  badgeGradient: string;
  heroEmoji: string;
  categories: TechCategory[];
}

export interface TechCategory {
  id: string;
  title: string;
  items: TechItem[];
}

export interface TechItem {
  id: string;
  term: string;
  level: 'basic' | 'advanced';
  keywords: string;
  desc: string;
  related?: string[];
}
