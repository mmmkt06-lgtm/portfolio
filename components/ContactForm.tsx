"use client";

import { useState, type FormEvent } from "react";

const KINDS = [
  "Webサイト・LP制作のご相談",
  "ロゴ・グラフィックデザインのご相談",
  "お見積りについて",
  "採用・面談に関するご連絡",
  "その他のお問い合わせ",
];

const Arrow = () => (
  <svg width="26" height="12" viewBox="0 0 26 12" fill="none" aria-hidden="true"><path d="M0 6h24M19 1l5 5-5 5" stroke="currentColor" strokeWidth="1.2"></path></svg>
);

/** 送信はメールアプリ（mailto）に引き継ぐ。宛先は公開用メールアドレスの環境変数 */
export default function ContactForm({ email }: { email?: string }) {
  const [error, setError] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    const fd = new FormData(form);
    const kinds = fd.getAll("kind") as string[];
    if (!kinds.length) { setError("お問い合わせ種別を1つ以上選択してください。"); return; }
    if (!email) { setError("送信先メールアドレスが未設定のため、送信できません。"); return; }
    setError("");
    const body = [
      `お名前：${fd.get("name")}`,
      `会社名・団体名：${fd.get("company") || "（未入力）"}`,
      `メールアドレス：${fd.get("email")}`,
      `お問い合わせ種別：${kinds.join("、")}`,
      "",
      "お問い合わせ内容：",
      `${fd.get("message")}`,
    ].join("\n");
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(`【お問い合わせ】${fd.get("name")}`)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form className="ctf-form" onSubmit={onSubmit} noValidate={false}>
      <div className="ctf-g">
        <label className="ctf-lb" htmlFor="ctfName">お名前<span className="ctf-bd">必須</span></label>
        <input className="ctf-in" id="ctfName" name="name" type="text" autoComplete="name" placeholder="山田 太郎" required />
      </div>
      <div className="ctf-g">
        <label className="ctf-lb" htmlFor="ctfCompany">会社名・団体名<span className="ctf-bd opt">任意</span></label>
        <input className="ctf-in" id="ctfCompany" name="company" type="text" autoComplete="organization" placeholder="株式会社〇〇" />
      </div>
      <div className="ctf-g">
        <label className="ctf-lb" htmlFor="ctfEmail">メールアドレス<span className="ctf-bd">必須</span></label>
        <input className="ctf-in" id="ctfEmail" name="email" type="email" autoComplete="email" placeholder="example@example.com" required />
      </div>
      <fieldset className="ctf-g ctf-set">
        <legend className="ctf-lb">お問い合わせ種別<span className="ctf-bd">必須</span><span className="ctf-note">複数選択できます</span></legend>
        <div className="ctf-opts">
          {KINDS.map((k) => (
            <label className="ctf-opt" key={k}><input className="ctf-chk" type="checkbox" name="kind" value={k} /><span>{k}</span></label>
          ))}
        </div>
      </fieldset>
      <div className="ctf-g">
        <label className="ctf-lb" htmlFor="ctfMsg">お問い合わせ内容<span className="ctf-bd">必須</span></label>
        <textarea className="ctf-in ctf-ta" id="ctfMsg" name="message" placeholder="お問い合わせ内容をご入力ください。" required></textarea>
      </div>
      <div className="ctf-agree">
        <label className="ctf-ag"><input className="ctf-chk" type="checkbox" name="agree" required /><span><u>プライバシーポリシー</u>をご確認いただき、個人情報の取り扱いに同意してください。</span></label>
      </div>
      {error && <p className="ctf-err" role="alert">{error}</p>}
      <button className="ctf-send" type="submit"><span>送信する</span><Arrow /></button>
    </form>
  );
}
