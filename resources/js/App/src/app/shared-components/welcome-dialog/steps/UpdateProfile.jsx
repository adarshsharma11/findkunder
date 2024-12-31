import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from '@mui/material/FormHelperText';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import { Controller, useFormContext } from "react-hook-form";

function UpdateProfile(props) {
  const { isAdmin, product, isAddProfile, locations } = props;
  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;
  const roleOptions = [
    {
      value: "admin",
      label: "Admin",
    },
    {
      value: "user",
      label: "Account owner",
    },
  ];

  return (
    <div className="mt-8">
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
            InputProps={{
                readOnly: true,
            }}
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
      
       
    </div>
  );
}

export default UpdateProfile;
