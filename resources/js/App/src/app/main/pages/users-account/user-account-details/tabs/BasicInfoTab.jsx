import TextField from "@mui/material/TextField";
import { Controller, useFormContext } from "react-hook-form";

function BasicInfoTab(props) {
  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;

  return (
    <div>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.email}
            required
            helperText={errors?.email?.message}
            label="User Account"
            autoFocus
            id="name"
            variant="outlined"
            fullWidth
            InputProps={{ readOnly: field.value ? true : false }} 
          />
        )}
      />
    </div>
  );
}

export default BasicInfoTab;
