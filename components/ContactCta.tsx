import Link from "next/link";

export default function ContactCta() {
  return (
    <section className="contact" id="contact" aria-labelledby="contactTitle">
      <figure className="ct-bg" aria-hidden="true">
        <img src="/images/contact-bg.jpg" width={1600} height={854} alt="" decoding="async" />
      </figure>
      <div className="wrap ct">
        <div className="ct-text">
          <p className="sec-label">
            <span lang="en">CONTACT</span>
            <span className="sec-bar" aria-hidden="true">|</span>
            <span className="sec-ja">お問い合わせ</span>
          </p>
          <h2 className="ct-title" id="contactTitle" lang="en">
            <span>Let’s Create</span>
            <span>The Connection</span>
          </h2>
          <p className="ct-lead">
            Webサイトの制作やリニューアル、デザインのご相談など、お気軽にお問い合わせください。想いとニーズの接点を、一緒に見つけていきましょう。
          </p>
        </div>
        <Link className="ct-btn" href="/contact/" aria-label="お問い合わせフォームへ">
          <span className="ct-ring a" aria-hidden="true"></span>
          <span className="ct-ring b" aria-hidden="true"></span>
          <span className="ct-in" lang="en">
            CONTACT
            <svg width="26" height="12" viewBox="0 0 26 12" fill="none" aria-hidden="true"><path d="M0 6h24M19 1l5 5-5 5" stroke="currentColor" strokeWidth="1.2" /></svg>
          </span>
        </Link>
      </div>
    </section>
  );
}
