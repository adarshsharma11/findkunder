import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import reducer from "./store";
import CustomerLocationHeader from "./CustomerLocationHeader";
import CustomerLocationTable from "./CustomerLocationTable";

function CustomerLocations() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <FusePageCarded
      header={<CustomerLocationHeader />}
      content={<CustomerLocationTable />}
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default withReducer("customerLocations", reducer)(CustomerLocations);
