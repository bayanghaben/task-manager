export const initialState = {
  tasks: [
    {
      id: 1,
      title: "Complete project documentation",
      description:
        "Finalize and upload the documentation for the new feature.Get milk, bread, eggs, and vegetables from the store",
      categories: ["Work"],
      completed: false,
    },
    {
      id: 2,
      title: "Buy groceries",
      description:
        "Get milk, bread, eggs, and vegetables from the store,Get milk, bread, eggs, and vegetables from the store.",
      categories: ["Personal", "Urgent"],
      completed: true,
    },
    {
      id: 3,
      title: "Prepare presentation slides",
      description:
        "Create slides for the upcoming client meeting on Thursday.Get milk, bread, eggs, and vegetables from the store",
      categories: ["Work", "Urgent"],
      completed: false,
    },
    {
      id: 4,
      title: "Renew gym membership",
      description:
        "Visit the gym and renew the membership for the next 6 months.",
      categories: ["Personal"],
      completed: false,
    },
  ],
  categories: ["Work", "Personal", "Urgent"],
  statuses: ["Incomplete", "Completed"], // Adding statuses here

  filter: { category: "", completed: null },
};
export const taskActions = {
  addTask: "ADD_TASK",
  filterTask: "SET_FILTER",
  editTask: "EDIT_TASK",
  deleteTask: "DELETE_TASK",
  toggleCompletion: "TOGGLE_TASK_COMPLETION",
  addCategory: "ADD_CATEGORY", // New action for adding categories
  deleteCategory: "DELETE_CATEGORY", // New action for deleting categories
};
export const taskReducer = (state, action) => {
  switch (action.type) {
    case taskActions.addTask:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case taskActions.editTask:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? { ...task, ...action.payload } : task
        ),
      };
    case taskActions.deleteTask:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case taskActions.toggleCompletion:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
      };
    case taskActions.filterTask:
      return {
        ...state,
        filter: { ...state.filter, ...action.payload },
      };
    case taskActions.addCategory:
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    case taskActions.deleteCategory:
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category !== action.payload
        ),
        tasks: state.tasks.map((task) => ({
          ...task,
          categories: task.categories.filter(
            (category) => category !== action.payload
          ),
        })),
      };

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};
