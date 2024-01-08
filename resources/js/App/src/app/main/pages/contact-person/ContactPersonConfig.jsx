import React from "react";
import i18next from "i18next";

import en from "./i18n/en";
import tr from "./i18n/tr";
import ar from "./i18n/ar";

i18next.addResourceBundle("en", "companiesPage", en);
i18next.addResourceBundle("tr", "companiesPage", tr);
i18next.addResourceBundle("ar", "companiesPage", ar);

const ContactPersons = React.lazy(() => import("./ContactPerson"));
const ContactPerson = React.lazy(() =>
  import("./contact-person-details/ContactPerson")
);

const ContactPersonConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "contact-person",
      element: <ContactPersons />,
    },
    {
      path: "contact-person/:productId/*",
      element: <ContactPerson />,
    },
  ],
};

export default ContactPersonConfig;
