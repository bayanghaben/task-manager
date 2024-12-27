import React from "react";
import styles from "./style.module.css";
function Chip({ text, onDelete, isRemovable }) {
  return (
    <div className={styles.chip}>
      <p>{text}</p>
      {isRemovable && (
        <span
          className={styles.deleteIcon}
          onClick={(e) => onDelete(e)} // Trigger the delete function passed from parent
        >
          &times;
        </span>
      )}
    </div>
  );
}

export default Chip;
