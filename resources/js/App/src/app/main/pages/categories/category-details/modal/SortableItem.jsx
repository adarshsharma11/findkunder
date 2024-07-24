import React from "react";
import { SortableElement, SortableHandle } from 'react-sortable-hoc';
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import DragHandleIcon from '@mui/icons-material/DragHandle';

// Create a drag handle component
const DragHandle = SortableHandle(() => (
  <IconButton>
    <DragHandleIcon />
  </IconButton>
));

const SortableItem = SortableElement(({ category, catIndex, handleCategoryNameChange, handleDeleteCategory }) => {
  return (
  <div key={category.id} className="flex items-center" style={{ cursor: 'move', opacity: 1, zIndex: 9999, position: 'relative' }}>
    <DragHandle />
    <TextField
      label={`Skill ${catIndex + 1} Name`}
      variant="outlined"
      fullWidth
      value={category.name}
      onChange={(e) => handleCategoryNameChange(catIndex, e.target.value)}
      className="mt-8 mb-16"
      style={{ backgroundColor: 'white', zIndex: 1 }}
    />
    <IconButton onClick={() => handleDeleteCategory(category, catIndex)} aria-label="delete">
      <DeleteIcon />
    </IconButton>
  </div>
  )

});

export default SortableItem;
