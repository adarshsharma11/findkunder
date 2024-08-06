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
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { getAssignLeadsProfiles } from "../store/leadsSlice";
import {
  getProduct,
  newProduct,
  resetProduct,
  selectProduct,
  saveProduct,
} from "../store/leadSlice";
import { getProducts as getCategories } from '../../categories/store/categoriesSlice';
import { getProducts as getCustomerTypes } from '../../customer-types/store/customerTypesSlice';
import { getProducts as getLocations } from '../../customer-locations/store/customerLocationsSlice';
import reducer from "../store";
import ProductHeader from "./LeadHeader";
import BasicInfoTab from "./tabs/BasicInfoTab";
import AssignContactTab from "./tabs/AssignContact";
import { showMessage } from "app/store/fuse/messageSlice";
import { leadUpdateSchema } from "../../../../schemas/validationSchemas";

const defaultValues = {
  contact_name: '',
  contact_email: '',
  contact_phone: '',
  company_name: '',
  cvr_number: '',
  street: '',
  postal_code: '',
  categories: [],
  city: '',
  location_id: '',
  website: '',
  customer_type_id: '',
  company_description: '',
  who_do_you_need: '',
  specific_preferences: '',
  physical_attendance_required: '',
  physical_attendance_details: '',
  do_not_contact: '',
  attachments_per_year: null,
  employees_count: null,
};


function Lead(props) {
  const dispatch = useDispatch();
  const product = useSelector(selectProduct);
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const methods = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(leadUpdateSchema),
  });

  const { reset, watch, control, onChange, formState } = methods;
  const form = watch();

  const routeParams = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [noProduct, setNoProduct] = useState(false);
  const [selected, setSelected] = useState([]);
  const [assignLeadsData, setAssignLeadsData] = useState(false);
  const [data, setData] = useState({
    locations: [],
    customerTypes: [],
    customerCategories: [],
  });
  const { locations, customerTypes, customerCategories } = data;
  
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
    // Dispatch the getProducts action and handle the response
    dispatch(getLocations())
      .then((response) => {
        if (response.meta.requestStatus === "fulfilled") {
          setData(prevData => ({
            ...prevData,
            locations: response.payload
          }));
        } else {
          // Handle error if needed
          console.error("Error fetching locations:", response.error);
        }
      })
      .finally(() => {});
  }, [dispatch]);

  useEffect(() => {
    // Dispatch the getProducts action and handle the response
    dispatch(getCustomerTypes())
      .then((response) => {
        if (response.meta.requestStatus === "fulfilled") {
          setData(prevData => ({
            ...prevData,
            customerTypes: response.payload
          }));
        } else {
          // Handle error if needed
          console.error("Error fetching locations:", response.error);
        }
      })
      .finally(() => {});
  }, [dispatch]);

  useEffect(() => {
    // Dispatch the getProducts action and handle the response
    dispatch(getCategories())
      .then((response) => {
        if (response.meta.requestStatus === "fulfilled") {
          setData(prevData => ({
            ...prevData,
            customerCategories: response.payload
          }));
        } else {
          // Handle error if needed
          console.error("Error fetching locations:", response.error);
        }
      })
      .finally(() => {});
  }, [dispatch]);


  const getContactPersons = async (formData) => {
    try {
      const response = await dispatch(getAssignLeadsProfiles(formData));
      if (response.payload) {
        setAssignLeadsData(response.payload);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  const updateAssignLeads = (params) => {
    return dispatch(saveProduct(params)).then(() => {
      if (product && productId) {
        const param = {
          lead_id: productId,
          location_id: product?.location_id,
        };
        getContactPersons(param);
      }
      dispatch(
        showMessage({ message: "Profile assigned to lead successfully!" })
      );
    });
  };

  useEffect(() => {
    if (product && productId) {
      const param = {
        lead_id: productId,
        location_id: product?.location_id,
      }
    getContactPersons(param);
  }
  }, [product, productId]);



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
          There is no such leads!
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/leads"
          color="inherit"
        >
          Go to leads Page
        </Button>
      </motion.div>
    );
  }
  /**
   * Wait while product data is loading and form is setted
   */
  if (_.isEmpty(form) ||
    (product &&
      routeParams.productId !== product?.id?.toString() &&
      routeParams.productId !== "new") || !assignLeadsData
  ) {
    return <FuseLoading />;
  }

  return (
    <FormProvider {...methods} >
      <FusePageCarded
        header={<ProductHeader id={routeParams?.productId} selected={selected} updateAssignLeads={updateAssignLeads} leadId={productId} leadStatus={product?.status} />}
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
              <Tab className="h-64" label="Assign Contact" />
            </Tabs>
            <div className="p-16 sm:p-24">
              <div className={tabValue !== 0 ? "hidden" : ""}>
                <BasicInfoTab data={product} locations={locations} customerCategories={customerCategories} customerTypes={customerTypes}  />
              </div>
              <div className={tabValue !== 1 ? "hidden" : ""}>
                <AssignContactTab data={assignLeadsData} leadStatus={product?.status} updateAssignLeads={updateAssignLeads} leadId={productId} selected={selected} setSelected={setSelected}/>
              </div>
            </div>
          </>
        }
        scroll={isMobile ? "normal" : "content"}
      />
      </FormProvider>
  );
}

export default withReducer("lead", reducer)(Lead);
