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
import BasicInfoTab from "./customer-details/modal/BasicInfoTab";
import { getCompanies } from "../companies/store/companiesSlice";
import { getProducts as getContactPerson } from "../contact-person/store/contactPersonsSlice";
import { getProducts as getUpdatedCustomers } from "./store/customersSlice";
import { saveProduct, removeProduct } from "./store/customerSlice";
import { selectUser } from "../../../store/userSlice";
import { showMessage } from "app/store/fuse/messageSlice";
import _ from "@lodash";
import { useDispatch, useSelector } from "react-redux";
import DeleteConfirmationDialog from "./customer-details/modal/DeleteConfirmationDialog";
import { adminProfileSchema, profileSchema } from "../../../schemas/validationSchemas";

function Customers() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isAdmin = user?.role === 'admin';
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [companies, setCompanies] = useState(false);
  const [contact, setContacts] = useState(false);
  const [selectedItem, setSelected] = useState(false);
  const formSchema = isAdmin ? adminProfileSchema : profileSchema;
  const methods = useForm({
    mode: "onChange",
    defaultValues: {},
    resolver: yupResolver(formSchema),
  });
  const { reset, watch, control, onChange, formState, getValues } = methods;
  const form = watch();
  const { isValid, dirtyFields } = formState;

  function handleOpenDialog(item) {
    setSelected(item.id);
    reset({
      company_id: item?.company.id,
      person_id: item?.person.id,
      notes: item.notes || "",
      status: item.status
    });
    setOpenDialog(!openDialog);
  }

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDeleteDialog = () => {
    setOpenDeleteDialog(!openDeleteDialog);
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

  function handleRemoveCustomer(options) {
    const payload = {
      id: selectedItem,
      options,
    };
    dispatch(removeProduct(payload)).then(() => {
      const successMessage =
        options.deleteCompany || options.deleteContact
          ? "Customer profile and associated records deleted successfully!"
          : "Customer profile deleted successfully!";

      dispatch(showMessage({ message: successMessage }));
      setSelected(false);
      dispatch(getUpdatedCustomers());
      handleDeleteDialog();
      handleCloseDialog();
    });
  }

  return (
    <>
      <FormProvider {...methods}>
        <FusePageCarded
          header={<CutomersHeader />}
          content={<CutomersTable handleOpenDialog={handleOpenDialog} isAdmin={isAdmin} />}
          scroll={isMobile ? "normal" : "content"}
        />
        <Dialog
          open={openDialog}
          fullWidth
          onClose={handleCloseDialog}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle className="">Profile Details</DialogTitle>
          <DialogContent className="">
            <BasicInfoTab companies={companies} contacts={contact} isAdmin={isAdmin} />
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
              disabled={_.isEmpty(dirtyFields) || !isValid}
              onClick={handleUpdateCustomer}
            >
              Save
            </Button>
            <Button
              color="secondary"
              variant="contained"
              onClick={handleDeleteDialog}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        {openDeleteDialog && (
          <DeleteConfirmationDialog
            open={handleDeleteDialog}
            onClose={handleDeleteDialog}
            onConfirm={handleRemoveCustomer}
          />
        )}
      </FormProvider>
    </>
  );
}

export default withReducer("customer", reducer)(Customers);
