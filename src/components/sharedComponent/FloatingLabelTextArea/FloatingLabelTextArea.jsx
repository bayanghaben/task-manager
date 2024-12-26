import React from "react";
import styles from "./style.module.css";

const FloatingLabelTextArea = ({
  label,
  id,
  name,
  value,
  onChange,
  placeholder,
  required = false,
}) => {
  return (
    <div className={styles.formGroup}>
      <textarea
        id={id}
        name={name}
        className={styles.textareaField}
        value={value}
        onChange={onChange}
        placeholder=" " // Important: This placeholder must be empty
      />
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
    </div>
  );
};

export default FloatingLabelTextArea;
