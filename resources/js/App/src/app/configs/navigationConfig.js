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
    title: "Admin",
    type: "group",
    icon: "heroicons-outline:home",
    children: [
      {
        id: "apps.virksomhed",
        title: "Virksomhed",
        type: "item",
        icon: "heroicons-outline:collection",
        url: "/companies",
      },
      {
        id: "apps.person",
        title: "Contact Person",
        type: "item",
        icon: "heroicons-outline:user-circle",
        url: "/contact-person",
      },
      {
        id: "apps.findkunder",
        title: "Findkunder",
        type: "item",
        icon: "search",
        url: "/apps/findkunder",
      },
      // {
      //   id: "apps.ecommerce",
      //   title: "ECommerce",
      //   type: "collapse",
      //   icon: "heroicons-outline:shopping-cart",
      //   translate: "ECOMMERCE",
      //   children: [
      //     {
      //       id: "e-commerce-products",
      //       title: "Products",
      //       type: "item",
      //       url: "apps/e-commerce/products",
      //       end: true,
      //     },
      //     {
      //       id: "e-commerce-product-detail",
      //       title: "Product Detail",
      //       type: "item",
      //       url: "apps/e-commerce/products/1/a-walk-amongst-friends-canvas-print",
      //     },
      //     {
      //       id: "e-commerce-new-product",
      //       title: "New Product",
      //       type: "item",
      //       url: "apps/e-commerce/products/new",
      //     },
      //     {
      //       id: "e-commerce-orders",
      //       title: "Orders",
      //       type: "item",
      //       url: "apps/e-commerce/orders",
      //       end: true,
      //     },
      //     {
      //       id: "e-commerce-order-detail",
      //       title: "Order Detail",
      //       type: "item",
      //       url: "apps/e-commerce/orders/1",
      //     },
      //   ],
      // },
    ],
  },
];

export default navigationConfig;
