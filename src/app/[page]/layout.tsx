export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <h1 className="text-3xl font-bold py-4">강의 목록</h1>
      {children}
    </>
  );
}
