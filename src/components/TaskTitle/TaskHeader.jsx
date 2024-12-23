import React from "react";
import styles from "./style.module.css";
import AddButton from "../AddButton/AddButton";
function TaskHeader() {
  return (
    <div className={styles.titleContainer}>
      <h1 className={styles.title}>Task Manager</h1>
      <AddButton />
    </div>
  );
}

export default TaskHeader;
