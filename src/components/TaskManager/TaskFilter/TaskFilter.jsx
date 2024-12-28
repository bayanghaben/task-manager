import React from "react";
import styles from "./style.module.css";
import FilterUnit from "../../sharedComponent/FilterUnit/FilterUnit";
import constants from "../../../constants"; // Import constants if needed

function TaskFilter({ onFilter, statuses, categories }) {
  const handleFilterChange = (filterType) => (value) => {
    onFilter(filterType, value);
  };

  return (
    <div className={styles.filter}>
      <h5>Filter</h5>
      <FilterUnit
        title="Categories"
        filterOptions={categories}
        onFilterChange={handleFilterChange(constants.filterType.category)}
        initialState=""
      />

      <FilterUnit
        title="Completion Status"
        filterOptions={statuses}
        onFilterChange={handleFilterChange(constants.filterType.status)}
        initialState={null}
      />
    </div>
  );
}

export default TaskFilter;
