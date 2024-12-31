import { useEffect, useState } from "react";
import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import reducer from "./store";
import CompaniesHeader from "./CompaniesHeader";
import CompaniesTable from "./CompaniesTable";
import { useSelector } from "react-redux";
import ProfileCreationDialog from "../../../shared-components/welcome-dialog";
import { selectUser } from "../../../store/userSlice";
import authRoles from "../../../auth/authRoles";


function Companies() {
  const user = useSelector(selectUser);
  const [open, setOpen] = useState(false);
  const [openFromClick, setOpenFromClick] = useState(false);
  const { data } = user;
  const isAdmin = user?.role === authRoles.admin[0];
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const toggleProfileDialog = () => {
    setOpenFromClick(true);
    setOpen(!open);
  }

  useEffect(() => {
    const hasShownDialog = localStorage.getItem("hasShownProfileDialog");
    if ((!data.is_profile_completed ||  data.is_profile_completed === 0) && !isAdmin) {
      setOpenFromClick(false);
      setOpen(true);
      localStorage.setItem("hasShownProfileDialog", "true");
    }
  }, [data]);


  return (
    <>
    <FusePageCarded
      header={<CompaniesHeader isAdmin={isAdmin} toggleProfileDialog={toggleProfileDialog} />}
      content={<CompaniesTable />}
      scroll={isMobile ? "normal" : "content"}
    />
    {open && <ProfileCreationDialog open={open} handleClose={toggleProfileDialog} user={user} openFromClick={openFromClick}/> }
    </>
  );
}

export default withReducer("company", reducer)(Companies);
