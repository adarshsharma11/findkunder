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
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import { saveProduct, removeProduct } from "../../store/categorySlice";
import { showMessage } from "app/store/fuse/messageSlice";

function CategoryEditModal({ isOpen, onClose, categories, onEditCategories, categoryId }) {
  const dispatch = useDispatch();
  const [editedCategories, setEditedCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [showAddMoreButton, setShowAddMoreButton] = useState(true);


  useEffect(() => {
    setEditedCategories([...categories]);
  }, [categories]);

  const handleSave = () => {
    const updatedCategories = [...editedCategories];
    if (newCategoryName.trim() !== "") {
      const newCategory = { id: null, name: newCategoryName, parent_id: Number(categoryId) };
      updatedCategories.push(newCategory);
      const params = {
        categories: updatedCategories,
        id: categoryId,
      }
      dispatch(saveProduct(params)).then(() => {
        dispatch(showMessage({ message: "Category updated successfully!" }));
      });
  }
    setEditedCategories([...editedCategories]);
    onEditCategories([...editedCategories]);
    
    setNewCategoryName("")
    onClose();
  };

  const handleNewCategory = (value) => {
     setNewCategoryName(value);
     if (value && value.trim() !== "" && editedCategories.length >= 10) {
      setShowAddMoreButton(false);
    } else {
      setShowAddMoreButton(true);
    }
  }


  const handleCategoryNameChange = (index, newName) => {
    const updatedCategories = [...editedCategories];
    updatedCategories[index] = { ...updatedCategories[index], name: newName, parent_id: Number(categoryId) };
    setEditedCategories(updatedCategories);
    onEditCategories(updatedCategories);
  };

  const handleDeleteCategory = (category, index) => {
    const updatedCategories = [...editedCategories];
    updatedCategories.splice(index, 1);
    if (category.id && category.id !== null) {
      dispatch(removeProduct(category.id)).then(({ payload }) => {
        dispatch(showMessage({ message: payload?.message }));
      });
    }
    setEditedCategories(updatedCategories);
    onEditCategories(updatedCategories);
  };

  const handleAddMore = () => {
    if (newCategoryName.trim() !== "") {
      setEditedCategories([...editedCategories, { id: null, name: newCategoryName, parent_id: Number(categoryId)}]);
      setNewCategoryName("");
      if (editedCategories.length >= 9) {
        setShowAddMoreButton(false);
      }
    }
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
          <IconButton onClick={() => handleDeleteCategory(category, index)} aria-label="delete">
              <DeleteIcon />
          </IconButton>
          </div>
        ))}
        {showAddMoreButton && (
          <div className="flex items-center">
            <TextField
              label="New Skill Name"
              variant="outlined"
              fullWidth
              value={newCategoryName}
              onChange={(e) => handleNewCategory(e.target.value)}
              className="mt-8 mb-16"
            />
            <IconButton onClick={handleAddMore} aria-label="add">
              <AddIcon />
            </IconButton>
          </div>
        )}
        {!showAddMoreButton && (
          <p style={{ color: "red", marginTop: "8px" }}>Maximum limit reached (10 subcategories).</p>
        )}
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
