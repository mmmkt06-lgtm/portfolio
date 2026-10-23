# portfolio-nagata

IDENTIVEとは別の新規ポートフォリオサイト（Next.js 15 / React 19）。デザインは共有済みの「Portfolio FV」キャンバス、仕様は `design.md` に準拠。

- ページ: `/` `/concept/` `/about/`（ナビ表示はPROFILE） `/works/` `/works/[id]/` `/contact/`（NEWSなし）
- 制作実績: 既存IDENTIVEのmicroCMS `works-detail` を **GETのみ** で参照（書き込み・削除なし）。環境変数は `.env.example` 参照
- CSS: `app/styles/*.css` はデザインのCSSをページ単位で `:where([data-fv=…])` にスコープしたもの
- 公開前の差し替え: 仮ロゴ「LOGO」、メールアドレス（`NEXT_PUBLIC_CONTACT_EMAIL`）、仮原稿（CONCEPT/PROFILE本文）
