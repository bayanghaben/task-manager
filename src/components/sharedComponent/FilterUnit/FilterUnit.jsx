import React, { useState } from "react";
import styles from "./style.module.css"; // Import the styles
import RadioButtonWithLabel from "../RadioButtonWithLabel/RadioButtonWithLabel";

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
      <div className={styles.labeledRadioButtonContainer}>
        <RadioButtonWithLabel
          type="radio"
          className={styles.input}
          checked={!currentSelection}
          onChange={handleAllChange}
          label={"All"}
        />

        {filterOptions.map((option) => (
          <RadioButtonWithLabel
            value={option}
            className={styles.input}
            checked={currentSelection === option}
            onChange={() => handleOptionChange(option)}
            label={option}
          />
        ))}
      </div>
    </div>
  );
};

export default FilterUnit;
