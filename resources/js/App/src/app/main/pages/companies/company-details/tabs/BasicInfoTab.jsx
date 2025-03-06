import TextField from "@mui/material/TextField";
import { Controller, useFormContext } from "react-hook-form";
import Grid from "@mui/material/Grid";
import CompanyImageTab from "./CompanyImageTab";
import { motion } from "framer-motion";
import Button from "@mui/material/Button";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import _ from "lodash";
import { validateNumberInput } from '../../../../../schemas/validationRulesSchemas';

function BasicInfoTab(props) {
  const { product, isAdmin, handleRemoveProduct, handleUpdateProduct, handleSaveProduct, id } = props;
  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;
  const dirtyFields = formState.dirtyFields;
  const isValid = formState.isValid;

  return (
    <div>
      <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
      {isAdmin && product?.user && (
        <Controller
          name="user_email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16"
              id="user_email"
              label="User"
              InputProps={{
                readOnly: true,
              }}
              value={product.user?.email || ''}
              variant="outlined"
              fullWidth
            />
          )}
        />
      )}
      <Controller
        name="company_name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.company_name}
            required
            helperText={errors?.company_name?.message}
            label="Company Name"
            autoFocus
            id="company_name"
            variant="outlined"
            fullWidth
          />
        )}
      />

      <Controller
        name="cvr"
        control={control}
        rules={{ validate: validateNumberInput }}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            id="cvr"
            required
            error={!!errors.cvr}
            helperText={errors?.cvr?.message}
            label="CVR"
            type="text"
            variant="outlined"
            onChange={(e) => {
              const { value } = e.target;
              if (/^\d*$/.test(value)) {
                field.onChange(value);
              }
            }}
            fullWidth
          />
        )}
      />
       <CompanyImageTab />
      </Grid>
      <Grid item xs={12} md={4}>
      <Controller
        name="website"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            id="website"
            error={!!errors.website}
            helperText={errors?.website?.message}
            label="Website"
            type="text"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="linkedin"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            id="linkedin"
            label="Linkedin"
            error={!!errors.linkedin}
            helperText={errors?.linkedin?.message || "Please copy and paste the full URL, e.g., https://www.linkedin.com/company/findnetvaerket/"}
            type="text"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="facebook"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            id="facebook"
            label="Facebook"
            error={!!errors.facebook}
            helperText={errors?.facebook?.message || "Please copy and paste the full URL, e.g., https://www.facebook.com/findnetvaerket/"}
            type="text"
            variant="outlined"
            fullWidth
          />
        )}
      />
      </Grid>
      <Grid item xs={12} md={4}>
       <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            id="description"
            multiline
            rows={11}
            error={!!errors.description}
            helperText={errors?.description?.message}
            label="Description"
            type="text"
            variant="outlined"
            fullWidth
          />
        )}
      />
      </Grid>
      </Grid>
      <motion.div
        className="flex justify-end"
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
          Delete
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

export default BasicInfoTab;
