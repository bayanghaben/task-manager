// import React, { useReducer, useState, useCallback, useEffect } from "react";
// import { useDebounce } from "use-debounce";
// import TaskHeader from "../components/TaskManager/TaskHeader/TaskHeader";
// import styles from "./styles.module.css";
// import {
//   initialState,
//   taskReducer,
//   taskActions,
// } from "../reducers/taskReducer";
// import TaskList from "../components/TaskManager/TaskList/TaskList";
// import TaskFilter from "../components/TaskManager/TaskFilter/TaskFilter";
// import FormDialog from "../components/TaskManager/FormDialog/FormDialog";
// import LoadingSpinner from "../components/sharedComponent/LoadingSpinner/LoadingSpinner";

// function TaskManager() {
//   const [state, dispatch] = useReducer(taskReducer, initialState);
//   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const { statuses, categories, tasks, filter } = state;
//   const [filteredTasks, setFilteredTasks] = useState([]);

//   // Debounce the filter state
//   const [debouncedFilter] = useDebounce(filter, 500);

//   const handleOpenAddTask = () => {
//     setIsAddDialogOpen(true);
//   };

//   const withLoadingTimeout = (action) => {
//     return (...args) => {
//       setLoading(true); // Set loading state to true

//       const timeoutId = setTimeout(() => {
//         action(...args);
//         setLoading(false);
//       }, 1000);

//       // Cleanup the timeout if the component is unmounted or if the action is no longer needed
//       return () => clearTimeout(timeoutId);
//     };
//   };

//   // Wrap all actions with withLoadingTimeout
//   const handleAddTask = useCallback(
//     withLoadingTimeout((task) => {
//       dispatch({
//         type: taskActions.addTask,
//         payload: { ...task, id: Date.now(), completionId: 1 },
//       });
//       setIsAddDialogOpen(false);
//     }),
//     [dispatch]
//   );

//   const handleEditTask = useCallback(
//     withLoadingTimeout((task) => {
//       dispatch({ type: taskActions.editTask, payload: task });
//     }),
//     [dispatch]
//   );

//   const handleDeleteTask = useCallback(
//     withLoadingTimeout((id) => {
//       dispatch({ type: taskActions.deleteTask, payload: id });
//     }),
//     [dispatch]
//   );

//   const handleStatusChange = withLoadingTimeout((taskId, isCompleted) => {
//     dispatch({
//       type: taskActions.editTask,
//       payload: { id: taskId, completed: isCompleted },
//     });
//   });

//   const handleAddCategory = (newCategory) => {
//     if (newCategory.trim()) {
//       dispatch({ type: taskActions.addCategory, payload: newCategory });
//     }
//   };

//   const handleDeleteCategory = (category) => {
//     dispatch({ type: taskActions.deleteCategory, payload: category });
//   };

//   const handleCategoryFilter = useCallback(
//     (selectedCategory) => {
//       setLoading(true);

//       dispatch({
//         type: taskActions.filterTask,
//         payload: {
//           category: selectedCategory,
//           completed: state.filter.completed,
//         },
//       });
//     },
//     [state.filter.completed]
//   );

//   const handleStatusFilter = useCallback(
//     (selectedStatus) => {
//       setLoading(true);

//       const statusVal =
//         selectedStatus === "Completed"
//           ? true
//           : selectedStatus === "Incomplete"
//           ? false
//           : null;
//       dispatch({
//         type: taskActions.filterTask,
//         payload: { category: state.filter.category, completed: statusVal },
//       });
//     },
//     [state.filter.category]
//   );

//   // Filter tasks based on debounced filter
//   const filterTasks = useCallback(() => {
//     // Simulate a time delay for the filtering process (if necessary)
//     const result = tasks.filter((task) => {
//       const matchCategory =
//         debouncedFilter.category === "" ||
//         task.categories.includes(debouncedFilter.category);
//       const matchCompletion =
//         debouncedFilter.completed === null ||
//         task.completed === debouncedFilter.completed;
//       return matchCategory && matchCompletion;
//     });

//     setFilteredTasks(result);
//     setLoading(false); // Stop loading once filtering is done
//   }, [tasks, debouncedFilter]);

//   useEffect(() => {
//     filterTasks(); // Trigger the filtering logic when debounced filter changes
//   }, [debouncedFilter, tasks, filterTasks]);

//   return (
//     <div className={styles.taskManagerContainer}>
//       <div className={styles.taskManagerwrapper}>
//         {loading && <LoadingSpinner />}

//         <TaskHeader onAddButton={handleOpenAddTask} />
//         <TaskFilter
//           categories={categories}
//           statuses={statuses}
//           onStatusFilter={handleStatusFilter}
//           onCategoryFilter={handleCategoryFilter}
//         />
//         <TaskList
//           tasks={filteredTasks}
//           onEdit={handleEditTask}
//           onDelete={handleDeleteTask}
//           onStatusChange={handleStatusChange}
//           categories={categories}
//           statuses={statuses}
//           onAddCategory={handleAddCategory}
//           onDeleteCategory={handleDeleteCategory}
//         />
//         <FormDialog
//           isOpen={isAddDialogOpen}
//           onClose={() => {
//             setIsAddDialogOpen(false);
//           }}
//           onAddTask={handleAddTask}
//           categories={categories}
//           onAddCategory={handleAddCategory}
//           onDeleteCategory={handleDeleteCategory}
//         />
//       </div>
//     </div>
//   );
// }

// export default TaskManager;
import React, { useReducer, useState, useCallback, useEffect } from "react";
import { useDebounce } from "use-debounce";
import TaskHeader from "../components/TaskManager/TaskHeader/TaskHeader";
import styles from "./styles.module.css";
import {
  initialState,
  taskReducer,
  taskActions,
} from "../reducers/taskReducer";
import TaskList from "../components/TaskManager/TaskList/TaskList";
import TaskFilter from "../components/TaskManager/TaskFilter/TaskFilter";
import FormDialog from "../components/TaskManager/FormDialog/FormDialog";
import LoadingSpinner from "../components/sharedComponent/LoadingSpinner/LoadingSpinner";

function TaskManager() {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { statuses, categories, tasks, filter } = state;
  const [filteredTasks, setFilteredTasks] = useState([]);

  // Debounce the filter state
  const [debouncedFilter] = useDebounce(filter, 500);

  const handleOpenAddTask = () => {
    setIsAddDialogOpen(true);
  };

  const handleAddTask = useCallback(
    (task) => {
      setLoading(true); // Start loading
      dispatch({
        type: taskActions.addTask,
        payload: { ...task, id: Date.now(), completionId: 1 },
      });
      setIsAddDialogOpen(false);
    },
    [dispatch]
  );

  const handleEditTask = useCallback(
    (task) => {
      setLoading(true); // Start loading
      dispatch({ type: taskActions.editTask, payload: task });
    },
    [dispatch]
  );

  const handleDeleteTask = useCallback(
    (id) => {
      setLoading(true); // Start loading
      dispatch({ type: taskActions.deleteTask, payload: id });
    },
    [dispatch]
  );

  const handleStatusChange = useCallback(
    (taskId, isCompleted) => {
      setLoading(true); // Start loading
      dispatch({
        type: taskActions.editTask,
        payload: { id: taskId, completed: isCompleted },
      });
    },
    [dispatch]
  );

  const handleAddCategory = (newCategory) => {
    setLoading(true); // Start loading

    if (newCategory.trim()) {
      dispatch({ type: taskActions.addCategory, payload: newCategory });
    }
  };

  const handleDeleteCategory = (category) => {
    dispatch({ type: taskActions.deleteCategory, payload: category });
  };

  const handleCategoryFilter = useCallback(
    (selectedCategory) => {
      setLoading(true); // Start loading
      dispatch({
        type: taskActions.filterTask,
        payload: {
          category: selectedCategory,
          completed: state.filter.completed,
        },
      });
    },
    [state.filter.completed]
  );

  const handleStatusFilter = useCallback(
    (selectedStatus) => {
      setLoading(true); // Start loading

      const statusVal =
        selectedStatus === "Completed"
          ? true
          : selectedStatus === "Incomplete"
          ? false
          : null;
      dispatch({
        type: taskActions.filterTask,
        payload: { category: state.filter.category, completed: statusVal },
      });
    },
    [state.filter.category]
  );

  // Filter tasks based on debounced filter
  const filterTasks = useCallback(() => {
    const result = tasks.filter((task) => {
      const matchCategory =
        debouncedFilter.category === "" ||
        task.categories.includes(debouncedFilter.category);
      const matchCompletion =
        debouncedFilter.completed === null ||
        task.completed === debouncedFilter.completed;
      return matchCategory && matchCompletion;
    });

    setFilteredTasks(result);
    setLoading(false); // Stop loading once filtering is done
  }, [tasks, debouncedFilter]);

  useEffect(() => {
    filterTasks(); // Trigger the filtering logic when debounced filter changes
  }, [debouncedFilter, tasks, filterTasks]);

  // Track loading and state changes
  useEffect(() => {
    if (!loading) return;

    const timer = setTimeout(() => {
      setLoading(false); // Stop loading after actions are processed
    }, 500);

    return () => clearTimeout(timer);
  }, [loading]);

  return (
    <div className={styles.taskManagerContainer}>
      <div className={styles.taskManagerwrapper}>
        {loading && <LoadingSpinner />}

        <TaskHeader onAddButton={handleOpenAddTask} />
        <TaskFilter
          categories={categories}
          statuses={statuses}
          onStatusFilter={handleStatusFilter}
          onCategoryFilter={handleCategoryFilter}
        />
        <TaskList
          tasks={filteredTasks}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          onStatusChange={handleStatusChange}
          categories={categories}
          statuses={statuses}
          onAddCategory={handleAddCategory}
          onDeleteCategory={handleDeleteCategory}
        />
        <FormDialog
          isOpen={isAddDialogOpen}
          onClose={() => {
            setIsAddDialogOpen(false);
          }}
          onAddTask={handleAddTask}
          categories={categories}
          onAddCategory={handleAddCategory}
          onDeleteCategory={handleDeleteCategory}
        />
      </div>
    </div>
  );
}

export default TaskManager;
