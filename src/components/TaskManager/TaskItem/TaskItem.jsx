import React from "react";
import Chip from "../../sharedComponent/Chips/Chip";
import styles from "./style.module.css";
import TaskActions from "../TaskActions/TaskActions";
function TaskItem({
  statuses,
  categories,
  task,
  onStatusChange,
  onDelete,
  onEdit,
}) {
  console.log(task, onStatusChange, onDelete, onEdit);
  return (
    <div key={task.id} className={`${styles.taskItem}`}>
      <div className={styles.taskContent}>
        <p className={styles.title}>{task.title}</p>
        <div className={styles.categories}>
          {task?.categories?.map((category, index) => (
            <Chip key={index} text={category} />
          ))}
          <div className={styles.taskDes}>{task?.description}</div>
        </div>
      </div>
      <TaskActions
        statuses={statuses}
        categories={categories}
        task={task}
        onEdit={onEdit}
        onDelete={onDelete}
        onStatusChange={onStatusChange}
      />{" "}
    </div>
  );
}

export default TaskItem;
