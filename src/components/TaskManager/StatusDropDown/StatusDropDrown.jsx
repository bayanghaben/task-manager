import React, { useState } from "react";
import styles from "./style.module.css";

function StatusDropDown({ taskId, value, statuses, onStatusChange }) {
  const [open, setOpen] = useState(false);

  const handleSelect = (status) => {
    onStatusChange(taskId, status === "Completed");
    setOpen(false);
  };
  const statusVal = value ? "Completed" : "Incomplete";

  return (
    <div className={styles.dropdown}>
      <p
        className={`${styles.status} ${
          value ? styles.complete : styles.incomplete
        }`}
        onClick={() => setOpen((prev) => !prev)}
      >
        {statusVal}
        <span className={styles.arrowDown}>&#11262;</span>
      </p>{" "}
      {/* Dropdown menu */}
      <ul className={`${styles.menu} ${open ? styles.visible : ""}`}>
        {statuses?.map((status) => (
          <li
            key={status}
            onClick={() => handleSelect(status)}
            className={status === statusVal ? styles.selected : ""}
          >
            <div
              className={`${styles.circle} ${
                status === "Completed"
                  ? styles.completeCircle
                  : styles.incompleteCircle
              }`}
            ></div>
            {status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StatusDropDown;
