import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { Controller, useFormContext } from "react-hook-form";

function BasicInfoTab(props) {
  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;
  const titleOptions = [
    {
      value: 0,
      label: "Inactive",
    },
    {
      value: 1,
      label: "Active",
    },
  ];

  return (
    <div>
      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              {...field}
              className="mt-8 mb-16"
              error={!!errors.status}
              required
              displayEmpty
              helperText={errors?.status?.message}
              id="status"
              variant="outlined"
              fullWidth
            >
              <MenuItem value="" disabled>
                Select Status
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
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.name}
            required
            helperText={errors?.name?.message}
            label="Customer type"
            autoFocus
            id="name"
            variant="outlined"
            fullWidth
          />
        )}
      />
    </div>
  );
}

export default BasicInfoTab;
