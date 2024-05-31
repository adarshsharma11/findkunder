import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import history from "@history";
import { useState } from "react";
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
import { useCustomersCount } from "../../CustomersCountContext";
import HeroBox from "../../shared-components/HeroBox";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const defaultValues = {
  password: "",
  confirmPassword: "",
};

function ResetPasswordPage() {
  const { customersCount, isLoading: isLoadingCustomersCount } = useCustomersCount();
  const { token } = useParams();
  const dispatch = useDispatch();
  const { control, formState, handleSubmit, reset, getValues } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });
  const [resetSuccess, setResetSuccess] = useState(false);

  const { isValid, dirtyFields, errors } = formState;

  const onSubmit = async () => {
    try {
      const { password } = getValues();
      const response = await AuthService.resetPassword({ token, password });
      if (response.data.status) {
        setResetSuccess(true);
        dispatch(
          showMessage({
            message: response.data.message,
          })
        );
        setTimeout(() => {
          history.push("/login");
        }, 1000);
      } else {
        // If the request fails, show an error message
        setResetSuccess(false);
        dispatch(showMessage({ message: "Error resetting password:" }));
      }
    } catch (error) {
      setResetSuccess(false);
      dispatch(showMessage({ message: "Error resetting password:" }));
      console.error("Error resetting password:", error);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0">
      <Paper className="h-full sm:h-auto md:flex md:justify-end w-full sm:w-auto md:h-full py-32 px-16 sm:p-48 md:p-64 md:pt-96 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none ltr:border-r-1 rtl:border-l-1">
        <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
          <img className="w-48" src="assets/images/logo/logo.svg" alt="logo" />
          <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight">
            Reset Your Password
          </Typography>
          <div className="flex items-baseline mt-2 font-medium">
            <Typography>Fill the form to reset your password</Typography>
          </div>
          {resetSuccess ? (
            <Typography
              className="mt-32 text-md font-medium"
              color="text.secondary"
            >
              <span>Return to</span>
              <Link className="ml-4" to="/sign-in">
                sign in
              </Link>
            </Typography>
          ) : (
            <form
              name="registerForm"
              noValidate
              className="flex flex-col justify-center w-full mt-32"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="New Password"
                    type="password"
                    error={!!errors.password}
                    helperText={errors?.password?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />

              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Confirm Password"
                    type="password"
                    error={!!errors.confirmPassword}
                    helperText={errors?.confirmPassword?.message}
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
                disabled={_.isEmpty(dirtyFields) || !isValid}
                type="submit"
                size="large"
              >
                Reset Password
              </Button>
            </form>
          )}
        </div>
      </Paper>
    <HeroBox count={customersCount} isLoading={isLoadingCustomersCount} />
    </div>
  );
}

export default ResetPasswordPage;
