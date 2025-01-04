import React from "react";
import i18next from "i18next";

import en from "./i18n/en";
import tr from "./i18n/tr";
import ar from "./i18n/ar";

i18next.addResourceBundle("en", "locationsPage", en);
i18next.addResourceBundle("tr", "locationsPage", tr);
i18next.addResourceBundle("ar", "locationsPage", ar);

const Locations = React.lazy(() => import("./Locations"));
const Location = React.lazy(() => import("./location-details/Location"));

const LocationsConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "locations",
      element: <Locations />,
    },
    {
      path: "locations/:productId/:companyId/*",
      element: <Location />,
    },
    {
      path: "locations/:productId/*",
      element: <Location />,
    },
  ],
};

export default LocationsConfig;
