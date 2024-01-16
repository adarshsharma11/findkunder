import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import reducer from "./store";
import ContactPersonHeader from "./ContactPersonHeader";
import ContactPersonTable from "./ContactPersonTable";

function ContactPerson() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <FusePageCarded
      header={<ContactPersonHeader />}
      content={<ContactPersonTable />}
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default withReducer("contact", reducer)(ContactPerson);
