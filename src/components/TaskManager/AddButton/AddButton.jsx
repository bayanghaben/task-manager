import React from "react";
import Button from "../../sharedComponent/Button/Button";
import Add from "../../../assets/Add";

function AddButton() {
  return (
    <div>
      <Button>
        <Add />
        <p>New Task</p>
      </Button>
    </div>
  );
}

export default AddButton;
