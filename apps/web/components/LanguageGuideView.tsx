'use client';

import type { Item, LanguageGuide, Section } from '@tech-notes/content';
import hljs from 'highlight.js';
import { useCallback, useEffect, useRef, useState } from 'react';

interface Props {
  guide: LanguageGuide;
  homeHref: string;
}

export default function LanguageGuideView({ guide, homeHref }: Props) {
  const [activeLevel, setActiveLevel] = useState<'all' | 'basic' | 'advanced'>('all');
  const [query, setQuery] = useState('');
  const [activeSection, setActiveSection] = useState(guide.sections[0]?.id ?? '');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // highlight.js
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  // IntersectionObserver でアクティブセクション追跡
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActiveSection(e.target.id);
        }
      },
      { rootMargin: '-25% 0px -65% 0px' }
    );
    const cards = document.querySelectorAll('.section-card[id]');
    cards.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const filterVisible = useCallback((sec: Section, item: Item): boolean => {
    if (activeLevel !== 'all' && item.level !== activeLevel) return false;
    if (query) {
      const q = query.toLowerCase();
      if (
        !item.keywords.toLowerCase().includes(q) &&
        !item.name.toLowerCase().includes(q) &&
        !item.desc.toLowerCase().includes(q)
      ) return false;
    }
    return true;
  }, [activeLevel, query]);

  const isSectionVisible = (sec: Section): boolean =>
    sec.items.some((item) => filterVisible(sec, item));

  const noResults = guide.sections.every((sec) => !isSectionVisible(sec));

  const copyCode = async (code: string, btn: HTMLButtonElement) => {
    await navigator.clipboard.writeText(code);
    btn.textContent = 'コピー済み';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = 'コピー';
      btn.classList.remove('copied');
    }, 1500);
  };

  return (
    <div className="layout">
      {/* ===== Sidebar ===== */}
      <nav className={`sidebar${sidebarOpen ? ' is-open' : ''}`} id="sidebar">
        <div className="sidebar-logo">
          <div
            className="lang-badge"
            style={{ background: guide.badgeGradient }}
          >
            {guide.lang.slice(0, 2)}
          </div>
          <span>
            {guide.lang}
            <br />
            言語仕様ガイド
          </span>
        </div>

        {guide.navGroups.map((group) => (
          <div key={group.label}>
            <div className="nav-group-label">{group.label}</div>
            {group.sections.map((secId) => {
              const sec = guide.sections.find((s) => s.id === secId);
              if (!sec) return null;
              return (
                <a
                  key={secId}
                  className={`nav-link${activeSection === secId ? ' active' : ''}`}
                  href={`#${secId}`}
                  onClick={() => setTimeout(() => setSidebarOpen(false), 180)}
                >
                  <span className="num">{sec.num}</span>
                  {sec.title}
                </a>
              );
            })}
          </div>
        ))}
      </nav>

      {/* ===== Main ===== */}
      <div className="main">
        <header className="hero">
          <span className="hero-emoji" aria-hidden="true">{guide.heroEmoji}</span>
          <h1>
            <em>{guide.lang}</em> 言語仕様ガイド
          </h1>
          <p className="lead">{guide.lead}</p>
          <div className="hero-chips">
            <span className="chip">{guide.version}</span>
            <span className="chip">経験者向け</span>
            <span className="chip">コード例付き</span>
          </div>
        </header>

        <div className="toolbar">
          <div className="level-tabs" role="tablist">
            {(['all', 'basic', 'advanced'] as const).map((lv) => (
              <button
                key={lv}
                className={`level-tab${activeLevel === lv ? ' is-active' : ''}`}
                onClick={() => setActiveLevel(lv)}
              >
                {lv === 'all' ? 'すべて' : lv === 'basic' ? '基礎' : '応用'}
              </button>
            ))}
          </div>
          <div className="search-wrap">
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M9 3a6 6 0 100 12A6 6 0 009 3zM1 9a8 8 0 1114.32 4.906l3.387 3.387a1 1 0 01-1.414 1.414l-3.387-3.387A8 8 0 011 9z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="search"
              placeholder="キーワードで検索…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        <main className="content" ref={contentRef}>
          {noResults && (
            <p className="no-results" style={{ display: 'block' }}>
              一致する項目が見つかりませんでした。
            </p>
          )}

          {guide.sections.map((sec) => {
            const secVisible = isSectionVisible(sec);
            return (
              <div
                key={sec.id}
                className={`section-card${secVisible ? '' : ' hidden'}`}
                id={sec.id}
              >
                <div className="section-head">
                  <span className="section-num">{String(sec.num).padStart(2, '0')}</span>
                  <h2>{sec.title}</h2>
                  <span className="badge">{sec.level === 'basic' ? '基礎' : '応用'}</span>
                </div>
                <div className="items-list">
                  {sec.items.map((item) => {
                    const itemVisible = filterVisible(sec, item);
                    return (
                      <div
                        key={item.id}
                        className={`item${itemVisible ? '' : ' hidden'}`}
                        data-level={item.level}
                        data-keywords={item.keywords}
                      >
                        <div className="item-header">
                          <span className="item-name">{item.name}</span>
                          <span className={`level-pill pill-${item.level}`}>
                            {item.level === 'basic' ? '基礎' : '応用'}
                          </span>
                        </div>
                        <p
                          className="item-desc"
                          dangerouslySetInnerHTML={{
                            __html: item.desc.replace(
                              /`([^`]+)`/g,
                              '<code>$1</code>'
                            ),
                          }}
                        />
                        {item.code?.map((cb, i) => (
                          <div key={i} className="code-wrap">
                            <div className="code-header">
                              <span className="code-lang">{cb.lang}</span>
                              <button
                                className="copy-btn"
                                onClick={(e) =>
                                  copyCode(cb.code, e.currentTarget)
                                }
                              >
                                コピー
                              </button>
                            </div>
                            <pre>
                              <code
                                className={`language-${guide.langSlug}`}
                                dangerouslySetInnerHTML={{ __html: hljs.highlight(cb.code, { language: guide.langSlug }).value }}
                              />
                            </pre>
                          </div>
                        ))}
                        {item.output && (
                          <div className="output-box">{item.output}</div>
                        )}
                        {item.warn && (
                          <div
                            className="warn-box"
                            dangerouslySetInnerHTML={{
                              __html: item.warn.replace(
                                /`([^`]+)`/g,
                                '<code>$1</code>'
                              ),
                            }}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </main>
      </div>

      {/* ===== Floating buttons ===== */}
      <div className="floating-btns">
        <a className="float-btn" href={homeHref} title="ホームへ">🏠</a>
        <a className="float-btn" href="#" title="一番上へ">↑</a>
      </div>

      {/* ===== Mobile nav toggle ===== */}
      <button
        className="mobile-nav-toggle"
        onClick={() => setSidebarOpen((o) => !o)}
        aria-label="ナビゲーションを開く"
      >
        ☰
      </button>
    </div>
  );
}
