import FusePageSimple from "@fuse/core/FusePageSimple";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { motion } from "framer-motion";
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
import { selectUser } from "app/store/userSlice";
import AuthService from "../../../auth/services/AuthService";
import { showMessage } from "app/store/fuse/messageSlice";

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
        dispatch(showMessage({ message: "Profile updated successfully!" }));
      })
      .catch((error) => {
        const errorMessage = "Failed to update profile.";
        dispatch(showMessage({ message: errorMessage, variant: "error" }));
      });
  };

  return (
    <Root
      header={
        <div className="flex flex-col shadow">
          <img
            className="h-160 lg:h-320 object-cover w-full"
            src="assets/images/pages/profile/cover.jpg"
            alt="Profile Cover"
          />

          <div className="flex flex-col flex-0 lg:flex-row items-center max-w-5xl w-full mx-auto px-32 lg:h-72">
            <div className="-mt-96 lg:-mt-88 rounded-full">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, transition: { delay: 0.1 } }}
              >
                <Avatar
                  sx={{ borderColor: "background.paper" }}
                  className="w-128 h-128 border-4"
                  src="assets/images/avatars/male-04.jpg"
                  alt="User avatar"
                />
              </motion.div>
            </div>

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
        </div>
      }
      scroll={isMobile ? "normal" : "page"}
    />
  );
}

export default ProfileApp;
