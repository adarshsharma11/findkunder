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
        name="companyName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.companyName}
            helperText={errors?.companyName?.message}
            label="Company Name"
            autoFocus
            id="companyName"
            variant="outlined"
            fullWidth
          />
        )}
      />

      <Controller
        name="cvrNumber"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            id="cvrNumber"
            error={!!errors.cvrNumber}
            helperText={errors?.cvrNumber?.message}
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
        name="postalCode"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            id="postalCode"
            error={!!errors.postalCode}
            helperText={errors?.postalCode?.message}
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
        name="location"
        control={control}
        render={({ field }) => (
          <>
            <InputLabel id="demo-simple-select-label">Your Location</InputLabel>
            <Select
              {...field}
              className="mt-8 mb-16"
              error={!!errors.location}
              required
              displayEmpty
              helperText={errors?.location?.message}
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
        name="customerType"
        control={control}
        render={({ field }) => (
          <>
            <InputLabel id="demo-simple-select-label">Who are you</InputLabel>
            <Select
              {...field}
              className="mt-8 mb-16"
              error={!!errors.customerType}
              required
              displayEmpty
              helperText={errors?.customerType?.message}
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
