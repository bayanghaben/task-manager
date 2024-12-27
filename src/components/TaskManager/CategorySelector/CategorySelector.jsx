import React, { useEffect, useRef, useState } from "react";
import styles from "./style.module.css";
import Chip from "../../sharedComponent/Chips/Chip";

const CategorySelector = ({
  options,
  label = "",
  onDeleteCategory,
  onAddCategory,
  currentCategories,
  onCategoryChange,
}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [newOption, setNewOption] = useState("");
  const [availableOptions, setAvailableOptions] = useState(options);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAddNewOption, setIsAddNewOption] = useState(false);

  const dropdownRef = useRef(null);
  const addOptionRef = useRef(null);
  const chipContainerRef = useRef(null);
  const [inputHeight, setInputHeight] = useState(0);

  const handleCloseDropdown = (e) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target) &&
      !addOptionRef.current?.contains(e.target)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleCloseDropdown);
    return () => {
      document.removeEventListener("click", handleCloseDropdown);
    };
  }, []);

  useEffect(() => {
    if (currentCategories?.length > 0) {
      setSelectedOptions(currentCategories);
    }
  }, [currentCategories]);

  useEffect(() => {
    if (chipContainerRef.current) {
      setInputHeight(chipContainerRef.current.offsetHeight + 15); // Set input height based on chip container height
    }
  }, [selectedOptions]);

  const handleSelect = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
    setNewOption("");
  };

  useEffect(() => {
    if (selectedOptions?.length > 0) {
      onCategoryChange(selectedOptions);
    }
  }, [selectedOptions, onCategoryChange]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setNewOption(value);
    if (value) {
      setIsDropdownOpen(true);
    } else {
      setIsDropdownOpen(true);
    }
  };

  const handleAddOption = () => {
    if (newOption && !selectedOptions.includes(newOption)) {
      setSelectedOptions([...selectedOptions, newOption]);
      setAvailableOptions([...availableOptions, newOption]);
      onAddCategory(newOption);
      setNewOption("");
      setIsAddNewOption(false);
      setIsDropdownOpen(true);
    }
  };

  const handleInputClick = () => {
    setIsDropdownOpen((prev) => !prev);
    setIsAddNewOption(false);
  };

  const handleDeleteChip = (chipToDelete) => {
    setSelectedOptions(selectedOptions.filter((chip) => chip !== chipToDelete));
  };

  const handleDeleteOption = (optionToDelete) => {
    setAvailableOptions((prevAvailableOptions) =>
      prevAvailableOptions.filter((option) => option !== optionToDelete)
    );
    setSelectedOptions((prevSelectedOptions) =>
      prevSelectedOptions.filter((option) => option !== optionToDelete)
    );

    onDeleteCategory(optionToDelete);
  };

  return (
    <div className={styles.multiSelectContainer} ref={dropdownRef}>
      <div
        className={`${styles.inputContainer} ${
          selectedOptions.length > 0 ? styles.focused : ""
        }`}
      >
        <div className={styles.inputWrapper}>
          <div
            className={styles.chipContainer}
            ref={chipContainerRef}
            onClick={handleInputClick}
            onChange={handleInputChange}
          >
            {selectedOptions.map((chip, index) => (
              <Chip
                key={index}
                text={chip}
                onDelete={(e) => {
                  e.stopPropagation();
                  handleDeleteChip(chip);
                }}
                isRemovable={true}
              />
            ))}
          </div>
          <div className={styles.inputContainer}>
            <input
              type="text"
              className={styles.input}
              placeholder=" "
              onClick={handleInputClick}
              onChange={handleInputChange}
              readOnly
              style={{ height: inputHeight }}
            />
            <label
              className={`${styles.label} ${
                selectedOptions.length > 0 ? styles.floating : ""
              }`}
            >
              {label}
            </label>
          </div>
        </div>
        {isDropdownOpen && (
          <div className={styles.dropdownContainer}>
            {availableOptions
              .filter((option) =>
                option.toLowerCase().includes(newOption.toLowerCase())
              )
              .map((option, index) => (
                <div
                  key={index}
                  className={`${styles.dropdownItem} ${
                    selectedOptions.includes(option)
                      ? styles.selectedDropdownItem
                      : ""
                  }`}
                  onClick={() => handleSelect(option)}
                >
                  <span>{option}</span>
                  <span
                    className={styles.deleteIcon}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteOption(option);
                    }}
                  >
                    &times;
                  </span>
                </div>
              ))}
            <div
              className={styles.dropdownItem}
              ref={addOptionRef}
              onClick={(e) => {
                e.stopPropagation();
                setIsAddNewOption(true);
              }}
            >
              {isAddNewOption ? (
                <div className={styles.addOptionContainer}>
                  <input
                    type="text"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleAddOption();
                    }}
                    value={newOption}
                    onChange={handleInputChange}
                    placeholder="Enter new category"
                    className={styles.addOptionInput}
                    autoFocus
                  />
                </div>
              ) : (
                <p>+ Add New Category</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategorySelector;
