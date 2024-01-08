import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import reducer from "./store";
import CompaniesHeader from "./CompaniesHeader";
import CompaniesTable from "./CompaniesTable";

function Companies() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <FusePageCarded
      header={<CompaniesHeader />}
      content={<CompaniesTable />}
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default withReducer("eCommerceApp", reducer)(Companies);
