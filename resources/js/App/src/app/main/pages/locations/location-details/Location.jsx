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
  removeProduct,
} from "../store/locationSlice";
import { getCompanies } from "../../companies/store/companiesSlice";
import reducer from "../store";
import ProductHeader from "./LocationHeader";
import BasicInfoTab from "./tabs/BasicInfoTab";
import ContactInfoTab from "./tabs/ContactInfoTab";
import authRoles from "../../../../auth/authRoles";
import { locationSchema } from "../../../../schemas/validationSchemas";
import DeleteConfirmationDialog from "../../../../shared-components/delete-confirmation-dialog";
import { showMessage } from "app/store/fuse/messageSlice";
const defaultValues = {
  company_id: '',
  street: '',
  postal_code: '',
  city: '',
}

function Location(props) {
  const dispatch = useDispatch();
  const product = useSelector(selectProduct);
  const user = useSelector(selectUser);
  const { uuid } = user;
  const isAdmin = user?.role === authRoles.admin[0];
  const navigate = useNavigate();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const routeParams = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [companies, setCompanies] = useState(false);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [noProduct, setNoProduct] = useState(false);
  const methods = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(locationSchema),
  });
  const { reset, watch, control, onChange, formState, setValue } = methods;
  const form = watch();
  const { productId, companyId } = routeParams;

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
      dispatch(getCompanies()).then((action) => {
        if (action.payload) {
          setCompanies(action.payload);
        }
      });
    }, []);

  useEffect(() => {
    if (companyId && companies) {
      setValue('company_id', companyId);
     }
  }, [companyId, companies]);

  /**
   * Tab Change
   */
  function handleTabChange(event, value) {
    setTabValue(value);
  }

  function toggleDeleteConfirmation() {
    setOpenDeleteConfirmation(!openDeleteConfirmation);
  }

  function handleDeleteConfirmation() {
    dispatch(removeProduct(productId)).then(({ payload }) => {
      if (payload) {
        dispatch(showMessage({ message: payload.message, variant: payload.status ? 'success' : 'error',  autoHideDuration: 600000, })); 
        if (payload.status) {
          navigate(`/companies/${companyId}`);
        }
      }
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
          There is no such location!
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/locations"
          color="inherit"
        >
          Go to location Page
        </Button>
      </motion.div>
    );
  }

  if (companies && companies?.length === 0) {
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
      routeParams.productId !== "new") || !companies
  ) {
    return <FuseLoading />;
  }

  return (
    <FormProvider {...methods}>
      <FusePageCarded
        header={<ProductHeader id={routeParams?.productId} companyId={companyId} toggleDeleteConfirmation={toggleDeleteConfirmation} />}
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
                <BasicInfoTab product={product} isAdmin={isAdmin} companies={companies}/>
              </div>
              <div className="mt-16">
                <ContactInfoTab product={product} isAdmin={isAdmin} userId={uuid} productId={productId} />
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
        message="Are you sure you want to delete the location? This action will permanently delete the location. This cannot be undone."
      />
    </FormProvider>
  );
}

export default withReducer("location", reducer)(Location);
