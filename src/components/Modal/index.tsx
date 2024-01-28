import { useEffect, useRef } from "react";
import { ModalProps } from "./interface";
import styles from "./style.module.css";
/* 
	Modal

	- Ao clicar no wrapper do modal, o modal deve ser fechado, porém esta ação deve ser ignorada caso o usuário clique em qualquer elemento dentro do modal
*/

export const Modal: React.FC<ModalProps> = ({
  children,
  title,
  isOpen,
  persistent = false,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);

  function handleCloseClick(e: React.MouseEvent) {
    const parsed: HTMLElement = e.target as HTMLElement;
    const attrClose = [
      !persistent ? "modalWrapper" : "",
      "modalCancel",
      "modalConfirm",
      "modalClose",
    ];
    const canClose = attrClose.some((val) => parsed.dataset[val]);

    if (canClose) {
      props.onClose?.("click", e.target);
    }
  }

  function handleConfirmClick(e: React.MouseEvent) {
    props.onConfirm?.();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (!persistent) {
      if (e.key === "Escape") props.onClose?.("esc", e.target);
    }
  }

  // Side effect para acionar o evento de keypress no wrapper do modal
  useEffect(() => {
    if (isOpen) {
      ref.current?.focus();
    }
  }, [isOpen]);

  return isOpen ? (
    <div
      data-modal-wrapper
      className={styles.wrapper}
      onKeyDown={handleKeyDown}
      onClick={handleCloseClick}
      tabIndex={0}
      ref={ref}
    >
      <div data-modal-container>
        <header data-modal-header>
          <h2>{title}</h2>

          {!persistent ? (
            <button data-modal-close onClick={handleCloseClick} type="button">
              X
            </button>
          ) : (
            <></>
          )}
        </header>

        {children}

        {!props.footer?.hidden && (
          <div data-modal-footer>
            <button data-modal-cancel onClick={handleCloseClick} type="button">
              {props.footer?.cancelText ?? "Cancelar"}
            </button>

            <button
              data-modal-confirm
              onClick={handleConfirmClick}
              data-type="confirm"
              type="button"
            >
              {props.footer?.confirmText ?? "Confirmar"}
            </button>
          </div>
        )}
      </div>
    </div>
  ) : (
    <></>
  );
};
