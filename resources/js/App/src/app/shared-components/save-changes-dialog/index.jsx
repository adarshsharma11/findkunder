import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function SaveChangesDialog({ open, onClose, onConfirm }) {
 
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog
      open={open}
      fullWidth
      onClose={onClose}
      aria-labelledby="update-confirmation-dialog-title"
    >
      <DialogTitle>Update Confirmation</DialogTitle>
      <DialogContent>
        <p className="mb-8">Do you want to save the changes?</p>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={onClose}>
          No
        </Button>
        <Button color="secondary" variant="contained" onClick={handleConfirm}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SaveChangesDialog;
