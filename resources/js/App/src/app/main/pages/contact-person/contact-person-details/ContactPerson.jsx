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
import * as yup from "yup";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import {
  getProduct,
  newProduct,
  resetProduct,
  selectProduct,
} from "../store/contactPersonSlice";
import { getProducts } from "../../companies/store/companiesSlice";
import reducer from "../store";
import ProductHeader from "./ContactPersonHeader";
import BasicInfoTab from "./tabs/BasicInfoTab";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  first_name: yup
    .string()
    .required("You must enter a first name")
    .max(255, "First name must not exceed 255 characters"),
  title: yup
    .string()
    .required("You must enter a title")
    .max(255, "First name must not exceed 255 characters"),
  last_name: yup
    .string()
    .required("You must enter a last name")
    .max(255, "Last name must not exceed 255 characters"),
  email: yup
    .string()
    .required("You must enter a email")
    .email("Invalid email format")
    .max(255, "Email must not exceed 255 characters"),
  phone: yup
    .string()
    .required("You must enter a phone")
    .max(20, "Phone must not exceed 20 characters"),
  comment: yup
    .string()
    .nullable()
    .max(255, "Comment must not exceed 255 characters"),
  company_id: yup
    .number()
    .required("Company is required")
    .positive("Company must be a positive number"),
  linkedin: yup
    .string()
    .nullable()
    .transform((curr, orig) => (orig === "" ? null : curr))
    .matches(
      /^(https?:\/\/)?(www\.)?linkedin\.com\/.*$/,
      "Invalid LinkedIn URL. Please enter a valid LinkedIn URL"
    ),
});

function Product(props) {
  const dispatch = useDispatch();
  const product = useSelector(selectProduct);
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const routeParams = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [noProduct, setNoProduct] = useState(false);
  const [companies, setCompanies] = useState(false);
  const methods = useForm({
    mode: "onChange",
    defaultValues: {},
    resolver: yupResolver(schema),
  });
  const { reset, watch, control, onChange, formState } = methods;
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
    dispatch(getProducts()).then((action) => {
      if (action.payload) {
        setCompanies(action.payload);
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
  /**
   * Wait while product data is loading and form is setted
   */
  if (
    _.isEmpty(form) ||
    (product &&
      routeParams.productId !== product?.id?.toString() &&
      routeParams.productId !== "new") ||
    !companies
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
            <div className="p-16 sm:p-24 max-w-3xl">
              <div className={tabValue !== 0 ? "hidden" : ""}>
                <BasicInfoTab companies={companies} />
              </div>
            </div>
          </>
        }
        scroll={isMobile ? "normal" : "content"}
      />
    </FormProvider>
  );
}

export default withReducer("eCommerceApp", reducer)(Product);
