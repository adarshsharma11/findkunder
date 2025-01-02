import { lazy } from "react";

const ProfileApp = lazy(() => import("./ProfileApp"));
const ProfileAppDetails = lazy(() => import("./profile-details/ProfileDetails"));

const profileAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "profile",
      element: <ProfileApp />,
    },
    {
      path: "profile/:profileId/*",
      element: <ProfileAppDetails />,
    },
  ],
};

export default profileAppConfig;
