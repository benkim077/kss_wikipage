"use client";

import { ChangeEventHandler, ReactNode } from "react";
import { createPortal } from "react-dom";

interface DialogProps {
  children: ReactNode;
}

interface DialogMainProps extends DialogProps {
  isOpen: boolean;
}

function DialogMain({ isOpen, children }: DialogMainProps) {
  if (!isOpen) return null;

  return createPortal(
    <div className="relative z-10">
      <DialogDimmed />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <div className="w-full max-w-md rounded-xl bg-white p-6 text-left align-middle opacity-100">
            {children}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

// TODO: Dimmed를 클릭하면 모달이 닫힌다.
function DialogDimmed() {
  return <div className="fixed inset-0 bg-black/25" />;
}

function DialogTitle({ children }: DialogProps) {
  return <h2 className="text-xl font-bold pb-2">{children}</h2>;
}

interface DialogInputProps extends DialogProps {
  id: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}
function DialogInput({ onChange, id, value, children }: DialogInputProps) {
  return (
    <div>
      <label htmlFor={id} className="font-bold">
        {children}
      </label>
      <input onChange={onChange} value={value} id={id}></input>
    </div>
  );
}

// TODO: 타입 확장/좁히기를 이용해서 해결할 수 없을까?
interface DialogTextareaProps extends Omit<DialogInputProps, "onChange"> {
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
}
function DialogTextarea({
  onChange,
  id,
  value,
  children,
}: DialogTextareaProps) {
  return (
    <div>
      <label htmlFor={id} className="font-bold">
        {children}
      </label>
      <textarea onChange={onChange} value={value} id={id}></textarea>
    </div>
  );
}
interface DialogButtonProps extends DialogProps {
  onClick: () => void;
}

function DialogButton({ onClick, children }: DialogButtonProps) {
  return <button onClick={onClick}>{children}</button>;
}

export const Dialog = Object.assign(DialogMain, {
  Title: DialogTitle,
  Input: DialogInput,
  Textarea: DialogTextarea,
  Button: DialogButton,
});
