import { useState } from "react";
import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import reducer from "./store";
import { yupResolver } from "@hookform/resolvers/yup";
import LeadsHeader from "./LeadsHeader";
import { FormProvider, useForm } from "react-hook-form";
import { assignPersonSchema } from "../../../schemas/validationSchemas";
import { getAssignLeadsProfiles } from "./store/leadsSlice";
import { useDispatch } from "react-redux";
import authRoles from "../../../auth/authRoles";
import { selectUser } from "../../../store/userSlice";
import { useSelector } from "react-redux";
import LeadsTable from "./LeadsTable";

const defaultValues = {
  status: "",
};

function Leads() {
  const [ setAssignLeadProfiles ] = useState(false);
  const user = useSelector(selectUser);
  const isAdmin = user?.role === authRoles.admin[0];
  const [tabValue, setTabValue] = useState(0);
  const dispatch = useDispatch();
  const methods = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(assignPersonSchema),
  });
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const getContactPersons = async (formData) => {
    try {
      const response = await dispatch(getAssignLeadsProfiles(formData));
      if (response?.payload) {
        setAssignLeadProfiles(response?.payload);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  /**
  * Tab Change
  */
  function handleTabChange(event, value) {
    setTabValue(value);
  }

  return (
    <FormProvider {...methods}>
    <FusePageCarded
      header={<LeadsHeader />}
      content={
        <>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor="secondary"
              textColor="secondary"
              variant="scrollable"
              scrollButtons="auto"
              classes={{ root: "w-full h-64 border-b-1" }}
            >
              <Tab className="h-64" label="Active" />
              <Tab className="h-64" label="Completed" />
            </Tabs>
            <div className="p-16 sm:p-24">
              <div className={tabValue !== 0 ? "hidden" : ""}>
               <LeadsTable getContactPersons={getContactPersons} isAdmin={isAdmin} activeLeads={true} />
              </div>
              <div className={tabValue !== 1 ? "hidden" : ""}>
              <LeadsTable getContactPersons={getContactPersons} isAdmin={isAdmin} completedLeads={tabValue === 1} />
              </div>
            </div>
          </>
    }
      scroll={isMobile ? "normal" : "content"}
    />
   </FormProvider>
  );
}

export default withReducer("leads", reducer)(Leads);
