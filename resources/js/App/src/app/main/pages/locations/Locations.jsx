import { useEffect, useState } from "react";
import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import reducer from "./store";
import LocationsHeader from "./LocationsHeader";
import LocationsTable from "./LocationsTable";
import { useSelector } from "react-redux";
import ProfileCreationDialog from "../../../shared-components/welcome-dialog";
import { selectUser } from "../../../store/userSlice";
import authRoles from "../../../auth/authRoles";


function Locations() {
  const user = useSelector(selectUser);
  const [open, setOpen] = useState(false);
  const { data, uuid: userId } = user;
  const isAdmin = user?.role === authRoles.admin[0];
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const toggleProfileDialog = () => {
    setOpen(!open);
  }

  useEffect(() => {
    const hasShownDialog = localStorage.getItem("hasShownProfileDialog");
    if ((!data.totalProfiles ||  data.totalProfiles === 0) && !isAdmin && !hasShownDialog) {
      setOpen(true);
      localStorage.setItem("hasShownProfileDialog", "true");
    }
  }, [data]);


  return (
    <>
    <FusePageCarded
      header={<LocationsHeader isAdmin={isAdmin} toggleProfileDialog={toggleProfileDialog} />}
      content={<LocationsTable userId={userId} />}
      scroll={isMobile ? "normal" : "content"}
    />
    {open && <ProfileCreationDialog open={open} handleClose={toggleProfileDialog}/> }
    </>
  );
}

export default withReducer("location", reducer)(Locations);
