import { useState, useEffect } from "react";
import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import reducer from "./store";
import CutomersHeader from "./CustomersHeader";
import CutomersTable from "./CustomersTable";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import BasicInfoTab from "./customer-details/modal/BasicInfoTab";
import { getCompanies } from "../companies/store/companiesSlice";
import { getProducts as getContactPerson } from "../contact-person/store/contactPersonsSlice";
import { getProducts as getUpdatedCustomers } from "./store/customersSlice";
import { saveProduct, removeProduct } from "./store/customerSlice";
import { showMessage } from "app/store/fuse/messageSlice";
import { useDispatch } from "react-redux";

const schema = yup.object().shape({
  company_id: yup
    .string()
    .required("You must enter a company")
    .max(255, "First name must not exceed 255 characters"),
  person_id: yup
    .string()
    .required("You must enter a contact person")
    .max(255, "Last name must not exceed 255 characters"),
});

function Customers() {
  const dispatch = useDispatch();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const [openDialog, setOpenDialog] = useState(false);
  const [companies, setCompanies] = useState(false);
  const [contact, setContacts] = useState(false);
  const [selectedItem, setSelected] = useState(false);
  const methods = useForm({
    mode: "onChange",
    defaultValues: {},
    resolver: yupResolver(schema),
  });
  const { reset, watch, control, onChange, formState, getValues } = methods;
  const form = watch();

  function handleOpenDialog(item) {
    setSelected(item.id);
    reset({
      company_id: item?.company.id,
      person_id: item?.person.id,
      notes: item.notes || "",
      first_name: item?.person.first_name,
      email: item?.person.email,
      region: item?.company.location,
      postal_code: item?.company.postal_code,
      phone: item?.person.phone,
    });
    setOpenDialog(!openDialog);
  }

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    dispatch(getCompanies()).then((action) => {
      if (action.payload) {
        setCompanies(action.payload);
      }
    });
  }, []);

  useEffect(() => {
    dispatch(getContactPerson()).then((action) => {
      if (action.payload) {
        setContacts(action.payload);
      }
    });
  }, []);

  function handleUpdateCustomer() {
    const values = getValues();
    values.id = selectedItem;
    dispatch(saveProduct(values)).then(() => {
      dispatch(showMessage({ message: "Customer updated successfully!" }));
      setSelected(false);
      dispatch(getUpdatedCustomers());
      handleCloseDialog();
    });
  }

  function handleRemoveCustomer() {
    dispatch(removeProduct(selectedItem)).then(() => {
      dispatch(showMessage({ message: "Customer deleted successfully!" }));
      setSelected(false);
      dispatch(getUpdatedCustomers());
      handleCloseDialog();
    });
  }

  return (
    <>
      <FormProvider {...methods}>
        <FusePageCarded
          header={<CutomersHeader />}
          content={<CutomersTable handleOpenDialog={handleOpenDialog} />}
          scroll={isMobile ? "normal" : "content"}
        />
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle className="">Customer Details</DialogTitle>
          <DialogContent className="">
            <BasicInfoTab companies={companies} contacts={contact} />
          </DialogContent>
          <DialogActions>
            <Button
              color="secondary"
              variant="contained"
              onClick={handleCloseDialog}
            >
              Close
            </Button>
            <Button
              color="secondary"
              variant="contained"
              onClick={handleUpdateCustomer}
            >
              Save
            </Button>
            <Button
              color="secondary"
              variant="contained"
              onClick={handleRemoveCustomer}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </FormProvider>
    </>
  );
}

export default withReducer("eCommerceApp", reducer)(Customers);
