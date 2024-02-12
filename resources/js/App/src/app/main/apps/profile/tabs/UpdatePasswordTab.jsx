import { motion } from "framer-motion";
import _ from "@lodash";
import TextField from "@mui/material/TextField";
import React from "react";
import Button from "@mui/material/Button";
import { Controller, useFormContext } from "react-hook-form";

function UpdatePasswordTab(props) {
  const { handleUpdateProfile } = props;
  const methods = useFormContext();
  const { control, formState, setValue, getValues } = methods;
  const { dirtyFields, isValid, errors } = formState;

  const container = {
    show: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full"
    >
      <div className="md:flex">
        <div className="flex flex-col flex-1 md:ltr:pr-32 md:rtl:pl-32">
          <div className="w-1/2">
            <Controller
              name="oldPassword"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mt-8 mb-16"
                  id="oldPassword"
                  label="Old Password"
                  error={!!errors.oldPassword}
                  helperText={errors?.oldPassword?.message}
                  type="password"
                  variant="outlined"
                  fullWidth
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mt-8 mb-16"
                  id="password"
                  label="Password"
                  error={!!errors.password}
                  helperText={errors?.password?.message}
                  type="password"
                  variant="outlined"
                  fullWidth
                />
              )}
            />

            {/* Password confirmation field */}
            <Controller
              name="passwordConfirm"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mt-8 mb-16"
                  id="passwordConfirm"
                  error={!!errors.passwordConfirm}
                  helperText={errors?.passwordConfirm?.message}
                  label="Confirm Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                />
              )}
            />

            <Button
              className="whitespace-nowrap mx-4"
              variant="contained"
              color="secondary"
              onClick={() => handleUpdateProfile(getValues())}
              disabled={_.isEmpty(dirtyFields) || !isValid}
            >
              Update
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default UpdatePasswordTab;
