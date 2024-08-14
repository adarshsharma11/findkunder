import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

function ProfileCreationDialog(props) {
  const { handleClose, open } = props;
  
  return (
    <Dialog
      open={open}
      fullWidth
      onClose={handleClose}
      aria-labelledby="profile-creation-dialog-title"
    >
      <DialogTitle id="profile-creation-dialog-title">
        Create Your Free Profile
      </DialogTitle>
      <DialogContent>
        <Typography paragraph>
          To connect you with potential customers, you'll need to create a free profile.
        </Typography>
        <Typography paragraph>
          A profile consists of a <strong>location</strong> and a <strong>contact person</strong>.
          You can add multiple locations and contact persons, allowing you to create as many profiles as you need.
        </Typography>
        <Typography paragraph>
          Step 1: In the <Link to="/locations">My Locations</Link> section, add one or more office locations.
        </Typography>
        <Typography paragraph>
          Step 2: In the <Link to="/contact-person">My Contacts</Link> section, add one or more contact persons.
        </Typography>
        <Typography paragraph>
          Step 3: In the <Link to="/profiles">My Profiles</Link> section, create a profile by linking a location with a contact person.
        </Typography>
        <Typography paragraph>
          By adding a free profile, we will be able to match you with potential customers.
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Note: You can always create, edit, and delete locations, contacts, and profiles.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" variant="contained" onClick={handleClose}>
          Got It
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ProfileCreationDialog;
