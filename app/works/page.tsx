import type { Metadata } from "next";
import Link from "next/link";
import SiteFrame from "@/components/SiteFrame";
import WorksGrid, { type WorkCard } from "@/components/WorksGrid";
import ContactCta from "@/components/ContactCta";
import Footer from "@/components/Footer";
import { getWorks, toTagArray, toWebp, workThumb } from "@/lib/microcms";
import "../styles/works.css";

export const metadata: Metadata = { title: "WORKS", description: "制作実績の一覧。" };

const REVEAL: [string, number][] = [[".wp-grid", 0.1]];

export default async function Works() {
  const works = await getWorks();
  const cards: WorkCard[] = works.map((w) => {
    const img = workThumb(w);
    return {
      id: w.id,
      title: w.title ?? "",
      client: w.client ?? "",
      categories: toTagArray(w.category),
      image: img ? { src: toWebp(img.url), width: img.width, height: img.height } : undefined,
    };
  });

  return (
    <SiteFrame fv="works" reveal={REVEAL} current="works">
      <main>
        <section className="wp-hero" aria-labelledby="wpTitle">
          <div className="wp-art" aria-hidden="true">
            <svg viewBox="0 0 760 520">
              <circle className="cc" cx="600" cy="120" r="70"></circle>
              <circle className="ca" cx="300" cy="270" r="190"></circle>
              <circle className="cb" cx="500" cy="270" r="190"></circle>
            </svg>
          </div>
          <div className="wrap">
            <p className="sec-label">
              <span className="sec-ja">制作実績</span>
            </p>
            <div className="wp-head">
              <h1 className="wp-title" id="wpTitle" lang="en">WORKS</h1>
              <ol className="wp-crumb" lang="en">
                <li><Link href="/">TOP</Link></li>
                <li aria-current="page">WORKS</li>
              </ol>
            </div>
          </div>
        </section>
        <section className="wp-list" data-tone="light" aria-label="制作実績一覧">
          <WorksGrid works={cards} />
        </section>
      </main>
      <ContactCta />
      <Footer />
    </SiteFrame>
  );
}
