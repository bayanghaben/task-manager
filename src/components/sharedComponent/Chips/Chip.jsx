import React from "react";
import styles from "./style.module.css";
function Chip({ text }) {
  return (
    <div className={styles.chip}>
      <p>{text}</p>
    </div>
  );
}

export default Chip;
