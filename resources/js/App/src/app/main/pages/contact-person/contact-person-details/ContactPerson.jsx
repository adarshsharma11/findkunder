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
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import {
  getProduct,
  newProduct,
  resetProduct,
  selectProduct,
  removeProduct,
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
import { showMessage } from "app/store/fuse/messageSlice";
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
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const methods = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(contactSchema),
  });
  const { reset, watch, control, onChange, formState, setValue } = methods;
  const form = watch();
  const { productId, locationId, companyId } = routeParams;

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
      setValue('location_id', locationId);
    }
  }, [locationId, locations]);

  function handleDeleteConfirmation() {
    dispatch(removeProduct(productId)).then(({ payload }) => {
      if (payload) {
        dispatch(showMessage({ message: payload.message, variant: payload.status ? 'success' : 'error',  autoHideDuration: 600000, }));
        if (payload.status) {
          navigate(`/locations/${locationId}`);
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
  function handleTabChange(event, value) {
    setTabValue(value);
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
                <BasicInfoTab isAdmin={isAdmin} product={product} locations={locations} categories={categories} contactTypes={contactTypes} />
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
        message="Are you sure you want to delete the contact? This action will permanently delete the contact. This cannot be undone."
      />
    </FormProvider>
  );
}

export default withReducer("contact", reducer)(Contact);
