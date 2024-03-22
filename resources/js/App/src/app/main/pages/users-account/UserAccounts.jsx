import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import reducer from "./store";
import UserAccountHeader from "./UserAccountHeader";
import UserAccountTable from "./UserAccountTable";

function UserAccounts() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <FusePageCarded
      header={<UserAccountHeader />}
      content={<UserAccountTable />}
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default withReducer("userAccounts", reducer)(UserAccounts);
