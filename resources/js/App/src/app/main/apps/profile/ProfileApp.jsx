import FusePageSimple from "@fuse/core/FusePageSimple";
import { styled } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useState } from "react";
import Box from "@mui/material/Box";
import AboutTab from "./tabs/AboutTab";
import EditProfileTab from "./tabs/EditProfileTab";
import UpdatePasswordTab from "./tabs/UpdatePasswordTab";
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
import DeleteAccountTab from "./tabs/DeleteAccountTab";

const Root = styled(FusePageSimple)(({ theme }) => ({
  "& .FusePageSimple-header": {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: theme.palette.divider,
  },
}));

function ProfileApp() {
  const [selectedTab, setSelectedTab] = useState(0);
  const user = useSelector(selectUser);
  const isAdmin = user?.role === "admin";
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

  function handleTabChange(event, value) {
    setSelectedTab(value);
  }

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
              displayName: userInfo.name,
              photoURL: "assets/images/avatars/brian-hughes.jpg",
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
      header={
        <div className="flex flex-col shadow">
          <div className="flex flex-col flex-0 lg:flex-row items-center max-w-5xl w-full mx-auto px-32 lg:h-72">
            <div className="flex flex-1 justify-end my-16 lg:my-0">
              <Tabs
                value={selectedTab}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="inherit"
                variant="scrollable"
                scrollButtons={false}
                className="-mx-4 min-h-40"
                classes={{
                  indicator: "flex justify-center bg-transparent w-full h-full",
                }}
                TabIndicatorProps={{
                  children: (
                    <Box
                      sx={{ bgcolor: "text.disabled" }}
                      className="w-full h-full rounded-full opacity-20"
                    />
                  ),
                }}
              >
                <Tab
                  className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12 "
                  disableRipple
                  label="About"
                />
                <Tab
                  className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12 "
                  disableRipple
                  label="Edit Profile"
                />
                <Tab
                  className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12 "
                  disableRipple
                  label="Update Password"
                />
                {!isAdmin && (
                  <Tab
                    className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12 "
                    disableRipple
                    label="Delete Account"
                  />
                )}
              </Tabs>
            </div>
          </div>
        </div>
      }
      content={
        <div className="flex flex-auto justify-center w-full max-w-5xl mx-auto p-24 sm:p-32">
          {selectedTab === 0 && <AboutTab user={user} />}
          {selectedTab === 1 && (
            <FormProvider {...methods}>
              <EditProfileTab
                user={user}
                handleUpdateProfile={handleUpdateProfile}
              />
            </FormProvider>
          )}
          {selectedTab === 2 && (
            <FormProvider {...securityMethods}>
              <UpdatePasswordTab handleUpdateProfile={handleUpdateProfile} />
            </FormProvider>
          )}
          {selectedTab === 3 && (
            <DeleteAccountTab handleDeleteProfile={handleDeleteProfile} />
          )}
        </div>
      }
      scroll={isMobile ? "normal" : "page"}
    />
  );
}

export default ProfileApp;
