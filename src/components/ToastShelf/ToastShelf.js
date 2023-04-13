import React from "react";

import styles from "./ToastShelf.module.css";
import { ToastContext } from "../ToastProvider/ToastProvider";
import { useEscapeKey } from "../../hooks/use-escape-key";

function ToastShelf() {
  const { toasts, dismissAll } = React.useContext(ToastContext);

  return (
    <ol
      className={styles.wrapper}
      role="region"
      aria-live="polite"
      aria-label="Notification"
    >
      {toasts.length > 0 && (
        <ToastList toasts={toasts} dismissAll={dismissAll} />
      )}
    </ol>
  );
}

function ToastList({ toasts, dismissAll }) {
  useEscapeKey(dismissAll);

  return toasts.map(({ toast, id }) => (
    <li key={id} className={styles.toastWrapper}>
      {toast}
    </li>
  ));
}

export default ToastShelf;
