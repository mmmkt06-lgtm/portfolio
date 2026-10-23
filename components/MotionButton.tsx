"use client";

import { useFrame } from "@/components/SiteFrame";

/** FVの円の動きを止める／再開する（WCAG 2.2.2） */
export default function MotionButton() {
  const { paused, togglePaused } = useFrame();
  return (
    <button
      className="motion" type="button"
      aria-label={paused ? "背景の動きを再開する" : "背景の動きを止める"}
      aria-pressed={paused}
      onClick={togglePaused}
    >
      {paused ? (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 2.5v11l9-5.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" /></svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M5 3v10M11 3v10" stroke="currentColor" strokeWidth="1.2" /></svg>
      )}
    </button>
  );
}
