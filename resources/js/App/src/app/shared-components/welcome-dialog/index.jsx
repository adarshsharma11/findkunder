import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { LoadingButton } from "@mui/lab";
import { FormProvider, useForm } from "react-hook-form";
import { updateUserData } from "app/store/userSlice";
import { showMessage } from "app/store/fuse/messageSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import AuthService from "../../auth/services/AuthService";

import CompleteProfile from "./steps/CompleteProfile";
import UpdateProfile from "./steps/UpdateProfile";
import { updateAccountProfileSchema } from "../../schemas/validationSchemas";

function ProfileCreationDialog(props) {
  const { handleClose, open, user, openFromClick } = props;
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(openFromClick ? 1 :0);
  const [loading, setLoading] = useState(false);


  const methods = useForm({
      mode: "onChange",
      defaultValues: {},
      resolver: yupResolver(updateAccountProfileSchema),
  });
  
  const { watch, handleSubmit, setValue } = methods;
  const form = watch();

  useEffect(() => {
    if (user?.data?.email) {
      setValue("email", user.data.email);
    }
  }, [user, setValue]);

  const steps = [
    {
      title: "Update Your Profile",
      content: <FormProvider {...methods}><UpdateProfile /> </FormProvider>,
      isForm: true,
    },
    {
      title: "Create Your Free Profile",
      content: <CompleteProfile />,
      isForm: false,
    },
  ];

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      // Handle form submission for intermediate steps
      if (steps[currentStep].isForm) {
        handleSubmit(async (values) => {
          setLoading(true);
          const isSuccess = await handleUpdateProfile(values);
          setLoading(false);
          if (isSuccess) {
            setCurrentStep((prev) => prev + 1);
          }
        })();
      } else {
        setCurrentStep((prev) => prev + 1);
      }
    } else {
      // Logic for the last step (Finish)
      handleClose();
      dispatch(
        showMessage({
          message: "Profile creation completed successfully!",
          variant: "success",
        })
      );
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleUpdateProfile = async (values) => {
    try {
      const is_profile_completed = 1;
      const response = await AuthService.updateUserData(values, is_profile_completed);
      const result = response?.data;

      if (!result.status && result.errors) {
        dispatch(showMessage({ message: result.errors }));
        return false;
      }

      const userInfo = result?.user;
      if (userInfo) {
        const newUser = {
          uuid: userInfo.id,
          from: "custom-db",
          role: response.data.role,
          data: {
            email: userInfo.email,
            totalCompanies: userInfo.companies_count,
            totalProfiles: userInfo.customers_count,
            totalContactPersons: userInfo.contact_person_count,
            company: userInfo.company,
            is_profile_completed: userInfo.is_profile_completed,
            cvr: userInfo.cvr,
            settings: {},
            shortcuts: [],
          },
        };
        dispatch(updateUserData(newUser));
        dispatch(showMessage({ message: "Profile updated successfully!", variant: 'success'}));
        return true;
      }
    } catch (error) {
      dispatch(showMessage({ message: "Failed to update profile.", variant: "error" }));
      return false;
    }
  };


  return (
    <Dialog
      open={open}
      fullWidth
      onClose={(event, reason) => {
        if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
          handleClose();
        }
      }}
      aria-labelledby="profile-creation-dialog-title"
    >
      <DialogTitle id="profile-creation-dialog-title">
        {steps[currentStep].title}
      </DialogTitle>
      <DialogContent>{steps[currentStep].content}</DialogContent>
      <DialogActions>
        <LoadingButton
          color="secondary"
          variant="contained"
          onClick={handleNext}
          disabled={loading}
          loading={loading}
        >
          {currentStep < steps.length - 1 ? "Next" : "Finish"} 
          </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default ProfileCreationDialog;
