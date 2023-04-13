import React from "react";

export function useEscapeKey(handleEscape) {
  React.useEffect(() => {
    function handleKeyDown(event) {
      if (event.code !== "Escape") {
        return;
      }

      event.preventDefault();
      handleEscape();
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleEscape]);
}
