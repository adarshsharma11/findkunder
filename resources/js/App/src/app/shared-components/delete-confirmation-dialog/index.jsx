import React from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function DeleteConfirmationDialog({ open, onClose, onConfirm, message }) {

  const handleConfirm = () => {
    onConfirm();
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
        <p className="mb-8">{message}</p>
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

DeleteConfirmationDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};
