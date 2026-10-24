"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

export type WorkCard = {
  id: string;
  title: string;
  client: string;
  categories: string[];
  image?: { src: string; width?: number; height?: number };
};

const pad = (n: number) => String(n).padStart(2, "0");
const PER_PAGE = 6;
/** 絞り込みに出すカテゴリー（Figmaのデザイン準拠。Direction / Design 等は表示タグのみ） */
const FILTERS = ["Graphic design", "Special site", "Web site", "LP"];

/** WORKS一覧：カテゴリーで絞り込み（カテゴリーは実データから生成） */
export default function WorksGrid({ works }: { works: WorkCard[] }) {
  const cats = FILTERS.filter((c) => works.some((w) => w.categories.includes(c)));
  const [cat, setCat] = useState("ALL");
  const [page, setPage] = useState(1);
  const topRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLUListElement>(null);
  const [more, setMore] = useState(false);
  const [touched, setTouched] = useState(false);
  // SPでカテゴリーが横にはみ出しているあいだだけ、スクロールヒントを出す
  const checkMore = useCallback(() => {
    const el = filterRef.current;
    if (el) setMore(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
  }, []);
  useEffect(() => {
    checkMore();
    window.addEventListener("resize", checkMore);
    document.fonts?.ready.then(checkMore);
    return () => window.removeEventListener("resize", checkMore);
  }, [checkMore, cats.length]);
  const shown = works.filter((w) => cat === "ALL" || w.categories.includes(cat));
  const pages = Math.max(1, Math.ceil(shown.length / PER_PAGE));
  const current = Math.min(page, pages);
  const visible = shown.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  const go = (n: number) => {
    setPage(n);
    const el = topRef.current;
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 140, behavior: "smooth" });
  };

  return (
    <div className="wrap">
      <div className="wp-bar" ref={topRef}>
        <div className="wp-filter-wrap">
        <ul className="wp-filter" aria-label="カテゴリーで絞り込む" ref={filterRef} onScroll={() => { checkMore(); if ((filterRef.current?.scrollLeft ?? 0) > 4) setTouched(true); }} onPointerDown={() => setTouched(true)}>
          {["ALL", ...cats].map((c) => (
            <li key={c}>
              <button type="button" aria-pressed={cat === c} onClick={() => { setCat(c); setPage(1); }}>{c}</button>
            </li>
          ))}
        </ul>
        {more && (
          <span className="wp-filter-hint" aria-hidden="true">
            <svg width="26" height="12" viewBox="0 0 26 12" fill="none"><path d="M0 6h24M19 1l5 5-5 5" stroke="currentColor" strokeWidth="1.2" /></svg>
          </span>
        )}
        {more && !touched && (
          <span className="wp-filter-guide" aria-hidden="true">
            <svg width="58" height="68" viewBox="0 0 44 52" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 8H1M1 8l3-3M1 8l3 3M39 8h4M43 8l-3-3M43 8l-3 3" />
              <g className="hand"><path d="M15 31V12.5a4.5 4.5 0 0 1 9 0V27M24 25a4 4 0 0 1 8 0v3M32 27a4 4 0 0 1 7 2.5V37c0 8-5 13-13 13h-3c-5 0-8-2.5-10.5-6.5L6 34.5a3.6 3.6 0 0 1 6-3.8L15 34" /></g>
            </svg>
            <span>スクロールできます</span>
          </span>
        )}
        </div>
        <p className="wp-count" lang="en" aria-live="polite"><b data-n={pad(shown.length)}></b> 件</p>
      </div>
      <ul className="wp-grid">
        {visible.map((w) => (
          <li className="wp-item" key={w.id} style={{ "--sp": 6 } as React.CSSProperties}>
            <Link className="wp-card" data-cursor="" href={`/works/${w.id}/`}>
              <div className="wp-thumb">
                {w.image && <img src={w.image.src} width={w.image.width} height={w.image.height} alt={w.title} loading="lazy" decoding="async" />}
              </div>
              <div className="wp-cap">
                <p className="wp-client">{w.client}</p>
                <div className="wp-body">
                  <h2 className="wp-ttl">{w.title}</h2>
                  {w.categories.length > 0 && (
                    <ul className="wp-tags" lang="en">
                      {w.categories.map((c) => <li className="wp-cat" key={c}>{c}</li>)}
                    </ul>
                  )}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {shown.length === 0 && <p className="wp-empty">該当する実績はありません。</p>}
      {pages > 1 && (
        <nav className="wp-pager" aria-label="ページネーション">
          <button type="button" className="wp-pg-arrow" aria-label="前のページ" disabled={current === 1} onClick={() => go(current - 1)}>
            <svg width="18" height="10" viewBox="0 0 18 10" fill="none" aria-hidden="true"><path d="M18 5H1M5 1L1 5l4 4" stroke="currentColor" strokeWidth="1.1" /></svg>
          </button>
          <ol className="wp-pg-list" lang="en">
            {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
              <li key={n}>
                <button type="button" className="wp-pg-num" aria-label={`${n}ページ目`} aria-current={n === current ? "page" : undefined} onClick={() => go(n)}>{pad(n)}</button>
              </li>
            ))}
          </ol>
          <button type="button" className="wp-pg-arrow" aria-label="次のページ" disabled={current === pages} onClick={() => go(current + 1)}>
            <svg width="18" height="10" viewBox="0 0 18 10" fill="none" aria-hidden="true"><path d="M0 5h17M13 1l4 4-4 4" stroke="currentColor" strokeWidth="1.1" /></svg>
          </button>
        </nav>
      )}
    </div>
  );
}
