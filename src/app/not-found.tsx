import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <h1 className="text-3xl font-bold py-4">컨텐츠가 존재하지 않습니다...</h1>
      <Link href="/">메인페이지로 이동</Link>
    </>
  );
}
