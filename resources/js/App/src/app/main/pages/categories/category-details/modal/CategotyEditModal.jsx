// CategoryEditModal.js
import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

function CategoryEditModal({ isOpen, onClose, categories, onEditCategories }) {
  const [editedCategories, setEditedCategories] = useState([]);

  useEffect(() => {
    setEditedCategories([...categories]);
  }, [categories]);

  const handleSave = () => {
    onEditCategories(editedCategories);
    onClose();
  };

  const handleCategoryNameChange = (index, newName) => {
    const updatedCategories = [...editedCategories];
    updatedCategories[index] = { ...updatedCategories[index], name: newName };
    setEditedCategories(updatedCategories);
  };

  const handleDeleteCategory = (index) => {
    const updatedCategories = [...editedCategories];
    updatedCategories.splice(index, 1);
    setEditedCategories(updatedCategories);
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Edit Sub Skills</DialogTitle>
      <DialogContent>
        {editedCategories.map((category, index) => (
          <div key={category.id} className="flex items-center">
          <TextField
            label={`Skill ${index + 1} Name`}
            variant="outlined"
            fullWidth
            value={category.name}
            onChange={(e) => handleCategoryNameChange(index, e.target.value)}
            className="mt-8 mb-16"
          />
          <IconButton onClick={() => handleDeleteCategory(index)} aria-label="delete">
              <DeleteIcon />
          </IconButton>
          </div>
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
