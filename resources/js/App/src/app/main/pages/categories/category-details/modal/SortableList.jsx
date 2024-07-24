import React from "react";
import { SortableContainer } from 'react-sortable-hoc';
import SortableItem from './SortableItem';

const SortableList = SortableContainer(({ categories, handleCategoryNameChange, handleDeleteCategory }) => {
  return (
    <div>
      {categories.map((category, index) => (
        <SortableItem
          key={`item-${category.id}`}
          catIndex={index}
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
