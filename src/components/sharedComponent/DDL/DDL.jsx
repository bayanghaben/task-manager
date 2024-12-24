import React, { forwardRef } from "react";
import styles from "./style.module.css";
const DDL = forwardRef(({ value, onChange, options, open }, ref) => {
  console.log(onChange, options, open);
  return (
    <select value={value} ref={ref} onChange={onChange}>
      {options?.length > 0 &&
        options?.map((option) => (
          <option key={option?.id}>{option?.name}</option>
        ))}
    </select>
  );
});

export default DDL;
