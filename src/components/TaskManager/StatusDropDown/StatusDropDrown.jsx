import React, { useEffect, useRef, useState } from "react";
import styles from "./style.module.css";

function StatusDropDown({ taskId, value, statuses, onStatusChange }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null); // Reference for the dropdown container

  const handleSelect = (status) => {
    onStatusChange(taskId, status === "Completed");
    setOpen(false);
  };
  const statusVal = value ? "Completed" : "Incomplete";
  // Close the dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false); // Close the menu if clicked outside
      }
    };

    if (open) {
      document.addEventListener("click", handleClickOutside);
    }

    // Cleanup the event listener on component unmount or when menu is closed
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [open]);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
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
