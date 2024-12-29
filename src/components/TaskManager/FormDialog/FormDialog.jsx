import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import Dialog from "../../sharedComponent/Dialog/Dialog";
import FloatingLabelInput from "../../sharedComponent/FloatingLabelInput/FloatingLabelInput";
import FloatingLabelTextArea from "../../sharedComponent/FloatingLabelTextArea/FloatingLabelTextArea";
import CategorySelector from "../CategorySelector/CategorySelector";
import { useDebounce } from "use-debounce";

const initialState = {
  title: "",
  description: "",
  categories: [],
  completed: false,
};

const FormDialog = ({
  isOpen,
  onClose,
  onAddTask,
  onEditTask,
  task,
  categories,
  onAddCategory,
  onDeleteCategory,
}) => {
  const [taskData, setTaskData] = useState(initialState);

  const [debouncedTaskData] = useDebounce(taskData, 500); // Debounce task data updates after 500ms

  useEffect(() => {
    if (task) {
      setTaskData(task);
    }
  }, [task]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
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
      onEditTask(debouncedTaskData);
    } else {
      onAddTask(debouncedTaskData);
    }
    onClose();
    setTaskData(initialState);
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
