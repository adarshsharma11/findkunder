// CategoryEditModal.js
import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function CategoryEditModal({ isOpen, onClose, categories, onEditCategories }) {
  const [editedCategories, setEditedCategories] = useState([]);

  useEffect(() => {
    // Initialize the editedCategories state with the initial categories
    setEditedCategories([...categories]);
  }, [categories]);

  const handleSave = () => {
    // Perform any validation or data update logic here
    onEditCategories(editedCategories);
    onClose();
  };

  const handleCategoryNameChange = (index, newName) => {
    const updatedCategories = [...editedCategories];
    updatedCategories[index] = { ...updatedCategories[index], name: newName };
    setEditedCategories(updatedCategories);
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Edit Sub Skills</DialogTitle>
      <DialogContent>
        {editedCategories.map((category, index) => (
          <TextField
            key={category.id}
            label={`Skill ${index + 1} Name`}
            variant="outlined"
            fullWidth
            value={category.name}
            onChange={(e) => handleCategoryNameChange(index, e.target.value)}
            className="mt-8 mb-16"
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CategoryEditModal;
