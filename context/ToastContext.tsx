import React, { createContext, useState } from "react";

type ToastMessage = {
  type: "error" | "success";
  title: string;
  message: string;
};

type ToastContextType = {
  showToast: (
    type: "error" | "success",
    title: string,
    message: string,
  ) => void;
  toast: ToastMessage | null;
  hideToast: () => void;
};

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined,
);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const showToast = (
    type: "error" | "success",
    title: string,
    message: string,
  ) => {
    setToast({ type, title, message });
  };

  const hideToast = () => setToast(null);

  return (
    <ToastContext.Provider value={{ showToast, toast, hideToast }}>
      {children}
    </ToastContext.Provider>
  );
};
