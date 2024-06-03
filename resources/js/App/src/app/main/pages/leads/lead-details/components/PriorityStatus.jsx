import React from 'react';
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";

const PriorityStatus = ({ priority, isDetailsPage }) => {
  let color;
  let text;
  
  switch (priority) {
    case "2":
      color = "success";
      text = "Complete";
      break;
    case "1":
      color = "warning";
      text = "Inprogress";
      break;
    default:
      color = "secondary";
      text = "New";
  }

  if (isDetailsPage) {
    return (
      <Typography>{text}</Typography>
    )
  }
  return (
    <Button variant="contained" color={color} size="small">
      {text}
    </Button>
  );
};

export default PriorityStatus;
