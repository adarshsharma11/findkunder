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
import { getAssignLeadsProfiles } from "../store/leadsSlice";
import {
  getProduct,
  newProduct,
  resetProduct,
  selectProduct,
  saveProduct,
} from "../store/leadSlice";
import reducer from "../store";
import ProductHeader from "./LeadHeader";
import BasicInfoTab from "./tabs/BasicInfoTab";
import AssignContactTab from "./tabs/AssignContact";
import { showMessage } from "app/store/fuse/messageSlice";

function Lead(props) {
  const dispatch = useDispatch();
  const product = useSelector(selectProduct);
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const routeParams = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [noProduct, setNoProduct] = useState(false);
  const [selected, setSelected] = useState([]);
  const [assignLeadsData, setAssignLeadsData] = useState(false);
  
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
  }, [product]);

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
  if (
    (product &&
      routeParams.productId !== product?.id?.toString() &&
      routeParams.productId !== "new") || !assignLeadsData
  ) {
    return <FuseLoading />;
  }

  return (
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
                <BasicInfoTab data={product} />
              </div>
              <div className={tabValue !== 1 ? "hidden" : ""}>
                <AssignContactTab data={assignLeadsData} leadStatus={product?.status} updateAssignLeads={updateAssignLeads} leadId={productId} selected={selected} setSelected={setSelected}/>
              </div>
            </div>
          </>
        }
        scroll={isMobile ? "normal" : "content"}
      />
  );
}

export default withReducer("lead", reducer)(Lead);
