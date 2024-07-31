import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import { removeProduct } from "../../store/categorySlice";
import { showMessage } from "app/store/fuse/messageSlice";
import { v4 as uuidv4 } from 'uuid'; 
import { arrayMoveImmutable } from 'array-move';
import SortableList from './SortableList';

function CategoryEditModal({ isOpen, onClose, categories, onEditCategories, categoryId }) {
  const dispatch = useDispatch();
  const [editedCategories, setEditedCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [showAddMoreButton, setShowAddMoreButton] = useState(true);

  useEffect(() => {
    if (categories.length > 0) {
      setEditedCategories([...categories]);
    }
  }, [categories]);

  const handleSave = () => {
    const updatedCategories = [...editedCategories];
    if (newCategoryName.trim() !== "") {
      const newCategory = { id: uuidv4(), name: newCategoryName, parent_id: categoryId ? Number(categoryId) : null, order: updatedCategories.length };
      updatedCategories.push(newCategory);
    }
    setEditedCategories([...updatedCategories]);
    onEditCategories([...updatedCategories]);
    
    setNewCategoryName("");
    onClose();
  };

  const handleNewCategory = (value) => {
    setNewCategoryName(value);
    if (value && value.trim() !== "" && editedCategories.length >= 10) {
      setShowAddMoreButton(false);
    } else {
      setShowAddMoreButton(true);
    }
  };

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
      setEditedCategories([...editedCategories, { id: uuidv4(), name: newCategoryName, parent_id: Number(categoryId), order: editedCategories.length }]);
      setNewCategoryName("");
      if (editedCategories.length >= 9) {
        setShowAddMoreButton(false);
      }
    }
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const updatedCategories = arrayMoveImmutable(editedCategories, oldIndex, newIndex).map((category, index) => ({
      ...category,
      order: index
    }));
    setEditedCategories(updatedCategories);
    onEditCategories(updatedCategories);
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Edit Sub Skills</DialogTitle>
      <DialogContent>
        <SortableList
          categories={editedCategories}
          onSortEnd={onSortEnd}
          handleCategoryNameChange={handleCategoryNameChange}
          handleDeleteCategory={handleDeleteCategory}
          useDragHandle
        />
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
