import React, { useState } from "react";
import styles from "./style.module.css";

const FloatingLabelInput = ({
  label,
  id,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}) => {
  return (
    <div className={styles.formGroup}>
      <input
        required={required}
        type={type}
        id={id}
        name={name}
        className={styles.inputField}
        value={value}
        onChange={onChange}
        placeholder=" " /* Important: This placeholder must be empty */
      />
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
    </div>
  );
};

export default FloatingLabelInput;
