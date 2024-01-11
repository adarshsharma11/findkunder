import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import reducer from "./store";
import CutomersHeader from "./CustomersHeader";
import CutomersTable from "./CustomersTable";

function Customers() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <FusePageCarded
      header={<CutomersHeader />}
      content={<CutomersTable />}
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default withReducer("eCommerceApp", reducer)(Customers);
