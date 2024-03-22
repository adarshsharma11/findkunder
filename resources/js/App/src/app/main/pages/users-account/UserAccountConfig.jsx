import React from "react";
import i18next from "i18next";
import authRoles from "../../../auth/authRoles";

import en from "./i18n/en";
import tr from "./i18n/tr";
import ar from "./i18n/ar";

i18next.addResourceBundle("en", "contactPerson", en);
i18next.addResourceBundle("tr", "contactPerson", tr);
i18next.addResourceBundle("ar", "contactPerson", ar);

const UserAccounts = React.lazy(() => import("./UserAccounts"));
const UserAccount = React.lazy(() =>
  import("./user-account-details/UserAccount")
);

const UserAccountConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: "accounts",
      element: <UserAccounts />,
    },
    {
      path: "accounts/:productId/*",
      element: <UserAccount />,
    },
  ],
};

export default UserAccountConfig;
