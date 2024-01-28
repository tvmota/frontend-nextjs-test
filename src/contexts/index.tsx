import { ToastProvider } from "./toast";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return <ToastProvider>{children}</ToastProvider>;
};
