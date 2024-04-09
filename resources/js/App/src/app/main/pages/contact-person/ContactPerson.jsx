import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import reducer from "./store";
import ContactPersonHeader from "./ContactPersonHeader";
import ContactPersonTable from "./ContactPersonTable";
import { selectUser } from "../../../store/userSlice";
import { useSelector } from "react-redux";
import authRoles from "../../../auth/authRoles";

function ContactPerson() {
  const user = useSelector(selectUser);
  const isAdmin = user?.role === authRoles.admin[0]
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <FusePageCarded
      header={<ContactPersonHeader isAdmin={isAdmin}  />}
      content={<ContactPersonTable />}
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default withReducer("contact", reducer)(ContactPerson);
