import React from "react";
import styles from "./style.module.css";
import FilterUnit from "../../sharedComponent/FilterUnit/FilterUnit";

function TaskFilter({
  onCategoryFilter,
  onStatusFilter,
  statuses,
  categories,
}) {
  return (
    <div className={styles.filter}>
      <h5>Filter</h5>
      <FilterUnit
        title="Categories"
        filterOptions={categories}
        onFilterChange={onCategoryFilter}
        initialState=""
      />

      <FilterUnit
        title="Completion Status"
        filterOptions={statuses}
        onFilterChange={onStatusFilter}
        initialState={null}
      />
    </div>
  );
}

export default TaskFilter;
