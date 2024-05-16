import React from "react";
import i18next from "i18next";

import en from "./i18n/en";
import tr from "./i18n/tr";
import ar from "./i18n/ar";

i18next.addResourceBundle("en", "contactPerson", en);
i18next.addResourceBundle("tr", "contactPerson", tr);
i18next.addResourceBundle("ar", "contactPerson", ar);

const Leads = React.lazy(() => import("./Leads"));
const Lead = React.lazy(() =>
  import("./lead-details/Lead")
);

const LeadsConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "leads",
      element: <Leads />,
    },
    {
      path: "leads/:productId/*",
      element: <Lead />,
    },
  ],
};

export default LeadsConfig;
