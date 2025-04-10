import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function SaveChangesDialog({ open, onClose, onConfirm }) {

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
      <DialogTitle>Save Changes</DialogTitle>
      <DialogContent>
        <Typography className="mb-8">Do you want to save the changes?</Typography>
        <Typography variant="body2" color="textSecondary" className="mb-8">
          Clicking "Yes" will validate the form. If mandatory fields are missing, they will be highlighted.
          You will need to complete all required fields to save successfully.
        </Typography>
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
