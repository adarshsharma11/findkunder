import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { blue } from '@mui/material/colors';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { Controller, useFormContext } from "react-hook-form";

function AssignPersonDialog({ open, onClose, assignContactPerson, assignLeadProfiles, leadId }) {
  const [ isLoading, setisLoading ] = useState(false);
  const methods = useFormContext();
  const { control, formState, getValues } = methods;
  const { errors } = formState;

  const handleConfirm = async () => {
    setisLoading(true);
    const params = {
      user_id: getValues("person_id")?.toString(),
      id: leadId,
    }
    await assignContactPerson(params);
    setisLoading(false);
    onClose();
  };


  return (
    <Dialog
      open={open}
      fullWidth
      onClose={onClose}
      aria-labelledby="delete-confirmation-dialog-title"
    >
      <DialogTitle>Assign Person</DialogTitle>
      <DialogContent>
        <p className="mb-8">You are about to assign person to FindKunder profile.</p>
        <Controller
        name="person_id"
        control={control}
        render={({ field }) => (
          <>
            <InputLabel id="demo-simple-select-label">Assign Person</InputLabel>
            <Select
              {...field}
              className="mt-8 mb-16"
              error={!!errors.person_id}
              required
              displayEmpty
              helperText={errors?.person_id?.message}
              id="person_id"
              variant="outlined"
              fullWidth
            >
              <MenuItem value="" disabled>
                Select Contact Person
              </MenuItem>
              {assignLeadProfiles &&
                assignLeadProfiles?.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.email}
                  </MenuItem>
                ))}
            </Select>
          </>
        )}
      />
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Box sx={{ m: 1, position: 'relative' }}>
        <Button color="secondary" variant="contained" onClick={handleConfirm} disabled={isLoading}>
          Confirm
        </Button>
            {isLoading && (
              <CircularProgress
                size={24}
                sx={{
                  color: blue[500],
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-12px',
                  marginLeft: '-12px',
                }}
              />
            )}
          </Box>
      </DialogActions>
    </Dialog>
  );
}

export default AssignPersonDialog;
