import React from "react";
import Dialog from "../../sharedComponent/Dialog/Dialog";
import trash from "../../../assets/Trash.svg";
import styles from "./style.module.css";
import Delete from "../../../assets/Delete";
function DeleteDialog({ task, onDelete, onClose, isOpen }) {
  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div className={styles.imgContainer}>
        <img src={trash} alt="trash" />
      </div>
      <div className={styles.dialogWrapper}>
        <div className={styles.dialogContent}>
          <div className={styles.dialogTitleWrapper}>
            <p className={styles.dialogTitle}>{"Delete Task!"}</p>
          </div>
          <p>
            Are you sure that you want to delete{" "}
            <div>
              <span>{task?.title}</span>?
            </div>
          </p>
        </div>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={() => onClose()}
          >
            Cancel
          </button>
          <button
            className={styles.deleteBtn}
            onClick={() => onDelete(task?.id)}
          >
            <Delete color={"#fff"} />
            <p>Delete</p>
          </button>
        </div>
      </div>
    </Dialog>
  );
}

export default DeleteDialog;
