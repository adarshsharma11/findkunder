import { orange } from "@mui/material/colors";
import { lighten, styled } from "@mui/material/styles";
import clsx from "clsx";
import { Controller, useFormContext } from "react-hook-form";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";

const Root = styled("div")(({ theme }) => ({
  "& .productImageFeaturedStar": {
    position: "absolute",
    top: 0,
    right: 0,
    color: orange[400],
    opacity: 0,
  },

  "& .productImageUpload": {
    transitionProperty: "box-shadow",
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
  },

  "& .productImageItem": {
    transitionProperty: "box-shadow",
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
    "&:hover": {
      "& .productImageFeaturedStar": {
        opacity: 0.8,
      },
    },
    "&.featured": {
      pointerEvents: "none",
      boxShadow: theme.shadows[3],
      "& .productImageFeaturedStar": {
        opacity: 1,
      },
      "&:hover .productImageFeaturedStar": {
        opacity: 1,
      },
    },
  },
}));

function ContactImageTab(props) {
  const methods = useFormContext();
  const { control, watch } = methods;

  const image = watch("image");

  return (
    <Root>
      <div className="flex justify-center sm:justify-start flex-wrap -mx-16">
        <Controller
          name="image"
          control={control}
          render={({ field: { onChange, value } }) => (
            <div className="flex justify-center sm:justify-start flex-wrap flex-col">
            <InputLabel id="demo-simple-select-label" className="mx-16 mb-16">Image</InputLabel>
            <Box
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "light"
                    ? lighten(theme.palette.background.default, 0.4)
                    : lighten(theme.palette.background.default, 0.02),
              }}
              component="label"
              htmlFor="button-file"
              className="productImageUpload flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg"
            >
              <input
                accept="image/*"
                className="hidden"
                id="button-file"
                type="file"
                onChange={async (e) => {
                  const file = e.target.files[0];
                  onChange(file);
                }}
              />
              <FuseSvgIcon size={32} color="action">
                heroicons-outline:upload
              </FuseSvgIcon>
            </Box>
            </div>
          )}
        />
        {image && (
          <div
            role="button"
            tabIndex={0}
            className={clsx(
              "productImageItem flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer outline-none shadow hover:shadow-lg mt-38"
            )}
          >
            <img
              className="max-w-none w-auto h-full"
              src={
                image
                  ? typeof image === "string"
                    ? `assets/images/contact-person/${image}`
                    : URL.createObjectURL(
                        image instanceof File ? image : new Blob([image])
                      )
                  : null
              }
              alt="product"
            />
          </div>
        )}
      </div>
    </Root>
  );
}

export default ContactImageTab;
