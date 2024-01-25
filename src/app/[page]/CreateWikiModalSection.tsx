"use client";

import { useState } from "react";
import { Dialog } from "@/components/Dialog";
import createDatabaseClient from "@/api/database";

export default function CreateWikiModalSection() {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const [titleInput, setTitleInput] = useState("");
  const [bodyInput, setBodyInput] = useState("");

  async function createWiki() {
    // TODO: 이 코드를 어디에서 사용할 것인가?
    // 서버에 요청해달라고 함? 서버에서 캐시만 제거? 캐시를 제거하면 요청을 할 것이다.
    // TODO: supabase 레코드 생성
    const db = createDatabaseClient();

    const { data, error } = await db
      .from("Page")
      .insert([{ title: titleInput, body: bodyInput }])
      .select();
    if (error) throw error;
    closeModal();
  }

  return (
    <>
      <Dialog isOpen={isOpen}>
        <Dialog.Title>위키 생성하기</Dialog.Title>
        <Dialog.Input
          value={titleInput}
          id={TITLE}
          onChange={(e) => setTitleInput(e.target.value)}
        >
          제목
        </Dialog.Input>
        <Dialog.Textarea
          value={bodyInput}
          id={BODY}
          onChange={(e) => setBodyInput(e.target.value)}
        >
          내용
        </Dialog.Textarea>
        <Dialog.Button onClick={closeModal}>취소</Dialog.Button>
        <Dialog.Button onClick={createWiki}>제출</Dialog.Button>
      </Dialog>
      <button onClick={openModal}>New</button>
    </>
  );
}

const TITLE = "title";
const BODY = "body";
