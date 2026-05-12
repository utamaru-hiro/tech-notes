import type { Metadata } from "next";
import "./globals.css";
import "highlight.js/styles/atom-one-light.css";

export const metadata: Metadata = {
  title: "Tech Notes",
  description: "プログラミング言語仕様ガイド＆技術用語集",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
