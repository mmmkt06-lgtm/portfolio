"use client";

import Link from "next/link";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { initTopMotion, initWorksSlider } from "@/lib/top-motion";
import Logo from "@/components/Logo";
import { initCursorView } from "@/lib/cursor-view";

type Frame = { paused: boolean; togglePaused: () => void };
const FrameContext = createContext<Frame>({ paused: false, togglePaused: () => {} });
export const useFrame = () => useContext(FrameContext);

type Props = {
  /** CSSのスコープ名（data-fv） */
  fv: string;
  /** "top" はFVのズーム演出で、それ以外は data-tone="light" の区間でヘッダーを切り替える */
  mode?: "top" | "tone";
  /** スクロールで現れる要素 [セレクタ, しきい値] */
  reveal?: [string, number][];
  /** 現在のページ（ナビの aria-current） */
  current?: "concept" | "about" | "works" | "contact";
  children: React.ReactNode;
};

const NAV = [
  { key: "concept", href: "/concept/", en: "CONCEPT", ja: "コンセプト" },
  { key: "about", href: "/about/", en: "PROFILE", ja: "プロフィール" },
  { key: "works", href: "/works/", en: "WORKS", ja: "制作実績" },
  { key: "contact", href: "/contact/", en: "CONTACT", ja: "お問い合わせ" },
] as const;

/** 要素（または最も近い祖先）の不透明な背景色。見つからなければ空文字 */
function solidBg(el: HTMLElement | null) {
  for (; el; el = el.parentElement) {
    const c = getComputedStyle(el).backgroundColor;
    if (c && c !== "transparent" && !/rgba\(.*,\s*0\)$/.test(c)) return c;
  }
  return "";
}

export default function SiteFrame({ fv, mode = "tone", reveal = [], current, children }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const [lit, setLit] = useState(false);
  const [paused, setPaused] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const revealKey = JSON.stringify(reveal);
  const togglePaused = useCallback(() => setPaused((p) => !p), []);
  const closeMenu = useCallback(() => { setMenuOpen(false); menuBtnRef.current?.focus(); }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const cleanups: (() => void)[] = [];

    if (mode === "top") {
      cleanups.push(initTopMotion(root, setLit));
    } else {
      // ヘッダーは、明るい区間が下にある間だけ暗色にする
      const lights = Array.from(root.querySelectorAll<HTMLElement>('[data-tone="light"]'));
      const band = root.querySelector(".wk-band");
      let last: boolean | undefined, lastBg = "", lastUnder: HTMLElement | undefined, raf = 0;
      const update = () => {
        const sc = root.getBoundingClientRect().width / (root.offsetWidth || 1) || 1;
        const hd = parseFloat(getComputedStyle(root).getPropertyValue("--hd")) || 100;
        const under = lights.find((el) => { const b = el.getBoundingClientRect(); return b.top / sc <= hd && b.bottom / sc > hd; });
        let next = !!under;
        if (next && band && band.getBoundingClientRect().top / sc <= hd) next = false;
        // ヘッダーの背景は、下にある明るい区間の背景色に合わせる
        // 背景色の取得はスタイル再計算を伴うので、下の区間が変わったときだけ行う
        if (next && under && under !== lastUnder) {
          lastUnder = under;
          const bg = solidBg(under);
          if (bg !== lastBg) { lastBg = bg; if (bg) root.style.setProperty("--hd-bg", bg); }
        }
        if (next !== last) { last = next; setLit(next); }
      };
      const on = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; update(); }); };
      window.addEventListener("scroll", on, { passive: true, capture: true });
      window.addEventListener("resize", on);
      update();
      cleanups.push(() => {
        cancelAnimationFrame(raf);
        window.removeEventListener("scroll", on, { capture: true });
        window.removeEventListener("resize", on);
      });
    }

    // 初回表示のフェードイン（JSが無効でも内容は読める：data-in を付けるのはJS実行後のみ）
    if (!reduce && "IntersectionObserver" in window) {
      const sel: [string, number][] = [...reveal, [".wk-stage", 0.15], [".ct", 0.25]];
      sel.forEach(([s, th]) => {
        const el = root.querySelector(s);
        if (!el) return;
        el.setAttribute("data-in", "0");
        const io = new IntersectionObserver((en) => {
          if (en[0].isIntersecting) { el.setAttribute("data-in", "1"); io.disconnect(); }
        }, { threshold: th });
        io.observe(el);
        cleanups.push(() => io.disconnect());
      });
    }

    cleanups.push(initWorksSlider(root));
    cleanups.push(initCursorView(root));

    const pt = root.querySelector<HTMLElement>(".ft-pt");
    const toTop = () => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    pt?.addEventListener("click", toTop);
    cleanups.push(() => pt?.removeEventListener("click", toTop));

    return () => cleanups.forEach((fn) => fn());
  }, [mode, revealKey]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeMenu(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen, closeMenu]);

  const cls = ["page", paused ? "is-paused" : "", lit ? "is-lit" : ""].filter(Boolean).join(" ");

  return (
    <FrameContext.Provider value={{ paused, togglePaused }}>
      <div data-fv={fv}>
        <div className={cls} ref={rootRef} style={{ "--dur": "14s" } as React.CSSProperties}>
          <div className="hd-sticky">
            <header className="hd">
              <div className="hd-in">
                <Link className="logo" href="/" aria-label="identive ホーム">
                  <Logo />
                </Link>
                <nav aria-label="メインナビゲーション">
                  <ul className="nav">
                    {NAV.map((n) => (
                      <li key={n.key}>
                        <Link
                          className={n.key === "contact" ? "pill" : undefined}
                          href={n.href}
                          aria-current={current === n.key ? "page" : undefined}
                        >
                          {n.en}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                <button
                  className="menu-btn" type="button" ref={menuBtnRef}
                  aria-label="メニューを開く" aria-expanded={menuOpen} aria-controls="spMenu"
                  onClick={() => setMenuOpen(true)}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M0 8h24M0 16h24" stroke="currentColor" strokeWidth="1.75" /></svg>
                </button>
              </div>
            </header>
            {menuOpen && (
              <div className="sp-menu" id="spMenu" role="dialog" aria-modal="true" aria-label="メニュー">
                <div className="wrap">
                  <div className="sp-menu-hd">
                    <Link className="logo" href="/" aria-label="identive ホーム" onClick={() => setMenuOpen(false)}>
                      <Logo />
                    </Link>
                    <button className="menu-btn" type="button" aria-label="メニューを閉じる" onClick={closeMenu} style={{ display: "inline-flex" }} autoFocus>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.5" /></svg>
                    </button>
                  </div>
                  <nav aria-label="メニュー">
                    <ul className="sp-nav">
                      <li><Link href="/" onClick={() => setMenuOpen(false)}>TOP<span>トップ</span></Link></li>
                      {NAV.map((n) => (
                        <li key={n.key}>
                          <Link href={n.href} aria-current={current === n.key ? "page" : undefined} onClick={() => setMenuOpen(false)}>
                            {n.en}<span>{n.ja}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </div>
            )}
          </div>
          {children}
        </div>
      </div>
    </FrameContext.Provider>
  );
}
