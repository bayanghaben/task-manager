import React from "react";
import styles from "./style.module.css";
import AddButton from "../AddButton/AddButton";
function TaskHeader({ onAddButton }) {
  return (
    <div className={styles.titleContainer}>
      <h1 className={styles.title}>Task Manager</h1>
      <AddButton onAddButton={onAddButton} />
    </div>
  );
}

export default TaskHeader;
