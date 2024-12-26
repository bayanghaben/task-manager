import React from "react";
import { createPortal } from "react-dom";
import styles from "./style.module.css";

const Dialog = ({ isOpen, children, onClose }) => {
  if (!isOpen) return null;
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(); // Close the dialog when clicking outside the dialog content
    }
  };

  return createPortal(
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.dialog}>
        <div>{children}</div>
      </div>
    </div>,
    document.getElementById("dialog-root") // Add a div with id "dialog-root" in `public/index.html`
  );
};

export default Dialog;
