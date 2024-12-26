import React, { useEffect, useRef, useState } from "react";
import Edit from "../../../assets/Edit";
import styles from "./style.module.css";
import Delete from "../../../assets/Delete";
import FormDialog from "../FormDialog/FormDialog";
import StatusDropDown from "../StatusDropDown/StatusDropDrown";
import DeleteDialog from "../DeleteDialog/DeleteDialog";

function TaskActions({
  statuses,
  categories,
  task,
  onEdit,
  onDelete,
  onStatusChange,
  onDeleteCategory,
  onAddCategory,
}) {
  const [open, setOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State for dialog open/close
  const [selectedTask, setSelectedTask] = useState(null); // Store the task to edit
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // State for delete dialog

  const dropdownRef = useRef(null);

  const handleCloseDropdown = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  const openDialog = (task) => {
    setSelectedTask(task);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedTask(null);
  };
  const openDeleteDialog = (task) => {
    setSelectedTask(task);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setSelectedTask(null);
  };

  // Listen for outside click to close the dropdown
  useEffect(() => {
    document.addEventListener("click", handleCloseDropdown);
    return () => {
      document.removeEventListener("click", handleCloseDropdown);
    };
  }, []);

  return (
    <>
      <div className={styles.taskActions}>
        {/* Status Dropdown */}
        <StatusDropDown
          taskId={task.id}
          value={task.completed}
          ref={dropdownRef}
          statuses={statuses}
          open={open}
          onStatusChange={onStatusChange}
          onClose={handleCloseDropdown}
        />

        {/* Edit button */}
        <button
          className={styles.iconBtn}
          onClick={() => openDialog(task)} // Open the dialog with the selected task for editing
        >
          <Edit />
        </button>

        {/* Delete button */}
        <button
          className={styles.iconBtn}
          onClick={() => openDeleteDialog(task)} // Open delete dialog
        >
          <Delete />
        </button>
      </div>
      {/* Edit Task Dialog */}
      <FormDialog
        isOpen={isDialogOpen}
        onClose={closeDialog} // Close dialog
        task={selectedTask} // Pass the task for editing
        categories={categories}
        onAddTask={onEdit} // Use onEdit to handle task editing
        onEditTask={onEdit} // Same for onEdit, since it's editing
        onAddCategory={onAddCategory} // Add Category function (adjust as needed)
        onDeleteCategory={onDeleteCategory} // Delete Category function (adjust as needed)
      />
      {isDeleteDialogOpen && (
        <DeleteDialog
          isOpen={isDeleteDialogOpen}
          task={selectedTask} // Pass the task for editing
          onDelete={onDelete}
          onClose={closeDeleteDialog}
        />
      )}
    </>
  );
}

export default TaskActions;
