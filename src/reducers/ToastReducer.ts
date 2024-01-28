import { IToastMessage } from "@/types/toast-message";

type ToastAction =
  | { type: "ADD_TOAST"; payload: IToastMessage }
  | { type: "DELETE_TOAST"; payload: IToastMessage };

type ToastState = {
  toasts: IToastMessage[];
};

export const toastReducer = (state: ToastState, action: ToastAction) => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [...state.toasts, action.payload],
      };
    case "DELETE_TOAST":
      const restToasts = state.toasts.filter((t) => t.id !== action.payload.id);
      return {
        ...state,
        toasts: restToasts,
      };
    default:
      throw new Error(`Ação desconhecida ${action}`);
  }
};
