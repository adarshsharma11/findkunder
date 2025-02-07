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
} from "../store/companySlice";
import reducer from "../store";
import ProductHeader from "./CompanyHeader";
import BasicInfoTab from "./tabs/BasicInfoTab";
import LocationInfoTab from "./tabs/LocationInfoTab";
import authRoles from "../../../../auth/authRoles";
import { companySchema } from "../../../../schemas/validationSchemas";

function Company(props) {
  const dispatch = useDispatch();
  const product = useSelector(selectProduct);
  const user = useSelector(selectUser);
  const { uuid } = user;
  const isAdmin = user?.role === authRoles.admin[0];
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const routeParams = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [noProduct, setNoProduct] = useState(false);
  const methods = useForm({
    mode: "onChange",
    defaultValues: {},
    resolver: yupResolver(companySchema),
  });
  const { reset, watch } = methods;
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
                <BasicInfoTab product={product} isAdmin={isAdmin} />
              </div>
              <div className="mt-16">
                <LocationInfoTab product={product} isAdmin={isAdmin} userId={uuid} productId={productId} />
              </div>
            </div>
          </>
        }
        scroll={isMobile ? "normal" : "content"}
      />
    </FormProvider>
  );
}

export default withReducer("company", reducer)(Company);
