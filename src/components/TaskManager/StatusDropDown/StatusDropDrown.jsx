import React, { useReducer } from "react";
import DDL from "../../sharedComponent/DDL/DDL";

function StatusDropDrown({
  taskId,
  value,
  statuses,
  open,
  onClose,
  onStatusChange,
}) {
  return (
    <select
      value={value ? "Completed" : "Incomplete"}
      open={open}
      onChange={(e) => {
        console.log(e, "jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj//////////////////////");
        onStatusChange(taskId, e.target.value === "Completed");
        onClose();
      }}
      onClose={onClose}
    >
      {statuses?.length > 0 &&
        statuses?.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
    </select>
  );
}

export default StatusDropDrown;
