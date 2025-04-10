import FuseLoading from "@fuse/core/FuseLoading";
import FusePageCarded from "@fuse/core/FusePageCarded";
import { useDeepCompareEffect } from "@fuse/hooks";
import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import withReducer from "app/store/withReducer";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import _ from "@lodash";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import {
  getProduct,
  newProduct,
  resetProduct,
  selectProduct,
  removeProduct,
  addNewPerson,
  saveProduct,
} from "../store/contactPersonSlice";
import reducer from "../store";
import ProductHeader from "./ContactPersonHeader";
import authRoles from "../../../../auth/authRoles";
import { selectUser } from "../../../../store/userSlice";
import { getProducts as getCategories } from "../../categories/store/categoriesSlice";
import { getProducts as getContactTypes } from "../../customer-types/store/customerTypesSlice";
import BasicInfoTab from "./tabs/BasicInfoTab";
import { getLocations } from "../../locations/store/locationsSlice";
import { contactSchema } from "../../../../schemas/validationSchemas";
import DeleteConfirmationDialog from "../../../../shared-components/delete-confirmation-dialog";
import SaveChangesDialog from "../../../../shared-components/save-changes-dialog";
import useNavigationPrompt from "../../../../hooks/use-navigation-prompt";
import { showMessage } from "app/store/fuse/messageSlice";
import FormSavedDialog from "../../../../shared-components/form-saved-dialog";
import history from '@history';

const defaultValues = {
  location_id: '',
  title: '',
  first_name: '',
  last_name: '',
  phone: '',
  email: '',
  services: [],
  customer_types: [],
}

function Contact(props) {
  const dispatch = useDispatch();
  const product = useSelector(selectProduct);
  const user = useSelector(selectUser);
  const {uuid: userId} = user;
  const isAdmin = user?.role === authRoles.admin[0];
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const routeParams = useParams();

  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [locations, setLocations] = useState(false);
  const [categories, setCategories] = useState(false);
  const [noProduct, setNoProduct] = useState(false);
  const [contactTypes, setContactTypes] = useState(false);
  const [formSaved, setFormSaved] = useState(false);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const unblockRef = useRef(null);
  const methods = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(contactSchema),
  });
  const { reset, watch, formState, setValue, getValues } = methods;
  const { errors, dirtyFields, isValid } = formState;
  const form = watch();
  const { productId, locationId, companyId } = routeParams;

  // Define handleSubmitProfile before using it in useNavigationPrompt
  const handleSubmitProfile = async () => {
    if (productId === "new") {
      // Trigger validation to show all field errors
      const isValid = await methods.trigger();

      // If form is valid and we have dirty fields, save the company
      if (isValid && Object.keys(methods.formState.dirtyFields).length > 0) {
        handleSaveProduct();
        return true;
      }

      // Return false to keep the user on the page but still show validation errors
      return false;
    }
    return true;
  };

  // Check if any field has been modified, regardless of validation status
  const isDirty = productId === 'new'
    ? Object.keys(dirtyFields).length > 0
    : formState.isDirty;

  const { showPrompt, handlePromptConfirm, handlePromptCancel, unblockNavigation } = useNavigationPrompt({
    isDirty: isDirty && !openDeleteConfirmation && !formSaved,
    onSubmit: handleSubmitProfile,
    history,
    unblockRef,
  });

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

  useEffect(() => {
    const params = {
      userId: userId && userId,
      companyId: companyId && companyId,
  }
    dispatch(getLocations(params)).then((action) => {
      if (action.payload) {
          setLocations(action.payload);
      }
    });
  }, []);

  useEffect(() => {
    dispatch(getContactTypes()).then((action) => {
      if (action.payload) {
        setContactTypes(action.payload);
      }
    });
  }, []);

   useEffect(() => {
      dispatch(getCategories()).then((action) => {
        if (action.payload) {
          setCategories(action.payload);
        }
      });
    }, []);


  useEffect(() => {
    if (locationId && locations) {
      setValue('location_id', String(locationId));
    }
  }, [locationId, locations, setValue]);

  function handleSaveProduct(isAddAnother = false) {
    const formValues = getValues();
    // Ensure location_id exists
    if (!formValues.location_id) {
      dispatch(showMessage({
        message: "Location is required. Please select a location before saving.",
        variant: "error"
      }));
      return;
    }

    dispatch(addNewPerson(formValues)).then(({payload}) => {
      const isSuccess = payload.status !== false;
      if (isSuccess) {
        dispatch(showMessage({ message: "Contact person added successfully!", variant: "success" }));
        if (isAddAnother) {
          reset({...defaultValues, location_id: String(locationId)});
        } else {
          setFormSaved(true);
        }
      } else {
        dispatch(showMessage({ message: payload.message || "Failed to add contact person", variant: "error" }));
      }
    }).catch((err) => {
      // Reverted to original error handling using showMessage
      if (err.response && err.response.data) {
        if (err.response.data.error && typeof err.response.data.error === 'object') {
          // Format validation errors
          const errorMessage = Object.entries(err.response.data.error)
            .map(([field, errors]) => `${field}: ${errors.join(', ')}`)
            .join(' | ');

          dispatch(showMessage({
            message: `Validation failed: ${errorMessage}`,
            variant: "error",
            autoHideDuration: 6000
          }));
        } else if (err.response.data.message) {
          // Show API error message
          dispatch(showMessage({
            message: err.response.data.message,
            variant: "error"
          }));
        } else {
          // Generic error
          dispatch(showMessage({
            message: "Failed to save contact person. Please try again.",
            variant: "error"
          }));
        }
      } else {
        // Generic error
        dispatch(showMessage({
          message: "Failed to save contact person. Please check your network connection.",
          variant: "error"
        }));
      }
    });
  }

  function handleUpdateProduct() {
    const formValues = getValues();
    if (!formValues.location_id) {
      dispatch(showMessage({
        message: "Location is required. Please select a location before updating.",
        variant: "error"
      }));
      return;
    }
    dispatch(saveProduct(formValues))
      .then(({ payload }) => {
        if (payload) {
          unblockNavigation();
          dispatch(showMessage({
            message: "Contact person updated successfully!",
            variant: 'success'
          }));
        } else {
          // Reverted to simple error message
          dispatch(showMessage({
            message: "Failed to update contact person",
            variant: 'error'
          }));
        }
      })
      .catch((err) => {
        console.error("Error updating contact person:", err);

        // Reverted to original error handling using showMessage
        if (err.response && err.response.data) {
          if (err.response.data.error && typeof err.response.data.error === 'object') {
            const errorMessage = Object.entries(err.response.data.error)
              .map(([field, errors]) => `${field}: ${errors.join(', ')}`)
              .join(' | ');

            dispatch(showMessage({
              message: `Validation failed: ${errorMessage}`,
              variant: "error",
              autoHideDuration: 6000
            }));
          } else if (err.response.data.message) {
            dispatch(showMessage({
              message: err.response.data.message,
              variant: "error"
            }));
          } else {
            dispatch(showMessage({
              message: "Failed to update contact person. Please try again.",
              variant: "error"
            }));
          }
        } else {
          dispatch(showMessage({
            message: `Update error: ${err.message}`,
            variant: "error"
          }));
        }
      });
  }

  function handleDeleteConfirmation() {
    dispatch(removeProduct(productId)).then(({ payload }) => {
      if (payload) {
        dispatch(showMessage({ message: payload.message, variant: payload.status ? 'success' : 'error',  autoHideDuration: 600000, }));
        if (payload.status) {
          navigate(`/locations/${locationId}/${companyId}`);
        }
      }
    });
  }

  function toggleDeleteConfirmation() {
    setOpenDeleteConfirmation(!openDeleteConfirmation);
  }

  /**
   * Tab Change
   */
  function handleTabChange(_, value) {
    setTabValue(value);
  }

  function handleAddContact() {
    setFormSaved(false);
  }

  function handleAddLocation() {
    setFormSaved(false);
    navigate(`/locations/new/${companyId}`);
  }

  function handleDone() {
    setFormSaved(false);
    navigate(`/companies`);
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
          There is no such contact persons!
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/contact-person"
          color="inherit"
        >
          Go to Contact Person Page
        </Button>
      </motion.div>
    );
  }

  if (locations && locations?.length == 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There are no locations added to system!
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/locations/new"
          color="inherit"
        >
          Go to Locations Page & add one
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
      routeParams.productId !== "new") || !locations || !categories || !contactTypes  ) {
    return <FuseLoading />;
  }

  return (
    <FormProvider {...methods}>
      <FusePageCarded
        header={<ProductHeader id={routeParams?.productId} companyId={companyId} locationId={locationId} toggleDeleteConfirmation={toggleDeleteConfirmation} />}
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
            <div className="p-16 sm:p-24 max-w-3xl">
              <div className={tabValue !== 0 ? "hidden" : ""}>
                <BasicInfoTab 
                  id={routeParams?.productId} 
                  isAdmin={isAdmin} 
                  product={product} 
                  locations={locations} 
                  categories={categories} 
                  contactTypes={contactTypes} 
                  toggleDeleteConfirmation={toggleDeleteConfirmation} 
                  handleSaveProduct={handleSubmitProfile} 
                  handleUpdateProduct={handleUpdateProduct}
                  handleSubmitProfile={handleSubmitProfile} 
                />
              </div>
            </div>
          </>
        }
        scroll={isMobile ? "normal" : "content"}
      />
      <DeleteConfirmationDialog
        open={openDeleteConfirmation}
        onClose={toggleDeleteConfirmation}
        onConfirm={handleDeleteConfirmation}
        title="Are you sure you want to delete the contact ?"
        message="This action will permanently delete the contact. This cannot be undone."
      />
      <SaveChangesDialog
        open={showPrompt}
        onClose={handlePromptCancel}
        onConfirm={handlePromptConfirm}
      />
      <FormSavedDialog
        open={formSaved}
        onClose={handleDone}
        onConfirm={handleAddContact}
        title="Contact Person Saved"
        description="What do you want to do now?"
        buttonText="Add more contacts to this location"
        buttonText2="Add another location to this company"
        handleButton2={handleAddLocation}
        closeButtonText="I am done"
      />
    </FormProvider>
  );
}

export default withReducer("contact", reducer)(Contact);
