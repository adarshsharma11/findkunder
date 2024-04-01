import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import BasicInfoTab from "../../main/pages/customers/customer-details/modal/BasicInfoTab";

function EditProfileDialog({
  open,
  handleClose,
  handleSave,
  handleDelete,
  companies,
  contacts,
  isAdmin,
}) {
  return (
    <Dialog
      open={open}
      fullWidth
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle className="">Profile Details</DialogTitle>
      <DialogContent className="">
        <BasicInfoTab companies={companies} contacts={contacts} isAdmin={isAdmin} />
      </DialogContent>
      <DialogActions>
        <Button color="secondary" variant="contained" onClick={handleClose}>
          Close
        </Button>
        <Button
          color="secondary"
          variant="contained"
          onClick={handleSave}
        >
          Save
        </Button>
        <Button
          color="secondary"
          variant="contained"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditProfileDialog;
