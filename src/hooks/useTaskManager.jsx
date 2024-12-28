import { useReducer, useCallback, useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import {
  taskReducer,
  taskActions,
  initialState,
} from "../reducers/taskReducer";
import constants from "../constants";

const useTaskManager = () => {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const [loading, setLoading] = useState(false);
  const { tasks, filter } = state;
  const [filteredTasks, setFilteredTasks] = useState([]);

  const [debouncedFilter] = useDebounce(filter, 400);

  const withLoadingTimeout = (action) => {
    return (...args) => {
      setLoading(true);

      const timeoutId = setTimeout(() => {
        action(...args);
        setLoading(false);
      }, 400);

      return () => clearTimeout(timeoutId);
    };
  };

  const handleAddTask = useCallback(
    (task) => {
      const wrappedAction = withLoadingTimeout((task) => {
        dispatch({
          type: taskActions.addTask,
          payload: { ...task, id: Date.now(), completionId: 1 },
        });
      });
      wrappedAction(task);
    },
    [dispatch]
  );

  const handleEditTask = useCallback(
    (task) => {
      const wrappedAction = withLoadingTimeout((task) => {
        dispatch({ type: taskActions.editTask, payload: task });
      });
      wrappedAction(task);
    },
    [dispatch]
  );

  const handleDeleteTask = useCallback(
    (id) => {
      const wrappedAction = withLoadingTimeout((id) => {
        dispatch({ type: taskActions.deleteTask, payload: id });
      });
      wrappedAction(id);
    },
    [dispatch]
  );

  const handleStatusChange = useCallback(
    (taskId, completed) => {
      const wrappedAction = withLoadingTimeout((taskId, completed) => {
        dispatch({
          type: taskActions.toggleCompletion,
          payload: { id: taskId, completed },
        });
      });
      wrappedAction(taskId, completed);
    },
    [dispatch]
  );

  const handleAddCategory = (newCategory) => {
    if (newCategory.trim()) {
      dispatch({ type: taskActions.addCategory, payload: newCategory });
    }
  };

  const handleDeleteCategory = (category) => {
    dispatch({ type: taskActions.deleteCategory, payload: category });
  };

  const handleFilter = useCallback(
    (filterType, value) => {
      setLoading(true);

      let payload = {};
      if (filterType === constants.filterType.category) {
        payload = {
          category: value,
          completed: filter.completed,
        };
      } else if (filterType === constants.filterType.status) {
        console.log(filter);
        const statusVal =
          value === constants.taskStatus.completed
            ? true
            : value === constants.taskStatus.inComplteted
            ? false
            : null;
        payload = {
          category: filter.category,
          completed: statusVal,
        };
      }

      dispatch({
        type: taskActions.filterTask,
        payload,
      });
    },
    [filter.completed, filter.category]
  );

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
    setLoading(false);
  }, [tasks, debouncedFilter]);

  useEffect(() => {
    filterTasks();
  }, [debouncedFilter, tasks, filterTasks]);

  return {
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
  };
};

export default useTaskManager;
