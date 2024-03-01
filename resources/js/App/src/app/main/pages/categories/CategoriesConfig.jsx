import React from "react";
import i18next from "i18next";
import authRoles from "../../../auth/authRoles";

import en from "./i18n/en";
import tr from "./i18n/tr";
import ar from "./i18n/ar";

i18next.addResourceBundle("en", "contactPerson", en);
i18next.addResourceBundle("tr", "contactPerson", tr);
i18next.addResourceBundle("ar", "contactPerson", ar);

const Categories = React.lazy(() => import("./Categories"));
const Category = React.lazy(() => import("./category-details/Category"));

const CategoriesConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: "categories",
      element: <Categories />,
    },
    {
      path: "categories/:productId/*",
      element: <Category />,
    },
  ],
};

export default CategoriesConfig;
