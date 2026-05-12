export interface CodeBlock {
  lang: string;   // 'C' | 'Python' | 'Rust' | ...
  code: string;
}

export interface Item {
  id: string;
  name: string;
  level: 'basic' | 'advanced';
  keywords: string;   // スペース区切り
  desc: string;       // プレーンテキスト（インラインコードはバッククォート）
  code?: CodeBlock[];
  output?: string;
  warn?: string;
}

export interface Section {
  id: string;         // 's1' | 's2' | ...
  num: number;
  title: string;
  level: 'basic' | 'advanced';
  items: Item[];
}

export interface NavGroup {
  label: string;
  sections: string[]; // Section.id の配列
}

export interface LanguageGuide {
  lang: string;           // 'C' | 'Python' | 'Rust'
  langSlug: string;       // 'c' | 'python' | 'rust'
  version: string;        // 'C11/C17' | 'Python 3.12' | ...
  lead: string;
  accent: string;         // '#4a6fa5'
  accent2: string;        // '#e8f0fb'
  badgeGradient: string;  // 'linear-gradient(135deg, #1e3a5f, #4a6fa5)'
  heroEmoji: string;      // '⚙️'
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
