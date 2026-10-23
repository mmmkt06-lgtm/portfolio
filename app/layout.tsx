import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "PORTFOLIO | 想いとニーズの接点を描く。", template: "%s | PORTFOLIO" },
  description: "想いとニーズの接点を描く。Web／UIデザイナーのポートフォリオ。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap" />
      </head>
      <body>{children}</body>
    </html>
  );
}
