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
    id: "admin",
    title: "Admin",
    type: "group",
    auth: authRoles.admin,
    icon: "heroicons-outline:check-circle",
    children: [
      {
        id: "apps.accounts",
        title: "Accounts",
        type: "item",
        icon: "heroicons-outline:user-group",
        url: "/accounts",
      },
      {
        id: "apps.customerTypes",
        title: "Customer Types",
        type: "item",
        icon: "heroicons-outline:check-circle",
        url: "/customer-types",
      },
      {
        id: "apps.customerLocations",
        title: "Customer Locations",
        type: "item",
        icon: "material-solid:add_location_alt",
        url: "/customer-locations",
      },
      {
        id: "apps.skills",
        title: "Skills",
        type: "item",
        icon: "heroicons-outline:academic-cap",
        url: "/skills",
      },
    ],
  },
  {
    id: "apps.contact",
    title: "Profile",
    type: "group",
    icon: "heroicons-outline:home",
    children: [
      {
        id: "apps.profiles",
        title: "Profiles",
        type: "item",
        icon: "search",
        url: "/profiles",
      },
      {
        id: "apps.companies",
        title: "Companies",
        type: "item",
        icon: "material-outline:account_balance",
        url: "/companies",
      },
      {
        id: "apps.locations",
        title: "Locations",
        type: "item",
        icon: "heroicons-outline:location-marker",
        url: "/locations",
      },
      {
        id: "apps.persons",
        title: "Contacts",
        type: "item",
        icon: "heroicons-outline:user-circle",
        url: "/contact-person",
      },
    ],
  },
  {
    id: "apps.findkunder",
    title: "Marketing",
    type: "group",
    icon: "heroicons-outline:home",
    children: [
      {
        id: "apps.leads",
        title: "Leads",
        type: "item",
        icon: "material-twotone:manage_search",
        url: "/leads",
      },
    ],
  },
];

export default navigationConfig;
