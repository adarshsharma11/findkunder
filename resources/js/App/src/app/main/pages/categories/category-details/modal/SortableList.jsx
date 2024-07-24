import React from "react";
import { SortableContainer } from 'react-sortable-hoc';
import SortableItem from './SortableItem'; // Import the SortableItem component

const SortableList = SortableContainer(({ categories, handleCategoryNameChange, handleDeleteCategory }) => {
  return (
    <div>
      {categories.map((category, index) => (
        <SortableItem
          key={`item-${category.id}`}
          index={index}
          category={category}
          handleCategoryNameChange={handleCategoryNameChange}
          handleDeleteCategory={handleDeleteCategory}
        />
      ))}
    </div>
  );
});

export default SortableList;
