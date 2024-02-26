import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import reducer from "./store";
import CustomerTypeHeader from "./CustomerTypeHeader";
import CustomerTypeTable from "./CustomerTypeTable";

function CustomerTypes() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <FusePageCarded
      header={<CustomerTypeHeader />}
      content={<CustomerTypeTable />}
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default withReducer("customerTypes", reducer)(CustomerTypes);
