import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import _ from "@lodash";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import {
  removeProduct,
  saveProduct,
  addNewCompany,
} from "../store/locationSlice";
import { showMessage } from "app/store/fuse/messageSlice";

function ProductHeader(props) {
  const { id } = props;
  const dispatch = useDispatch();
  const methods = useFormContext();
  const { formState, watch, getValues } = methods;
  const { isValid, dirtyFields } = formState;
  const image = watch("image");
  const name = watch("company_name");
  const theme = useTheme();
  const navigate = useNavigate();

  function handleSaveProduct() {
    const formData = getValues();
    dispatch(addNewCompany(formData))
      .then((response) => {
        if (response.meta.requestStatus === 'fulfilled') {
          dispatch(showMessage({ message: "Location added successfully!", variant: 'success' }));
          navigate("/locations");
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
  

  function handleRemoveProduct() {
    dispatch(removeProduct(id)).then(({ payload }) => {
      dispatch(showMessage({ message: payload?.message }));
      navigate("/locations");
    });
  }

  function handleUpdateProduct() {
    dispatch(saveProduct(getValues())).then(() => {
      dispatch(showMessage({ message: "Location updated successfully!" }));
    });
  }

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
            to="/locations"
            color="inherit"
          >
            <FuseSvgIcon size={20}>
              {theme.direction === "ltr"
                ? "heroicons-outline:arrow-sm-left"
                : "heroicons-outline:arrow-sm-right"}
            </FuseSvgIcon>
            <span className="flex mx-4 font-medium">Locations</span>
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
            {image ? (
              <img
                className="w-32 sm:w-48 rounded"
                src={
                  image
                    ? typeof image === "string"
                      ? `assets/images/company-logo/${image}`
                      : URL.createObjectURL(
                          image instanceof File ? image : new Blob([image])
                        )
                    : null
                }
                alt={name}
              />
            ) : (
              <img
                className="w-32 sm:w-48 rounded"
                src="assets/images/apps/ecommerce/product-image-placeholder.png"
                alt={name}
              />
            )}
          </motion.div>
          <motion.div
            className="flex flex-col items-center sm:items-start min-w-0 mx-8 sm:mx-16"
            initial={{ x: -20 }}
            animate={{ x: 0, transition: { delay: 0.3 } }}
          >
            <Typography className="text-16 sm:text-20 truncate font-semibold">
              {name || "New Location"}
            </Typography>
            <Typography variant="caption" className="font-medium">
              Location Detail
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
          onClick={handleRemoveProduct}
          disabled={id === "new"}
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
          disabled={_.isEmpty(dirtyFields) || !isValid}
          onClick={id !== "new" ? handleUpdateProduct : handleSaveProduct}
        >
          {id !== "new" ? "Update" : "Save"}
        </Button>
      </motion.div>
    </div>
  );
}

export default ProductHeader;
