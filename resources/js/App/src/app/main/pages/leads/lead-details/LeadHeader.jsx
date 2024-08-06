import { useState } from "react";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import _ from "@lodash";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { removeProduct } from "../store/leadSlice";
import { showMessage } from "app/store/fuse/messageSlice";
import { updateLeadData } from "../store/leadSlice";

function ProductHeader(props) {
  const { id, selected: assigned_customers, updateAssignLeads, leadId, leadStatus: status } = props;
  const dispatch = useDispatch();
  const methods = useFormContext();
  const { formState, watch, getValues } = methods;
  const { isValid, dirtyFields } = formState;
  

  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [isCompletedLoading, setIsCompletedLoading] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();

  function handleSaveProduct() {
    const params = new URLSearchParams({
      assigned_customers: assigned_customers.join(','),
      status: '1',
    }).toString();
    navigate({pathname: `/leads/compose-email/${id}`, search: params});
  }

  function handleRemoveProduct() {
    dispatch(removeProduct(id)).then(({ payload }) => {
      dispatch(showMessage({ message: payload?.message }));
      navigate("/leads");
    });
  }

  const assignLead = async () => {
    try {
      setIsLoading(true);
      const params = {
        assigned_customers,
        lead_id: leadId,
        status: '1',
      };
      await updateAssignLeads(params);
      dispatch(showMessage({ message: "Lead assigned successfully!" }));
      navigate(`/leads/${leadId}`);
    } catch (error) {
      dispatch(showMessage({ message: "Failed to assign lead", variant: "error" }));
    } finally {
      setIsLoading(false)
    }
  };

  const updateAssignLead = (params) => {
    return dispatch(updateLeadData(params)).then(() => {
      dispatch(showMessage({ message: "Lead updated successfully!" , variant: 'success'}));
    });
  };
  const completeLead = async () => {
    try {
      setIsCompletedLoading(true);
      const newStatus = status === '2' ? '1' : '2';
      const params = {
        lead_id: leadId,
        status: newStatus,
      };
      await updateAssignLeads(params);
      const message = status === '2' ? "Lead set to inprogress successfully!" : "Lead set to completed successfully!" 
      dispatch(showMessage({ message, variant: "success" }));
      navigate(`/leads`);
    } catch (error) {
      dispatch(showMessage({ message: "Failed to update assign lead status", variant: "error" }));
    } finally {
      setIsCompletedLoading(false);
    }
  };

  const isNextButtonDisabled = !assigned_customers.length;

  return (
    <div className="flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-32 px-24 md:px-32">
      <div className="flex flex-col sm:flex-row space-y-16 sm:space-y-0 flex-1 w-full items-center justify-between py-32 px-24 md:px-32">
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
        >
          <Typography
            className="flex items-center sm:mb-12"
            component={Link}
            role="button"
            to="/leads"
            color="inherit"
          >
            <FuseSvgIcon size={20}>
              {theme.direction === "ltr"
                ? "heroicons-outline:arrow-sm-left"
                : "heroicons-outline:arrow-sm-right"}
            </FuseSvgIcon>
            <span className="flex mx-4 font-medium">Leads</span>
          </Typography>
        </motion.div>
      </div>
      <div className="flex flex-col items-center sm:items-start space-y-8 sm:space-y-0 w-full sm:max-w-full min-w-0">
        <div className="flex items-center max-w-full">
          <motion.div
            className="hidden sm:flex"
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { delay: 0.3 } }}
          >
         
              <img
                className="w-32 sm:w-48 rounded"
                src="assets/images/apps/ecommerce/product-image-placeholder.png"
                alt="placeholder-image"
              />

          </motion.div>
          <motion.div
            className="flex flex-col items-center sm:items-start min-w-0 mx-8 sm:mx-16"
            initial={{ x: -20 }}
            animate={{ x: 0, transition: { delay: 0.3 } }}
          >
            <Typography className="text-16 sm:text-20 truncate font-semibold">
              Assign lead
            </Typography>
            <Typography variant="caption" className="font-medium">
              Lead Details
            </Typography>
          </motion.div>
        </div>
      </div>
      <motion.div
        className="flex"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
      >
        <Button
          className="whitespace-nowrap mx-4"
          variant="contained"
          color="secondary"
          disabled={id === "new"}
          onClick={handleRemoveProduct}
          startIcon={
            <FuseSvgIcon className="hidden sm:flex">
              heroicons-outline:trash
            </FuseSvgIcon>
          }
        >
          Remove
        </Button>
        <Button
          className="whitespace-nowrap mx-4"
          variant="contained"
          color="secondary"
          disabled={_.isEmpty(dirtyFields) || !isValid || isUpdateLoading}
          onClick={updateAssignLead}
          endIcon={isUpdateLoading && <CircularProgress size={20}/>} 
        >
        Update
        </Button>
        <Button
          className="whitespace-nowrap mx-4"
          variant="contained"
          color="secondary"
          disabled={isNextButtonDisabled || isLoading}
          onClick={assignLead}
          endIcon={isLoading && <CircularProgress size={20}/>} 
        >
         Assign lead
        </Button>
        <Button
          className="whitespace-nowrap mx-4"
          variant="contained"
          color="secondary"
          disabled={isNextButtonDisabled}
          onClick={handleSaveProduct}
        >
          {id !== "new" ? "Send Email" : "Save"}
        </Button>
        <Button
          className="whitespace-nowrap mx-4"
          variant="contained"
          color={status === '2' ? 'warning' : 'secondary'}
          onClick={completeLead}
          endIcon={isCompletedLoading && <CircularProgress size={20}/>} 
        >
          {status === '2' ? "Change to in progress" : "Mark as completed"}
        </Button>
      </motion.div>
    </div>
  );
}

export default ProductHeader;
