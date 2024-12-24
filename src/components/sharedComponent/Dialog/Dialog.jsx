import React from "react";
import ReactDOM from "react-dom";
import styles from "./Dialog.module.css";

const Dialog = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <h3>{title}</h3>
        <button className={styles.closeBtn} onClick={onClose}>
          X
        </button>
        <div>{children}</div>
      </div>
    </div>,
    document.getElementById("dialog-root") // Add a div with id "dialog-root" in `public/index.html`
  );
};

export default Dialog;
