import FuseLoading from "@fuse/core/FuseLoading";
import FusePageCarded from "@fuse/core/FusePageCarded";
import { useDeepCompareEffect } from "@fuse/hooks";
import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import withReducer from "app/store/withReducer";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import _ from "@lodash";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import Profiles from "./tabs/Profiles";
import {
  getProduct,
  newProduct,
  resetProduct,
  selectProduct,
} from "../store/userAccountSlice";
import { selectUser } from "../../../../store/userSlice";
import reducer from "../store";
import ProductHeader from "./UserAccountHeader";
import BasicInfoTab from "./tabs/BasicInfoTab";
import { createUserAccountSchema, adminProfileSchema, profileSchema } from "../../../../schemas/validationSchemas";
import Locations from "./tabs/Locations";
import { getCompanies, getPersons, getProfiles } from "../store/userAccountsSlice";
import Persons from "./tabs/Persons";
import { showMessage } from "app/store/fuse/messageSlice";
import EditProfileDialog from "../../../../shared-components/customer-profile/EditProfileDialog";
import { saveProduct as saveProfile, removeProduct } from "../../customers/store/customerSlice";
import DeleteConfirmationDialog from "../../customers/customer-details/modal/DeleteConfirmationDialog";

function UserAccount(props) {
  const dispatch = useDispatch();
  const product = useSelector(selectProduct);
  const user = useSelector(selectUser);
  const isAdmin = user?.role === 'admin';
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const routeParams = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedItem, setSelected] = useState(false);
  const [companies, setCompanies] = useState(false);
  const [contact, setContacts] = useState(false);
  const [noProduct, setNoProduct] = useState(false);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const editProfileFormSchema = isAdmin ? adminProfileSchema : profileSchema;
  const methods = useForm({
    mode: "onChange",
    defaultValues: {},
    resolver: yupResolver(createUserAccountSchema),
  });

  const editProfileMethods = useForm({
    mode: "onChange",
    defaultValues: {},
    resolver: yupResolver(editProfileFormSchema),
  });
  const { reset, watch, control, onChange, formState } = methods;
  const { reset: editReset, watch: editWatch, control: editControl, onChange: editOnChange, formState: editFormState, getValues } = editProfileMethods;
  const form = watch();

  useDeepCompareEffect(() => {
    function updateProductState() {
      const { productId } = routeParams;

      if (productId === "new") {
        /**
         * Create New Product data
         */
        dispatch(newProduct());
      } else {
        /**
         * Get Product data
         */
        dispatch(getProduct(productId)).then((action) => {
          /**
           * If the requested product is not exist show message
           */
          if (!action.payload) {
            setNoProduct(true);
          }
        });
      }
    }

    updateProductState();
  }, [dispatch, routeParams]);

  useEffect(() => {
    if (!product) {
      return;
    }
    /**
     * Reset the form on product state changes
     */
    reset(product);
  }, [product, reset]);

  useEffect(() => {
    return () => {
      /**
       * Reset Product on component unload
       */
      dispatch(resetProduct());
      setNoProduct(false);
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCompanies()).then((action) => {
      if (action.payload) {
        setCompanies(action.payload);
      }
    });
  }, []);

  useEffect(() => {
    dispatch(getPersons()).then((action) => {
      if (action.payload) {
        setContacts(action.payload);
      }
    });
  }, []);

  /**
   * Tab Change
   */
  function handleTabChange(event, value) {
    setTabValue(value);
  }

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDeleteDialog = () => {
    setOpenDeleteDialog(!openDeleteDialog);
  };

  function handleOpenDialog(item) {
    setSelected(item.id);
    editReset({
      company_id: item?.company.id,
      person_id: item?.person.id,
      notes: item.notes || "",
      status: item.status
    });
    setOpenDialog(!openDialog);
  }

  function handleUpdateCustomer() {
    const values = getValues();
    values.id = selectedItem;
    dispatch(saveProfile(values)).then(() => {
      dispatch(showMessage({ message: "Customer updated successfully!" }));
      setSelected(false);
      dispatch(getProfiles(routeParams?.productId)).then((action) => {
        if (action.payload) {
          setData(action.payload);
          setFilteredData(action.payload);
        }
      });
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
      dispatch(getProfiles(routeParams?.productId)).then((action) => {
        if (action.payload) {
          setData(action.payload);
          setFilteredData(action.payload);
        }
      });
      handleDeleteDialog();
      handleCloseDialog();
    });
  }

  /**
   * Show Message if the requested products is not exists
   */
  if (noProduct) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There is no such user account!
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/accounts"
          color="inherit"
        >
          Go to Accounts Page
        </Button>
      </motion.div>
    );
  }
  /**
   * Wait while product data is loading and form is setted
   */
  if (
    _.isEmpty(form) ||
    (product &&
      routeParams.productId !== product?.id?.toString() &&
      routeParams.productId !== "new")
  ) {
    return <FuseLoading />;
  }

  return (
    <>
    <FormProvider {...methods}>
      <FusePageCarded
        header={<ProductHeader id={routeParams?.productId} />}
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
              <Tab className="h-64" label="Basic Info" />
              {routeParams?.productId !== 'new' && 
               <Tab className="h-64" label="Locations" />
              }
              {routeParams?.productId !== 'new' && 
               <Tab className="h-64" label="Persons" />
              }
              {routeParams?.productId !== 'new' && 
               <Tab className="h-64" label="Profiles" />
              }  
            </Tabs>
            <div className="p-16 sm:p-24 max-w-full">
              <div className={tabValue !== 0 ? "hidden" : ""}>
                <BasicInfoTab productId={routeParams.productId} />
              </div>
              {routeParams?.productId !== 'new' && 
               <div className={tabValue !== 1 ? "hidden" : ""}>
               <Locations userId={routeParams.productId} />
               </div>
              }
              {routeParams?.productId !== 'new' && 
               <div className={tabValue !== 2 ? "hidden" : ""}>
               <Persons userId={routeParams.productId}  />
               </div>
              }
              {routeParams?.productId !== 'new' && 
               <div className={tabValue !== 3 ? "hidden" : ""}>
               <Profiles userId={routeParams.productId} isAdmin={isAdmin} handleOpenDialog={handleOpenDialog} handleDeleteDialog={handleDeleteDialog} setData={setData} data={data} filteredData={filteredData} setFilteredData={setFilteredData} />
               </div>
              }
            </div>
          </>
        }
        scroll={isMobile ? "normal" : "content"}
      />
    </FormProvider>
    <FormProvider {...editProfileMethods}>
      <EditProfileDialog
          open={openDialog}
          handleClose={handleCloseDialog}
          handleSave={handleUpdateCustomer}
          handleDelete={handleDeleteDialog}
          companies={companies}
          contacts={contact}
          isAdmin={isAdmin}
      />
      </FormProvider>
      {openDeleteDialog && (
          <DeleteConfirmationDialog
            open={handleDeleteDialog}
            onClose={handleDeleteDialog}
            onConfirm={handleRemoveCustomer}
          />
      )}
    </>
  );
}

export default withReducer("userAccount", reducer)(UserAccount);
