import maintenancePageConfig from "./maintenance/maintenancePageConfig";
import authenticationPagesConfig from "./authentication/authenticationPagesConfig";
import comingSoonPagesConfig from "./coming-soon/comingSoonPagesConfig";
import errorPagesConfig from "./error/errorPagesConfig";

const pagesConfigs = [
  ...authenticationPagesConfig,
  comingSoonPagesConfig,
  errorPagesConfig,
  maintenancePageConfig,
];

export default pagesConfigs;
