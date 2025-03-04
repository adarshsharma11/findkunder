import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function FormSavedDialog({ open, onClose, onConfirm, description = "Remember to add one or contacts to the location.", title = "Location Saved", buttonText = "Add contact(s)" }) {
 
  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <Dialog
      open={open}
      fullWidth
      onClose={onClose}
      aria-labelledby="update-confirmation-dialog-title"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <p className="mb-8">{description}</p>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={onClose}>
          I will do it later
        </Button>
        <Button color="secondary" variant="contained" onClick={handleConfirm}>
          {buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default FormSavedDialog;
