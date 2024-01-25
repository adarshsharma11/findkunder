import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import _ from "@lodash";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { Controller, useFormContext } from "react-hook-form";

const AddContact = ({
  invalidContact,
  setInvalidContact,
  contactName,
  handleSaveContact,
}) => {
  const methods = useFormContext();
  const { control, formState, getValues, setValue } = methods;
  const namesArray = (contactName && contactName?.split(" ")) || null;
  const firstName = namesArray && namesArray[0];
  const lastName = namesArray && namesArray[1];

  React.useEffect(() => {
    if (firstName) {
      setValue("first_name", firstName);
    }
    if (lastName) {
      setValue("last_name", lastName);
    }
  }, [firstName, lastName]);

  const { errors, isValid, dirtyFields } = formState;
  const titleOptions = [
    {
      value: "approved_auditor",
      label: "Approved Auditor",
    },
    {
      value: "bookkeeper",
      label: "Bookkeeper",
    },
    {
      value: "other",
      label: "Other",
    },
  ];
  return (
    <>
      <Dialog open={invalidContact} onClose={() => setInvalidContact(false)}>
        <DialogTitle>Add Contact</DialogTitle>
        <DialogContent>
          <div>
            <Controller
              name="title"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <>
                  <InputLabel id="demo-simple-select-label">Title</InputLabel>
                  <Select
                    {...field}
                    className="mt-8 mb-16"
                    error={!!errors.title}
                    displayEmpty
                    required
                    helperText={errors?.title?.message}
                    id="title"
                    variant="outlined"
                    fullWidth
                  >
                    <MenuItem value="" disabled>
                      Select Title
                    </MenuItem>
                    {titleOptions &&
                      titleOptions?.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                  </Select>
                </>
              )}
            />
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
                  label="First Name"
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
                  label="Last Name"
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
                  error={!!errors.email}
                  helperText={errors?.email?.message}
                  label="Email"
                  type="text"
                  required
                  variant="outlined"
                  fullWidth
                />
              )}
            />
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mt-8 mb-16"
                  id="phone"
                  error={!!errors.phone}
                  helperText={errors?.phone?.message}
                  label="Phone"
                  required
                  type="number"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
            <Controller
              name="linkedin"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mt-8 mb-16"
                  id="linkedin"
                  error={!!errors.linkedin}
                  helperText={errors?.linkedin?.message}
                  label="Linkedin"
                  type="text"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
            <Controller
              name="comment"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mt-8 mb-16"
                  id="city"
                  error={!!errors.comment}
                  helperText={errors?.comment?.message}
                  label="Comment"
                  type="text"
                  rows={3}
                  multiline
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setInvalidContact(false)}
            className="whitespace-nowrap mx-4"
            variant="contained"
            color="secondary"
          >
            Close
          </Button>
          <Button
            onClick={() => handleSaveContact(getValues())}
            className="whitespace-nowrap mx-4"
            variant="contained"
            color="secondary"
            disabled={_.isEmpty(dirtyFields) || !isValid}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddContact;
