import React from "react";
import i18next from "i18next";

import en from "./i18n/en";
import tr from "./i18n/tr";
import ar from "./i18n/ar";

i18next.addResourceBundle("en", "companiesPage", en);
i18next.addResourceBundle("tr", "companiesPage", tr);
i18next.addResourceBundle("ar", "companiesPage", ar);

const Companies = React.lazy(() => import("./Companies"));
const Company = React.lazy(() => import("./company-details/Company"));

const CompaniesConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "locations",
      element: <Companies />,
    },
    {
      path: "locations/:productId/*",
      element: <Company />,
    },
  ],
};

export default CompaniesConfig;
