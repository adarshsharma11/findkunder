import TextField from "@mui/material/TextField";
import { Controller, useFormContext } from "react-hook-form";
import UpdateProfile from "../../../../../shared-components/welcome-dialog/steps/UpdateProfile";

function BasicInfoTab(props) {
  const { productId } = props;
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
            InputProps={{ readOnly: field.value && productId !== 'new' ? true : false }} 
          />
        )}
      />
    </div>
  );
}

export default BasicInfoTab;
