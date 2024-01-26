"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  id: number;
  children: ReactNode;
}

export default function UpdateButton({ id, children }: Props) {
  return (
    <Link
      href={`/wiki/${id}/edit`}
      className="font-normal text-black border border-black p-1 rounded"
    >
      {children}
    </Link>
  );
}
