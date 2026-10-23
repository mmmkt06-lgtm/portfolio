import type { Metadata } from "next";
import Link from "next/link";
import SiteFrame from "@/components/SiteFrame";
import MotionButton from "@/components/MotionButton";
import WorksSlider from "@/components/WorksSlider";
import ContactCta from "@/components/ContactCta";
import Footer from "@/components/Footer";
import { getWorks } from "@/lib/microcms";
import "./styles/top.css";

export const metadata: Metadata = { title: { absolute: "PORTFOLIO | 想いとニーズの接点を描く。" } };

const REVEAL: [string, number][] = [[".dg", 0.45], [".pf", 0.3]];

export default async function Home() {
  const works = (await getWorks(6)).slice(0, 6);
  return (
    <SiteFrame fv="main" mode="top" reveal={REVEAL}>
      <div className="zoom">
      <div className="stage">
      <main className="fv-body">
      <div className="wrap fv-copy">
      <div className="copy-inner">
      <h1><span className="ja">想いとニーズの接点を描く。</span><span className="en-big" lang="en"><span className="ln"><span>DESIGN THE</span></span><span className="ln"><span>CONNECTION.</span></span></span></h1>
      <p className="en-sub" lang="en">Where Different Values Intersect,We Create New Experiences.</p>
      </div>
      </div>

      <div className="fv-art" aria-hidden="true">
      <svg className="art" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" focusable="false">
      <defs>
      <clipPath id="fvClipA"><circle className="mA" cx="788.3" cy="243.2" r="143"></circle></clipPath>
      </defs>
      <g className="scl">
      <g className="far">
      <circle className="c-dim" cx="-8" cy="125" r="212"></circle>
      <g className="mC"><circle className="c-mid" cx="30" cy="705" r="140"></circle></g>
      <g className="mS2"><circle className="c-dim" cx="1348" cy="796" r="210"></circle></g>
      <g className="mS1"><circle className="c-dim" cx="280" cy="283.4" r="39"></circle></g>
      </g>
      <g className="far"><g className="mS3"><circle className="c-main" cx="484.3" cy="180.3" r="71"></circle></g></g>
      <g className="far"><g className="mN1"><circle className="c-main" cx="1261.1" cy="171.3" r="46"></circle></g></g>
      <g className="far"><g className="mN2"><circle className="c-mid" cx="1395" cy="148" r="30"></circle></g></g>
      <g className="far"><g className="mN3"><circle className="c-dim" style={{ strokeOpacity: ".4" }} cx="1249.1" cy="506.9" r="58"></circle></g></g>
      <g className="lens">
      <g style={{ clipPath: "url(#fvClipA)" }}><circle className="mB lens-fill" cx="1018.3" cy="316.2" r="173"></circle></g>
      </g>
      <g className="inA"><g className="mA"><circle className="c-lens" cx="788.3" cy="243.2" r="143"></circle></g></g>
      <g className="inB"><g className="mB"><circle className="c-lens" cx="1018.3" cy="316.2" r="173"></circle></g></g>
      <g className="lens"><circle className="dot" cx="888.3" cy="270.2" r="10"></circle></g>
      </g>
      </svg>
      </div>

      <div className="wrap fv-meta">
      <MotionButton />
      </div>
      </main>
      <div className="lit-bg" aria-hidden="true"></div>
      </div>
      </div>


      <section className="second" aria-labelledby="conceptTitle">
      <div className="wrap concept">
      <div className="c-text">
      <p className="sec-label" lang="en"><span className="sec-no">01</span><span className="sec-line" aria-hidden="true"></span><span>CONCEPT</span></p>
      <h2 className="c-title" id="conceptTitle">異なる価値が交わる場所から、新しい体験を描く。</h2>
      <div className="c-body">
      <p>企業やサービスが伝えたい想いと、ユーザーが求めている価値。</p>
      <p>その両方を深く理解し、重なり合う接点を見つけることが、デザインの出発点だと考えています。</p>
      <p>市場や競合、ユーザーのニーズを多角的に捉え、論理的な設計とクリエイティブの力で、伝わり、心に残る体験を形にします。</p>
      <Link className="text-link" href="/concept/"><span>デザインへの考え方</span><span className="tl-ring" aria-hidden="true"><svg width="26" height="12" viewBox="0 0 26 12" fill="none"><path d="M0 6h24M19 1l5 5-5 5" stroke="currentColor" strokeWidth="1.2"></path></svg></span></Link>
      </div>
      </div>
      <div className="c-fig">
      <svg className="dg" viewBox="0 0 640 400" aria-hidden="true" focusable="false">
      <defs>
      <clipPath id="dgClipL"><circle className="dg-L" cx="215" cy="200" r="170"></circle></clipPath>
      <clipPath id="dgClipR"><circle className="dg-R" cx="425" cy="200" r="170"></circle></clipPath>
      </defs>
      <circle className="dg-c dg-L" cx="215" cy="200" r="170"></circle>
      <circle className="dg-c dg-R" cx="425" cy="200" r="170"></circle>
      <g style={{ clipPath: "url(#dgClipR)" }}><circle className="dg-edge dg-L" cx="215" cy="200" r="170"></circle></g>
      <g style={{ clipPath: "url(#dgClipL)" }}><circle className="dg-edge dg-R" cx="425" cy="200" r="170"></circle></g>
      <g className="dg-L"><line className="dg-axis" x1="26.5" y1="199" x2="92.2" y2="199"></line><line className="dg-axis" x1="178.8" y1="199" x2="278.5" y2="199"></line><path className="dg-arrow" d="M274.4 192l8 7-8 7"></path><text className="dg-en" x="135" y="205" textAnchor="middle">Intention</text><text className="dg-ja" x="135" y="232" textAnchor="middle">想い</text></g>
      <g className="dg-R"><line className="dg-axis" x1="465.9" y1="199" x2="360.7" y2="199"></line><line className="dg-axis" x1="542.5" y1="199" x2="608.2" y2="199"></line><path className="dg-arrow" d="M365.6 192l-8 7 8 7"></path><text className="dg-en" x="505" y="205" textAnchor="middle">Needs</text><text className="dg-ja" x="505" y="232" textAnchor="middle">ニーズ</text></g>
      <g className="dg-mid"><text className="dg-en" x="320" y="205" textAnchor="middle">Design</text><text className="dg-ja" x="320" y="232" textAnchor="middle">接点</text></g>
      </svg>
      </div>
      </div>
      </section>

      <section className="profile" id="profile" aria-labelledby="profileTitle">
      <div className="wrap pf">
      <p className="sec-label pf-label" lang="en"><span className="sec-no">02</span><span className="sec-line" aria-hidden="true"></span><span>PROFILE</span></p>
      <div className="pf-text">
      <h2 className="pf-name" id="profileTitle"><span lang="en">NAGATA MIKITO</span><span className="pf-name-ja">永田 幹斗</span></h2>
      <p className="pf-role" lang="en">WEB / UI DESIGNER</p>
      <p className="pf-bio">Webディレクター兼デザイナーとして、ヒアリング・情報設計・Webデザイン・制作進行まで幅広く経験。現在はこれまでのデザイン経験に加え、マーケティングを学び、企業・サービスとユーザー双方の視点からデザインを考える力を深めています。</p>
      <Link className="text-link pf-link" href="/about/"><span lang="en">VIEW PROFILE</span><span className="tl-ring" aria-hidden="true"><svg width="26" height="12" viewBox="0 0 26 12" fill="none"><path d="M0 6h24M19 1l5 5-5 5" stroke="currentColor" strokeWidth="1.2"></path></svg></span></Link>
      </div>
      <figure className="pf-photo">
      <div className="pf-img"><img src="/images/profile.jpg" width="800" height="1000" alt="プロフィール写真" loading="lazy" decoding="async" /></div>
      <span className="pf-ring" aria-hidden="true"></span>
      </figure>
      </div>
      </section>
      <WorksSlider works={works} />
      <ContactCta />
      <Footer />
    </SiteFrame>
  );
}
