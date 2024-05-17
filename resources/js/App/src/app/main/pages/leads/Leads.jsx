import { useState } from "react";
import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import AssignPersonDialog from "./modal/AssignPerson";
import reducer from "./store";
import { yupResolver } from "@hookform/resolvers/yup";
import LeadsHeader from "./LeadsHeader";
import { FormProvider, useForm } from "react-hook-form";
import { assignPersonSchema } from "../../../schemas/validationSchemas";
import { getAssignLeadsProfiles } from "./store/leadsSlice";
import { saveProduct } from "./store/leadSlice";
import { useDispatch } from "react-redux";
import { showMessage } from "app/store/fuse/messageSlice";
import authRoles from "../../../auth/authRoles";
import { selectUser } from "../../../store/userSlice";
import { useSelector } from "react-redux";
import LeadsTable from "./LeadsTable";

const defaultValues = {
  person_id: "",
};

function Leads() {
  const [ openAssignPersonDialog, setOpenAssignPersonDialog ] = useState(false);
  const [ assignLeadProfiles, setAssignLeadProfiles ] = useState(false);
  const user = useSelector(selectUser);
  const isAdmin = user?.role === authRoles.admin[0];
  const [ leadId, setLeadId ] = useState('');
  const dispatch = useDispatch();
  const methods = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(assignPersonSchema),
  });
  const handleAssignPersonDialog = () => {
    setOpenAssignPersonDialog(!openAssignPersonDialog);
  };
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const getContactPersons = async (formData) => {
    try {
      const response = await dispatch(getAssignLeadsProfiles(formData));
      if (response?.payload) {
        setAssignLeadProfiles(response?.payload);
        handleAssignPersonDialog();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  const assignContactPerson = async (formData) => {
    try {
      const response = await dispatch(saveProduct(formData));
      if (response?.payload) {
        dispatch(showMessage({ message: "Person assigned successfully!" }));
        handleAssignPersonDialog();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <FormProvider {...methods}>
    <FusePageCarded
      header={<LeadsHeader />}
      content={<LeadsTable getContactPersons={getContactPersons} setLeadId={setLeadId} isAdmin={isAdmin} />}
      scroll={isMobile ? "normal" : "content"}
    />
    {openAssignPersonDialog && 
     <AssignPersonDialog open={handleAssignPersonDialog} onClose={handleAssignPersonDialog} assignLeadProfiles={assignLeadProfiles} assignContactPerson={assignContactPerson} leadId={leadId} />
    }
   </FormProvider>
  );
}

export default withReducer("leads", reducer)(Leads);