'use client';

import type { Item, LanguageGuide, Section } from '@tech-notes/content';
import hljs from 'highlight.js';
import { useCallback, useEffect, useRef, useState } from 'react';

interface Props {
  guide: LanguageGuide;
  homeHref: string;
}

export default function CryptoGuideView({ guide, homeHref }: Props) {
  const [activeLevel, setActiveLevel] = useState<'all' | 'basic' | 'advanced'>('all');
  const [query, setQuery] = useState('');
  const [activeSection, setActiveSection] = useState(guide.sections[0]?.id ?? '');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bmIdx, setBmIdx] = useState<number>(-1);
  const [bmModalOpen, setBmModalOpen] = useState(false);
  const bmIdxRef = useRef<number>(-1);
  const contentRef = useRef<HTMLDivElement>(null);

  const BM_KEY = `bm_${guide.langSlug}`;

  // ブックマーク: localStorage から初期値読み込み
  useEffect(() => {
    const stored = localStorage.getItem(BM_KEY);
    const idx = parseInt(stored ?? '-1', 10);
    setBmIdx(idx);
    bmIdxRef.current = idx;
  }, [BM_KEY]);

  // 言語ごとの背景色を body に注入
  useEffect(() => {
    document.body.style.setProperty('--bg-top', guide.bgGradientTop);
    document.body.style.setProperty('--bg-radial-left', guide.bgRadialLeft);
    document.body.style.setProperty('--bg-radial-right', guide.bgRadialRight);
    return () => {
      document.body.style.removeProperty('--bg-top');
      document.body.style.removeProperty('--bg-radial-left');
      document.body.style.removeProperty('--bg-radial-right');
    };
  }, [guide.bgGradientTop, guide.bgRadialLeft, guide.bgRadialRight]);

  // ブックマーク: 変更を localStorage に保存
  useEffect(() => {
    bmIdxRef.current = bmIdx;
    if (bmIdx === -1) {
      localStorage.removeItem(BM_KEY);
    } else {
      localStorage.setItem(BM_KEY, String(bmIdx));
    }
  }, [bmIdx, BM_KEY]);

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

  // スクロールで自動ブックマーク追跡
  useEffect(() => {
    const handler = () => {
      const current = bmIdxRef.current;
      if (current === -2) {
        if (window.scrollY < 200) {
          setBmIdx(-1);
        }
        return;
      }
      const midY = window.innerHeight / 3;
      const allItems = Array.from(
        document.querySelectorAll<HTMLElement>('.item[data-item-idx]')
      );
      let lastRead = -1;
      for (const el of allItems) {
        if (el.classList.contains('hidden')) continue;
        if (el.getBoundingClientRect().bottom < midY) {
          lastRead = Number(el.dataset.itemIdx);
        }
      }
      if (lastRead < 0) return;
      const next = lastRead + 1;
      if (next >= allItems.length) return;
      if (next > current) {
        setBmIdx(next);
      }
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const jumpToBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    const allItems = Array.from(
      document.querySelectorAll<HTMLElement>('.item[data-item-idx]')
    );
    const target = allItems.find((el) => Number(el.dataset.itemIdx) === bmIdx);
    if (!target) return;
    const toolbar = document.getElementById('toolbar');
    const toolbarBottom = toolbar ? toolbar.getBoundingClientRect().bottom : 0;
    const top = target.getBoundingClientRect().top + window.scrollY - toolbarBottom - 8;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  const filterVisible = useCallback((sec: Section, item: Item): boolean => {
    if (activeLevel !== 'all' && item.level !== activeLevel) return false;
    if (query) {
      const q = query.toLowerCase();
      const itemLabel = (item.title ?? item.name ?? '').toLowerCase();
      if (
        !item.keywords.toLowerCase().includes(q) &&
        !itemLabel.includes(q) &&
        !item.desc.toLowerCase().includes(q)
      ) return false;
    }
    return true;
  }, [activeLevel, query]);

  const isSectionVisible = (sec: Section): boolean =>
    sec.items.some((item) => filterVisible(sec, item));

  const noResults = guide.sections.every((sec) => !isSectionVisible(sec));

  // 全 item のフラットインデックスを事前計算
  const flatIndexMap = new Map<string, number>();
  let flatCounter = 0;
  for (const sec of guide.sections) {
    for (const item of sec.items) {
      flatIndexMap.set(item.id, flatCounter++);
    }
  }
  const totalItems = flatCounter;

  const sectionById = new Map(guide.sections.map((sec) => [sec.id, sec]));
  const chapterBySectionId = new Map<string, string>();
  const chapterLeadBySectionId = new Map<string, string | undefined>();
  const firstVisibleSectionIdSet = new Set<string>();
  for (const group of guide.navGroups) {
    const visibleSectionIds = group.sections.filter((sectionId) => {
      const sec = sectionById.get(sectionId);
      return sec ? isSectionVisible(sec) : false;
    });
    if (visibleSectionIds[0]) {
      firstVisibleSectionIdSet.add(visibleSectionIds[0]);
    }

    for (const sectionId of group.sections) {
      chapterBySectionId.set(sectionId, group.label);
      chapterLeadBySectionId.set(sectionId, group.lead);
    }
  }

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
    <div
      className="layout tech-guide"
      style={
        {
          '--accent': guide.accent,
          '--accent2': guide.accent2,
        } as React.CSSProperties
      }
    >
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
            暗号技術ガイド
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
            <em>{guide.lang}</em> 技術ガイド
          </h1>
          <p className="lead">{guide.lead}</p>
          <div className="hero-chips">
            <span className="chip">{guide.version}</span>
            <span className="chip">章・節構成</span>
            <span className="chip">キーワード一覧</span>
          </div>
        </header>

        <div className="toolbar" id="toolbar">
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
            const visibleItems = sec.items.filter((item) => filterVisible(sec, item));
            const sectionKeywords = sec.keywords?.length
              ? sec.keywords
              : visibleItems
                  .map((item) => item.title ?? item.name ?? '')
                  .filter((word) => word.length > 0);
            const secVisible = visibleItems.length > 0;
            const showChapterPanel = firstVisibleSectionIdSet.has(sec.id);
            const chapterTitle = chapterBySectionId.get(sec.id) ?? '章未設定';
            const chapterLead = chapterLeadBySectionId.get(sec.id);
            return (
              <div key={sec.id} className="section-block">
                {showChapterPanel && (
                  <section className="chapter-panel">
                    <h2>{chapterTitle}</h2>
                    {chapterLead && <p className="chapter-panel-lead">{chapterLead}</p>}
                  </section>
                )}

                <div
                  className={`section-card${secVisible ? '' : ' hidden'}`}
                  id={sec.id}
                >
                  <div className="section-head">
                    <span className="section-num">{String(sec.num).padStart(2, '0')}節</span>
                    <h2>{sec.title}</h2>
                    <span className="badge">{chapterTitle}</span>
                  </div>
                  {sec.lead && <p className="section-lead section-lead-under">{sec.lead}</p>}
                  {sec.lead && sectionKeywords.length > 0 && (
                    <div className="section-keywords">
                      <span className="section-keywords-label">キーワード</span>
                      <div className="section-keyword-list">
                        {sectionKeywords.map((word) => (
                          <span key={`kw-${sec.id}-${word}`} className="section-keyword-chip">{word}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="items-list">
                    {sec.items.map((item) => {
                      const itemVisible = filterVisible(sec, item);
                      const flatIdx = flatIndexMap.get(item.id) ?? 0;
                      const isBookmarked = flatIdx === bmIdx;
                      return (
                        <div
                          key={item.id}
                          className={`item${itemVisible ? '' : ' hidden'}${isBookmarked ? ' is-bookmarked' : ''}`}
                          data-level={item.level}
                          data-keywords={item.keywords}
                          data-item-idx={flatIdx}
                        >
                          {isBookmarked && (
                            <div className="bm-line">
                              <span className="bm-line-icon">🔖</span>
                              <span className="bm-line-dash" />
                              <button
                                className="bm-line-del"
                                title="ブックマークを削除"
                                onClick={() => setBmModalOpen(true)}
                              >✕</button>
                            </div>
                          )}
                          <div className="item-header">
                            <span className="item-name">{item.title ?? item.name ?? ''}</span>
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
                          {item.diagram && (
                            <figure className="diagram-figure">
                              <img
                                className="diagram-image"
                                src={item.diagram.src}
                                alt={item.diagram.alt}
                                loading="lazy"
                              />
                              {item.diagram.caption && (
                                <figcaption>{item.diagram.caption}</figcaption>
                              )}
                            </figure>
                          )}
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
                                  dangerouslySetInnerHTML={{ __html: (() => { try { return hljs.highlight(cb.code, { language: cb.lang.toLowerCase() }).value; } catch { return hljs.highlightAuto(cb.code).value; } })() }}
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
              </div>
            );
          })}
        </main>
      </div>

      {/* ===== Floating buttons ===== */}
      <div className="floating-btns">
        <a className="float-btn" href={homeHref} title="ホームへ">🏠</a>
        {bmIdx >= 0 && bmIdx < totalItems && (
          <a className="float-btn" href="#" title="ブックマーク位置に移動" onClick={jumpToBookmark}>🔖</a>
        )}
        <a className="float-btn" href="#" title="一番上へ">↑</a>
      </div>

      {/* ===== ブックマーク削除モーダル ===== */}
      {bmModalOpen && (
        <div
          className="bm-modal-overlay"
          onClick={(e) => { if (e.target === e.currentTarget) setBmModalOpen(false); }}
        >
          <div className="bm-modal">
            <p>ブックマークを削除しますか？</p>
            <div className="bm-modal-btns">
              <button className="bm-modal-cancel" onClick={() => setBmModalOpen(false)}>キャンセル</button>
              <button className="bm-modal-ok" onClick={() => { setBmIdx(-2); setBmModalOpen(false); }}>削除</button>
            </div>
          </div>
        </div>
      )}

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
