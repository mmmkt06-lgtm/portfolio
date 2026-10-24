/**
 * [data-cursor] の上にいる間、マウスに追従する「VIEW」のマウスストーカーを出す。
 * マウス操作ができる環境（hover + fine pointer）だけで動く。
 */
export function initCursorView(root: HTMLElement): () => void {
  if (!window.matchMedia?.("(hover: hover) and (pointer: fine)").matches) return () => {};
  const reduce = !!window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const el = document.createElement("div");
  el.className = "cur-view";
  el.lang = "en";
  el.setAttribute("aria-hidden", "true");
  el.textContent = "VIEW";
  root.appendChild(el);

  let tx = 0, ty = 0, x = 0, y = 0, raf = 0;
  let cur: HTMLElement | null = null;
  let last: { x: number; y: number } | null = null;

  const draw = () => { el.style.translate = `${x.toFixed(1)}px ${y.toFixed(1)}px`; };
  const tick = () => {
    x += (tx - x) * 0.18; y += (ty - y) * 0.18;
    draw();
    raf = Math.abs(tx - x) > 0.1 || Math.abs(ty - y) > 0.1 ? requestAnimationFrame(tick) : 0;
  };
  const follow = () => { if (reduce) { x = tx; y = ty; draw(); } else if (!raf) raf = requestAnimationFrame(tick); };

  const set = (t: HTMLElement | null) => {
    if (t === cur) return;
    if (cur) cur.style.cursor = "";
    if (t && !cur) { x = tx; y = ty; draw(); } // 出る瞬間はマウスの位置から
    cur = t;
    if (t) t.style.cursor = "none";
    el.classList.toggle("is-on", !!t);
  };
  const update = (cx: number, cy: number, target: Element | null) => {
    const r = root.getBoundingClientRect();
    tx = cx - r.left; ty = cy - r.top;
    set(target?.closest<HTMLElement>("[data-cursor]") ?? null);
    if (cur) follow();
  };

  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    last = { x: e.clientX, y: e.clientY };
    update(e.clientX, e.clientY, e.target as Element);
  };
  // スクロールでマウスの下の要素が変わったとき
  const onScroll = () => { if (last) update(last.x, last.y, document.elementFromPoint(last.x, last.y)); };
  const onLeave = () => { last = null; set(null); };

  root.addEventListener("pointermove", onMove);
  root.addEventListener("pointerleave", onLeave);
  window.addEventListener("scroll", onScroll, { passive: true, capture: true });
  return () => {
    cancelAnimationFrame(raf);
    root.removeEventListener("pointermove", onMove);
    root.removeEventListener("pointerleave", onLeave);
    window.removeEventListener("scroll", onScroll, { capture: true });
    set(null);
    el.remove();
  };
}
