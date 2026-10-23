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

export default async function WorkDetail({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const work = await getWork(id);
  if (!work) notFound();

  const cats = toTagArray(work.category);
  const roles = toList(work.scope);
  const paragraphs = (work.outline ?? "").split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  const kv = work.hero_image ?? workThumb(work);
  const gallery = work.image ?? [];
  const url = work.siteUrl && /^https?:\/\//.test(work.siteUrl) ? work.siteUrl : null;

  return (
    <SiteFrame fv="wdetail" reveal={REVEAL} current="works">
      <main>
        <section className="cp-sec cp-light wd-main" data-tone="light" aria-label="制作実績の詳細">
          <nav className="wd-crumb" aria-label="パンくず">
            <ol lang="en">
              <li><Link href="/">TOP</Link></li>
              <li><Link href="/works/">WORKS</Link></li>
              <li aria-current="page" lang="ja">{work.title}</li>
            </ol>
          </nav>
          <div className="wrap">
            <header className="wd-head">
              <h1 className="wd-title">{work.title}</h1>
              <div className="wd-tags">
                {cats[0] && <span className="wd-cat" lang="en">{cats[0]}</span>}
                {work.project && <span className="wd-proj">{work.project}</span>}
              </div>
            </header>
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
            <nav className="wd-pager" aria-label="制作実績一覧へ">
              <Link className="wd-back" href="/works/" lang="en">ALL<br />WORKS</Link>
            </nav>
          </div>
        </section>
      </main>
      <ContactCta />
      <Footer />
    </SiteFrame>
  );
}
