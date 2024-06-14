import FusePageSimple from "@fuse/core/FusePageSimple";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import AboutTab from "./tabs/AboutTab";
import useThemeMediaQuery from "../../../../@fuse/hooks/useThemeMediaQuery";
import { useForm, FormProvider } from "react-hook-form";
import {
  updateProfileSchema,
  updateProfilePasswordSchema,
} from "../../../schemas/validationSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, updateUserData } from "app/store/userSlice";
import AuthService from "../../../auth/services/AuthService";
import { showMessage } from "app/store/fuse/messageSlice";
import authRoles from "../../../auth/authRoles";

const Root = styled(FusePageSimple)(({ theme }) => ({
  "& .FusePageSimple-header": {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: theme.palette.divider,
  },
}));

function ProfileApp() {
  const user = useSelector(selectUser);
  const isAdmin = user?.role === authRoles.admin[0];
  const dispatch = useDispatch();
  const methods = useForm({
    mode: "onChange",
    defaultValues: {},
    resolver: yupResolver(updateProfileSchema),
  });
  const securityMethods = useForm({
    mode: "onChange",
    defaultValues: {},
    resolver: yupResolver(updateProfilePasswordSchema),
  });
  const { reset, watch, control, onChange, formState, setValue } = methods;
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const handleUpdateProfile = (values) => {
    AuthService.updateUserData(values)
      .then((response) => {
        const result = response?.data;
        const errorMessage = result?.errors;
        if (!result.status && errorMessage) {
          dispatch(showMessage({ message: errorMessage }));
          return;
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
              settings: {},
              shortcuts: [],
            },
          };
          dispatch(updateUserData(newUser));
          dispatch(showMessage({ message: "Profile updated successfully!" }));
        }
      })
      .catch((error) => {
        const errorMessage = "Failed to update profile.";
        dispatch(showMessage({ message: errorMessage, variant: "error" }));
      });
  };

  const handleDeleteProfile = () => {
    AuthService.deleteProfile()
      .then((response) => {
        const result = response?.data;
        const errorMessage = result?.errors;
        if (!result.status && errorMessage) {
          dispatch(showMessage({ message: errorMessage }));
          return;
        }
        dispatch(showMessage({ message: "Profile deleted successfully!" }));
        AuthService.logout();
      })
      .catch((error) => {
        const errorMessage = "Failed to delete profile.";
        dispatch(showMessage({ message: errorMessage, variant: "error" }));
      });
  };

  return (
    <Root
      content={
        <div className="flex flex-auto justify-center w-full max-w-5xl mx-auto p-24 sm:p-32">
        <FormProvider {...securityMethods}> <AboutTab user={user} isAdmin={isAdmin} handleDeleteProfile={handleDeleteProfile} handleUpdateProfile={handleUpdateProfile} /> </FormProvider>
        </div>
      }
      scroll={isMobile ? "normal" : "page"}
    />
  );
}

export default ProfileApp;
