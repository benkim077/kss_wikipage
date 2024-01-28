import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "강의 게시판",
  description: "강의 목록",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko-KR">
      <body className={inter.className}>
        <h1 className="text-3xl font-bold py-4">강의 목록</h1>
        {children}
      </body>
    </html>
  );
}
