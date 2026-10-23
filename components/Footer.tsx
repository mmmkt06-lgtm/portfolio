import Link from "next/link";

const NAV = [
  { href: "/concept/", en: "CONCEPT", ja: "コンセプト" },
  { href: "/about/", en: "PROFILE", ja: "プロフィール" },
  { href: "/works/", en: "WORKS", ja: "制作実績" },
  { href: "/contact/", en: "CONTACT", ja: "お問い合わせ" },
];

export default function Footer() {
  return (
    <footer className="ft">
      <div className="wrap">
        <div className="ft-top-row">
          <div>
            <Link className="ft-logo" href="/" aria-label="ホーム（ロゴは仮）">
              <svg width="38" height="24" viewBox="0 0 38 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="26" cy="12" r="11" stroke="currentColor" strokeWidth="1.2" />
              </svg>
              <span aria-hidden="true">LOGO</span>
            </Link>
            <p className="ft-tag">想いとニーズの接点を描く。</p>
          </div>
          <nav aria-label="フッターナビゲーション">
            <ul className="ft-nav">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} lang="en">{n.en}<span lang="ja">{n.ja}</span></Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="ft-bottom">
          <p className="ft-copy" lang="en"><small>© 2026 NAGATA MIKITO</small></p>
          <button type="button" className="ft-pt" lang="en">
            PAGE TOP
            <i aria-hidden="true">
              <svg width="12" height="16" viewBox="0 0 12 16" fill="none"><path d="M6 16V1M1 6l5-5 5 5" stroke="currentColor" strokeWidth="1.1" /></svg>
            </i>
          </button>
        </div>
      </div>
    </footer>
  );
}
