import i18next from "i18next";

import ar from "./navigation-i18n/ar";
import en from "./navigation-i18n/en";
import tr from "./navigation-i18n/tr";
import authRoles from "../auth/authRoles";

i18next.addResourceBundle("en", "navigation", en);
i18next.addResourceBundle("tr", "navigation", tr);
i18next.addResourceBundle("ar", "navigation", ar);

const navigationConfig = [
  {
    id: "apps",
    title: "Contacts",
    type: "group",
    icon: "heroicons-outline:home",
    children: [
      {
        id: "apps.companies",
        title: "Companies",
        type: "item",
        icon: "heroicons-outline:collection",
        url: "/companies",
      },
      {
        id: "apps.person",
        title: "Persons",
        type: "item",
        icon: "heroicons-outline:user-circle",
        url: "/contact-person",
      },
    ],
  },
  {
    id: "apps.findkunder",
    title: "Findkunder",
    type: "group",
    icon: "heroicons-outline:home",
    children: [
      {
        id: "apps.profiles",
        title: "Profiles",
        type: "item",
        icon: "search",
        url: "/customers",
      },
    ],
  },
];

export default navigationConfig;
