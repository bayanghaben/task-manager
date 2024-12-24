import React, { useReducer, useState } from "react";
import TaskHeader from "../components/TaskManager/TaskHeader/TaskHeader";
import styles from "./styles.module.css";
import { initialState, taskReducer, taskActions } from "../hooks/taskReducer";
import TaskList from "../components/TaskManager/TaskList/TaskList";
function TaskManager() {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const { statuses, categories, tasks } = state;
  const handleAddTask = (task) => {
    dispatch({
      type: taskActions.addTask,
      payload: { ...task, id: Date.now(), completionId: 1 },
    });
    setIsDialogOpen(false);
  };

  const handleEditTask = (task) => {
    dispatch({ type: taskActions.editTask, payload: task });
    setIsDialogOpen(false);
  };

  const handleDeleteTask = (id) => {
    dispatch({ type: taskActions.deleteTask, payload: id });
  };

  const handleStatusChange = (taskId, isCompleted) => {
    // Dispatch action to edit task status
    dispatch({
      type: taskActions.editTask,
      payload: { id: taskId, completed: isCompleted },
    });
  };

  const applyFilter = (filter) => {
    dispatch({ type: taskActions.filterTask, payload: filter });
  };

  // const filteredTasks = state.tasks.filter((task) => {
  //   const matchesCategory =
  //     !state.filter.category || task.category === state.filter.category;
  //   const matchesCompletion =
  //     state.filter.completed === null ||
  //     task.completed === state.filter.completed;
  //   return matchesCategory && matchesCompletion;
  // });
  return (
    <div className={styles.taskManagerContainer}>
      <div className={styles.taskManagerwrapper}>
        <TaskHeader />
        {/* <FilterUnit
          title="Category"
          filterOptions={state.categories}
          onFilter={(category) => applyFilter({ category })}
        />
        <FilterUnit
          title="Completion"
          filterOptions={["Completed", "Pending"]}
          onFilter={(status) =>
            applyFilter({ completed: status === "Completed" ? true : false })
          }
        /> */}
        <TaskList
          tasks={tasks}
          onEdit={(task) => {
            setCurrentTask(task);
            setIsDialogOpen(true);
          }}
          onDelete={handleDeleteTask}
          onStatusChange={handleStatusChange}
          categories={categories}
          statuses={statuses}
        />
        {/* <Dialog
          isOpen={isDialogOpen}
          onClose={() => {
            setIsDialogOpen(false);
            setCurrentTask(null);
          }}
          title={currentTask ? "Edit Task" : "Add Task"}
        >
          <Form
            initialData={currentTask || {}}
            onSubmit={currentTask ? handleEditTask : handleAddTask}
          />
        </Dialog> */}
      </div>
    </div>
  );
}

export default TaskManager;
