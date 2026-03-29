import React, { createContext, useContext, useState, useCallback, useRef } from "react";

const ToastContext = createContext(null);

let toastIdCounter = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const timersRef = useRef({});

  const removeToast = useCallback((id) => {
    // First mark as exiting for animation
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, exiting: true } : t))
    );
    // Then remove after animation completes
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
      if (timersRef.current[id]) {
        clearTimeout(timersRef.current[id]);
        delete timersRef.current[id];
      }
    }, 400);
  }, []);

  const addToast = useCallback(
    (message, type = "info", duration = 4000) => {
      const id = ++toastIdCounter;
      const toast = { id, message, type, duration, exiting: false, createdAt: Date.now() };
      setToasts((prev) => [...prev, toast]);

      if (type !== "loading") {
        timersRef.current[id] = setTimeout(() => {
          removeToast(id);
        }, duration);
      }

      return id;
    },
    [removeToast]
  );

  const dismissToast = useCallback(
    (id) => {
      removeToast(id);
    },
    [removeToast]
  );

  const toast = useCallback(
    (message, options = {}) => {
      const { type = "info", duration = 4000 } = options;
      return addToast(message, type, duration);
    },
    [addToast]
  );

  toast.success = (message, duration = 4000) => addToast(message, "success", duration);
  toast.error = (message, duration = 5000) => addToast(message, "error", duration);
  toast.warning = (message, duration = 4500) => addToast(message, "warning", duration);
  toast.info = (message, duration = 4000) => addToast(message, "info", duration);
  toast.loading = (message) => addToast(message, "loading", 0);
  toast.dismiss = (id) => dismissToast(id);

  return (
    <ToastContext.Provider value={{ toasts, toast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context.toast;
};

export default ToastContext;
