import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const AddCompany = ({ invalidCompany, setInvalidCompany }) => {
  return (
    <>
      <Dialog open={invalidCompany} onClose={() => setInvalidCompany(false)}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          The selected company is not valid. Please choose a company from the
          list.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setInvalidCompany(false)} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddCompany;
