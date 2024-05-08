import TextField from "@mui/material/TextField";
import { Controller, useFormContext } from "react-hook-form";

function ContactInfo(props) {
  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;
  
  return (
    <div>
      <Controller
        name="contact_name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.contact_name}
            required
            helperText={errors?.contact_name?.message}
            label="Contact Name"
            autoFocus
            id="contact_name"
            variant="outlined"
            fullWidth
          />
        )}
      />

      <Controller
        name="contact_email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            id="contact_email"
            error={!!errors.contact_email}
            helperText={errors?.contact_email?.message}
            label="Contact Email"
            type="email"
            required
            variant="outlined"
            fullWidth
          />
        )}
      />

      <Controller
        name="contact_phone"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            id="contact_phone"
            error={!!errors.contact_phone}
            helperText={errors?.contact_phone?.message}
            label="Contact Phone"
            required
            type="number"
            variant="outlined"
            fullWidth
          />
        )}
      />
    </div>
  );
}

export default ContactInfo;
