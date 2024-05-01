import React from 'react';
import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';

function AdditionalInfo() {
  const { control, formState } = useFormContext();
  const { errors } = formState;

  return (
    <div>
      {/* Example: */}
      <Controller
        name="specificPreferences"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            id="specificPreferences"
            error={!!errors.specificPreferences}
            helperText={errors?.specificPreferences?.message}
            label="Specific Preferences"
            variant="outlined"
            fullWidth
          />
        )}
      />
    </div>
  );
}

export default AdditionalInfo;
