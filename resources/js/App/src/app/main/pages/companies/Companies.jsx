import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import reducer from "./store";
import CompaniesHeader from "./CompaniesHeader";
import CompaniesTable from "./CompaniesTable";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/userSlice";
import authRoles from "../../../auth/authRoles";


function Companies() {
  const user = useSelector(selectUser);
  const isAdmin = user?.role === authRoles.admin[0];
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <FusePageCarded
      header={<CompaniesHeader isAdmin={isAdmin} />}
      content={<CompaniesTable />}
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default withReducer("company", reducer)(Companies);
