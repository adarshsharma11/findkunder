import { motion } from "framer-motion";
import _ from "@lodash";
import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function DeleteAccountTab(props) {
  const { handleDeleteProfile } = props;
  const [isConfirmationOpen, setConfirmationOpen] = React.useState(false);

  const container = {
    show: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const handleDeleteConfirmation = async () => {
    // Close the confirmation modal
    await handleDeleteProfile();
    setConfirmationOpen(false);
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full"
    >
      <div className="md:flex">
        <div className="flex flex-col flex-1 md:ltr:pr-32 md:rtl:pl-32">
          <div className="w-3/4">
            <Button
              className="whitespace-nowrap mx-4"
              variant="contained"
              color="warning"
              startIcon={<FuseSvgIcon size={20}>heroicons-solid:trash</FuseSvgIcon>}
              onClick={() => setConfirmationOpen(true)}
            >
              Delete your account
            </Button>
          </div>
        </div>
      </div>
      <Dialog
        open={isConfirmationOpen}
        onClose={() => setConfirmationOpen(false)}
      >
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete your account? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmationOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirmation} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  );
}

export default DeleteAccountTab;
