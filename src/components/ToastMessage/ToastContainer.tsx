import { ToastContainerProps } from "@/types/toast-message.d";
import { ToastMessage } from ".";
import styles from "./style.module.css";

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts }) => {
  return (
    <div className={styles.toast__container}>
      {toasts.map((toast) => (
        <ToastMessage key={toast.id} content={toast} />
      ))}
    </div>
  );
};
