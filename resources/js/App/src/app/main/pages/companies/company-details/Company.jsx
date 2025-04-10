import { useRef } from "react";
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
import { Link, useParams, useNavigate } from "react-router-dom";
import _ from "@lodash";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import { selectUser } from "../../../../store/userSlice";
import {
  getProduct,
  newProduct,
  resetProduct,
  selectProduct,
  addNewCompany,
  removeProduct,
  saveProduct,
} from "../store/companySlice";
import reducer from "../store";
import ProductHeader from "./CompanyHeader";
import BasicInfoTab from "./tabs/BasicInfoTab";
import LocationInfoTab from "./tabs/LocationInfoTab";
import authRoles from "../../../../auth/authRoles";
import SaveChangesDialog from "app/shared-components/save-changes-dialog";
import useNavigationPrompt from "../../../../hooks/use-navigation-prompt";
import history from "@history";
import { showMessage } from "app/store/fuse/messageSlice";
import FormSavedDialog from "../../../../shared-components/form-saved-dialog";
import { companySchema } from "../../../../schemas/validationSchemas";
import DeleteConfirmationDialog from "../../../../shared-components/delete-confirmation-dialog";

function Company() {
  const dispatch = useDispatch();
  const product = useSelector(selectProduct);
  const user = useSelector(selectUser);
  const { uuid } = user;
  const navigate = useNavigate();
  const isAdmin = user?.role === authRoles.admin[0];
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const routeParams = useParams();
  const unblockRef = useRef(null);
  const [tabValue, setTabValue] = useState(0);
  const [formSaved, setFormSaved] = useState(false);
  const [noProduct, setNoProduct] = useState(false);
  const [savedCompanyId, setSavedCompanyId] = useState(null);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const methods = useForm({
    mode: "onChange",
    defaultValues: {},
    resolver: yupResolver(companySchema),
  });
  const { reset, watch, getValues } = methods;
  // We don't need to destructure formState here as we access it through methods.formState
  const form = watch();

  const { productId } = routeParams;

  useDeepCompareEffect(() => {
    function updateProductState() {

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

  /**
   * Tab Change
   */
  function handleTabChange(_, value) {
    setTabValue(value);
  }
  const handleSubmitProfile = async () => {
    // Set isSaving to true to prevent navigation prompt
    setIsSaving(true);

    // Trigger validation to show all field errors
    const isValid = await methods.trigger();

    if (productId === "new") {
      // If form is valid and we have dirty fields, save the company
      if (isValid && Object.keys(methods.formState.dirtyFields).length > 0) {
        handleSaveProduct();
        return true;
      }
      setIsSaving(false); // Reset isSaving if validation fails
      return false;
    } else {
      // For existing products, update if valid and dirty
      if (isValid && Object.keys(methods.formState.dirtyFields).length > 0) {
        handleUpdateProduct();
        return true;
      }
      // Even if not dirty, allow navigation away from existing product
      return true;
    }
  };

  const toggleDeleteConfirmation = () => {
    setOpenDeleteConfirmation(!openDeleteConfirmation);
  }

  // State for tracking save operation
  const [isSaving, setIsSaving] = useState(false);

  function handleSaveProduct() {
    // Prevent multiple submissions
    if (isSaving) return;

    // Set loading state
    setIsSaving(true);

    // Get form values
    const formData = getValues();

    // Dispatch the addNewCompany action
    dispatch(addNewCompany(formData))
      .then((response) => {
        // Check if the request was successful
        if (response.meta.requestStatus === 'fulfilled') {
          // Show success message
          dispatch(showMessage({
            message: "Company added successfully!",
            variant: 'success',
            autoHideDuration: 3000
          }));

          // Store the saved company ID for adding locations
          setSavedCompanyId(response.payload.id);

          // Show the form saved dialog
          setFormSaved(true);
        } else if (response.meta.requestStatus === 'rejected') {
          // Handle validation errors
          const errors = response.payload?.errors || response.error?.data?.errors;

          if (errors) {
            // Loop through the errors and show a message for each field
            for (const [field, messages] of Object.entries(errors)) {
              dispatch(showMessage({
                message: `Error in ${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`,
                variant: 'error',
                autoHideDuration: 6000
              }));
            }
          } else {
            // Show specific error message for duplicate company
            dispatch(showMessage({
              message: "The company details must be unique. At least one of the fields (name, cvr, street, postal_code, city) must be different from existing records.",
              variant: 'error',
              autoHideDuration: 6000
            }));
          }
        }
      })
      .catch((error) => {
        // Handle any unexpected errors
        console.error("Error saving company:", error);
        dispatch(showMessage({
          message: `An unexpected error occurred: ${error.message}`,
          variant: 'error',
          autoHideDuration: 6000
        }));
      })
      .finally(() => {
        // Reset loading state
        setIsSaving(false);
      });
  }

  function handleCloseFormSavedDialog() {
    setFormSaved(false);
    navigate(`/companies`);
  }

  function handleAddLocation() {
    setFormSaved(false);
    navigate(`/locations/new/${savedCompanyId}`);
  }


  function handleRemoveProduct() {
    dispatch(removeProduct(productId)).then(({ payload }) => {
      dispatch(showMessage({ message: payload?.message, variant: payload?.status ? 'success' : 'error', autoHideDuration: 600000 }));
      if (payload?.status) {
        navigate("/companies");
      }
    });
  }

  // Check if any field has been modified, regardless of validation status
  const isDirty = productId === 'new'
    ? Object.keys(methods.formState.dirtyFields).length > 0
    : methods.formState.isDirty;

  const { showPrompt, handlePromptConfirm, handlePromptCancel } = useNavigationPrompt({
    isDirty: isDirty && !formSaved,
    onSubmit: handleSubmitProfile,
    history,
    unblockRef,
  });

  function handleUpdateProduct() {
    // Prevent multiple submissions
    if (isSaving) return;

    // Set loading state
    setIsSaving(true);

    // Get form values
    const formData = getValues();

    // Dispatch the saveProduct action
    dispatch(saveProduct(formData))
      .then((response) => {
        // Check if the request was successful
        if (response.meta.requestStatus === 'fulfilled') {
          // Show success message
          dispatch(showMessage({
            message: "Company updated successfully!",
            variant: 'success',
            autoHideDuration: 3000
          }));

          // Unblock navigation and navigate to companies page
          if (unblockRef.current) {
            unblockRef.current();
            unblockRef.current = null;
          }

          // Use direct navigation to ensure immediate redirect
          navigate("/companies");
        } else if (response.meta.requestStatus === 'rejected') {
          // Handle validation errors
          const errors = response.payload?.errors || response.error?.data?.errors;

          if (errors) {
            // Loop through the errors and show a message for each field
            for (const [field, messages] of Object.entries(errors)) {
              dispatch(showMessage({
                message: `Error in ${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`,
                variant: 'error',
                autoHideDuration: 6000
              }));
            }
          } else {
            // Show generic error message
            dispatch(showMessage({
              message: response.error?.message || "Failed to update company. Please try again.",
              variant: 'error',
              autoHideDuration: 6000
            }));
          }
        }
      })
      .catch((error) => {
        // Handle any unexpected errors
        console.error("Error updating company:", error);
        dispatch(showMessage({
          message: `An unexpected error occurred: ${error.message}`,
          variant: 'error',
          autoHideDuration: 6000
        }));
      })
      .finally(() => {
        // Reset loading state
        setIsSaving(false);
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
          There is no such company!
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/companies"
          color="inherit"
        >
          Go to company Page
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
            </Tabs>
            <div className="p-16 sm:p-24">
              <div className={tabValue !== 0 ? "hidden" : ""}>
                <BasicInfoTab product={product} isAdmin={isAdmin} id={productId} handleRemoveProduct={toggleDeleteConfirmation} handleUpdateProduct={handleUpdateProduct} handleSaveProduct={handleSaveProduct} />
              </div>
              <div className="mt-16">
                <LocationInfoTab product={product} isAdmin={isAdmin} userId={uuid} productId={productId} />
              </div>
            </div>
          </>
        }
        scroll={isMobile ? "normal" : "content"}
      />
      <SaveChangesDialog open={showPrompt} onClose={handlePromptCancel} onConfirm={handlePromptConfirm} />
      <FormSavedDialog open={formSaved} onClose={handleCloseFormSavedDialog} onConfirm={handleAddLocation} title="Company Saved" description="Remember to add one or more locations." buttonText="Add Location(s)" />
      <DeleteConfirmationDialog open={openDeleteConfirmation} onClose={toggleDeleteConfirmation} onConfirm={handleRemoveProduct} title="Are you sure you want to delete the company ?" message="This action will permanently delete the company, its related locations and contacts. This cannot be undone."/>
    </FormProvider>
  );
}

export default withReducer("company", reducer)(Company);
