"use client";

/**
 * 経歴のアコーディオン。各項目の開閉は data-open / aria-expanded をDOMで切り替える
 * （初期状態は子要素側の data-open で指定）。
 */
export default function Timeline({ children }: { children: React.ReactNode }) {
  const onClick = (e: React.MouseEvent<HTMLOListElement>) => {
    const btn = (e.target as HTMLElement).closest<HTMLButtonElement>(".pr-tl-btn");
    const item = btn?.closest<HTMLElement>(".pr-tl-item");
    if (!btn || !item) return;
    const open = item.getAttribute("data-open") !== "true";
    item.setAttribute("data-open", String(open));
    btn.setAttribute("aria-expanded", String(open));
  };
  return <ol className="pr-tl" onClick={onClick}>{children}</ol>;
}
