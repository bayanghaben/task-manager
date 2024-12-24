import React, { useEffect, useRef, useState } from "react";
import StatusDropDrown from "../StatusDropDown/StatusDropDrown";
import Edit from "../../../assets/Edit";
import styles from "./style.module.css";
import Delete from "../../../assets/Delete";
function TaskActions({
  statuses,
  categories,
  task,
  onEdit,
  onDelete,
  onStatusChange,
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const handleCloseDropdown = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setOpen(false);
    }
  };
  // Listen for outside click
  useEffect(() => {
    document.addEventListener("click", handleCloseDropdown);
    return () => {
      document.removeEventListener("click", handleCloseDropdown);
    };
  }, []);

  return (
    <div className={styles.taskActions}>
      <StatusDropDrown
        taskId={task.id}
        value={task.completed}
        ref={dropdownRef}
        statuses={statuses}
        open={open}
        onStatusChange={onStatusChange}
        onClose={handleCloseDropdown}
      />{" "}
      <button
        className={styles.iconBtn}
        onClick={() => {
          onEdit(task);
        }}
      >
        <Edit />
      </button>
      <button className={styles.iconBtn} onClick={() => onDelete(task.id)}>
        <Delete />
      </button>
    </div>
  );
}

export default TaskActions;
