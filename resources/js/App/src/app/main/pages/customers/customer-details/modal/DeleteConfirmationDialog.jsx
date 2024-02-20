import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

function DeleteConfirmationDialog({ open, onClose, onConfirm }) {
  const [options, setOptions] = useState({
    deleteCompany: false,
    deleteContact: false,
  });

  const handleChange = (name) => (event) => {
    setOptions({ ...options, [name]: event.target.checked });
  };

  const handleConfirm = () => {
    onConfirm(options);
    onClose();
  };

  return (
    <Dialog
      open={open}
      fullWidth
      onClose={onClose}
      aria-labelledby="delete-confirmation-dialog-title"
    >
      <DialogTitle>Delete Confirmation</DialogTitle>
      <DialogContent>
        <p>You are about to delete your FindKunder profile.</p>
        <FormControlLabel
          control={
            <Checkbox
              checked={options.deleteCompany}
              onChange={handleChange("deleteCompany")}
              color="secondary"
            />
          }
          label="Delete Company"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={options.deleteContact}
              onChange={handleChange("deleteContact")}
              color="secondary"
            />
          }
          label="Delete Contact"
        />
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button color="secondary" variant="contained" onClick={handleConfirm}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteConfirmationDialog;
