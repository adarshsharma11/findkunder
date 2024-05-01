import React from 'react';
import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';

function CompanyInfo() {
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
            required
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
            required
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
            required
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
            required
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
            required
            variant="outlined"
            fullWidth
          />
        )}
      />
    </div>
  );
}

export default CompanyInfo;
