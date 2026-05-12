import Link from 'next/link';

const LANGS = [
  { slug: 'c', emoji: '⚙️', title: 'C 言語仕様ガイド', desc: 'ポインタ・メモリ管理・未定義動作など C 固有の落とし穴を重点解説。14 章構成。' },
  { slug: 'python', emoji: '🐍', title: 'Python 言語仕様ガイド', desc: '型ヒント・内包表記・非同期処理まで Python 3.12 を体系的に解説。16 章構成。' },
  { slug: 'rust', emoji: '🦀', title: 'Rust 言語仕様ガイド', desc: '所有権・借用・ライフタイムなど Rust 固有の概念を丁寧に解説。16 章構成。' },
  { slug: 'cpp', emoji: '⚡', title: 'C++ 言語仕様ガイド', desc: 'ポインタ・RAII・テンプレート・スマートポインタなど C++ 固有の概念を重点解説。16 章構成。' },
];

export default function Home() {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px', fontFamily: '"Hiragino Sans","Yu Gothic",sans-serif', color: '#243126' }}>
      <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.6rem)', marginBottom: 8, letterSpacing: '0.02em' }}>
        Tech Notes
      </h1>
      <p style={{ color: '#5a695c', marginBottom: 40, lineHeight: 1.8 }}>
        プログラミング言語仕様ガイド＆技術用語集
      </p>
      <section>
        <h2 style={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#5a695c', marginBottom: 16 }}>
          Language Guides
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 16 }}>
          {LANGS.map((l) => (
            <Link
              key={l.slug}
              href={`/language/${l.slug}/`}
              style={{
                display: 'block', padding: '20px 22px', borderRadius: 18,
                background: 'rgba(255,250,242,0.95)', border: '1px solid rgba(36,49,38,0.12)',
                boxShadow: '0 4px 18px rgba(36,49,38,0.09)', textDecoration: 'none', color: '#243126',
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: 8 }}>{l.emoji}</div>
              <div style={{ fontWeight: 800, marginBottom: 6 }}>{l.title}</div>
              <div style={{ fontSize: '0.85rem', color: '#5a695c', lineHeight: 1.65 }}>{l.desc}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
