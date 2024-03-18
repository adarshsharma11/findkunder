import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import * as yup from "yup";
import _ from "@lodash";
import Paper from "@mui/material/Paper";
import AuthService from "../../auth/services/AuthService";
import { useDispatch } from "react-redux";
import { showMessage } from "app/store/fuse/messageSlice";
import HeroBox from "../../shared-components/HeroBox";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  email: yup
    .string()
    .email("You must enter a valid email")
    .required("You must enter a email"),
});

const defaultValues = {
  email: "",
};

function ForgotPasswordPage() {
  const { control, formState, handleSubmit, reset, getValues } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { isValid, dirtyFields, errors } = formState;

  const onSubmit = async () => {
    try {
      setLoading(true);
      const response = await AuthService.forgotPassword(getValues());
      if (response.data.status) {
        dispatch(
          showMessage({
            message: response.data.message,
          })
        );
        reset(defaultValues);
      } else {
        // If the request fails, show an error message
        dispatch(showMessage({ message: "Error resetting password:" }));
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error resetting password:", error);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0">
      <Paper className="h-full sm:h-auto md:flex md:justify-end w-full sm:w-auto md:h-full py-32 px-16 sm:p-48 md:p-64 md:pt-96 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none ltr:border-r-1 rtl:border-l-1">
        <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
          <img className="w-48" src="assets/images/logo/logo.svg" alt="logo" />
          <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight">
            Forgot password?
          </Typography>
          <div className="flex items-baseline mt-2 font-medium">
            <Typography>Fill the form to reset your password</Typography>
          </div>
          <form
            name="registerForm"
            noValidate
            className="flex flex-col justify-center w-full mt-32"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Email"
                  type="email"
                  error={!!errors.email}
                  helperText={errors?.email?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

            <Button
              variant="contained"
              color="secondary"
              className=" w-full mt-4"
              aria-label="Register"
              disabled={_.isEmpty(dirtyFields) || !isValid || loading}
              type="submit"
              size="large"
            >
              {loading ? "Sending..." : "Send reset link"}
            </Button>

            <Typography
              className="mt-32 text-md font-medium"
              color="text.secondary"
            >
              <span>Return to</span>
              <Link className="ml-4" to="/sign-in">
                sign in
              </Link>
            </Typography>
          </form>
        </div>
      </Paper>
    <HeroBox />
    </div>
  );
}

export default ForgotPasswordPage;
