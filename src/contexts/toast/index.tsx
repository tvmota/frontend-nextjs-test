import { createContext, useReducer } from "react";
import { faker } from "@faker-js/faker";
import { toastReducer } from "@/reducers/ToastReducer";
import { IToastMessage, IToastMessageType } from "@/types/toast-message";
import { ToastContainer } from "@/components/ToastMessage/ToastContainer";

type ToastContextProps = {
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  remove: (id: string) => void;
};

type ToastState = {
  toasts: IToastMessage[];
};

const initialState: ToastState = {
  toasts: [],
};

const ToastContext = createContext<ToastContextProps>({} as ToastContextProps);

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(toastReducer, initialState);

  const addToast = (
    type: IToastMessageType,
    message: string,
    duration?: number
  ) => {
    dispatch({
      type: "ADD_TOAST",
      payload: { id: faker.string.uuid(), message, type, duration },
    });
  };

  const remove = (id: string) => {
    dispatch({ type: "DELETE_TOAST", payload: { id } });
  };

  const success = (message: string, duration = 0) =>
    addToast("success", message, duration);
  const error = (message: string, duration = 0) =>
    addToast("error", message, duration);

  return (
    <ToastContext.Provider
      value={{
        success,
        error,
        remove,
      }}
    >
      <ToastContainer toasts={state.toasts} />
      {children}
    </ToastContext.Provider>
  );
};

export { ToastProvider, ToastContext };
