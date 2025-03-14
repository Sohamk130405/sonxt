"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ReactNode, useCallback, useRef, MouseEvent } from "react";

const Modal = ({ children }: { children: ReactNode }) => {
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.push("/");
  }, [router]);

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (e.target === overlay.current && onDismiss) {
        onDismiss();
      }
    },
    [onDismiss, overlay]
  );
  return (
    <div ref={overlay} className="modal" onClick={handleClick}>
      <button
        type="button"
        className="absolute top-4 right-8"
        onClick={onDismiss}
      >
        <Image src={"/close.svg"} width={17} height={17} alt="close" />
      </button>
      <div ref={wrapper} className="modal_wrapper">
        {children}
      </div>
    </div>
  );
};

export default Modal;
