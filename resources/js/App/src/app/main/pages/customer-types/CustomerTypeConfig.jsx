import React from "react";
import i18next from "i18next";
import authRoles from "../../../auth/authRoles";

import en from "./i18n/en";
import tr from "./i18n/tr";
import ar from "./i18n/ar";

i18next.addResourceBundle("en", "contactPerson", en);
i18next.addResourceBundle("tr", "contactPerson", tr);
i18next.addResourceBundle("ar", "contactPerson", ar);

const CustomerTypes = React.lazy(() => import("./CustomerType"));
const CustomerType = React.lazy(() =>
  import("./customer-type-details/CustomeType")
);

const CustomerTypeConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: "customer-types",
      element: <CustomerTypes />,
    },
    {
      path: "customer-types/:productId/*",
      element: <CustomerType />,
    },
  ],
};

export default CustomerTypeConfig;
