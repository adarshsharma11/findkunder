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
import {
  getProduct,
  newProduct,
  resetProduct,
  selectProduct,
  removeProduct,
} from "../store/customerSlice";
import { selectUser } from "../../../../store/userSlice";
import { getLocations } from "../../locations/store/locationsSlice";
import { getProducts as getContactPerson } from "../../contact-person/store/contactPersonsSlice";
import { getProducts as getCustomerLocations } from "../../customer-locations/store/customerLocationsSlice";
import reducer from "../store";
import { profileSchema, adminProfileSchema } from "../../../../schemas/validationSchemas";
import ProductHeader from "./CustomerHeader";
import { showMessage } from "app/store/fuse/messageSlice";
import BasicInfoTab from "./tabs/BasicInfoTab";
import DeleteConfirmationDialog from "./modal/DeleteConfirmationDialog";

function Customer(props) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isAdmin = user?.role === "admin";
  const product = useSelector(selectProduct);
  const { uuid: userId} = user;
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const routeParams = useParams();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [noProduct, setNoProduct] = useState(false);
  const [locations, setLocations] = useState(false);
  const [customerLocations, setCustomerLocation] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [contact, setContacts] = useState(false);
  const formSchema = isAdmin ? adminProfileSchema : profileSchema;
  const methods = useForm({
    mode: "onChange",
    defaultValues: {},
    resolver: yupResolver(formSchema),
  });
  const { reset, watch, control, onChange, formState, setValue } = methods;
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
    dispatch(getLocations(userId && userId)).then((action) => {
      if (action.payload) {
        setLocations(action.payload);
      }
    });
  }, []);

  useEffect(() => {
    dispatch(getCustomerLocations()).then((action) => {
      if (action.payload) {
        setCustomerLocation(action.payload);
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

  const handleDeleteDialog = () => {
    setOpenDeleteDialog(!openDeleteDialog);
  };

  function handleRemoveCustomer(options) {
    const payload = {
      id: productId,
      options,
    };
    dispatch(removeProduct(payload)).then(() => {
      const successMessage =
        options.deleteCompany || options.deleteContact
          ? "Customer profile and associated records deleted successfully!"
          : "Customer profile deleted successfully!";

      dispatch(showMessage({ message: successMessage }));
      handleDeleteDialog();
      navigate('/profiles');
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
          There is no such customer!
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/customers"
          color="inherit"
        >
          Go to Customers Page
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

  if (contact && contact?.length == 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There are no contacts added to system!
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/contact-person/new"
          color="inherit"
        >
          Go to Contact Page & add one
        </Button>
      </motion.div>
    );
  }
  /**
   * Wait while product data is loading and form is setted
   */
  if ( _.isEmpty(form) ||
    (!product && routeParams.productId !== "new") ||
    !locations ||
    !contact ||
    !customerLocations
  ) {
    return <FuseLoading />;
  }

 

  return (
    <FormProvider {...methods}>
      <FusePageCarded
        header={<ProductHeader id={routeParams?.productId} handleDeleteDialog={handleDeleteDialog} />}
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
                <BasicInfoTab
                  companies={locations}
                  contacts={contact}
                  setCompanies={setLocations}
                  setContacts={setContacts}
                  isAdmin={isAdmin}
                  product={product}
                  customerLocations={customerLocations}
                />
              </div>
            </div>
          </>
        }
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
  );
}

export default withReducer("customer", reducer)(Customer);
