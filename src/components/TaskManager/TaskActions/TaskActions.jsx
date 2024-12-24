import React, { useEffect, useRef, useState } from "react";
import StatusDropDrown from "../StatusDropDown/StatusDropDrown";

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
  const handleDropdownToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
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
    <div>
      <div onClick={() => handleDropdownToggle(true)}></div>
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
        onClick={() => {
          onEdit(task);
        }}
      >
        edit
      </button>
      <button onClick={() => onDelete(task.id)}>delete</button>
    </div>
  );
}

export default TaskActions;
