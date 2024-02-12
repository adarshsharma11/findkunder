import { motion } from "framer-motion";
import _ from "@lodash";
import TextField from "@mui/material/TextField";
import React from "react";
import Button from "@mui/material/Button";
import { Controller, useFormContext } from "react-hook-form";

function EditProfileTab(props) {
  const methods = useFormContext();
  const { user, handleUpdateProfile } = props;
  const { control, formState, setValue, getValues } = methods;
  const { dirtyFields, isValid, errors } = formState;

  React.useEffect(() => {
    if (user.data.displayName) {
      setValue("name", user.data.displayName);
    }
  }, [user]);

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
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mt-8 mb-16"
                  error={!!errors.name}
                  required
                  helperText={errors?.name?.message}
                  label="Name"
                  autoFocus
                  id="first_name"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
            <Button
              className="whitespace-nowrap mx-4"
              variant="contained"
              color="secondary"
              disabled={_.isEmpty(dirtyFields) || !isValid}
              onClick={() => handleUpdateProfile(getValues())}
            >
              Update
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default EditProfileTab;
