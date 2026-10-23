import type { Metadata } from "next";
import Link from "next/link";
import SiteFrame from "@/components/SiteFrame";
import Footer from "@/components/Footer";
import "../styles/contact.css";

export const metadata: Metadata = { title: "CONTACT", description: "採用・面談・選考に関するご連絡はこちら。" };

const REVEAL: [string, number][] = [[".ctp-grid", 0.2]];

export default function Contact() {
  // 公開用メールアドレスが未設定の間は、メール導線（mailto）を出さない
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  return (
    <SiteFrame fv="contactp" reveal={REVEAL} current="contact">
      <main>
      <section className="wp-hero" aria-labelledby="ctpTitle">
      <div className="wp-art" aria-hidden="true"><svg viewBox="0 0 760 520"><circle className="cc" cx="600" cy="120" r="70"></circle><circle className="ca" cx="300" cy="270" r="190"></circle><circle className="cb" cx="500" cy="270" r="190"></circle></svg></div>
      <div className="wrap">
      <p className="sec-label"><span className="sec-no" lang="en">04</span><span className="sec-line" aria-hidden="true"></span><span className="sec-ja">お問い合わせ</span></p>
      <div className="wp-head"><h1 className="wp-title" id="ctpTitle" lang="en">CONTACT</h1><ol className="wp-crumb" lang="en"><li><Link href="/">TOP</Link></li><li aria-current="page">CONTACT</li></ol></div>
      </div>
      </section>


      <section className="cp-sec cp-light ctp" data-tone="light" aria-labelledby="ctpLead">
      <div className="wrap ctp-grid">
      <div className="ctp-intro">
      <p className="sec-label"><span className="sec-no" lang="en">01</span><span className="sec-line" aria-hidden="true"></span><span lang="en">MAIL</span><span className="sec-bar" aria-hidden="true">|</span><span className="sec-ja">メール</span></p>
      <h2 className="cp-lead-ttl" id="ctpLead">採用・面談に関するご連絡を<br />お待ちしています。</h2>
      <p className="cp-p">ご連絡はメールにて受け付けています。作品やこれまでの経験について、お気軽にお問い合わせください。</p>
      <p className="cp-p ctp-note">ご連絡の際は、会社名・お名前・ご用件をお書き添えください。</p>
      </div>
      <div className="ctp-main">
      <div className="ctp-mail">
      <span className="ctp-k" lang="en">E-MAIL</span>
      {email ? <p className="ctp-addr" lang="en">{email}</p> : <p className="ctp-addr"><span className="ph">公開用メールアドレス未設定</span></p>}
      {email && (<div className="ctp-act">
      <a className="ctp-btn" href={`mailto:${email}`} aria-label="メールを作成する"><span className="ctp-ring a" aria-hidden="true"></span><span className="ctp-ring b" aria-hidden="true"></span><span className="ctp-in">メールを作成<svg width="26" height="12" viewBox="0 0 26 12" fill="none" aria-hidden="true"><path d="M0 6h24M19 1l5 5-5 5" stroke="currentColor" strokeWidth="1.2"></path></svg></span></a>
      <p className="cp-p">メールアプリが開きます。</p>
      </div>)}
      </div>
      </div>
      </div>
      </section>


      <section className="cp-sec cp-light ctp-next" data-tone="light" aria-label="ほかのページ">
      <div className="wrap">
      <ul>
      <li><Link href="/works/"><span><b lang="en">WORKS</b><small>制作実績を見る</small></span><svg width="26" height="12" viewBox="0 0 26 12" fill="none" aria-hidden="true"><path d="M0 6h24M19 1l5 5-5 5" stroke="currentColor" strokeWidth="1.2"></path></svg></Link></li>
      <li><Link href="/about/"><span><b lang="en">PROFILE</b><small>プロフィールを見る</small></span><svg width="26" height="12" viewBox="0 0 26 12" fill="none" aria-hidden="true"><path d="M0 6h24M19 1l5 5-5 5" stroke="currentColor" strokeWidth="1.2"></path></svg></Link></li>
      </ul>
      </div>
      </section>
      </main>
      <Footer />
    </SiteFrame>
  );
}
