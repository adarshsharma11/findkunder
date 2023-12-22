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
    title: "Home",
    subtitle: "Custom made application designs",
    type: "group",
    icon: "heroicons-outline:home",
    children: [
      {
        id: "apps.ecommerce",
        title: "ECommerce",
        type: "collapse",
        icon: "heroicons-outline:shopping-cart",
        translate: "ECOMMERCE",
        children: [
          {
            id: "e-commerce-products",
            title: "Products",
            type: "item",
            url: "apps/e-commerce/products",
            end: true,
          },
          {
            id: "e-commerce-product-detail",
            title: "Product Detail",
            type: "item",
            url: "apps/e-commerce/products/1/a-walk-amongst-friends-canvas-print",
          },
          {
            id: "e-commerce-new-product",
            title: "New Product",
            type: "item",
            url: "apps/e-commerce/products/new",
          },
          {
            id: "e-commerce-orders",
            title: "Orders",
            type: "item",
            url: "apps/e-commerce/orders",
            end: true,
          },
          {
            id: "e-commerce-order-detail",
            title: "Order Detail",
            type: "item",
            url: "apps/e-commerce/orders/1",
          },
        ],
      },
      {
        id: "apps.profile",
        title: "Profile",
        type: "item",
        icon: "heroicons-outline:user-circle",
        url: "/apps/profile",
      },
    ],
  },
  {
    id: "pages",
    title: "Admin",
    subtitle: "Custom made page designs",
    type: "group",
    icon: "heroicons-outline:document",
    children: [
      {
        id: "pages.coming-soon",
        title: "Coming Soon",
        type: "collapse",
        icon: "heroicons-outline:clock",
        url: "/pages/coming-soon",
        children: [
          {
            id: "pages.coming-soon.classic",
            title: "Classic",
            type: "item",
            url: "/pages/coming-soon/classic",
          },
          {
            id: "pages.coming-soon.modern",
            title: "Modern",
            type: "item",
            url: "/pages/coming-soon/modern",
          },
          {
            id: "pages.coming-soon.modern-reversed",
            title: "Modern Reversed",
            type: "item",
            url: "/pages/coming-soon/modern-reversed",
          },
          {
            id: "pages.coming-soon.split-screen",
            title: "Split Screen",
            type: "item",
            url: "/pages/coming-soon/split-screen",
          },
          {
            id: "pages.coming-soon.split-screen-reversed",
            title: "Split Screen Reversed",
            type: "item",
            url: "/pages/coming-soon/split-screen-reversed",
          },
          {
            id: "pages.coming-soon.full-screen",
            title: "Full Screen",
            type: "item",
            url: "/pages/coming-soon/full-screen",
          },
          {
            id: "pages.coming-soon.full-screen-reversed",
            title: "Full Screen Reversed",
            type: "item",
            url: "/pages/coming-soon/full-screen-reversed",
          },
        ],
      },
      {
        id: "pages.error",
        title: "Error",
        type: "collapse",
        icon: "heroicons-outline:exclamation-circle",
        children: [
          {
            id: "pages.error.404",
            title: "404",
            type: "item",
            url: "/pages/error/404",
          },
          {
            id: "pages.error.500",
            title: "500",
            type: "item",
            url: "/pages/error/500",
          },
        ],
      },
      {
        id: "pages.invoice",
        title: "Invoice",
        type: "collapse",
        icon: "heroicons-outline:calculator",
        children: [
          {
            id: "pages.invoice.printable",
            title: "Printable",
            type: "collapse",
            children: [
              {
                id: "pages.invoice.printable.compact",
                title: "Compact",
                type: "item",
                url: "/pages/invoice/printable/compact",
              },
              {
                id: "pages.invoice.printable.modern",
                title: "Modern",
                type: "item",
                url: "/pages/invoice/printable/modern",
              },
            ],
          },
        ],
      },
      {
        id: "pages.maintenance",
        title: "Maintenance",
        type: "item",
        icon: "heroicons-outline:exclamation",
        url: "/pages/maintenance",
      },
      {
        id: "pages.pricing",
        title: "Pricing",
        type: "collapse",
        icon: "heroicons-outline:cash",
        children: [
          {
            id: "pages.pricing.modern",
            title: "Modern",
            type: "item",
            url: "/pages/pricing/modern",
          },
          {
            id: "pages.pricing.simple",
            title: "Simple",
            type: "item",
            url: "/pages/pricing/simple",
          },
          {
            id: "pages.pricing.single",
            title: "Single",
            type: "item",
            url: "/pages/pricing/single",
          },
          {
            id: "pages.pricing.table",
            title: "Table",
            type: "item",
            url: "/pages/pricing/table",
          },
        ],
      },
      {
        id: "pages.search",
        title: "Search",
        type: "collapse",
        icon: "search",
        children: [
          {
            id: "pages.search.classic-search",
            title: "Classic Search",
            type: "item",
            url: "pages/search/classic",
          },
          {
            id: "pages.search.modern-search",
            title: "Modern Search",
            type: "item",
            url: "pages/search/modern",
          },
        ],
      },
    ],
  },
  {
    id: "user-interface",
    title: "Contact Us",
    subtitle: "Building blocks of the UI & UX",
    type: "group",
    icon: "heroicons-outline:collection",
    children: [
      {
        id: "user-interface.tailwindcss",
        title: "TailwindCSS",
        type: "item",
        icon: "heroicons-outline:sparkles",
        url: "/ui/tailwindcss",
      },
      {
        id: "user-interface.icons",
        title: "Icons",
        type: "collapse",
        icon: "heroicons-outline:lightning-bolt",
        children: [
          {
            id: "user-interface.icons.heroicons-outline",
            title: "Heroicons Outline",
            type: "item",
            url: "/ui/icons/heroicons/outline",
          },
          {
            id: "user-interface.icons.heroicons-solid",
            title: "Heroicons Solid",
            type: "item",
            url: "/ui/icons/heroicons/solid",
          },
          {
            id: "user-interface.icons.material-twotone",
            title: "Material Twotone",
            type: "item",
            url: "/ui/icons/material/twotone",
          },
          {
            id: "user-interface.icons.material-outline",
            title: "Material Outline",
            type: "item",
            url: "/ui/icons/material/outline",
          },
          {
            id: "user-interface.icons.material-solid",
            title: "Material Solid",
            type: "item",
            url: "/ui/icons/material/solid",
          },
          {
            id: "user-interface.icons.feather",
            title: "Feather",
            type: "item",
            url: "/ui/icons/feather",
          },
        ],
      },
      {
        id: "user-interface.page-layouts",
        title: "Page Layouts",
        type: "collapse",
        icon: "heroicons-outline:template",
        children: [
          {
            id: "user-interface.page-layouts.overview",
            title: "Overview",
            type: "item",
            url: "/ui/page-layouts/overview",
          },
          {
            id: "user-interface.page-layouts.carded",
            title: "Carded",
            type: "collapse",
            children: [
              {
                id: "user-interface.page-layouts.carded.full-width",
                title: "Full Width",
                type: "collapse",
                url: "/ui/page-layouts/carded/full-width",
                children: [
                  {
                    id: "user-interface.page-layouts.carded.full-width.overview",
                    title: "Full Width Overview",
                    type: "item",
                    url: "/ui/page-layouts/carded/full-width/overview",
                  },
                  {
                    id: "user-interface.page-layouts.carded.full-width.normal-scroll",
                    title: "Full Width Normal Scroll",
                    type: "item",
                    url: "/ui/page-layouts/carded/full-width/normal-scroll",
                  },
                  {
                    id: "user-interface.page-layouts.carded.full-width.page-scroll",
                    title: "Full Width Page Scroll",
                    type: "item",
                    url: "/ui/page-layouts/carded/full-width/page-scroll",
                  },
                  {
                    id: "user-interface.page-layouts.carded.full-width.content-scroll",
                    title: "Full Width Content Scroll",
                    type: "item",
                    url: "/ui/page-layouts/carded/full-width/content-scroll",
                  },
                ],
              },
              {
                id: "user-interface.page-layouts.carded.with-sidebars",
                title: "With Sidebars",
                type: "collapse",
                url: "/ui/page-layouts/carded/with-sidebars",
                children: [
                  {
                    id: "user-interface.page-layouts.carded.with-sidebars.overview",
                    title: "With Sidebars Overview",
                    type: "item",
                    url: "/ui/page-layouts/carded/with-sidebars/overview",
                  },
                  {
                    id: "user-interface.page-layouts.carded.with-sidebars.normal-scroll",
                    title: "With Sidebars Normal Scroll",
                    type: "item",
                    url: "/ui/page-layouts/carded/with-sidebars/normal-scroll",
                  },
                  {
                    id: "user-interface.page-layouts.carded.with-sidebars.page-scroll",
                    title: "With Sidebars Page Scroll",
                    type: "item",
                    url: "/ui/page-layouts/carded/with-sidebars/page-scroll",
                  },
                  {
                    id: "user-interface.page-layouts.carded.with-sidebars.content-scroll",
                    title: "With Sidebars Content Scroll",
                    type: "item",
                    url: "/ui/page-layouts/carded/with-sidebars/content-scroll",
                  },
                ],
              },
            ],
          },
          {
            id: "user-interface.page-layouts.simple",
            title: "Simple",
            type: "collapse",
            children: [
              {
                id: "user-interface.page-layouts.simple.full-width",
                title: "Full Width",
                type: "collapse",
                url: "/ui/page-layouts/simple/full-width",
                children: [
                  {
                    id: "user-interface.page-layouts.simple.full-width.overview",
                    title: "Full Width Overview",
                    type: "item",
                    url: "/ui/page-layouts/simple/full-width/overview",
                  },
                  {
                    id: "user-interface.page-layouts.simple.full-width.normal-scroll",
                    title: "Full Width Normal Scroll",
                    type: "item",
                    url: "/ui/page-layouts/simple/full-width/normal-scroll",
                  },
                  {
                    id: "user-interface.page-layouts.simple.full-width.page-scroll",
                    title: "Full Width Page Scroll",
                    type: "item",
                    url: "/ui/page-layouts/simple/full-width/page-scroll",
                  },
                  {
                    id: "user-interface.page-layouts.simple.full-width.content-scroll",
                    title: "Full Width Content Scroll",
                    type: "item",
                    url: "/ui/page-layouts/simple/full-width/content-scroll",
                  },
                ],
              },
              {
                id: "user-interface.page-layouts.simple.with-sidebars",
                title: "With Sidebars",
                type: "collapse",
                url: "/ui/page-layouts/simple/with-sidebars",
                children: [
                  {
                    id: "user-interface.page-layouts.simple.with-sidebars.overview",
                    title: "With Sidebars Overview",
                    type: "item",
                    url: "/ui/page-layouts/simple/with-sidebars/overview",
                  },
                  {
                    id: "user-interface.page-layouts.simple.with-sidebars.normal-scroll",
                    title: "With Sidebars Normal Scroll",
                    type: "item",
                    url: "/ui/page-layouts/simple/with-sidebars/normal-scroll",
                  },
                  {
                    id: "user-interface.page-layouts.simple.with-sidebars.page-scroll",
                    title: "With Sidebars Page Scroll",
                    type: "item",
                    url: "/ui/page-layouts/simple/with-sidebars/page-scroll",
                  },
                  {
                    id: "user-interface.page-layouts.simple.with-sidebars.content-scroll",
                    title: "With Sidebars Content Scroll",
                    type: "item",
                    url: "/ui/page-layouts/simple/with-sidebars/content-scroll",
                  },
                ],
              },
            ],
          },
          {
            id: "user-interface.page-layouts.empty",
            title: "Empty Page",
            type: "item",
            url: "/ui/page-layouts/empty",
          },
        ],
      },
      {
        id: "user-interface.typography",
        title: "Typography",
        type: "item",
        icon: "heroicons-outline:pencil",
        url: "/ui/typography",
      },
    ],
  },
  {
    id: "dashboards",
    title: "Dashboards",
    subtitle: "Unique dashboard designs",
    type: "group",
    icon: "heroicons-outline:home",
    translate: "DASHBOARDS",
    children: [
      {
        id: "dashboards.project",
        title: "Project",
        type: "item",
        icon: "heroicons-outline:clipboard-check",
        url: "/dashboards/project",
      },
      {
        id: "dashboards.analytics",
        title: "Analytics",
        type: "item",
        icon: "heroicons-outline:chart-pie",
        url: "/dashboards/analytics",
      },
    ],
  },
];

export default navigationConfig;
