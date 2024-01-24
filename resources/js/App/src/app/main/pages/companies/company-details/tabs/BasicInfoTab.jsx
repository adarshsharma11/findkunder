import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { Controller, useFormContext } from "react-hook-form";
import { regions } from "../../../../../store/constants";

function BasicInfoTab(props) {
  const methods = useFormContext();
  const { control, formState, setValue } = methods;
  const { errors } = formState;

  return (
    <div>
      <Controller
        name="company_name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.company_name}
            required
            helperText={errors?.company_name?.message}
            label="Company Name"
            autoFocus
            id="company_name"
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
            required
            error={!!errors.cvr}
            helperText={errors?.cvr?.message}
            label="CVR"
            type="number"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="street"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            id="street"
            required
            error={!!errors.street}
            helperText={errors?.street?.message}
            label="Street"
            type="text"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="postal_code"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            id="postal_code"
            required
            error={!!errors.postal_code}
            helperText={errors?.postal_code?.message}
            label="Postal Code"
            type="number"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="city"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            id="city"
            required
            error={!!errors.city}
            helperText={errors?.city?.message}
            label="City"
            type="text"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="location"
        control={control}
        render={({ field }) => (
          <>
            <InputLabel id="demo-simple-select-label">
              Select Location
            </InputLabel>
            <Select
              {...field}
              className="mt-8 mb-16"
              error={!!errors.location}
              required
              displayEmpty
              helperText={errors?.location?.message}
              id="location"
              variant="outlined"
              fullWidth
            >
              <MenuItem value="" disabled>
                Select Location
              </MenuItem>
              {regions &&
                regions.map((region) => (
                  <MenuItem key={region} value={region}>
                    {region}
                  </MenuItem>
                ))}
            </Select>
          </>
        )}
      />

      <Controller
        name="website"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            id="website"
            error={!!errors.website}
            helperText={errors?.website?.message}
            label="Website"
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
            label="Linkedin"
            error={!!errors.linkedin}
            helperText={errors?.linkedin?.message}
            type="text"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="facebook"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            id="facebook"
            label="Facebook"
            error={!!errors.facebook}
            helperText={errors?.facebook?.message}
            type="text"
            variant="outlined"
            fullWidth
          />
        )}
      />
    </div>
  );
}

export default BasicInfoTab;
