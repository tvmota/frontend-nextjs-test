import { useEffect, useRef } from "react";
import { ToastMessageProps } from "@/types/toast-message.d";
import { useToast } from "@/hooks/useToast";
import styles from "./style.module.css";

export const ToastMessage: React.FC<ToastMessageProps> = ({
  content: data,
}) => {
  const messageRef = useRef<HTMLDivElement>(null);
  const toast = useToast();

  const handleClose = (delay: number) => {
    const animationKeyframe = [
      { opacity: 1, transform: "translateX(0%)" },
      { opacity: 0, transform: "translateX(100%)" },
    ];
    const animation: KeyframeAnimationOptions = {
      duration: 400,
      easing: "ease-in-out",
      fill: "forwards",
      delay,
    };

    const animationEvt = messageRef.current?.animate(
      animationKeyframe,
      animation
    );
    animationEvt?.addEventListener("finish", () => toast.remove(data.id));
  };

  useEffect(() => {
    if (data.duration) {
      handleClose(data.duration);
    }
  }, []);

  return (
    <div
      className={`${styles.message__container} ${styles.message__in}`}
      data-toast-type={data.type}
      data-toast-id={data.id}
      ref={messageRef}
    >
      <span data-content>{data.message}</span>

      <span data-close onClick={() => handleClose(0)}>
        ╳
      </span>
    </div>
  );
};
