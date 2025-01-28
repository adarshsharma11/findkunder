import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import LoadingButton from "@mui/lab/LoadingButton";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import FormHelperText from "@mui/material/FormHelperText";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import Snackbar from "@mui/material/Snackbar";
import Button from "@mui/material/Button";
import { Controller, useFormContext, useWatch } from "react-hook-form";

function UpdateProfile(props) {
  const { handleUpdateProfile, productId, loading, isProfilePage } = props;
  const methods = useFormContext();
  const { control, formState, getValues } = methods;
  const { errors, isDirty } = formState;
  const [snackbarOpen, setSnackbarOpen] = useState(true);

  const watchedFields = useWatch({ control }); // Watch all form fields
  const initialValues = JSON.stringify(getValues()); // Initial form state

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  const handleNavigateAway = () => {
    if (JSON.stringify(watchedFields) !== initialValues) {
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => setSnackbarOpen(false);

  const handleSaveChanges = () => {
    setSnackbarOpen(false);
    handleUpdateProfile();
  };

  const roleOptions = [
    { value: "owner", label: "Admin" },
    { value: "user", label: "Account owner" },
  ];

  return (
    <div className="mt-8">
    { isProfilePage &&
          <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <>
              <FormControl sx={{ width: '100%'}}  error={!!errors.role}>
              <InputLabel id="role">Select Role</InputLabel>
              <Select
                {...field}
                required
                className="mt-8 mb-16"
                labelId="role"
                id="role"
                variant="outlined"
                input={<OutlinedInput label="Select Role"/>}
                fullWidth
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem value="" disabled>
                  Select Role
                </MenuItem>
                {roleOptions &&
                  roleOptions?.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
              </Select>
              {errors.role && 
                <FormHelperText>{errors?.role?.message}</FormHelperText>
              }
              </FormControl>
            </>
        )}
          />
      }  
      <Controller
        name="first_name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.first_name}
            required
            helperText={errors?.first_name?.message}
            label="Contact First Name"
            autoFocus
            id="first_name"
            variant="outlined"
            fullWidth
          />
        )}
      />

      <Controller
        name="last_name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            id="last_name"
            error={!!errors.last_name}
            helperText={errors?.last_name?.message}
            label="Contact Last Name"
            type="text"
            required
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            id="email"
            InputProps={{ readOnly: field.value && productId !== 'new' ? true : false }} 
            error={!!errors.email}
            helperText={errors?.email?.message}
            label="Contact Email"
            type="text"
            required
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="telephone"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            id="telephone"
            error={!!errors.telephone}
            helperText={errors?.telephone?.message}
            label="Contact telephone"
            required
            type="number"
            variant="outlined"
            fullWidth
          />
        )}
      />
       <Controller
        name="company"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            id="company"
            error={!!errors.company}
            helperText={errors?.company?.message}
            label="Company Name"
            type="text"
            required
            variant="outlined"
            fullWidth
          />
        )}
      />

     <Controller
        name="cvr"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            id="cvr"
            error={!!errors.cvr}
            helperText={errors?.cvr?.message}
            label="Company cvr"
            type="text"
            required
            variant="outlined"
            fullWidth
          />
        )}
      />
    {isProfilePage && 
      <div className="flex justify-end">
      <LoadingButton
          className="whitespace-nowrap mx-4"
          variant="contained"
          color="primary"
          loading={loading}
          onClick={handleUpdateProfile}
          startIcon={<FuseSvgIcon size={20}>heroicons-solid:bookmark</FuseSvgIcon>}
        >
             Update
        </LoadingButton>
      </div>
    }
      {/* <Snackbar
        open={snackbarOpen}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={handleCloseSnackbar}
        sx={{ top: '100px !important' }}
        message="You have unsaved changes. Do you want to save them?"
        action={
          <>
            <Button color="secondary" size="small" onClick={handleCloseSnackbar}>
              No
            </Button>
            <Button color="secondary" size="small" onClick={handleSaveChanges}>
              Yes
            </Button>
          </>
        }
      /> */}
    </div>
  );
}

export default UpdateProfile;
