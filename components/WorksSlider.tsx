import Link from "next/link";
import { toTagArray, toWebp, workThumb, type Work } from "@/lib/microcms";

/** 見出し・スライダー・操作部。動きは SiteFrame 側（initWorksSlider）が付与する */
export default function WorksSlider({ works }: { works: Work[] }) {
  const total = String(works.length).padStart(2, "0");
  return (
    <section className="works" id="works" data-tone="light" aria-labelledby="worksTitle">
      <div className="wrap wk-head">
        <h2 className="sec-label" id="worksTitle">
          <span lang="en">WORKS</span>
          <span className="sec-bar" aria-hidden="true">|</span>
          <span className="sec-ja">制作実績</span>
        </h2>
      </div>
      <div className="wk-stage">
        <div className="wk-band" aria-hidden="true"></div>
        <div className="wk-viewport" aria-roledescription="carousel" aria-label="制作実績">
          <ul className="wk-track">
            {works.map((w) => {
              const img = workThumb(w);
              const cat = toTagArray(w.category)[0];
              return (
                <li className="wk-slide" key={w.id}>
                  <Link className="wk-card" href={`/works/${w.id}/`}>
                    <div className="wk-thumb">
                      {img && (
                        <img
                          src={toWebp(img.url)} width={img.width} height={img.height} alt={w.title ?? ""}
                          loading="lazy" decoding="async"
                          style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      )}
                      <span className="wk-view" lang="en" aria-hidden="true">VIEW</span>
                    </div>
                    <div className="wk-cap">
                      <p className="wk-client">{w.client}</p>
                      <div className="wk-body">
                        <h3 className="wk-title">{w.title}</h3>
                        {cat && <p className="wk-cat" lang="en">{cat}</p>}
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="wk-ctrl">
            <button type="button" className="wk-btn wk-prev" aria-label="前の実績">
              <svg width="18" height="10" viewBox="0 0 18 10" fill="none" aria-hidden="true"><path d="M18 5H1M5 1L1 5l4 4" stroke="currentColor" strokeWidth="1.1" /></svg>
            </button>
            <button type="button" className="wk-btn wk-next" aria-label="次の実績">
              <svg width="18" height="10" viewBox="0 0 18 10" fill="none" aria-hidden="true"><path d="M0 5h17M13 1l4 4-4 4" stroke="currentColor" strokeWidth="1.1" /></svg>
            </button>
            <p className="wk-count" lang="en"><span className="wk-cur"></span><span className="wk-bar" aria-hidden="true"><i></i></span><span>{total}</span></p>
            <Link className="wk-all" href="/works/" aria-label="制作実績一覧へ">
              <svg className="ring" viewBox="0 0 128 128" aria-hidden="true" focusable="false">
                <defs><path id="wkRing" d="M64 64m-54 0a54 54 0 1 1 108 0a54 54 0 1 1 -108 0" /></defs>
                <text><textPath href="#wkRing" textLength="335">VIEW ALL WORKS · VIEW ALL WORKS ·</textPath></text>
              </svg>
              <span className="core" aria-hidden="true">
                <svg width="18" height="10" viewBox="0 0 18 10" fill="none" aria-hidden="true"><path d="M0 5h17M13 1l4 4-4 4" stroke="currentColor" strokeWidth="1.1" /></svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
