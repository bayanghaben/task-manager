// import React, { useState, useEffect } from "react";
// import styles from "./style.module.css";
// import Dialog from "../../sharedComponent/Dialog/Dialog";
// import FloatingLabelInput from "../../sharedComponent/FloatingLabelInput/FloatingLabelInput";
// import FloatingLabelTextArea from "../../sharedComponent/FloatingLabelTextArea/FloatingLabelTextArea";
// import CategorySelector from "../CategorySelector/CategorySelector";

// // Initial empty task state
// const initialState = {
//   title: "",
//   description: "",
//   categories: [], // Default category
//   completed: false,
// };

// const FormDialog = ({
//   isOpen,
//   onClose,
//   onAddTask,
//   onEditTask,
//   task, // This will be used when editing an existing task
//   categories,
//   onAddCategory,
//   onDeleteCategory,
// }) => {
//   const [taskData, setTaskData] = useState(initialState);

//   // If task prop is provided (edit mode), populate the form with existing data
//   useEffect(() => {
//     if (task) {
//       setTaskData(task);
//     }
//   }, [task]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "title") {
//       const trimmedValue = value.trim();
//       if (trimmedValue === "") {
//         return; // Do not update state if the value is just whitespace
//       }
//     }
//     setTaskData({
//       ...taskData,
//       [name]: value,
//     });
//   };

//   const handleCategoryChange = (selectedCategories) => {
//     setTaskData({
//       ...taskData,
//       categories: selectedCategories,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (task) {
//       onEditTask(taskData); // Edit the existing task
//     } else {
//       onAddTask(taskData); // Add a new task
//     }
//     onClose(); // Close dialog after submitting
//     setTaskData(initialState); // Reset form
//   };

//   return (
//     <Dialog isOpen={isOpen} onClose={onClose}>
//       <form onSubmit={handleSubmit}>
//         <div className={styles.formContainer}>
//           <div className={styles.dialogTitleWrapper}>
//             <p className={styles.dialogTitle}>
//               {task ? "Edit Task" : "Create New Task"}
//             </p>
//           </div>
//           <div className={styles.formGroupContainer}>
//             <FloatingLabelInput
//               label="Task Name"
//               id="title"
//               name="title"
//               value={taskData.title}
//               onChange={handleInputChange}
//               required
//             />
//             <FloatingLabelTextArea
//               label="Description"
//               id="description"
//               name="description"
//               value={taskData.description}
//               onChange={handleInputChange}
//             />
//             <CategorySelector
//               label="Categories"
//               currentCategories={
//                 taskData?.categories?.length > 0 ? taskData?.categories : []
//               }
//               options={categories}
//               onAddCategory={onAddCategory}
//               onDeleteCategory={onDeleteCategory}
//               onCategoryChange={handleCategoryChange}
//             />
//           </div>
//         </div>
//         <div className={styles.actions}>
//           <button
//             type="button"
//             className={styles.cancelBtn}
//             onClick={() => {
//               setTaskData(initialState);
//               onClose();
//             }}
//           >
//             Cancel
//           </button>
//           <button type="submit" className={styles.submitBtn}>
//             {task ? "Save Changes" : "Add Task"}
//           </button>
//         </div>
//       </form>
//     </Dialog>
//   );
// };

// export default FormDialog;
import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import Dialog from "../../sharedComponent/Dialog/Dialog";
import FloatingLabelInput from "../../sharedComponent/FloatingLabelInput/FloatingLabelInput";
import FloatingLabelTextArea from "../../sharedComponent/FloatingLabelTextArea/FloatingLabelTextArea";
import CategorySelector from "../CategorySelector/CategorySelector";
import { useDebounce } from "use-debounce";

// Initial empty task state
const initialState = {
  title: "",
  description: "",
  categories: [], // Default category
  completed: false,
};

const FormDialog = ({
  isOpen,
  onClose,
  onAddTask,
  onEditTask,
  task, // This will be used when editing an existing task
  categories,
  onAddCategory,
  onDeleteCategory,
}) => {
  const [taskData, setTaskData] = useState(initialState);

  // Debounced task data
  const [debouncedTaskData] = useDebounce(taskData, 500); // Debounce task data updates after 500ms

  // If task prop is provided (edit mode), populate the form with existing data
  useEffect(() => {
    if (task) {
      setTaskData(task);
    }
  }, [task]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      const trimmedValue = value.trim();
      if (trimmedValue === "") {
        return; // Do not update state if the value is just whitespace
      }
    }
    setTaskData({
      ...taskData,
      [name]: value,
    });
  };

  const handleCategoryChange = (selectedCategories) => {
    setTaskData({
      ...taskData,
      categories: selectedCategories,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task) {
      onEditTask(debouncedTaskData); // Edit the existing task using debounced data
    } else {
      onAddTask(debouncedTaskData); // Add a new task using debounced data
    }
    onClose(); // Close dialog after submitting
    setTaskData(initialState); // Reset form
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className={styles.formContainer}>
          <div className={styles.dialogTitleWrapper}>
            <p className={styles.dialogTitle}>
              {task ? "Edit Task" : "Create New Task"}
            </p>
          </div>
          <div className={styles.formGroupContainer}>
            <FloatingLabelInput
              label="Task Name"
              id="title"
              name="title"
              value={taskData.title}
              onChange={handleInputChange}
              required
            />
            <FloatingLabelTextArea
              label="Description"
              id="description"
              name="description"
              value={taskData.description}
              onChange={handleInputChange}
            />
            <CategorySelector
              label="Categories"
              currentCategories={
                taskData?.categories?.length > 0 ? taskData?.categories : []
              }
              options={categories}
              onAddCategory={onAddCategory}
              onDeleteCategory={onDeleteCategory}
              onCategoryChange={handleCategoryChange}
            />
          </div>
        </div>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={() => {
              setTaskData(initialState);
              onClose();
            }}
          >
            Cancel
          </button>
          <button type="submit" className={styles.submitBtn}>
            {task ? "Save Changes" : "Add Task"}
          </button>
        </div>
      </form>
    </Dialog>
  );
};

export default FormDialog;
