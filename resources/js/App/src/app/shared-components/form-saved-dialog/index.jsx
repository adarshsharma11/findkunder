import React from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function FormSavedDialog({ open, onClose, onConfirm, description = "Remember to add one or more contacts to the location.", title = "Location Saved", buttonText = "Add contact(s)", closeButtonText = "I will do it later", buttonText2, handleButton2 }) {
 
  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="md"
      onClose={onClose}
      aria-labelledby="update-confirmation-dialog-title"
      PaperProps={{
        style: {
          maxWidth: '750px'
        }
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <p className="mb-8">{description}</p>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={onClose}>
          {closeButtonText}
        </Button>
        {buttonText2 && (
          <Button color="secondary" variant="contained" onClick={handleButton2}>
            {buttonText2}
          </Button>
        )}
        <Button color="secondary" variant="contained" onClick={handleConfirm}>
          {buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default FormSavedDialog;

FormSavedDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  description: PropTypes.string,
  title: PropTypes.string,
  buttonText: PropTypes.string,
};