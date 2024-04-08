import React from "react";
import i18next from "i18next";
import authRoles from "../../../auth/authRoles";

import en from "./i18n/en";
import tr from "./i18n/tr";
import ar from "./i18n/ar";

i18next.addResourceBundle("en", "contactPerson", en);
i18next.addResourceBundle("tr", "contactPerson", tr);
i18next.addResourceBundle("ar", "contactPerson", ar);

const CustomerLocations = React.lazy(() => import("./CustomerLocations"));
const CustomerLocation = React.lazy(() =>
  import("./customer-location-details/CustomerLocation")
);

const CustomerLocationConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: "customer-locations",
      element: <CustomerLocations />,
    },
    {
      path: "customer-locations/:productId/*",
      element: <CustomerLocation />,
    },
  ],
};

export default CustomerLocationConfig;
