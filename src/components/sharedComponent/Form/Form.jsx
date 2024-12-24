import React, { useState } from "react";
import styles from "./Form.module.css";

const Form = ({ onSubmit, initialData = {} }) => {
  const [title, setTitle] = useState(initialData.title || "");
  const [category, setCategory] = useState(initialData.category || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, category });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default Form;
