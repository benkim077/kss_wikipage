import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "강의 소개",
  description: "강의 설명",
};

export default function WikiLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <h1 className="text-3xl font-bold py-4">강의 소개</h1>
      {children}
    </>
  );
}
