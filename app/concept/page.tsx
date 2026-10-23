import type { Metadata } from "next";
import Link from "next/link";
import SiteFrame from "@/components/SiteFrame";
import WorksSlider from "@/components/WorksSlider";
import ContactCta from "@/components/ContactCta";
import Footer from "@/components/Footer";
import { getWorks } from "@/lib/microcms";
import "../styles/concept.css";

export const metadata: Metadata = { title: "CONCEPT", description: "想いとニーズの接点を描く。デザインへの考え方。" };

const REVEAL: [string, number][] = [[".cp-fig",0.4],[".cp-steps",0.3]];

export default async function Concept() {
  const works = (await getWorks(6)).slice(0, 6);
  return (
    <SiteFrame fv="concept" reveal={REVEAL} current="concept">
      <main>
      <section className="wp-hero" aria-labelledby="cpTitle">
      <div className="wp-art" aria-hidden="true"><svg viewBox="0 0 760 520"><circle className="cc" cx="600" cy="120" r="70"></circle><circle className="ca" cx="300" cy="270" r="190"></circle><circle className="cb" cx="500" cy="270" r="190"></circle></svg></div>
      <div className="wrap">
      <p className="sec-label"><span className="sec-ja">コンセプト</span></p>
      <div className="wp-head"><h1 className="wp-title" id="cpTitle" lang="en">CONCEPT</h1><ol className="wp-crumb" lang="en"><li><Link href="/">TOP</Link></li><li aria-current="page">CONCEPT</li></ol></div>
      </div>
      </section>


      <section className="cp-sec cp-light cp-msg" data-tone="light" aria-labelledby="cpMsg">
      <div className="wrap">
      <div className="cp-head"><p className="sec-label"><span lang="en">PHILOSOPHY</span><span className="sec-bar" aria-hidden="true">|</span><span className="sec-ja">デザインポリシー</span></p></div>
      <div className="cp-msg-grid">
      <div className="cp-msg-copy"><h2 className="cp-copy" id="cpMsg">伝えたいことだけでは、<br />伝わらない。</h2></div>
      <div className="cp-msg-text">
      <p className="cp-p">企業やサービスが伝えたい価値と、ユーザーが求めている価値は、必ずしも同じではありません。</p>
      <p className="cp-p">どれほど優れた製品やサービスであっても、その魅力が相手に伝わらなければ、本来の価値を届けることはできません。</p>
      <p className="cp-p">だからこそ、企業の想いや強みを理解することと同じくらい、ユーザーが何を求め、どのような課題を抱えているのかを理解することが大切だと考えています。</p>
      <p className="cp-p">それぞれの視点を重ね合わせることで、本当に伝えるべき価値を見つけていきます。</p>
      </div>
      </div>
      <figure className="cp-fig" data-in="1" aria-label="企業とユーザー、2つの視点から共通する価値を導き出す。">
      <svg viewBox="0 0 1200 480" role="img" aria-hidden="true" focusable="false">
      <defs><clipPath id="cpClip"><circle className="gL" cx="480" cy="200" r="190"></circle></clipPath></defs>
      <g className="gM"><g style={{ clipPath: "url(#cpClip)" }}><circle className="cp-lens gR" cx="720" cy="200" r="190"></circle></g></g>
      <g className="gL"><circle className="o" cx="480" cy="200" r="190"></circle><text className="t-en" x="410" y="196" textAnchor="middle">BRAND</text><text className="t-ja" x="410" y="224" textAnchor="middle">企業・サービスの想いや強み</text></g>
      <g className="gR"><circle className="o" cx="720" cy="200" r="190"></circle><text className="t-en" x="790" y="196" textAnchor="middle">USER</text><text className="t-ja" x="790" y="224" textAnchor="middle">ユーザーのニーズや課題</text></g>
      <g className="gM"><text className="t-in-v" x="600" y="198" textAnchor="middle">VALUE</text><text className="t-in-ja" x="600" y="224" textAnchor="middle">双方が重なり合う</text><text className="t-in-ja" x="600" y="242" textAnchor="middle">接点</text>
      <line className="cp-drop" x1="600" y1="352" x2="600" y2="392"></line><circle className="cp-dot" cx="600" cy="400" r="5"></circle><text className="t-en t-ne" x="600" y="432" textAnchor="middle">NEW EXPERIENCE</text><text className="t-ja t-ne-ja" x="600" y="458" textAnchor="middle">接点から生まれる新しい体験</text></g>
      </svg>
      <svg className="cp-svg-sp" viewBox="290 10 620 503" role="img" aria-hidden="true" focusable="false">
      <defs><clipPath id="cpClipS"><circle className="gL" cx="480" cy="200" r="190"></circle></clipPath></defs>
      <g className="gM"><g style={{ clipPath: "url(#cpClipS)" }}><circle className="cp-lens gR" cx="720" cy="200" r="190"></circle></g></g>
      <g className="gL"><circle className="o" cx="480" cy="200" r="190"></circle><text className="s-en" x="429" y="175" textAnchor="middle">BRAND</text><text className="s-ja" x="428" y="236" textAnchor="middle">企業・サービス</text><text className="s-ja" x="428" y="265" textAnchor="middle">の想いや強み</text></g>
      <g className="gR"><circle className="o" cx="720" cy="200" r="190"></circle><text className="s-en" x="771" y="175" textAnchor="middle">USER</text><text className="s-ja" x="776" y="225" textAnchor="middle">ユーザーの</text><text className="s-ja" x="776" y="254" textAnchor="middle">ニーズや課題</text></g>
      <g className="gM"><text className="s-v" x="600" y="178" textAnchor="middle">VALUE</text><text className="s-vja" x="600" y="240" textAnchor="middle">接点</text>
      <line className="cp-drop" x1="600" y1="352" x2="600" y2="392"></line><circle className="cp-dot" cx="600" cy="400" r="5"></circle><text className="s-en" x="601" y="464" textAnchor="middle">NEW EXPERIENCE</text><text className="s-ja" x="600" y="508" textAnchor="middle">接点から生まれる新しい体験</text></g>
      </svg>
      <dl className="cp-legend">
      <div><dt lang="en">BRAND</dt><dd>企業・サービスの想いや強み</dd></div>
      <div><dt lang="en">USER</dt><dd>ユーザーのニーズや課題</dd></div>
      <div><dt lang="en">VALUE</dt><dd>双方が重なり合う接点</dd></div>
      <div><dt lang="en">NEW EXPERIENCE</dt><dd>接点から生まれる新しい体験</dd></div>
      </dl>
      </figure>
      </div>
      </section>


      <section className="cp-sec cp-dark cp-proc" aria-labelledby="cpProc">
      <div className="wrap">
      <div className="cp-head"><div><p className="sec-label"><span lang="en">APPROACH</span><span className="sec-bar" aria-hidden="true">|</span><span className="sec-ja">デザインプロセス</span></p>
      <h2 className="cp-proc-ttl cp-proc-ja" id="cpProc">理解し、設計し、形にする。</h2></div>
      <p className="cp-p">感覚だけに頼るのではなく、課題の理解から設計、ビジュアル表現まで、一貫した考え方を持ってデザインに取り組みます。</p></div>
      <ol className="cp-steps">
      <li className="cp-step"><div className="cp-ring" aria-hidden="true"><b>01</b><span>UNDERSTAND</span></div><div className="cp-step-body"><h3 className="cp-step-ttl"><span className="sr" lang="en">01 — UNDERSTAND — </span>理解する</h3><p className="cp-p">企業やサービスの背景・強み・課題を理解するとともに、市場や競合、ユーザーのニーズを多角的に捉える。何が本質的な課題なのかを明確にします。</p><div className="cp-ex"><span className="cp-ex-k">関連項目</span><ul className="cp-tags"><li>ヒアリング</li><li>市場・競合分析</li><li>ユーザー理解</li></ul></div></div></li>
      <li className="cp-step"><div className="cp-ring" aria-hidden="true"><b>02</b><span>STRUCTURE</span></div><div className="cp-step-body"><h3 className="cp-step-ttl"><span className="sr" lang="en">02 — STRUCTURE — </span>設計する</h3><p className="cp-p">誰に、何を、どのように届けるのかを整理し、情報の優先順位や構造、ユーザーの行動導線を設計。目的に沿った体験の土台をつくります。</p><div className="cp-ex"><span className="cp-ex-k">関連項目</span><ul className="cp-tags"><li>コンセプト設計</li><li>情報設計</li><li>ワイヤーフレーム</li><li>UI設計</li></ul></div></div></li>
      <li className="cp-step"><div className="cp-ring" aria-hidden="true"><b>03</b><span>EXPRESS</span></div><div className="cp-step-body"><h3 className="cp-step-ttl"><span className="sr" lang="en">03 — EXPRESS — </span>形にする</h3><p className="cp-p">設計した情報を、ブランドらしさと使いやすさの両面から視覚化。タイポグラフィや配色、余白、動きなどを通じて、伝わる表現を追求します。</p><div className="cp-ex"><span className="cp-ex-k">関連項目</span><ul className="cp-tags"><li>UIデザイン</li><li>ビジュアルデザイン</li><li>プロトタイピング</li></ul></div></div></li>
      </ol>
      <p className="cp-note">※ 制作の考え方を示したものです。各制作実績で実施した工程は、WORKSの詳細ページに記載しています。</p>
      </div>
      </section>


      <WorksSlider works={works} />
      </main>
      <ContactCta />
      <Footer />
    </SiteFrame>
  );
}
