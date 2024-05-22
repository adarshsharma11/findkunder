import React from 'react';
import TextField from '@mui/material/TextField';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { Controller, useFormContext } from 'react-hook-form';

function CompanyInfo(props) {
  const { locations, customerTypes } = props;
  const { control, formState } = useFormContext();
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
        name="cvr_number"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            id="cvrNumber"
            error={!!errors.cvr_number}
            helperText={errors?.cvr_number?.message}
            label="CVR Number"
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
            error={!!errors.street}
            helperText={errors?.street?.message}
            label="Street"
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
            error={!!errors.city}
            helperText={errors?.city?.message}
            label="City"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="location_id"
        control={control}
        render={({ field }) => (
          <>
            <InputLabel id="demo-simple-select-label">Your Location</InputLabel>
            <Select
              {...field}
              className="mt-8 mb-16"
              error={!!errors.location_id}
              required
              displayEmpty
              helperText={errors?.location_id?.message}
              id="title"
              variant="outlined"
              fullWidth
            >
              <MenuItem value="" disabled>
                Select Location
              </MenuItem>
              {locations &&
                locations?.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
            </Select>
          </>
        )}
      />
       <Controller
        name="customer_type_id"
        control={control}
        render={({ field }) => (
          <>
            <InputLabel id="demo-simple-select-label">Who are you</InputLabel>
            <Select
              {...field}
              className="mt-8 mb-16"
              error={!!errors.customer_type_id}
              required
              displayEmpty
              helperText={errors?.customer_type_id?.message}
              id="title"
              variant="outlined"
              fullWidth
            >
              <MenuItem value="" disabled>
                Select Customer Type
              </MenuItem>
              {customerTypes &&
                customerTypes?.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
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
            id="city"
            error={!!errors.website}
            helperText={errors?.website?.message}
            label="Website"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="companyDescription"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            id="city"
            error={!!errors.city}
            helperText={errors?.city?.message}
            label="Tell us a bit about your company"
            variant="outlined"
            fullWidth
          />
        )}
      />
    </div>
  );
}

export default CompanyInfo;
