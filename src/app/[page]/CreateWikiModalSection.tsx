"use client";

import { useState } from "react";
import { Dialog } from "@/components/Dialog";

export default function CreateWikiModalSection() {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const [titleInput, setTitleInput] = useState("");
  const [bodyInput, setBodyInput] = useState("");

  function createWiki() {
    // TODO: supabase 레코드 생성
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
