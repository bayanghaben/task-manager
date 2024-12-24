import React, { useState } from "react";
import styles from "./CategorySelector.module.css";

const CategorySelector = ({ categories, onChange }) => {
  const [selected, setSelected] = useState([]);

  const toggleCategory = (category) => {
    const updated = selected.includes(category)
      ? selected.filter((cat) => cat !== category)
      : [...selected, category];
    setSelected(updated);
    onChange(updated);
  };

  return (
    <div className={styles.selector}>
      {categories.map((category) => (
        <button
          key={category}
          className={selected.includes(category) ? styles.selected : ""}
          onClick={() => toggleCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategorySelector;
