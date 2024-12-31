import React from "react";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

function CompleteProfile() {
  const steps = [
    "To connect you with potential customers, you'll need to create a free profile.",
    <>
      A profile consists of a <strong>location</strong> and a <strong>contact person</strong>.
      You can add multiple locations and contact persons, allowing you to create as many profiles as you need.
    </>,
    <>
      Step 1: In the <Link to="/locations">My Locations</Link> section, add one or more office locations.
    </>,
    <>
      Step 2: In the <Link to="/contact-person">My Contacts</Link> section, add one or more contact persons.
    </>,
    <>
      Step 3: In the <Link to="/profiles">My Profiles</Link> section, create a profile by linking a location with a contact person.
    </>,
    "By adding a free profile, we will be able to match you with potential customers.",
  ];

  return (
    <>
      {steps.map((step, index) => (
        <Typography paragraph key={index}>
          {step}
        </Typography>
      ))}
      <Typography variant="body2" color="textSecondary">
        Note: You can always create, edit, and delete locations, contacts, and profiles.
      </Typography>
    </>
  );
}

export default CompleteProfile;
