import React from "react";
import styles from "./style.module.css";

const RadioButtonWithLabel = ({ name, label, value, checked, onChange }) => {
  return (
    <div key={label} className={styles.formControl}>
      <input
        type="radio"
        value={value}
        className={styles.input}
        checked={checked}
        onChange={onChange}
        name={name}
      />
      <p> {label}</p>
    </div>
  );
};

export default RadioButtonWithLabel;
