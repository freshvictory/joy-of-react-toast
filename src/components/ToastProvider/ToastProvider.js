import React from "react";
import Toast from "../Toast/Toast";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toastMap, setToastMap] = React.useState(new Map());

  const dismissAll = React.useCallback(() => {
    setToastMap(new Map());
  }, []);

  const removeToast = React.useCallback((id) => {
    setToastMap((current) => {
      const nextToastMap = new Map(current);
      nextToastMap.delete(id);
      return nextToastMap;
    });
  }, []);

  const addToast = React.useCallback(
    ({ variant, message }) => {
      const id = `toast-${crypto.randomUUID()}`;
      const toast = (
        <Toast variant={variant} handleDismiss={() => removeToast(id)}>
          {message}
        </Toast>
      );
      setToastMap((current) => {
        const nextToastMap = new Map(current);
        nextToastMap.set(id, { id, toast });
        return nextToastMap;
      });
    },
    [removeToast]
  );

  const value = React.useMemo(() => {
    return {
      addToast,
      dismissAll,
      toasts: [...toastMap.values()],
    };
  }, [toastMap, addToast, dismissAll]);

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

export default ToastProvider;
