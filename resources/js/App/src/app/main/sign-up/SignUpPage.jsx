import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { blue } from '@mui/material/colors';
import { Controller, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import _ from "@lodash";
import Paper from "@mui/material/Paper";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from "@mui/material/FormHelperText";
import AuthService from "../../auth/services/AuthService";
import { signUpSchema } from "../../schemas/validationSchemas";
import HeroBox from '../../shared-components/HeroBox';
import { useAuth } from "../../auth/AuthContext";
import { useCustomersCount } from "../../CustomersCountContext";

const defaultValues = {
  email: "",
  password: "",
  passwordConfirm: "",
  acceptTermsConditions: false,
};

function SignUpPage() {
  const { customersCount, isLoading: isLoadingCustomersCount } = useCustomersCount();
  const { control, formState, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(signUpSchema),
  });

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
  
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const { isLoading, setIsLoading } = useAuth();
  const { isValid, dirtyFields, errors, setError } = formState;

  function onSubmit({ password, email }) {
    setIsLoading(true);
    AuthService.createUser({
      password,
      email,
    })
      .then((user) => {
        // No need to do anything, registered user data will be set at app/auth/AuthContext
      })
      .catch((_errors) => {
        _errors.forEach((error) => {
          setError(error.type, {
            type: "manual",
            message: error.message,
          });
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-1 min-w-0">
      <Paper className="h-full sm:h-auto md:flex md:items-center md:justify-end w-full sm:w-auto md:h-full md:w-1/2 py-8 px-16 sm:p-48 md:p-64 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none ltr:border-r-1 rtl:border-l-1">
        <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
          <img className="w-48" src="assets/images/logo/logo.svg" alt="logo" />

          <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight">
            Sign up
          </Typography>
          <div className="flex items-baseline mt-2 font-medium">
            <Typography>Already have an account?</Typography>
            <Link className="ml-4" to="/sign-in">
              Sign in
            </Link>
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

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <FormControl sx={{ width: "100%"}} className="mb-24" variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password<span> *</span></InputLabel>
                <OutlinedInput
                  {...field}
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  error={!!errors.password}
                  required
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword ? "hide the password" : "display the password"
                        }
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
                {errors.password && (
                  <FormHelperText error>{errors.password.message}</FormHelperText>
                )}
              </FormControl>
              )}
            />

            <Controller
              name="passwordConfirm"
              control={control}
              render={({ field }) => (
                <FormControl sx={{ width: "100%"}} className="mb-24" variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password-confirm">Password (Confirm)<span> *</span></InputLabel>
                <OutlinedInput
                  {...field}
                  id="outlined-adornment-password-confirm"
                  type={showConfirmPassword ? "text" : "password"}
                  error={!!errors.passwordConfirm}
                  required
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showConfirmPassword ? "hide the password" : "display the password"
                        }
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password (Confirm)"
                />
                {errors.passwordConfirm && (
                  <FormHelperText error>{errors.passwordConfirm.message}</FormHelperText>
                )}
              </FormControl>
              )}
            />

            <Controller
              name="acceptTermsConditions"
              control={control}
              render={({ field }) => (
                <FormControl
                  className="items-center"
                  error={!!errors.acceptTermsConditions}
                >
                  <FormControlLabel
                    label="I agree to the Terms of Service and Privacy Policy"
                    control={<Checkbox size="small" {...field} />}
                  />
                  <FormHelperText>
                    {errors?.acceptTermsConditions?.message}
                  </FormHelperText>
                </FormControl>
              )}
            />

           <Box sx={{ m: 1, position: 'relative' }}>
           <Button
              variant="contained"
              color="secondary"
              className="w-full mt-24"
              aria-label="Register"
              disabled={_.isEmpty(dirtyFields) || !isValid || isLoading}
              type="submit"
              size="large"
            >
              Create account
            </Button>
            {isLoading && (
              <CircularProgress
                size={24}
                sx={{
                  color: blue[500],
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-12px',
                  marginLeft: '-12px',
                }}
              />
            )}
          </Box>
          </form>
        </div>
      </Paper>
     <HeroBox count={customersCount} isLoading={isLoadingCustomersCount}/>
    </div>
  );
}

export default SignUpPage;
