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
import { Link, useParams } from "react-router-dom";
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
import { useNavigate } from "react-router-dom";
import { companySchema } from "../../../../schemas/validationSchemas";

function Company(props) {
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
  const methods = useForm({
    mode: "onChange",
    defaultValues: {},
    resolver: yupResolver(companySchema),
  });
  const { reset, watch, getValues } = methods;
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
  function handleTabChange(event, value) {
    setTabValue(value);
  }

  const handleSubmitProfile = async () => {
    if (productId === "new") {
      const isValid = await methods.trigger();
      if (!isValid) {
        return false;
      }
    }
    return true;
  };

  function handleSaveProduct() {
    const formData = getValues();
    dispatch(addNewCompany(formData))
      .then((response) => {
        if (response.meta.requestStatus === 'fulfilled') {
          dispatch(showMessage({ message: "Company added successfully!", variant: 'success' }));
          setFormSaved(true);
        } else if (response.meta.requestStatus === 'rejected' && response.error && response.error.message === 'Request failed with status code 422') {
          const errors = response.payload?.errors || response.error?.data?.errors;
          if (errors) {
            // Loop through the errors and show a message for each field
            for (const [field, messages] of Object.entries(errors)) {
              dispatch(showMessage({ message: `Error in ${field}: ${messages.join(', ')}`, variant: 'error' }));
            }
          } else {
            dispatch(showMessage({ message: "The company details must be unique. At least one of the fields (name, cvr, street, postal_code, city) must be different from existing records.", variant: 'error' }));
          }
        }
      })
      .catch((error) => {
        // Handle any other errors
        dispatch(showMessage({ message: `An error occurred: ${error.message}`, variant: 'error' }));
      });
  }

  function handleCloseFormSavedDialog() {
    setFormSaved(false);
    navigate(`/companies`);
  }

  function handleAddLocation() {
    setFormSaved(false);
    navigate(`/locations/new`);
  }
  

  function handleRemoveProduct() {
    dispatch(removeProduct(id)).then(({ payload }) => {
      dispatch(showMessage({ message: payload?.message }));
      navigate("/companies");
    });
  }

  function handleUpdateProduct() {
    dispatch(saveProduct(getValues())).then(() => {
      dispatch(showMessage({ message: "Company updated successfully!" }));
    });
  }

  const isDirty = productId === 'new' ? methods.formState.dirtyFields?.company_name || methods.formState.dirtyFields?.cvr : methods.formState.isDirty;

  const { showPrompt, handlePromptConfirm, handlePromptCancel } = useNavigationPrompt({
    isDirty,
    onSubmit: handleSubmitProfile,
    history,
    unblockRef,
  });



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
                <BasicInfoTab product={product} isAdmin={isAdmin} id={productId} handleRemoveProduct={handleRemoveProduct} handleUpdateProduct={handleUpdateProduct} handleSaveProduct={handleSaveProduct} />
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
    </FormProvider>
  );
}

export default withReducer("company", reducer)(Company);
