import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { Controller, useFormContext } from "react-hook-form";

function BasicInfoTab(props) {
  const methods = useFormContext();
  const { companies, contacts } = props;
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
        name="person_id"
        control={control}
        render={({ field }) => (
          <>
            <InputLabel id="demo-simple-select-label">
              Select Contact
            </InputLabel>
            <Select
              {...field}
              className="mt-8 mb-16"
              error={!!errors.person_id}
              required
              helperText={errors?.person_id?.message}
              id="person_id"
              variant="outlined"
              fullWidth
            >
              {contacts &&
                contacts?.map((contact) => (
                  <MenuItem key={contact.id} value={contact.id}>
                    {contact.first_name}
                  </MenuItem>
                ))}
              <MenuItem value="" disabled>
                Select Contact
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
        name="region"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            id="region"
            error={!!errors.region}
            helperText={errors?.region?.message}
            label="Region"
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
        name="postal_code"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            id="postal_code"
            error={!!errors.postal_code}
            helperText={errors?.postal_code?.message}
            label="Postal Code"
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
