import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const path = req.nextUrl.searchParams.get("path");
  if (!path) throw new Error("경로는 필수입니다.");

  revalidatePath(path, "page");
  return NextResponse.json({ message: "재검증 성공", path });
}
