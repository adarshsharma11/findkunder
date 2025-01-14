import { motion } from "framer-motion";
import _ from "@lodash";
import React from "react";
import PropTypes from 'prop-types';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function ViewDescriptionDialog(props) {
  const { 
    open,
    toggleDialog,
    dialogTitle, 
    dialogContent,
  } = props;

  const container = {
    show: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full"
    >
      <Dialog
        open={open}
        onClose={() => toggleDialog(false)}
      >
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {dialogContent}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => toggleDialog(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  );
}

ViewDescriptionDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleDialog: PropTypes.func.isRequired,
  dialogTitle: PropTypes.string.isRequired,
  dialogContent: PropTypes.string.isRequired,
};

export default ViewDescriptionDialog;