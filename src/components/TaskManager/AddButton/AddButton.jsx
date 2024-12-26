import React from "react";
import Button from "../../sharedComponent/Button/Button";
import Add from "../../../assets/Add";

function AddButton({ onAddButton }) {
  return (
    <div>
      <Button onClick={onAddButton}>
        <Add />
        <p>New Task</p>
      </Button>
    </div>
  );
}

export default AddButton;
