import React from "react";
import i18next from "i18next";

import en from "./i18n/en";
import tr from "./i18n/tr";
import ar from "./i18n/ar";

i18next.addResourceBundle("en", "contactPerson", en);
i18next.addResourceBundle("tr", "contactPerson", tr);
i18next.addResourceBundle("ar", "contactPerson", ar);

const Customers = React.lazy(() => import("./Customers"));
const CustomerDetails = React.lazy(() => import("./customer-details/Customer"));

const CustomersConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "customers",
      element: <Customers />,
    },
    {
      path: "customers/:productId/*",
      element: <CustomerDetails />,
    },
  ],
};

export default CustomersConfig;
