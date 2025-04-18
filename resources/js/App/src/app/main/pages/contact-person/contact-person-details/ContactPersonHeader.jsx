import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";

function ProductHeader(props) {
  const { id, companyId, locationId } = props;
  const dispatch = useDispatch();
  const methods = useFormContext();
  const { watch } = methods;
  const image = watch("image");
  const name = watch("first_name");
  const theme = useTheme();

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
            to={`/locations/${locationId}/${companyId}`}
            color="inherit"
          >
            <FuseSvgIcon size={20}>
              {theme.direction === "ltr"
                ? "heroicons-outline:arrow-sm-left"
                : "heroicons-outline:arrow-sm-right"}
            </FuseSvgIcon>
            <span className="flex mx-4 font-medium">Contact</span>
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
                      ? `assets/images/contact-person/${image}`
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
              {name || "New Contact Person"}
            </Typography>
            <Typography variant="caption" className="font-medium">
              Contact Person Detail
            </Typography>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default ProductHeader;
