import Link from 'next/link';

type LangEntry = { slug: string; emoji: string; title: string; desc: string };
type Category = { label: string; langs: LangEntry[] };

const CATEGORIES: Category[] = [
  {
    label: 'システム・低水準系',
    langs: [
      { slug: 'c',    emoji: '⚙️', title: 'C',    desc: 'ポインタ・メモリ管理・未定義動作など C 固有の落とし穴を重点解説。14 章構成。' },
      { slug: 'cpp',  emoji: '⚡', title: 'C++',  desc: 'RAII・テンプレート・スマートポインタなど C++ 固有の概念を重点解説。16 章構成。' },
      { slug: 'rust', emoji: '🦀', title: 'Rust', desc: '所有権・借用・ライフタイムなど Rust 固有の概念を丁寧に解説。16 章構成。' },
    ],
  },
  {
    label: 'スクリプト系',
    langs: [
      { slug: 'python',     emoji: '🐍', title: 'Python',     desc: '型ヒント・内包表記・非同期処理まで Python 3.12 を体系的に解説。16 章構成。' },
      { slug: 'javascript', emoji: '🟨', title: 'JavaScript', desc: '型強制・プロトタイプ・イベントループなど JS 固有の動作と落とし穴を重点解説。16 章構成。' },
      { slug: 'typescript', emoji: '🔷', title: 'TypeScript', desc: '型システムの仕組みから Mapped Types・Conditional Types まで体系的に解説。16 章構成。' },
    ],
  },
  {
    label: 'システム・並行処理系（Go）',
    langs: [
      { slug: 'go', emoji: '🐹', title: 'Go', desc: 'goroutine・channel・インターフェースなど Go 固有の設計思想を重点解説。16 章構成。' },
    ],
  },
];

function LangCard({ l }: { l: LangEntry }) {
  return (
    <Link
      href={`/language/${l.slug}/`}
      style={{
        display: 'block', padding: '20px 22px', borderRadius: 18,
        background: 'rgba(255,250,242,0.95)', border: '1px solid rgba(36,49,38,0.12)',
        boxShadow: '0 4px 18px rgba(36,49,38,0.09)', textDecoration: 'none', color: '#243126',
      }}
    >
      <div style={{ fontSize: '2rem', marginBottom: 8 }}>{l.emoji}</div>
      <div style={{ fontWeight: 800, marginBottom: 6 }}>{l.title} 言語仕様ガイド</div>
      <div style={{ fontSize: '0.85rem', color: '#5a695c', lineHeight: 1.65 }}>{l.desc}</div>
    </Link>
  );
}

export default function Home() {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px', fontFamily: '"Hiragino Sans","Yu Gothic",sans-serif', color: '#243126' }}>
      <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.6rem)', marginBottom: 8, letterSpacing: '0.02em' }}>
        Tech Notes
      </h1>
      <p style={{ color: '#5a695c', marginBottom: 40, lineHeight: 1.8 }}>
        プログラミング言語仕様ガイド＆技術用語集
      </p>
      {CATEGORIES.map((cat) => (
        <section key={cat.label} style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#5a695c', marginBottom: 16 }}>
            {cat.label}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 16 }}>
            {cat.langs.map((l) => <LangCard key={l.slug} l={l} />)}
          </div>
        </section>
      ))}
    </div>
  );
}
