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
import {
  getProduct,
  newProduct,
  resetProduct,
  selectProduct,
} from "../store/customerSlice";
import { selectUser } from "../../../../store/userSlice";
import { getCompanies } from "../../companies/store/companiesSlice";
import { getProducts as getContactPerson } from "../../contact-person/store/contactPersonsSlice";
import { getProducts as getCategories } from "../../categories/store/categoriesSlice";
import { getProducts as getCustomerTypes } from "../../customer-types/store/customerTypesSlice";
import { getProducts as getCustomerLocations } from "../../customer-locations/store/customerLocationsSlice";
import reducer from "../store";
import { profileSchema, adminProfileSchema } from "../../../../schemas/validationSchemas";
import ProductHeader from "./CustomerHeader";
import BasicInfoTab from "./tabs/BasicInfoTab";

function Customer(props) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isAdmin = user?.role === "admin";
  const product = useSelector(selectProduct);
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const routeParams = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [noProduct, setNoProduct] = useState(false);
  const [companies, setCompanies] = useState(false);
  const [categories, setCategories] = useState(false);
  const [customerTypes, setCustomerTypes] = useState(false);
  const [customerLocations, setCustomerLocation] = useState(false);
  const [contact, setContacts] = useState(false);
  const formSchema = isAdmin ? adminProfileSchema : profileSchema;
  const methods = useForm({
    mode: "onChange",
    defaultValues: {},
    resolver: yupResolver(formSchema),
  });
  const { reset, watch, control, onChange, formState, setValue } = methods;
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
    dispatch(getCompanies()).then((action) => {
      if (action.payload) {
        setCompanies(action.payload);
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
    dispatch(getCategories()).then((action) => {
      if (action.payload) {
        setCategories(action.payload);
      }
    });
  }, []);

  useEffect(() => {
    dispatch(getCustomerTypes()).then((action) => {
      if (action.payload) {
        setCustomerTypes(action.payload);
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
  if (companies && companies?.length == 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There are no companies added to system!
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/companies/new"
          color="inherit"
        >
          Go to Companies Page & add one
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
  if (
    routeParams.productId !== "new" ||
    !companies ||
    !contact ||
    !categories ||
    !customerLocations ||
    !customerTypes
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
                <BasicInfoTab
                  companies={companies}
                  contacts={contact}
                  setCompanies={setCompanies}
                  setContacts={setContacts}
                  categories={categories}
                  customerTypes={customerTypes}
                  isAdmin={isAdmin}
                  customerLocations={customerLocations}
                />
              </div>
            </div>
          </>
        }
        scroll={isMobile ? "normal" : "content"}
      />
    </FormProvider>
  );
}

export default withReducer("customer", reducer)(Customer);
