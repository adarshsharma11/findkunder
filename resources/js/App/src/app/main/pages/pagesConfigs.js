import maintenancePageConfig from "./maintenance/maintenancePageConfig";
import authenticationPagesConfig from "./authentication/authenticationPagesConfig";
import comingSoonPagesConfig from "./coming-soon/comingSoonPagesConfig";
import invoicePagesConfig from "./invoice/invoicePagesConfig";
import errorPagesConfig from "./error/errorPagesConfig";
import pricingPagesConfig from "./pricing/pricingPagesConfig";
import searchPagesConfig from "./search/searchPagesConfig";

const pagesConfigs = [
  ...authenticationPagesConfig,
  comingSoonPagesConfig,
  errorPagesConfig,
  maintenancePageConfig,
  invoicePagesConfig,
  pricingPagesConfig,
  searchPagesConfig,
];

export default pagesConfigs;
