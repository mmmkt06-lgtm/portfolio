import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteFrame from "@/components/SiteFrame";
import ContactCta from "@/components/ContactCta";
import Footer from "@/components/Footer";
import { getWork, getWorks, toList, toTagArray, toWebp, workThumb } from "@/lib/microcms";
import "../../styles/works-detail.css";

type Params = { id: string };

const REVEAL: [string, number][] = [[".wd-kv", 0.2], [".wd-gal", 0.15]];

export async function generateStaticParams() {
  return (await getWorks()).map((w) => ({ id: w.id }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const work = await getWork((await params).id);
  if (!work) return {};
  return { title: work.title, description: work.subtitle };
}

const Arrow = ({ d }: { d: string }) => (
  <svg width="18" height="10" viewBox="0 0 18 10" fill="none" aria-hidden="true"><path d={d} stroke="currentColor" strokeWidth="1.1" /></svg>
);

export default async function WorkDetail({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const [work, all] = await Promise.all([getWork(id), getWorks()]);
  if (!work) notFound();

  const cats = toTagArray(work.category);
  const roles = toList(work.scope);
  const paragraphs = (work.outline ?? "").split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  const kv = work.hero_image ?? workThumb(work);
  const gallery = work.image ?? [];
  const url = work.siteUrl && /^https?:\/\//.test(work.siteUrl) ? work.siteUrl : null;
  const i = all.findIndex((w) => w.id === id);
  const prev = i > 0 ? all[i - 1] : null;
  const next = i >= 0 && i < all.length - 1 ? all[i + 1] : null;

  return (
    <SiteFrame fv="wdetail" reveal={REVEAL} current="works">
      <main>
        <section className="wp-hero wd-hero" aria-labelledby="wdTitle">
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
              <div>
                <h1 className="wd-title" id="wdTitle">{work.title}</h1>
                <div className="wd-tags">
                  {cats[0] && <span className="wd-cat" lang="en">{cats[0]}</span>}
                  {work.project && <span className="wd-proj">{work.project}</span>}
                </div>
              </div>
              <ol className="wp-crumb" lang="en">
                <li><Link href="/">TOP</Link></li>
                <li><Link href="/works/">WORKS</Link></li>
                <li aria-current="page">DETAIL</li>
              </ol>
            </div>
          </div>
        </section>

        <section className="cp-sec cp-light wd-main" data-tone="light" aria-label="制作実績の詳細">
          <div className="wrap">
            {kv && (
              <figure className="wd-kv">
                <img src={toWebp(kv.url)} width={kv.width} height={kv.height} alt={work.title ?? ""} decoding="async" />
              </figure>
            )}
            <div className="wd-info">
              <dl className="wd-spec">
                {work.project && <div><dt lang="en">PROJECT</dt><dd>{work.project}</dd></div>}
                {cats.length > 0 && <div><dt lang="en">CATEGORY</dt><dd lang="en">{cats.join(" / ")}</dd></div>}
                {work.client && <div><dt lang="en">CLIENT</dt><dd>{work.client}</dd></div>}
                {roles.length > 0 && (
                  <div><dt lang="en">ROLE</dt><dd><ul className="wd-roles">{roles.map((r) => <li key={r}>{r}</li>)}</ul></dd></div>
                )}
                <div>
                  <dt lang="en">URL</dt>
                  <dd>{url ? <a href={url} target="_blank" rel="noopener noreferrer">{url}<span className="sr">（新しいタブで開きます）</span></a> : "非公開"}</dd>
                </div>
              </dl>
              {paragraphs.length > 0 && (
                <div className="wd-ov">
                  <p className="sec-label">
                    <span lang="en">OVERVIEW</span>
                    <span className="sec-bar" aria-hidden="true">|</span>
                    <span className="sec-ja">概要</span>
                  </p>
                  {paragraphs.map((p, n) => <p className="cp-p" key={n}>{p}</p>)}
                </div>
              )}
            </div>
            {gallery.length > 0 && (
              <ul className="wd-gal" aria-label="制作画像">
                {gallery.map((g, n) => (
                  <li className={n === 0 ? "full" : undefined} key={g.url}>
                    <img src={toWebp(g.url)} width={g.width} height={g.height} alt={`${work.title ?? ""}（${n + 1}）`} loading="lazy" decoding="async" />
                  </li>
                ))}
              </ul>
            )}
            <nav className="wd-pager" aria-label="ほかの制作実績">
              {prev ? (
                <Link className="wd-pg prev" href={`/works/${prev.id}/`}>
                  <span lang="en"><Arrow d="M18 5H1M5 1L1 5l4 4" />PREV</span>
                  <b>{prev.title}</b>
                </Link>
              ) : <span />}
              <Link className="wd-back" href="/works/" lang="en">ALL<br />WORKS</Link>
              {next ? (
                <Link className="wd-pg next" href={`/works/${next.id}/`}>
                  <span lang="en">NEXT<Arrow d="M0 5h17M13 1l4 4-4 4" /></span>
                  <b>{next.title}</b>
                </Link>
              ) : <span />}
            </nav>
          </div>
        </section>
      </main>
      <ContactCta />
      <Footer />
    </SiteFrame>
  );
}
