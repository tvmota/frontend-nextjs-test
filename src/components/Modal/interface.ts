export interface ModalProps {
  children: React.ReactNode;
  title: string;
  isOpen: boolean;
  onClose?: (type: "click" | "esc", target: EventTarget) => void;
  onConfirm?: () => void;
  footer?: {
    hidden?: boolean;
    confirmText?: string;
    cancelText?: string;
  };
}
