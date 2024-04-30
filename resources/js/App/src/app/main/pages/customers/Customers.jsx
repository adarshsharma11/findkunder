import { useState } from "react";
import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import reducer from "./store";
import CutomersHeader from "./CustomersHeader";
import CutomersTable from "./CustomersTable";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getProducts as getUpdatedCustomers } from "./store/customersSlice";
import { saveProduct, removeProduct } from "./store/customerSlice";
import { selectUser } from "../../../store/userSlice";
import { showMessage } from "app/store/fuse/messageSlice";
import _ from "@lodash";
import { useDispatch, useSelector } from "react-redux";
import DeleteConfirmationDialog from "./customer-details/modal/DeleteConfirmationDialog";
import { adminProfileSchema, profileSchema } from "../../../schemas/validationSchemas";
import authRoles from "../../../auth/authRoles";

function Customers() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isAdmin = user?.role === authRoles.admin[0];
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
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
    setOpenDialog(!openDialog);
  }

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDeleteDialog = () => {
    setOpenDeleteDialog(!openDeleteDialog);
  };

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
          header={<CutomersHeader isAdmin={isAdmin}/>}
          content={<CutomersTable handleOpenDialog={handleOpenDialog} isAdmin={isAdmin} />}
          scroll={isMobile ? "normal" : "content"}
        />
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
