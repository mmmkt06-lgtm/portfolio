/**
 * TOPのFV：2つの円の交差（レンズ）へズームし、画面がCONCEPTへ切り替わる。
 * スクロール位置からSVGの拡大率を計算する（.page 内のDOMを直接更新する）。
 */
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function initTopMotion(root: HTMLElement, setLit: (lit: boolean) => void): () => void {
  const q = <T extends Element = HTMLElement>(s: string) => root.querySelector<T>(s);
  const zoom = q(".zoom"), stage = q(".stage"), second = q(".second");
  const art = q(".fv-art"), svg = q<SVGSVGElement>(".art"), scl = q<SVGGElement>(".scl");
  const copy = q(".fv-copy"), meta = q(".fv-meta"), dot = q<SVGCircleElement>(".dot"), bg = q(".lit-bg");
  const profile = q(".profile"), works = q(".works"), band = q(".wk-band");
  if (!zoom || !stage || !second || !art || !svg || !scl || !copy || !meta || !dot || !bg) return () => {};

  const gA = [q(".inA"), q(".inA .mA")], gB = [q(".inB"), q(".inB .mB")];
  const reduce = !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  let lit: boolean | undefined;
  let bgEl: Element | null = null;
  let raf = 0;

  // ドリフト／導入アニメーションが今かけているオフセット（1440x800空間のpx）
  const shift = (els: (HTMLElement | null)[]) => {
    let x = 0, y = 0;
    els.forEach((el) => {
      const t = el ? getComputedStyle(el).transform : "none";
      if (t && t !== "none") { const m = new DOMMatrix(t); x += m.e; y += m.f; }
    });
    return [x, y];
  };

  const zoomTo = (p: number) => {
    const W = art.clientWidth, H = art.clientHeight;
    if (!W || !H) return;
    // ズーム中は円を止めて、レンズの形を保つ
    if (p > 0) stage.setAttribute("data-zooming", "1"); else stage.removeAttribute("data-zooming");
    const sa = shift(gA), sb = shift(gB);
    const ax = 788.3 + sa[0], ay = 243.2 + sa[1], ra = 143;
    const bx = 1018.3 + sb[0], by = 316.2 + sb[1], rb = 173;
    const vx = bx - ax, vy = by - ay, d = Math.hypot(vx, vy) || 1;
    const t = (ra + d - rb) / 2;
    let lx = ax + (vx / d) * t, ly = ay + (vy / d) * t;
    const lw = Math.max(20, ra + rb - d);
    const a = (d * d + ra * ra - rb * rb) / (2 * d);
    const lh = 2 * Math.sqrt(Math.max(400, ra * ra - a * a));
    let s = 1;
    if (root.clientWidth < 1024) {
      s = parseFloat(getComputedStyle(scl).getPropertyValue("--s")) || 1.1;
      lx = 720 + (lx - 918.3) * s; ly = 400 + (ly - 316.2) * s;
    }
    const u = Math.max(W / 1440, H / 800);
    const ox = (W - 1440 * u) / 2 + u * lx, oy = (H - 800 * u) / 2 + u * ly;
    const cx = stage.clientWidth / 2 - (art as HTMLElement).offsetLeft;
    const cy = stage.clientHeight / 2 - (art as HTMLElement).offsetTop;
    const K = clamp(1.4 * Math.max(stage.clientWidth / (lw * u * s), stage.clientHeight / (lh * u * s)), 8, 80);
    const k = Math.exp(Math.log(K) * ease(p));
    const pan = ease(clamp(p / 0.7, 0, 1));
    svg.style.transformOrigin = `${ox.toFixed(1)}px ${oy.toFixed(1)}px`;
    svg.style.transform = p <= 0 ? "none" : `translate(${((cx - ox) * pan).toFixed(1)}px,${((cy - oy) * pan).toFixed(1)}px) scale(${k.toFixed(4)})`;
    const fade = clamp(p / 0.26, 0, 1);
    copy.style.opacity = (1 - fade).toFixed(3);
    copy.style.transform = `translateY(${(-36 * fade).toFixed(1)}px)`;
    meta.style.opacity = (1 - clamp(p / 0.12, 0, 1)).toFixed(3);
    dot.style.opacity = (1 - clamp(p / 0.2, 0, 1)).toFixed(3);
    const b = clamp((p - 0.74) / 0.2, 0, 1);
    bg.style.opacity = (b * b * (3 - 2 * b)).toFixed(3);
  };

  const update = () => {
    const r = zoom.getBoundingClientRect();
    const sc = r.width / (zoom.offsetWidth || r.width || 1) || 1;
    const hd = parseFloat(getComputedStyle(root).getPropertyValue("--hd")) || 124;
    const top = (el: Element | null) => (el ? el.getBoundingClientRect().top / sc : Infinity);
    let next: boolean;
    if (reduce) {
      next = top(second) <= hd;
    } else {
      const D = zoom.offsetHeight - (stage as HTMLElement).offsetHeight;
      const p = D > 0 ? clamp(-r.top / sc / D, 0, 1) : 0;
      zoomTo(p);
      next = p >= 0.9;
    }
    if (top(profile) <= hd) next = false;
    if (top(works) <= hd) next = true;
    if (top(band) <= hd) next = false;
    const lightEl = top(works) <= hd ? works : second;
    if (next && lightEl && lightEl !== bgEl) { bgEl = lightEl; root.style.setProperty("--hd-bg", getComputedStyle(lightEl).backgroundColor); }
    if (next !== lit) { lit = next; setLit(next); }
  };
  const on = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; update(); }); };
  window.addEventListener("scroll", on, { passive: true, capture: true });
  window.addEventListener("resize", on);
  document.fonts?.ready.then(on);
  update();
  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("scroll", on, { capture: true });
    window.removeEventListener("resize", on);
  };
}

/** WORKSスライダー：選択中のスライドがコンテンツ端に置かれて広がり、残りは右に並ぶ */
export function initWorksSlider(root: HTMLElement): () => void {
  const vp = root.querySelector<HTMLElement>(".wk-viewport"), tr = root.querySelector<HTMLElement>(".wk-track");
  if (!vp || !tr) return () => {};
  const slides = Array.from(tr.children) as HTMLElement[], n = slides.length;
  const prev = root.querySelector<HTMLButtonElement>(".wk-prev"), next = root.querySelector<HTMLButtonElement>(".wk-next");
  const cur = root.querySelector<HTMLElement>(".wk-cur"), bar = root.querySelector<HTMLElement>(".wk-bar i");
  let idx = 0, dragged = false, x0: number | null = null;
  const set = (i: number) => {
    idx = Math.max(0, Math.min(n - 1, i));
    tr.style.setProperty("--i", String(idx));
    slides.forEach((s, k) => {
      if (k === idx) s.setAttribute("data-active", ""); else s.removeAttribute("data-active");
      const a = s.querySelector("a");
      a?.setAttribute("tabindex", k === idx ? "0" : "-1");
      a?.toggleAttribute("data-cursor", k === idx);
    });
    cur?.setAttribute("data-n", String(idx + 1).padStart(2, "0"));
    bar?.style.setProperty("--p", String((idx + 1) / n));
    if (prev) prev.disabled = idx === 0;
    if (next) next.disabled = idx === n - 1;
  };
  const ac = new AbortController();
  const o = { signal: ac.signal };
  prev?.addEventListener("click", () => set(idx - 1), o);
  next?.addEventListener("click", () => set(idx + 1), o);
  slides.forEach((s, k) => s.addEventListener("click", (e) => {
    if (dragged || k !== idx) { e.preventDefault(); if (!dragged) set(k); }
  }, o));
  vp.addEventListener("pointerdown", (e) => { x0 = e.clientX; dragged = false; }, o);
  vp.addEventListener("pointermove", (e) => { if (x0 !== null && Math.abs(e.clientX - x0) > 10) dragged = true; }, o);
  vp.addEventListener("pointerup", (e) => {
    if (x0 === null) return;
    const dx = e.clientX - x0; x0 = null;
    if (dx < -40) set(idx + 1); else if (dx > 40) set(idx - 1);
    setTimeout(() => { dragged = false; }, 0);
  }, o);
  vp.addEventListener("pointercancel", () => { x0 = null; dragged = false; }, o);
  vp.addEventListener("dragstart", (e) => e.preventDefault(), o);
  set(0);
  return () => ac.abort();
}
