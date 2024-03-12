import FuseUtils from "@fuse/utils";
import FuseLoading from "@fuse/core/FuseLoading";
import { Navigate } from "react-router-dom";
import settingsConfig from "app/configs/settingsConfig";
import userInterfaceConfigs from "../main/user-interface/UserInterfaceConfigs";
import SignInConfig from "../main/sign-in/SignInConfig";
import SignUpConfig from "../main/sign-up/SignUpConfig";
import SignOutConfig from "../main/sign-out/SignOutConfig";
import ForgotPasswordConfig from "../main/forgot-password/ForgotPasswordConfig";
import ResetPasswordConfig from "../main/reset-password/ResetPasswordConfig";
import dashboardsConfigs from "../main/dashboards/dashboardsConfigs";
import appsConfigs from "../main/apps/appsConfigs";
import pagesConfigs from "../main/pages/pagesConfigs";
import authRoleExamplesConfigs from "../main/auth/authRoleExamplesConfigs";
import CompaniesConfig from "../main/pages/companies/CompaniesConfig";
import ContactPersonConfig from "../main/pages/contact-person/ContactPersonConfig";
import CustomersConfig from "../main/pages/customers/CustomersConfig";
import CustomerTypeConfig from "../main/pages/customer-types/CustomerTypeConfig";
import CategoriesConfig from "../main/pages/categories/CategoriesConfig";

const routeConfigs = [
  ...appsConfigs,
  ...dashboardsConfigs,
  ...pagesConfigs,
  ...authRoleExamplesConfigs,
  ...userInterfaceConfigs,
  SignOutConfig,
  SignInConfig,
  SignUpConfig,
  CompaniesConfig,
  ContactPersonConfig,
  CustomersConfig,
  ForgotPasswordConfig,
  ResetPasswordConfig,
  CustomerTypeConfig,
  CategoriesConfig,
];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(
    routeConfigs,
    settingsConfig.defaultAuth
  ),
  {
    path: "/",
    element: <Navigate to="locations" />,
    auth: settingsConfig.defaultAuth,
  },
  {
    path: "loading",
    element: <FuseLoading />,
  },
  {
    path: "*",
    element: <Navigate to="pages/error/404" />,
  },
];

export default routes;
