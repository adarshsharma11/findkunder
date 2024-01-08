import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { Controller, useFormContext } from "react-hook-form";

function BasicInfoTab(props) {
  const methods = useFormContext();
  const { companies } = props;
  const { control, formState } = methods;
  const { errors } = formState;

  return (
    <div>
      <Controller
        name="company_id"
        control={control}
        render={({ field }) => (
          <>
            <InputLabel id="demo-simple-select-label">
              Select Company
            </InputLabel>
            <Select
              {...field}
              className="mt-8 mb-16"
              error={!!errors.company_name}
              required
              helperText={errors?.company_name?.message}
              id="first_name"
              variant="outlined"
              fullWidth
            >
              {companies &&
                companies?.map((company) => (
                  <MenuItem key={company.id} value={company.id}>
                    {company.company_name}
                  </MenuItem>
                ))}
              <MenuItem value="" disabled>
                Select Company
              </MenuItem>
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
            type="text"
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
  );
}

export default BasicInfoTab;
