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
              id="company_id"
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
        name="notes"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            id="notes"
            multiline
            rows={4}
            error={!!errors.notes}
            helperText={errors?.notes?.message}
            label="Notes"
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
