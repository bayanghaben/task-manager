import React, { useState } from "react";
import TaskHeader from "../components/TaskManager/TaskHeader/TaskHeader";
import TaskFilter from "../components/TaskManager/TaskFilter/TaskFilter";
import TaskList from "../components/TaskManager/TaskList/TaskList";
import FormDialog from "../components/TaskManager/FormDialog/FormDialog";
import LoadingSpinner from "../components/sharedComponent/LoadingSpinner/LoadingSpinner";
import useTaskManager from "../hooks/useTaskManager"; // Import the custom hook

import styles from "./styles.module.css";

function TaskManager() {
  const {
    state,
    filteredTasks,
    loading,
    handleAddTask,
    handleEditTask,
    handleDeleteTask,
    handleStatusChange,
    handleAddCategory,
    handleDeleteCategory,
    handleFilter,
  } = useTaskManager();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleOpenAddTask = () => {
    setIsAddDialogOpen(true);
  };

  return (
    <div className={styles.taskManagerContainer}>
      <div className={styles.taskManagerwrapper}>
        {loading && <LoadingSpinner />}

        <TaskHeader onAddButton={handleOpenAddTask} />
        <TaskFilter
          categories={state.categories}
          statuses={state.statuses}
          onFilter={handleFilter}
        />
        <TaskList
          tasks={filteredTasks}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          onStatusChange={handleStatusChange}
          categories={state.categories}
          statuses={state.statuses}
          onAddCategory={handleAddCategory}
          onDeleteCategory={handleDeleteCategory}
        />
        <FormDialog
          isOpen={isAddDialogOpen}
          onClose={() => {
            setIsAddDialogOpen(false);
          }}
          onAddTask={handleAddTask}
          categories={state.categories}
          onAddCategory={handleAddCategory}
          onDeleteCategory={handleDeleteCategory}
        />
      </div>
    </div>
  );
}

export default TaskManager;
