export type IToastMessageType = "success" | "error";

export interface IToastMessage {
  id: string;
  message?: string;
  type?: IToastMessageType;
  duration?: number;
}

export interface ToastContainerProps {
  toasts: IToastMessage[];
}

export interface ToastMessageProps {
  content: IToastMessage;
}
