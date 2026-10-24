import type { Metadata } from "next";
import Link from "next/link";
import SiteFrame from "@/components/SiteFrame";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import "../styles/contact.css";

export const metadata: Metadata = { title: "CONTACT", description: "お問い合わせ・ご相談はこちらのフォームから。" };

const REVEAL: [string, number][] = [[".ctf-wrap", 0.1]];

export default function Contact() {
  // 公開用メールアドレスが未設定の間は、メール導線（mailto）を出さない
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  return (
    <SiteFrame fv="contactp" reveal={REVEAL} current="contact">
      <main>
      <section className="wp-hero" aria-labelledby="ctpTitle">
      <div className="wp-art" aria-hidden="true"><svg viewBox="0 0 760 520"><circle className="cc" cx="600" cy="120" r="70"></circle><circle className="ca" cx="300" cy="270" r="190"></circle><circle className="cb" cx="500" cy="270" r="190"></circle></svg></div>
      <div className="wrap">
      <p className="sec-label"><span className="sec-ja">お問い合わせ</span></p>
      <div className="wp-head"><h1 className="wp-title" id="ctpTitle" lang="en">CONTACT</h1><ol className="wp-crumb" lang="en"><li><Link href="/">TOP</Link></li><li aria-current="page">CONTACT</li></ol></div>
      </div>
      </section>


      <section className="cp-sec cp-light ctf" data-tone="light" aria-labelledby="ctfTitle">
      <div className="wrap ctf-wrap">
      <h2 className="ctf-ttl" id="ctfTitle">お問い合わせについて</h2>
      <p className="ctf-lead">制作に関するご相談など、各種お問い合わせは以下のフォームよりお願いいたします。</p>
      <p className="ctf-lead">お問い合わせ内容を確認のうえ、返信いたします。</p>
      <ContactForm email={email} />
      </div>
      </section>
      </main>
      <Footer />
    </SiteFrame>
  );
}
