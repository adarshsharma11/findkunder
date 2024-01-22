import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const AddContact = ({ invalidContact, setInvalidContact }) => {
  return (
    <>
      <Dialog open={invalidContact} onClose={() => setInvalidContact(false)}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          The selected contact is not valid. Please choose a contact from the
          list.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setInvalidContact(false)} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddContact;
