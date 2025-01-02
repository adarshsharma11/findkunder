import { motion } from "framer-motion";
import _ from "@lodash";
import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import DialogActions from "@mui/material/DialogActions";
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormHelperText from '@mui/material/FormHelperText';
import LoadingButton from "@mui/lab/LoadingButton";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import { Controller, useFormContext } from "react-hook-form";

function UpdatePasswordTab(props) {
  const { handleUpdateProfile, loading } = props;
  const methods = useFormContext();
  const { control, formState, getValues } = methods;
  const { dirtyFields, isValid, errors } = formState;

  const [isUpdateModalOpen, setUpdateModalOpen] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const container = {
    show: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const handleUpdateConfirmation = async () => {
    // Trigger profile update
    await handleUpdateProfile(getValues());
    // Close the modal
    setUpdateModalOpen(false);
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
          <div className="w-3/4">
            <Button
              className="whitespace-nowrap mx-4"
              variant="contained"
              color="secondary"
              startIcon={<FuseSvgIcon size={20}>heroicons-solid:pencil</FuseSvgIcon>}
              onClick={() => setUpdateModalOpen(true)}
            >
              Update Password
            </Button>
          </div>
        </div>
      </div>

      <Dialog
        open={isUpdateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
      >
        <DialogTitle>Update Password</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Please confirm your password update by filling in the fields below.
          </DialogContentText>
          <div className="mt-4">
          <Controller
              name="oldPassword"
              control={control}
              render={({ field }) => (
          <FormControl sx={{ width: '100%', mb: 2 }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-old-password">Old Password<span> *</span></InputLabel>
          <OutlinedInput
            {...field}
            id="outlined-adornment-old-password"
            type={showPassword ? 'text' : 'password'}
            error={!!errors.passwordConfirm}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
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
            label="Old Password"
          />
           {errors.oldPassword && (
            <FormHelperText error>{errors.oldPassword.message}</FormHelperText>
           )}
        </FormControl>
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <FormControl sx={{ width: "100%", mb: 3 }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-new-password">New Password<span> *</span></InputLabel>
                  <OutlinedInput
                    {...field}
                    id="outlined-adornment-new-password"
                    type={showNewPassword ? "text" : "password"}
                    error={!!errors.password}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            showNewPassword ? "hide the password" : "display the password"
                          }
                          onClick={handleClickShowNewPassword}
                          onMouseDown={handleMouseDownPassword}
                          onMouseUp={handleMouseUpPassword}
                          edge="end"
                        >
                          {showNewPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Old Password"
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
                <FormControl sx={{ width: "100%", mb: 3 }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password-confirm">Confirm Password<span> *</span></InputLabel>
                  <OutlinedInput
                    {...field}
                    id="outlined-adornment-password-confirm"
                    type={showConfirmPassword ? "text" : "password"}
                    error={!!errors.passwordConfirm}
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
                    label="Confirm Password"
                  />
                  {errors.passwordConfirm && (
                    <FormHelperText error>{errors.passwordConfirm.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUpdateModalOpen(false)} color="primary">
            Cancel
          </Button>
          <LoadingButton
            onClick={handleUpdateConfirmation}
            color="primary"
            loading={loading}
            disabled={_.isEmpty(dirtyFields) || !isValid}
          >
            Confirm Update
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </motion.div>
  );
}

export default UpdatePasswordTab;
