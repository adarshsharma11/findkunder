import React from 'react';
import TextField from "@mui/material/TextField";
import { Controller, useFormContext } from "react-hook-form";


const AccountStep = () => {
  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;
  return (
    <>
        <Controller
        name="accountEmail"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.accountEmail}
            required
            helperText={errors?.accountEmail?.message}
            label="Email"
            autoFocus
            id="accountEmail"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
      name="passowrd"
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          className="mt-8 mb-16"
          error={!!errors.password}
          required
          helperText={errors?.password?.message}
          label="Password"
          autoFocus
          id="password"
          variant="outlined"
          fullWidth
        />
      )}
    />
</>
  );
};

export default AccountStep;