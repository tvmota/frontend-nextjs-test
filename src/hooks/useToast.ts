import { useContext } from "react";
import { ToastContext } from "@/contexts/toast";

export const useToast = () => useContext(ToastContext);
