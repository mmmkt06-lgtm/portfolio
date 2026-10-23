"use client";

import Link from "next/link";
import { useState } from "react";

export type WorkCard = {
  id: string;
  title: string;
  client: string;
  categories: string[];
  image?: { src: string; width?: number; height?: number };
};

const pad = (n: number) => String(n).padStart(2, "0");

/** WORKS一覧：カテゴリーで絞り込み（カテゴリーは実データから生成） */
export default function WorksGrid({ works }: { works: WorkCard[] }) {
  const cats = Array.from(new Set(works.flatMap((w) => w.categories)));
  const [cat, setCat] = useState("ALL");
  const shown = works.filter((w) => cat === "ALL" || w.categories.includes(cat));

  return (
    <div className="wrap">
      <div className="wp-bar">
        <ul className="wp-filter" aria-label="カテゴリーで絞り込む">
          {["ALL", ...cats].map((c) => (
            <li key={c}>
              <button type="button" aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>
            </li>
          ))}
        </ul>
        <p className="wp-count" lang="en" aria-live="polite"><b data-n={pad(shown.length)}></b> WORKS</p>
      </div>
      <ul className="wp-grid">
        {shown.map((w) => (
          <li className="wp-item" key={w.id} style={{ "--sp": 6 } as React.CSSProperties}>
            <Link className="wp-card" href={`/works/${w.id}/`}>
              <div className="wp-thumb">
                {w.image && <img src={w.image.src} width={w.image.width} height={w.image.height} alt={w.title} loading="lazy" decoding="async" />}
                <span className="wp-view" lang="en" aria-hidden="true">VIEW</span>
              </div>
              <div className="wp-cap">
                <p className="wp-client">{w.client}</p>
                <div className="wp-body">
                  <h2 className="wp-ttl">{w.title}</h2>
                  {w.categories[0] && <p className="wp-cat" lang="en">{w.categories[0]}</p>}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {shown.length === 0 && <p className="wp-empty">該当する実績はありません。</p>}
    </div>
  );
}
