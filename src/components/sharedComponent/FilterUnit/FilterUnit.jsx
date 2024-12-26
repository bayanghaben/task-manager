import React, { useState } from "react";
import styles from "./style.module.css"; // Import the styles

const FilterUnit = ({ title, filterOptions, onFilterChange, initialState }) => {
  const [currentSelection, setCurrentSelection] = useState(initialState);
  const handleOptionChange = (option) => {
    setCurrentSelection(option);
    onFilterChange(option); // Update the parent component
  };

  const handleAllChange = () => {
    setCurrentSelection(initialState); // Reset internal state
    onFilterChange(initialState); // Update the parent component
  };
  return (
    <div className={styles.filterContainer}>
      <h3>{title}</h3>
      <label className={styles.label}>
        <input
          type="radio"
          value={""}
          className={styles.input}
          checked={!currentSelection}
          onChange={handleAllChange}
        />
        <p> All</p>
      </label>

      {filterOptions.map((option) => (
        <div key={option} className={styles.label}>
          <input
            style={{ fill: "red" }}
            type="radio"
            value={option}
            className={styles.input}
            checked={currentSelection === option}
            onChange={() => handleOptionChange(option)}
          />
          <p> {option}</p>
        </div>
      ))}
    </div>
  );
};

export default FilterUnit;
