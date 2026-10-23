import type { Metadata } from "next";
import Link from "next/link";
import SiteFrame from "@/components/SiteFrame";
import WorksSlider from "@/components/WorksSlider";
import ContactCta from "@/components/ContactCta";
import Footer from "@/components/Footer";
import { getWorks } from "@/lib/microcms";
import Timeline from "@/components/Timeline";
import "../styles/profile.css";

export const metadata: Metadata = { title: "PROFILE", description: "プロフィール・経歴・スキル・使用ツール。" };

const REVEAL: [string, number][] = [[".pr-intro",0.3]];

export default async function About() {
  const works = (await getWorks(6)).slice(0, 6);
  return (
    <SiteFrame fv="profile" reveal={REVEAL} current="about">
      <main>
      <section className="wp-hero" aria-labelledby="prTitle">
      <div className="wp-art" aria-hidden="true"><svg viewBox="0 0 760 520"><circle className="cc" cx="600" cy="120" r="70"></circle><circle className="ca" cx="300" cy="270" r="190"></circle><circle className="cb" cx="500" cy="270" r="190"></circle></svg></div>
      <div className="wrap">
      <p className="sec-label"><span className="sec-no" lang="en">02</span><span className="sec-line" aria-hidden="true"></span><span className="sec-ja">プロフィール</span></p>
      <div className="wp-head"><h1 className="wp-title" id="prTitle" lang="en">PROFILE</h1><ol className="wp-crumb" lang="en"><li><Link href="/">TOP</Link></li><li aria-current="page">PROFILE</li></ol></div>
      </div>
      </section>


      <section className="cp-sec cp-light pr-intro-sec" data-tone="light" aria-labelledby="prName">
      <div className="wrap pr-intro">
      <figure className="pr-photo"><div className="pr-img"><img src="/images/profile.jpg" width="800" height="1000" alt="永田幹斗のプロフィール写真" decoding="async" /></div><span className="pr-ring" aria-hidden="true"></span></figure>
      <div className="pr-text">
      <p className="sec-label"><span className="sec-no" lang="en">01</span><span className="sec-line" aria-hidden="true"></span><span lang="en">ABOUT</span><span className="sec-bar" aria-hidden="true">|</span><span className="sec-ja">自己紹介</span></p>
      <h2 className="pr-name" id="prName"><span lang="en">NAGATA MIKITO</span><small>永田 幹斗</small></h2>
      <p className="pr-role" lang="en">WEB / UI DESIGNER</p>
      <h3 className="pr-lead">設計から表現まで、一貫して考える。</h3>
      <div className="pr-bio-wrap">
      <p className="cp-p pr-bio">1996年生まれ福岡出身のWebデザイナーです。</p>
      <p className="cp-p pr-bio">これまでWeb制作やブランディングの現場で、コーポレートサイトやLPを中心に様々な制作に携わってきました。</p>
      <p className="cp-p pr-bio">ヒアリングや課題整理、情報設計、ワイヤーフレームの作成から、UI・ビジュアルデザイン、制作進行まで幅広い工程を経験しています。</p>
      <p className="cp-p pr-bio">現在は、これまで培ってきたデザインの知識や経験に加え、マーケティングの視点も取り入れながら、ユーザーの課題やニーズを捉えたデザインを追求しています。</p>
      </div>
      </div>
      </div>
      </section>


      <section className="cp-sec cp-light pr-sec-pad" data-tone="light" style={{ paddingTop: "clamp(56px,6.5cqw,96px)" }} aria-labelledby="prCareer">
      <div className="wrap">
      <div className="cp-head pr-car-head"><p className="sec-label"><span className="sec-no" lang="en">02</span><span className="sec-line" aria-hidden="true"></span><span lang="en">CAREER</span><span className="sec-bar" aria-hidden="true">|</span><span className="sec-ja">経歴</span></p><h2 className="cp-lead-ttl" id="prCareer">これまでの経歴</h2></div>
      <Timeline>
      <li className="pr-tl-item" data-open="false">
      <span className="pr-tl-dot" aria-hidden="true"></span>
      <h3 className="pr-tl-h"><button type="button" className="pr-tl-btn" id="prTlB0" aria-expanded="false" aria-controls="prTl0"><span className="pr-tl-date" lang="en">2020.04 — 2022.03</span><span className="pr-tl-main"><span className="pr-tl-role">タカラスタンダード株式会社</span><span className="pr-tl-org">施工管理</span></span><span className="pr-tl-kw">施工管理・進行調整</span><span className="pr-tl-ico" aria-hidden="true"></span></button></h3>
      <div className="pr-tl-panel" id="prTl0" role="region" aria-labelledby="prTlB0"><div className="pr-tl-in"><div className="pr-tl-body"><p className="cp-p">住宅設備の施工管理業務に従事。施工スケジュールの管理や関係者との調整などを担当し、プロジェクトを円滑に進めるための進行管理や調整力を身につけました。</p></div></div></div>
      </li>
      <li className="pr-tl-item" data-open="false">
      <span className="pr-tl-dot" aria-hidden="true"></span>
      <h3 className="pr-tl-h"><button type="button" className="pr-tl-btn" id="prTlB1" aria-expanded="false" aria-controls="prTl1"><span className="pr-tl-date" lang="en">2023.11 — 2024.02</span><span className="pr-tl-main"><span className="pr-tl-role">株式会社自然工房</span><span className="pr-tl-org">Webデザイナー</span></span><span className="pr-tl-kw">Webサイト制作・ビジュアルデザイン</span><span className="pr-tl-ico" aria-hidden="true"></span></button></h3>
      <div className="pr-tl-panel" id="prTl1" role="region" aria-labelledby="prTlB1"><div className="pr-tl-in"><div className="pr-tl-body"><p className="cp-p">WebデザイナーとしてWebサイトの制作業務に従事。Webデザインの実務経験を積み、情報の見せ方やレイアウト、ビジュアル表現に関する知識と技術を深めました。</p></div></div></div>
      </li>
      <li className="pr-tl-item" data-open="false">
      <span className="pr-tl-dot" aria-hidden="true"></span>
      <h3 className="pr-tl-h"><button type="button" className="pr-tl-btn" id="prTlB2" aria-expanded="false" aria-controls="prTl2"><span className="pr-tl-date" lang="en">2024.09 — 2026.05</span><span className="pr-tl-main"><span className="pr-tl-role">株式会社アンドストーリー</span><span className="pr-tl-org">Webディレクター兼デザイナー</span></span><span className="pr-tl-kw">情報設計・UIデザイン・進行管理</span><span className="pr-tl-ico" aria-hidden="true"></span></button></h3>
      <div className="pr-tl-panel" id="prTl2" role="region" aria-labelledby="prTlB2"><div className="pr-tl-in"><div className="pr-tl-body"><p className="cp-p">ブランディング会社にて、コーポレートサイトや採用サイト、LPなどの制作に従事。</p><p className="cp-p">クライアントへのヒアリングから課題整理、情報設計、ワイヤーフレーム作成、UI・ビジュアルデザイン、制作進行管理まで幅広く担当しました。</p><p className="cp-p">また、約50ページ規模のWebサイト制作や、撮影・イラスト制作のディレクションなども経験しました。</p></div></div></div>
      </li>
      <li className="pr-tl-item is-current" data-open="true">
      <span className="pr-tl-dot" aria-hidden="true"></span>
      <h3 className="pr-tl-h"><button type="button" className="pr-tl-btn" id="prTlB3" aria-expanded="true" aria-controls="prTl3"><span className="pr-tl-date" lang="en">2026.06 — PRESENT</span><span className="pr-tl-main"><span className="pr-tl-role">自主制作・スキルアップ</span></span><span className="pr-tl-kw">ポートフォリオ制作・マーケティング学習</span><span className="pr-tl-ico" aria-hidden="true"></span></button></h3>
      <div className="pr-tl-panel" id="prTl3" role="region" aria-labelledby="prTlB3"><div className="pr-tl-in"><div className="pr-tl-body"><ul className="cp-tags pr-tl-tags"><li>Webデザイン</li><li>マーケティング</li><li>AI活用</li></ul><p className="cp-p">これまでの実務経験を活かしながら、Webサイトやポートフォリオの制作に取り組んでいます。</p><p className="cp-p">また、職業訓練を通じてデジタルマーケティングを学び、市場や顧客の分析からデザインを考える視点を強化しています。AIを活用したWeb制作にも取り組んでいます。</p></div></div></div>
      </li>
      </Timeline>
      </div>
      </section>


      <section className="cp-sec cp-dark pr-sec-pad" aria-labelledby="prSkill">
      <div className="wrap">
      <div className="cp-head"><p className="sec-label"><span className="sec-no" lang="en">03</span><span className="sec-line" aria-hidden="true"></span><span lang="en">SKILLS</span><span className="sec-bar" aria-hidden="true">|</span><span className="sec-ja">できること</span></p><h2 className="cp-lead-ttl" id="prSkill" style={{ color: "#D9D9D9" }}>担当できる領域</h2></div>
      <ul className="pr-sk">
      <li className="pr-sk-row"><div className="pr-sk-area"><span className="pr-sk-no" lang="en">01</span><h3 className="pr-sk-ttl">調査・企画</h3><span className="pr-sk-en" lang="en">RESEARCH &amp; PLANNING</span></div><p className="cp-p pr-sk-do">クライアントへのヒアリングを通じて、制作の目的や課題、ターゲットを整理します。競合調査やペルソナ設計などの手法も取り入れながら、ユーザーのニーズを捉えた企画・設計につなげます。</p><div className="pr-sk-meta"><span className="pr-k">対応領域</span><ul className="cp-tags pr-sk-tags"><li>ヒアリング・課題整理</li><li>要件定義</li><li>競合調査</li><li>ペルソナ設計</li></ul></div></li>
      <li className="pr-sk-row"><div className="pr-sk-area"><span className="pr-sk-no" lang="en">02</span><h3 className="pr-sk-ttl">UX・情報設計</h3><span className="pr-sk-en" lang="en">UX &amp; INFORMATION ARCHITECTURE</span></div><p className="cp-p pr-sk-do">ユーザーの視点に立ち、必要な情報やコンテンツを整理します。サイト全体の構造や導線を設計し、目的の情報にたどり着きやすく、直感的に利用できるWebサイトを目指します。</p><div className="pr-sk-meta"><span className="pr-k">対応領域</span><ul className="cp-tags pr-sk-tags"><li>サイトマップ設計</li><li>コンテンツ設計</li><li>導線設計</li><li>ワイヤーフレーム制作</li><li>プロトタイプ制作</li></ul></div></li>
      <li className="pr-sk-row"><div className="pr-sk-area"><span className="pr-sk-no" lang="en">03</span><h3 className="pr-sk-ttl">UI・ビジュアルデザイン</h3><span className="pr-sk-en" lang="en">UI &amp; VISUAL DESIGN</span></div><p className="cp-p pr-sk-do">企業やサービスのブランドイメージを踏まえ、伝えたい価値を視覚的に表現します。配色やタイポグラフィ、余白、視線誘導などを意識し、使いやすさと世界観を両立したデザインを制作します。</p><div className="pr-sk-meta"><span className="pr-k">対応領域</span><ul className="cp-tags pr-sk-tags"><li>Webサイト・LPデザイン</li><li>UIデザイン</li><li>レスポンシブデザイン</li><li>デザインシステム・コンポーネント設計</li><li>グラフィックデザイン</li></ul></div></li>
      <li className="pr-sk-row"><div className="pr-sk-area"><span className="pr-sk-no" lang="en">04</span><h3 className="pr-sk-ttl">ディレクション・進行管理</h3><span className="pr-sk-en" lang="en">DIRECTION &amp; MANAGEMENT</span></div><p className="cp-p pr-sk-do">クライアントや制作チームと連携し、認識のすり合わせや制作進行を行います。スケジュールや品質を管理しながら、プロジェクトを円滑に進めることを意識しています。</p><div className="pr-sk-meta"><span className="pr-k">対応領域</span><ul className="cp-tags pr-sk-tags"><li>クライアントとの折衝</li><li>制作進行・スケジュール管理</li><li>制作チームとの連携</li><li>撮影・イラスト制作ディレクション</li><li>品質確認・デバッグ</li></ul></div></li>
      <li className="pr-sk-row"><div className="pr-sk-area"><span className="pr-sk-no" lang="en">05</span><h3 className="pr-sk-ttl">フロントエンド・実装知識</h3><span className="pr-sk-en" lang="en">FRONT-END KNOWLEDGE</span></div><p className="cp-p pr-sk-do">HTML・CSS・JavaScriptの基礎知識を活かし、実装を考慮したWebデザインを行います。また、AIを活用したコーディングやCMSを用いたWebサイト制作にも取り組んでいます。</p><div className="pr-sk-meta"><span className="pr-k">対応領域</span><ul className="cp-tags pr-sk-tags"><li>HTML / CSS / JavaScript</li><li>レスポンシブ対応</li><li>CMSを活用したサイト構築</li><li>AIを活用したWeb制作</li></ul></div></li>
      </ul>
      <div className="tl-box"><div className="tl-head"><h3 className="pr-sk-ttl">使用できるツール</h3><span className="pr-sk-en" lang="en">TOOLS</span></div><div className="tl-grid"><div className="tl-grp"><p className="tl-k"><span lang="en">DESIGN</span></p><ul className="tl-tags"><li lang="en">Figma</li><li lang="en">Illustrator</li><li lang="en">Photoshop</li><li lang="en">Canva</li></ul></div><div className="tl-grp"><p className="tl-k"><span lang="en">DEVELOPMENT &amp; CMS</span></p><ul className="tl-tags"><li lang="en">HTML / CSS</li><li lang="en">JavaScript</li><li lang="en">WordPress</li><li lang="en">STUDIO</li><li lang="en">microCMS</li><li lang="en">GitHub</li><li lang="en">Vercel</li></ul></div><div className="tl-grp"><p className="tl-k"><span lang="en">DIRECTION &amp; COLLABORATION</span></p><ul className="tl-tags"><li lang="en">Backlog</li><li lang="en">Slack</li><li lang="en">Chatwork</li><li lang="en">Miro</li><li lang="en">Google Workspace</li></ul></div><div className="tl-grp"><p className="tl-k"><span lang="en">AI</span></p><ul className="tl-tags"><li lang="en">Claude Code</li><li lang="en">ChatGPT</li></ul></div></div></div></div>
      </section>


      <WorksSlider works={works} />
      </main>
      <ContactCta />
      <Footer />
    </SiteFrame>
  );
}
