import React from "react";
import TaskHeader from "../components/TaskTitle/TaskHeader";
import styles from "./styles.module.css";
function TaskManager() {
  return (
    <div className={styles.taskManagerContainer}>
      <div className={styles.taskManagerwrapper}>
        <TaskHeader />
      </div>
    </div>
  );
}

export default TaskManager;
