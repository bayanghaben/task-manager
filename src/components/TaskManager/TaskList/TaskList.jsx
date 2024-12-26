import React from "react";
import styles from "./styles.module.css";
import TaskItem from "../TaskItem/TaskItem";

function TaskList({
  statuses,
  categories,
  tasks,
  onEdit,
  onDelete,
  onStatusChange,
  onDeleteCategory,
  onAddCategory,
}) {
  return (
    <div className={styles.taskList}>
      {tasks?.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
          categories={categories}
          statuses={statuses}
          onAddCategory={onAddCategory}
          onDeleteCategory={onDeleteCategory}
        />
      ))}
    </div>
  );
}

export default TaskList;
